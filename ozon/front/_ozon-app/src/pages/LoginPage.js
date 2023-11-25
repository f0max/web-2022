import React, {useState} from 'react';
import '../styles/LoginPage.css';
import {BACKEND_URL} from "../contexts/provider";


function LoginPage() {

    const [log, setLog] = useState('');
    const [pass, setPass] = useState('');

    function Login() {
        const ob = {
            username: log,
            password: pass,
        }
        fetch(`${BACKEND_URL}/rest-auth/login/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
            body: JSON.stringify(ob),
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                const token = res.key;
                sessionStorage.setItem('token', token);

                fetch(`${BACKEND_URL}/rest-auth/user/`, {
                    headers: {
                        "Authorization": `Token ${sessionStorage.getItem('token')}`,
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        localStorage.setItem('user_id', data.pk)
                        localStorage.setItem('user_login', data.username)
                        localStorage.setItem('user_status', data.is_staff)

                        if (data.is_staff) {
                            window.location.replace("/managers")
                        } else {
                            window.location.replace("/")
                        }
                    })

            })
            .catch(function (reason) {
                window.location.replace("/login")
            })
    }

    return (
        <div className="register-block1">
            <h1 className="title-block">
                Вход
            </h1>
            <form className="form-block1">
                <div className="">
                    <label
                        htmlFor="login"
                        className="text-block331"
                    >
                        Логин
                    </label>
                    <input
                        type="login"
                        onChange={(event) => setLog(event.target.value)}
                        value={log}
                        className="input-block331"
                    />
                </div>
                <div className="">
                    <label
                        htmlFor="password"
                        className="text-block331"
                    >
                        Пароль
                    </label>
                    <input
                        type="password"
                        onChange={(event) => setPass(event.target.value)}
                        value={pass}
                        className="input-block331"
                    />
                </div>
            </form>
            <div className="log_in_btn">
                <button
                    className="action-block331"
                    onClick={() => Login()}
                >
                    Войти
                </button>
            </div>

            <p className="repage-block1">
                {" "}
                Отсутствует аккаунт?{" "}
                <br/>
                <a
                    href="/registration"
                    className="font-medium text-indigo-600 text-xl hover:underline"
                >
                    Зарегестрироваться
                </a>
            </p>
        </div>
    );
}


export default LoginPage;