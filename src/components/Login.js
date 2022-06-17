import React from "react";
import AuthForm from "./AuthForm";
import CssLoader from "./CssLoader.js";

function Login({ onLogin, isLoading }) {

    return (
        <>
            <CssLoader isLoading={isLoading} />
            {!isLoading &&
                <AuthForm
                    title="Login"
                    name="login"
                    buttonSubmitText="Login"
                    onSubmit={onLogin}
                />
            }
        </>
    );
}

export default Login;