import React from 'react';
import Modal from 'react-modal';
// import video from '../../video/video.mkv';
import './PopupVideoScreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#111',
        width: '95%',
        height: '80vh',
        color: 'white',
        marginTop: '2rem',
    }
};
Modal.setAppElement('#root');

const PopupVideoScreen = ({ modalIsOpen, closeModal, movie }) => {
    return (
        <div>
            <Modal
                id="modal"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <button onClick={closeModal} className="close__button"><FontAwesomeIcon icon={faTimes} /></button>
                <div>{movie.name || movie.title}</div>
                <br />
                <iframe style={{ width: '100%', height: '90%', margin: 'auto' }} src="https://www.youtube.com/embed/6ZfuNTqbHE8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                {/* <video style={{ width: '100%', height: '90%', margin: 'auto' }} src={video} controls></video> */}
            </Modal>
        </div>
    );
};

export default PopupVideoScreen;