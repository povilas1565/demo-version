import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function ConfirmDeletePopup({isOpen, onClose, card, onSubmitDelete, isLoading }) {

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmitDelete(card);
    }

    return (
        <PopupWithForm
            title="Are you sure"
            name="remove"
            buttonSubmitText={isLoading? "Removal..." : "Yes"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonSubmitState="true"
        />
    );
}

export default ConfirmDeletePopup;