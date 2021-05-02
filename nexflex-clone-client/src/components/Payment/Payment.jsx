import React from 'react';
import './Payment.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentForm from '../PaymentForm/PaymentForm';

const stripePromise = loadStripe("pk_test_51IeC0ZDONHijbFR8TfUiYsgD8mSBdBFGuaElmBH5pf3Fcq48BdfCwHsaoOY2Bu37L5gJ0WKUTI4W329jYEw6IoFa00MyqcX5tN");
const ELEMENTS_OPTIONS = {
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
      }
    ]
  };
const Payment = () => {
    return (
        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
            <PaymentForm />
        </Elements>
    );
};

export default Payment;