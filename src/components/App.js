import React from "react";
import {
    Route,
    Switch,
    Redirect,
    useHistory,
} from "react-router-dom";
import "../index.css";
import Header from "./Header.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmDeletePopup from "./ConfirmDeletePopup.js";
import ImagePopup from "./ImagePopup.js";
import ErrorPopup from "./ErrorPopup.js";
import InfoToolTip from "./InfoToolTip";
import api from "../utils/api.js";
import auth from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute.js";

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
        false
    );
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(
        false
    );

    const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = React.useState(
        false
    );
    const [isSuccessInfoToolTip, setIsSuccessInfoToolTip] = React.useState(null);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [error, setError] = React.useState({ errorText: "", isActive: false });
    const [currentUser, setCurrentUser] = React.useState({});
    const [userEmail, setUserEmail] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");
    const [cards, setCards] = React.useState([]);
    const [cardToRemove, setCardToRemove] = React.useState({});
    const [isLoggedIn, setIsLoggedIn] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const history = useHistory();

    React.useEffect(() => {
        handleCheckToken();
        setIsSuccessInfoToolTip(false);
    }, []);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getCards()])
            .then(([userData, cards]) => {
                setCurrentUser(userData);
                setCards(cards);
            })
            .catch((err) => {
                setErrorPopup(err, true);
                setTimeout(() => setErrorPopup(err, false), 5000);
            });
    }, []);

    function handleUpdateUser(user) {
        setIsLoading(true);
        api
            .setUserInfo(user)
            .then((updatedUser) => {
                setCurrentUser({
                    ...currentUser,
                    name: updatedUser.name,
                    about: updatedUser.about,
                });
                closeAllPopups();
            })
            .catch((err) => {
                setErrorPopup(err, true);
                setTimeout(() => setErrorPopup(err, false), 5000);
            });
    }

    function handleUpdateAvatar({ avatar }) {
        checkImage(avatar)
            .then(() => {
                setIsLoading(true);
                api.changeAvatar(avatar).then((updatedUser) => {
                    setCurrentUser({ ...currentUser, avatar: updatedUser.avatar });
                    closeAllPopups();
                });
            })
            .catch(() => {
                setErrorPopup("Ошибка адреса", true);
                setTimeout(() => setErrorPopup("Ошибка адреса", false), 5000);
            });
    }

    function checkImage(link) {
        return new Promise((resolve, reject) => {
            const img = document.createElement("img");
            img.src = link;
            img.onload = resolve;
            img.onerror = reject;
            img.remove();
        });
    }

    function handleAddCard(card) {
        checkImage(card.link)
            .then(() => {
                setIsLoading(true);
                api.postCard(card).then((newCard) => {
                    setCards([newCard, ...cards]);
                    closeAllPopups();
                });
            })
            .catch(() => {
                setErrorPopup("Ошибка адреса", true);
                setTimeout(() => setErrorPopup("Ошибка адреса", false), 5000);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(
            (userWhoLiked) => userWhoLiked._id === currentUser._id
        );
        api
            .changeLikeCardStatus(card, !isLiked)
            .then((cardWithChangedLike) => {
                setCards(
                    cards.map((cardFromState) =>
                        cardFromState._id === card._id ? cardWithChangedLike : cardFromState
                    )
                );
            })
            .catch((err) => {
                setErrorPopup(err, true);
                setTimeout(() => setErrorPopup(err, false), 5000);
            });
    }

    function handleCardDelete(card) {
        setIsLoading(true);
        api
            .deleteCard(card)
            .then(() => {
                setCards(
                    cards.filter((cardFromState) => cardFromState._id !== card._id)
                );
                closeAllPopups();
            })
            .catch((err) => {
                setErrorPopup(err, true);
                setTimeout(() => setErrorPopup(err, false), 5000);
            });
    }

    function handleEditAvatarClick() {
        setIsLoading(false);
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsLoading(false);
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsLoading(false);
        setAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function confirmCardDelete(card) {
        setIsLoading(false);
        setCardToRemove(card);
        setConfirmDeletePopupOpen(true);
    }

    function closeInfoToolTipPopup() {
        closeAllPopups();
        if (isSuccessInfoToolTip) {
            handleLogin({ email: userEmail, password: userPassword });
        }
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setConfirmDeletePopupOpen(false);
        setInfoToolTipPopupOpen(false);
        setSelectedCard({});
        setCardToRemove({});
    }

    function setErrorPopup(err, active) {
        setError({ ...error, errorText: err, isActive: active });
    }


    React.useEffect(() => {
        function handleOverlayClick(evt) {
            if (evt.target.classList.contains("popup")) {
                if (isSuccessInfoToolTip) {
                    closeInfoToolTipPopup();
                } else {
                    closeAllPopups();
                }
            }
        }

        function handleEscapeClick(evt) {
            if (evt.key === "Escape") {
                if (isSuccessInfoToolTip) {
                    closeInfoToolTipPopup();
                } else {
                    closeAllPopups();
                }
            }
        }

        document.addEventListener("mousedown", handleOverlayClick);
        document.addEventListener("keyup", handleEscapeClick);

        return () => {
            document.removeEventListener("mousedown", handleOverlayClick);
            document.removeEventListener("keyup", handleEscapeClick);
        };
    }, [
        isSuccessInfoToolTip,
        isEditAvatarPopupOpen,
        isAddPlacePopupOpen,
        isEditProfilePopupOpen,
        selectedCard,
    ]);

    function handleCheckToken() {
        setIsLoading(true);
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            auth
                .checkToken(jwt)
                .then((res) => {
                    setUserEmail(res.data.email);
                    setIsLoggedIn(true);
                    setIsLoading(false);
                    history.push("/");
                })
                .catch(() => {
                    setIsSuccessInfoToolTip(false);
                    setInfoToolTipPopupOpen(true);
                });
        } else {
            setIsLoading(false);
            return;
        }
    }

    function handleRegister(data) {
        auth
            .register(data)
            .then((res) => {
                setUserEmail(res.data.email);
                setUserPassword(data.password);
                setIsSuccessInfoToolTip(true);
                setInfoToolTipPopupOpen(true);
            })
            .catch(() => {
                setIsSuccessInfoToolTip(false);
                setInfoToolTipPopupOpen(true);
            });
    }

    function handleLogin(data) {
        auth
            .login(data)
            .then((res) => {
                localStorage.setItem("jwt", res.token);
                handleCheckToken();
            })
            .catch(() => {
                setIsSuccessInfoToolTip(false);
                setInfoToolTipPopupOpen(true);
            });
    }

    function handleSignOut() {
        setIsLoggedIn(false);
        history.push("/sign-in");
        localStorage.removeItem("jwt");
        setUserEmail("");
        setUserPassword("");
        setIsSuccessInfoToolTip(null);
        setIsLoading(false);
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header
                    isLoggedIn={isLoggedIn}
                    userEmail={userEmail}
                    onSignOut={handleSignOut}
                    isLoading={isLoading}
                />
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        component={Main}
                        isLoggedIn={isLoggedIn}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={confirmCardDelete}
                    />

                    <Route path="/sign-up">
                        <Register
                            onRegister={handleRegister}
                        />
                    </Route>
                    <Route path="/sign-in">
                        <Login
                            onLogin={handleLogin}
                            isLoading={isLoading}
                        />
                    </Route>

                    <Route>
                        <Redirect to={!isLoggedIn ? "/sign-in" : "/"} />
                    </Route>
                </Switch>

                <Footer isLoggedIn={isLoggedIn} />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    isLoading={isLoading}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    isLoading={isLoading}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddCard}
                    isLoading={isLoading}
                />

                <ConfirmDeletePopup
                    isOpen={isConfirmDeletePopupOpen}
                    card={cardToRemove}
                    onClose={closeAllPopups}
                    onSubmitDelete={handleCardDelete}
                    isLoading={isLoading}
                />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                <ErrorPopup errorText={error.errorText} isActive={error.isActive} />

                <InfoToolTip
                    isOpen={isInfoToolTipPopupOpen}
                    onClose={closeInfoToolTipPopup}
                    isSuccess={isSuccessInfoToolTip}
                />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;