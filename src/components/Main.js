import React from "react";
import "../index.css";
import Card from "./Card.js";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile page_container">
                <div
                    className="profile_avatar appear"
                    style={{ backgroundImage: `url(${currentUser.avatar})` }}
                    onClick={onEditAvatar}
                ></div>
                <div className="profile_info">
                    <div className="profile_container">
                        <h1 className="profile_name appear text-cut">{currentUser.name}</h1>
                        <button type="button" aria-label="Edit" className="profile_btn-edit" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile_about appear text-cut">{currentUser.about}</p>
                </div>
                <button type="button" aria-label="Add" className="profile_btn-add" onClick={onAddPlace}> </button>
            </section>

            <section className="places page_container">
                <ul className="cards">
                    {cards.map((card) => {
                        return (
                            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
                        );
                    })}
                </ul>
            </section>
        </main>
    );
}

export default Main;