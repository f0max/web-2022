import React from "react";
import {GetOnePurchase, GetBuys} from "../contexts/provider";
import "../styles/PurchasePage.css"
import {Link, useParams} from "react-router-dom";
import {BACKEND_URL} from "../contexts/provider";


function PurchasePage() {
    const userID = localStorage.getItem('user_id');
    const sell = GetBuys();
    const sells = GetOnePurchase(userID);

    const cancel = (sellID) => {
        const ob = {
            id: sellID,
            user: userID,
            status: 4
        }
        fetch(`${BACKEND_URL}/sell/${sellID}/`, {
            method: "put",
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                window.location.replace("/purchase")
            })
    }

    return (
        <div>
            <div className="bread">
                <a href={`/`}>Главная/</a>
                <a href = {'/purchase'}>Заказы</a>
            </div>
            <div className="purchases_block">
                {sells.map(sells =>
                    <div key = {sells.id} className="purchase_row">
                        <div className="purchase">Заказ №{sells.id}</div>
                        <div>Статус заказа: &nbsp;
                            {
                                sells.status == 1 ?
                                    <div className="status">в ожидании</div>
                                    :
                                    sells.status == 2 ?
                                        <div className="status">доставляется</div>
                                        :
                                        sells.status == 3 ?
                                            <div className="status">отклонен</div>
                                            :
                                            sells.status == 4 ?
                                                <div className="status">отменен</div>
                                                :
                                                <div className="status">доставлен</div>
                            }
                        </div>
                        <div className="purchase_block">
                            {sell.map(sell =>
                                <div>
                                    {
                                        sells.id == sell.sell ?
                                            <div key={sell.sell} className="m_purchases_block">
                                                <div className="purchase_image_block">
                                                    <Link to={`/product/${sell.product}`}>
                                                        <img className="purchase_image" src={`${BACKEND_URL}/media/${sell.product_pic}`} />
                                                    </Link>
                                                </div>
                                                <div className="purchase_title_block">{sell.product_name}</div>
                                                <div className="purchase_price_block">Цена: {sell.product_price * sell.quantity} ₽</div>
                                                <div className="purchase_quantity_block">Количество: {sell.quantity} шт.</div>
                                            </div>
                                            :
                                            <div></div>
                                    }
                                </div>
                            )}
                        </div>
                        <div>
                            {
                                sells.status === 1 ?
                                    <button className="purchase_decline_button" onClick={() => {cancel(sells.id)}}>Отменить заказ</button>
                                    :
                                    <div></div>
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    )};
export default PurchasePage;