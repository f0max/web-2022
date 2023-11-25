import React from "react";
import {Link} from "react-router-dom";
import {GetCart, GetProducts} from "../contexts/provider";
import "../styles/CartPage.css";
import {BACKEND_URL} from "../contexts/provider"


function CartPage() {
    const products = GetProducts()
    const cart = GetCart(localStorage.getItem('user_id'))

    const buy=()=> {
        let order;
        const se = {
            user: localStorage.getItem('user_id'),
            status: 1,
        }
        fetch(`${BACKEND_URL}/sell/`, {
            method: "post",
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(se)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                order = res.id
            })

        setTimeout(() => {
            cart.map(cart => {
                const ob = {
                    sell: order,
                    product: cart.id_product,
                    quantity: cart.quantity,
                }
                fetch(`${BACKEND_URL}/purchase/`, {
                    method: "post",
                    headers: {
                        "Authorization": `Token ${sessionStorage.getItem('token')}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(ob)
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                    })
                del(cart.id)
            })
        }, 50);
    }

    const del=(cartID)=> {
        fetch(`${BACKEND_URL}/cart/${cartID}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.ok) {
                    console.log("HTTP request done");
                    window.location.reload();
                } else {
                    console.log("HTTP request error");
                }
            })

    }

    return (
        <div>
            <a href="/" className="breadcrumbs">Главная/</a>
            <a href="/cart" className="breadcrumbs">Корзина</a>
            <div className="cart_block">
                {cart.map(cart =>
                    <div>
                        <div key = {cart.id_product} className="cart_line">
                            <div className="cart_image_block">
                                <Link to={`/product/${products[cart.id_product - products[0].id].id}`}>
                                    <img className="cart_image" src={`${products[cart.id_product - products[0].id].product_pic}`} />
                                </Link>
                            </div>
                            <div className="cart_title_block">
                                <Link className="cart_title" to={`/product/${products[cart.id_product - products[0].id].id}`}>
                                    {products[cart.id_product - products[0].id].product_name}
                                </Link>
                            </div>
                            <div className="cart_price_block">
                                <div className="cart_price">
                                    {products[cart.id_product - products[0].id].product_price * cart.quantity} ₽
                                </div>
                            </div>
                            <div className="cart_quantity">
                                {cart.quantity} шт.
                            </div>
                            <div className="cart_delete_block">
                                <input id="buy_button" className="delete_button" type="submit" value="Удалить" onClick={()=>{del(cart.id)}}/>
                            </div>
                        </div>
                        <hr/>
                    </div>)}
                    <div className="cart_buy_block">
                        <button className="cart_buy_button" onClick={()=>{buy()}}>Купить</button>
                    </div>
            </div>
        </div>
    );
}
export default CartPage;