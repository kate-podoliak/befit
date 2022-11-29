import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Auth from "../../services/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="invalid-feedback d-block">
                Поле обов'язкове до заповнення.
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="invalid-feedback d-block">
                Некоректна електронна пошта.
            </div>
        );
    }
};

const vname = (value) => {
    if (value.length < 2 || value.length > 20) {
        return (
            <div className="invalid-feedback d-block">
                Ім'я повинне складатися від 2 символів.
            </div>
        );
    }
};

const vsurname = (value) => {
    if (value.length < 2 || value.length > 20) {
        return (
            <div className="invalid-feedback d-block">
                Фамілія повинна складатися від 2 символів.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="invalid-feedback d-block">
                Пароль повинен складатися від 6 символів.
            </div>
        );
    }
};

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const onChangeSurname = (e) => {
        const surname = e.target.value;
        setSurname(surname);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            Auth.register(name, surname, email, password).then((response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            }, (error) => {
                const resMessage = (error.response && error.response.data &&
                    error.response.data.message) || error.message || error.toString();
                setMessage(resMessage);
                setSuccessful(false);
            });
        }
    };

    return (
        <div className="form-box">
            <div className="form__content login-form">
                <div className='form__header'>
                    <h3 className='form__header__title title-yellow'>Реєстрація</h3>
                </div>
                <Form className='form__main' onSubmit={handleRegister} ref={form}>
                    <div className="input-boxes">
                        <div className='input-box'>
                            <Input
                                name="username"
                                placeholder="Введіть ім'я"
                                value={name}
                                onChange={onChangeName}
                                validations={[required, vname]}
                            />
                        </div>

                        <div className='input-box'>
                            <Input
                                type="text"
                                name="surname"
                                placeholder="Введіть фамілію"
                                value={surname}
                                onChange={onChangeSurname}
                                validations={[required, vsurname]}
                            />
                        </div>

                        <div className='input-box'>
                            <Input
                                type="text"
                                placeholder="Введіть email"
                                name="email"
                                value={email}
                                onChange={onChangeEmail}
                                validations={[required, validEmail]}
                            />
                        </div>

                        <div className='input-box'>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Введіть пароль"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required, vpassword]}
                            />
                        </div>

                        <div className='input-box form__submit'>
                            <button className="button">Зареєструватися</button>
                        </div>

                        {message && (
                            <div className="form-group">
                                <div
                                    className={
                                        successful ? "alert alert-success" : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}

                        <div className="text sign-up-text">Вже маєте акаунт?
                            <a href="/login">Авторизуйтесь!</a>
                        </div>
                        
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </div>
                </Form>
            </div>
        </div>
    );
};
export default Register;