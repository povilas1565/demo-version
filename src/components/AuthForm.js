import React from "react";
import { Link, useLocation } from "react-router-dom";
import {useFormAndValidation} from "../utils/useFormAndValidation.js";

function AuthForm({
                      title,
                      name,
                      buttonSubmitText,
                      onSubmit,
                  }) {
    const location = useLocation();
    const isLocationSignUp = location.pathname === "/sign-up";
    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

    React.useEffect(() => {
        resetForm();
    }, []);

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit({email: values.email, password: values.password})
    }

    return (
        <div className="auth page_container appear">
            <h2 className="title title_place_auth">{title}</h2>

            <form
                className="form"
                name={`form-edit-${name}`}
                onSubmit={handleSubmit}
                noValidate
            >
                <fieldset className="form_set">
                    <label className="form_field">
                        <input
                            type="email"
                            name="email"
                            value={values.email || ""}
                            placeholder="Email"
                            className={`form_input form_input_type_auth ${errors.email ? 'form_input_type_error' : ''}`}
                            required
                            minLength="2"
                            maxLength="40"
                            onChange={handleChange}
                        />
                        <span className={`form_input-error ${errors.email ? 'form_input-error_active' : ''}`}>{errors.email}</span>
                    </label>
                    <label className="form_field">
                        <input
                            type="password"
                            name="password"
                            value={values.password || ""}
                            placeholder="Пароль"
                            className={`form_input form_input_type_auth ${errors.password ? 'form_input_type_error' : ''}`}
                            required
                            minLength="8"
                            maxLength="40"
                            onChange={handleChange}
                        />
                        <span className={`form_input-error ${errors.password ? 'form_input-error_active' : ''}`}>{errors.password}</span>
                    </label>
                </fieldset>

                {
                    <button
                        type="submit"
                        className={`form_btn-submit form_btn-submit_type_auth ${!isValid ? "form_btn-submit_inactive" : ""}`}
                        disabled={!isValid ? true : ""}
                    >
                        {buttonSubmitText}
                    </button>
                }
                {isLocationSignUp && (
                    <div className="form_auth-container">
                        <p className="form_auth-text">Уже зарегистрированы?&nbsp;</p>
                        <Link className="form_auth-link" to={"/sign-in"}>Войти</Link>
                    </div>
                )}
            </form>
        </div>
    );
}

export default AuthForm;