import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div
            className={`popup popup_type_img ${
                card.link ? "popup_opened" : ""
            }`}
        >
            <div className="popup_container">
                <button
                    type="button"
                    aria-label="Close"
                    className="btn-close btn-close_place_popup"
                    onClick={onClose}
                ></button>
                <figure className="popup_figure">
                    <img className="popup_image" src={`${card.link}`} alt={`Picture ${card.name}`} />
                    <figcaption className="popup_caption">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;