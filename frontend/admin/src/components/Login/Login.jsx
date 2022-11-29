import React, {useState} from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

const initialState = {
    email: "", password: ""
};

const Login = () => {
    const [data, setData] = useState(initialState);
    const [message, setMessage] = useState("");

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleLogin = async () => {
        if (!data.email && !data.password) {
            setMessage("Будь ласка, введіть електронну пошту або пароль.");
        } else {
            return await axios.post("http://localhost:8081/api/auth/signin", {
                email: data.email,
                password: data.password
            }).then(response => {
                if (response.data.role == "ADMIN") {
                    localStorage.setItem("admin", JSON.stringify(response.data));
                    window.location.href = "/admin/home";
                } else {
                    setMessage("Доступ до ресурсів адміністратора заборонено.");
                }
            }).catch(error => {
                setMessage(error.response.data.message);
            });
        }
    }

    return (
        <>
            <div className="form-box">
                <div className="form__content login-form">
                    <div className='form__header'>
                        <h3 className='form__header__title'>Авторизація адміністратора</h3>
                    </div>
                    <Form className='form__main'>
                        <div className="input-boxes">
                            <div className='input-box'>
                                <input
                                    type="email" id="email" name="email" placeholder="Email" value={data.email}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div className='input-box'>
                                <input type="password" id="password" name="password" placeholder="Пароль"
                                       value={data.password} onChange={handleChangeInput}/>
                            </div>
                            <div className='input-box form__submit'>
                                <Button className="button" variant="primary" value="Увійти" onClick={handleLogin}
                                        type="button">
                                    Увійти
                                </Button>
                            </div>
                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
};

export default Login;