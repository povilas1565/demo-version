import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardButtonRemoveClassName = `cards_btn-remove ${isOwn ? 'cards_btn-remove_active': ''}`;

    const isLiked = card.likes.some((userWhoLiked)=>userWhoLiked._id === currentUser._id);
    const cardButtonLikeClassName = `cards_btn-like ${isLiked ? 'cards_btn-like_active appear': ''}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="cards_item appear">
            <img
                className="cards_image"
                src={`${card.link}`}
                alt={`Picture ${card.name}`}
                onClick={handleClick}
            />
            <button
                type="button"
                aria-label="Delete"
                className={cardButtonRemoveClassName}
                onClick={handleDeleteClick}
            ></button>
            <div className="cards_description">
                <h2 className="cards_title text-cut">{card.name}</h2>
                <div className="cards_likes-container">
                    <button
                        type="button"
                        aria-label="Liked"
                        className={cardButtonLikeClassName}
                        onClick={handleLikeClick}
                    ></button>
                    <div className="cards_likes-counter appear">{card.likes.length}</div>
                </div>
            </div>
        </li>
    );
}

export default Card;