import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Auth from "../../services/auth";

const required = (value) => {
    if (!value) {
        return (
            <p className="invalid-feedback d-block block-invalid">
                Поле обов'язкове.
            </p>
        );
    }
};

const Login = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            Auth.login(email, password).then(() => {
                navigate("/profile");
                window.location.reload();
            }, (error) => {
                const resMessage = (error.response && error.response.data &&
                    error.response.data.message) || error.message || error.toString();
                setLoading(false);
                setMessage(resMessage);
            });
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="form-box">
            <div className="form__content login-form">
                <div className='form__header'>
                    <h3 className='form__header__title title-yellow'>Авторизація</h3>
                </div>
                <Form className='form__main' onSubmit={handleLogin} ref={form}>
                    <div className="input-boxes">
                        <div className='input-box'>
                            <Input
                                type="text"
                                name="email"
                                placeholder="Введіть Email"
                                value={email}
                                onChange={onChangeEmail}
                                validations={[required]}
                            />
                        </div>

                        <div className='input-box'>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Введіть пароль"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required]}
                            />
                        </div>

                        <div className='input-box form__submit'>
                            <button className="button" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"/>
                                )}
                                <span>Увійти</span>
                            </button>
                        </div>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                        <div className="text sign-up-text">Ще не має акаунту?
                            <a href="/registration">Створіть акаунт зараз!</a>
                        </div>
                        
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;