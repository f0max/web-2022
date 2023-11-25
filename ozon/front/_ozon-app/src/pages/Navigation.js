import React, {useContext, useState} from "react"
import "../styles/Navigarion.css"
import logo from "../OZON_2019.svg";
import {BACKEND_URL} from "../contexts/provider";

export const FRONT_URL = "http://127.0.0.1:3000";

function NavigationBar () {
    const unauthorize = () =>{

        fetch(`${BACKEND_URL}/rest-auth/logout/`, {
            method: "post",
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                sessionStorage.removeItem('token')
                localStorage.removeItem('user_id')
                localStorage.removeItem('user_login')
                localStorage.removeItem('user_status')
                window.location.replace(`${FRONT_URL}/login`);
            })
            .catch(function (reason) {
                console.log(reason);
            })
    }

    return (
        <div className="navigation">
            <a className="nav_logo" src={logo} href="/">
                <img className="logo" src={logo}/>
            </a>
            <a className="nav_home" aria-current="page" href="/">Главная</a>
            <a className="nav_home " href="/products">Товары</a>
            {
                sessionStorage.getItem('token') ?
                    localStorage.getItem('user_status') == "false" ?
                        <a className="nav_home" href="/cart">Корзина</a>
                        :
                        <div className={"nav_home"}></div>
                    :
                    <div className={"nav_home"}></div>
            }
            {
                sessionStorage.getItem('token') ?
                    localStorage.getItem('user_status') == "true" ?
                        <a className="nav_home" href="/managers">Заказы</a>
                        :
                        <a className="nav_home" href="/purchase">Мои заказы</a>
                    :
                    <div className={"nav_home"}></div>
            }
            {
                sessionStorage.getItem('token') ?
                    <div className={"nav_home"}>
                        {/*<div className="user_text">{localStorage.getItem('user_login')}</div>*/}
                        {localStorage.getItem('user_login')}
                        <input className="nav_log_in"
                               id="buy_button3"
                               type="submit" value="Выйти"
                               onClick={unauthorize}
                        />
                    </div>
                    :
                    <div className={"nav_home"}>
                        <a href={`${FRONT_URL}/login`}>
                            <input className="nav_log_in"
                                   id="buy_button2"
                                   type="submit" value="Войти"
                            />
                        </a>
                    </div>
            }
        </div>
    );
}

export default NavigationBar;