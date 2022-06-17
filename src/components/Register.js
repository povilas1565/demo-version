import React from "react";
import AuthForm from "./AuthForm";

function Register({ onRegister }) {

    return (
        <AuthForm
            title="Sign in"
            name="register"
            buttonSubmitText="Registration"
            onSubmit={onRegister}
        />
    );
}

export default Register;