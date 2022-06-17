import React from "react";

function ErrorPopup({ errorText, isActive }) {
    return (
        <div className={`error-popup ${isActive ? "error-popup_opened" : ""} `}>
            <h2 className="error-popup__title">Something went wrong...</h2>
            <p className="error-popup__text">{errorText}</p>
        </div>
    );
}

export default ErrorPopup;