import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import {useFormAndValidation} from "../utils/useFormAndValidation.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

    React.useEffect(()=> {
        resetForm({title:'', link:''});
    },[isOpen])

    function handleAddPlaceSubmit(evt) {
        evt.preventDefault();
        onAddPlace({ name:values.title, link:values.link });
    }

    return (
        <PopupWithForm
            title="Новое место"
            name="card"
            buttonSubmitText={isLoading? "Добавление..." : "Сохранить"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddPlaceSubmit}
            buttonSubmitState={isValid}
        >
            <fieldset className="form_set">
                <label className="form_field">
                    <input
                        type="text"
                        name="title"
                        value={values.title || ""}
                        placeholder="Название"
                        className={`form_input ${errors.title ? 'form_input_type_error' : ''}`}
                        required
                        minLength="2"
                        maxLength="30"
                        onChange={handleChange}
                    />
                    <span className={`form_input-error ${errors.title ? 'form_input-error_active' : ''}`}>{errors.title}</span>
                </label>
                <label className="form_field">
                    <input
                        type="url"
                        name="link"
                        value={values.link || ""}
                        placeholder="Ссылка на картинку"
                        className={`form_input ${errors.link ? 'form_input_type_error' : ''}`}
                        required
                        onChange={handleChange}
                    />
                    <span className={`form_input-error ${errors.link ? 'form_input-error_active' : ''}`}>{errors.link}</span>
                </label>
            </fieldset>
        </PopupWithForm>
    );
}

export default AddPlacePopup;