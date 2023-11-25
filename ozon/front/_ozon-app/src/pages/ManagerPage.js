import React from "react";
import {GetPurchases} from "../contexts/provider";
import {Link} from "react-router-dom";
import "../styles/ManagerPage.css";


function ManagerPage() {
    //Статусы заказа: 1 - в ожидании; 2 - доставляется; 3 - отклонен; 4 - отменен.
    return(
        <div>
            <a href={`/`}>Главная/</a>
            <a href = {'/managers'}>Заказы/</a>
            <br />
            {GetPurchases().map(purchase=>(
                <div key = {purchase.id} className="manager_purchase_block">
                    <h1>Заказ №{purchase.id}</h1>
                    <div className="in_line_status">Статус заказа: &nbsp;
                        {
                            purchase.status == 1 ?
                                <div className="in_line_status">в ожидании</div>
                                :
                                purchase.status == 2 ?
                                    <div className="in_line_status">доставляется</div>
                                    :
                                    purchase.status == 3 ?
                                        <div className="in_line_status">отклонён</div>
                                        :
                                        purchase.status == 4 ?
                                            <div className="in_line_status">отменен</div>
                                            :
                                            <div className="in_line_status">доставлен</div>
                        }
                    </div>
                    <Link className="purchase_link" to={`/manager/${purchase.id}`}>К заказу</Link>
                </div>
            ))}
        </div>
    );
}

export default ManagerPage;