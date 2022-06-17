import React from 'react';

function InfoToolTip({isOpen, isSuccess, onClose}) {
    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup_container popup_container_form">
                <div className={`popup_tooltip-image ${!isSuccess ? "popup_tooltip-image_type_fail" : ""}`}></div>
                <h2 className="title title_place_auth">{!isSuccess ? "Something went wrong! Try again." : "You're registration successfully completed!" }</h2>
                <button
                    type="button"
                    aria-label="Close"
                    className="btn-close btn-close_place_tooltip"
                    onClick={onClose}
                ></button>
            </div>
        </div>
    )
}

export default InfoToolTip;