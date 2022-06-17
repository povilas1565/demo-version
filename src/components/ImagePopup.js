import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div
            className={`popup popup_type_img ${
                card.link ? "popup_opened" : ""
            }`}
        >
            <div className="popup__container">
                <button
                    type="button"
                    aria-label="Close"
                    className="btn-close btn-close_place_popup"
                    onClick={onClose}
                ></button>
                <figure className="popup__figure">
                    <img className="popup__image" src={`${card.link}`} alt={`Picture ${card.name}`} />
                    <figcaption className="popup__caption">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;