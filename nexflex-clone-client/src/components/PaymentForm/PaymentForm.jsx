import React, { useEffect, useState } from 'react';
import './PaymentForm.css';
import {
    CardElement,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../../features/userSlice';
import { CardField, ErrorMessage, Field, ResetButton, SubmitButton } from './FormComponent';



const PaymentForm = () => {
    const { plan } = useParams();
    const user = useSelector(selectUser);
    const history = useHistory();
    const [charge, setCharge] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [billingDetails, setBillingDetails] = useState({
        email: user.email,
        phone: "",
        name: "",
    });

    useEffect(() => {
        const charge = (plan === 'basic' && 5.99) || (plan === 'standard' && 8.99) || (plan === 'premium' && 13.99);
        setCharge(charge);
    }, [plan]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        if (error) {
            elements.getElement("card").focus();
            return;
        }

        if (cardComplete) {
            setProcessing(true);
        }

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: billingDetails,
        });
        setProcessing(false);

        if (payload.error) {
            setError(payload.error);
        } else {
            setPaymentMethod(payload.paymentMethod)

            // save user
            const handleSaveUserPlan = async () => {
                const createPlan = {};
                createPlan.email = payload?.paymentMethod.billing_details.email;
                createPlan.name = payload?.paymentMethod.billing_details.name;
                createPlan.phone = payload?.paymentMethod.billing_details.phone;
                createPlan.plan = plan;
                createPlan.payment = charge;
                createPlan.buyDate = Date.now();
                createPlan.expireDate = Date.now() + 2629800000;
                await fetch('https://boiling-bayou-07410.herokuapp.com/savePlan', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ createPlan })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) history.push('/profile');
                    })
                    .catch(err => console.log(err));
            }

            const updatePlan = async () => {
                const updatePlan = {};
                updatePlan.id = user.id;
                updatePlan.plan = plan;
                updatePlan.payment = charge;
                updatePlan.buyDate = Date.now();
                updatePlan.expireDate = Date.now() + 2629800000;
                await fetch(`https://boiling-bayou-07410.herokuapp.com/updatePlan/`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ updatePlan })
                })
                .then(res => res.json())
                .then(data => {
                    if (data) history.push('/profile');
                })
                .catch(err => console.log(err)); 
            }

            if (user.id) {
                updatePlan();
            } else {
                handleSaveUserPlan();
            }
        }
    };

    const reset = () => {
        setError(null);
        setProcessing(false);
        setPaymentMethod(null);
        setBillingDetails({
            email: "",
            phone: "",
            name: "",
        });
    };

    return (
        <div className="paymentForm">
            <div className="paymentForm__container">
                {
                    paymentMethod ? (
                        <div className="Result">
                            <div className="ResultTitle" role="alert">
                                Payment successful
                            </div>
                            <div className="ResultMessage">
                                Thanks for trying Stripe Elements. No money was charged, but we
                        generated a PaymentMethod: {paymentMethod.id}
                            </div>
                            <ResetButton onClick={reset} />
                        </div>
                    ) : (
                        <form className="Form" onSubmit={handleSubmit}>
                            <fieldset className="FormGroup">
                                <Field
                                    label="Name"
                                    id="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    value={billingDetails.name}
                                    onChange={(e) => {
                                        setBillingDetails({ ...billingDetails, name: e.target.value });
                                    }}
                                />
                                <Field
                                    label="Email"
                                    id="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={user.email}
                                    readOnly
                                />
                                <Field
                                    label="Phone"
                                    id="phone"
                                    type="tel"
                                    required
                                    autoComplete="tel"
                                    value={billingDetails.phone}
                                    onChange={(e) => {
                                        setBillingDetails({ ...billingDetails, phone: e.target.value });
                                    }}
                                />
                            </fieldset>
                            <fieldset className="FormGroup">
                                <CardField
                                    onChange={(e) => {
                                        setError(e.error);
                                        setCardComplete(e.complete);
                                    }}
                                />
                            </fieldset>
                            {error && <ErrorMessage>{error.message}</ErrorMessage>}
                            <SubmitButton processing={processing} error={error} disabled={!stripe}>
                                Pay {charge + ' $'}
                            </SubmitButton>
                        </form>
                    )
                }
            </div>
        </div>
    );
};

export default PaymentForm;