import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import {useFormAndValidation} from "../utils/useFormAndValidation.js";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading }) {

    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

    React.useEffect(() => {
        resetForm({link:''});
    }, [isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({avatar: values.link});
    }

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="avatar"
            buttonSubmitText={isLoading? "Сохранение..." : "Сохранить"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonSubmitState={isValid}
        >
            <fieldset className="form_set">
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

export default EditAvatarPopup;