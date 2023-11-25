import {GetBuys} from "../contexts/provider";
import React from "react";
import {Link, useParams} from "react-router-dom";
import "../styles/ManagerPage.css"
import {BACKEND_URL} from "../contexts/provider";

function ProductManagingPage() {
    const params = useParams()
    const buyId = params.id
    const userID = localStorage.getItem('user_id')
    const buys = GetBuys()

    let id_user, sell_date, order_status
    for (const [key, value] of Object.entries(buys)) {
        if (value.sell != buyId) {
            delete buys[key];
        } else {
            id_user = value.user
            sell_date = value.sell_date
            order_status = value.status
        }
    }

    function change_status(status) {
        const ob = {
            id: buyId,
            user: userID,
            status: status
        }
        fetch(`${BACKEND_URL}/sell/${buyId}/`, {
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
                window.location.replace(`/manager/${buyId}`)
            })
    }

    return(
        <div>
            <a href={`/`}>Начало/</a>
            <a href={'/managers'}>Заказы/</a>
            <a href={`/manager/${buyId}`}>Заказ №{buyId}</a>
            <br />
            <div>
                <h2>Заказ: №{buyId}</h2>
                {
                    order_status == 1 ?
                        <h3>Статус: в ожидании</h3>
                        :
                        order_status == 2 ?
                            <h3>Статус: доставляется</h3>
                            :
                            order_status == 3 ?
                                <h3>Статус: отклонен</h3>
                                :
                                order_status == 4 ?
                                    <h3>Статус: отменен</h3>
                                    :
                                    <h3>Статус: доставлен</h3>

                }
                {buys.map(buy => (
                    <div key = {buy.id} className="manga_block3">
                        <div className="image_wrapper">
                            <Link to={`/product/${buy.product}`}>
                                <img className="single_product_image" src={`${BACKEND_URL}/media/${buy.product_pic}`} />
                            </Link>
                        </div>
                        <div className="manga_link" >
                            <div>{buy.product_name}</div>
                            <div>Цена: {buy.product_price * buy.quantity} ₽</div>
                            <div>Количество: {buy.quantity} шт.</div>
                        </div>
                    </div>
                ))}
            </div>

            {
                order_status === 1 ?
                    <div>
                        <button className="action-block34" onClick={()=>change_status(2)}>В доставку</button>
                        <button className="action-block34" onClick={()=>change_status(3)}>Отклонить</button>
                    </div>
                    :
                    order_status === 2 ?
                        <button className="action-block34" onClick={()=>change_status(5)}>Доставлен</button>
                        :
                        <div></div>
            }

        </div>
    );
}

export default ProductManagingPage;