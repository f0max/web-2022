import { useParams } from "react-router-dom";
    import {useState, useEffect} from "react";
import {BACKEND_URL, GetOneProduct} from "../contexts/provider";
import "../styles/ProductPage.css"

function ProductPage() {
    const [count, setCount] = useState(1);
    const [price, setPrice] = useState();

    const params = useParams();
    const productId = params.id;
    const product = GetOneProduct(productId);

    const buy = (quantity, user, product) => {
        const ob = {
            quantity: quantity,
            id_user: user,
            id_product: product
        }
        fetch(`${BACKEND_URL}/cart/`, {
            method: "post",
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                console.log(JSON.stringify(ob));
            })
    }

    const HandleClick = () => {
        const ob = {
            id: productId,
            product_name: product.product_name,
            product_price: price,
            characteristics: product.characteristics,
            category: product.category
        }
        fetch(`${BACKEND_URL}/product/${productId}/`,{
            method : "put",
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                window.location.reload()
            });
    };

    const get_user=()=> {
        console.log()
        fetch(`${BACKEND_URL}/rest-auth/user/`, {
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.pk)
                setUser(data);
            })
    }

    const [user, setUser] = useState(
        {
            "pk": 1,
            "username": "",
            "email": "",
            "first_name": "",
            "last_name": ""
        }
    )

    useEffect( () => {
        get_user();
    }, [])


    return (
        <div>
            <a href="/">Главная/</a>
            <a href="/products">Каталог/</a>
            <a href={`/products/${productId}`}>{product.product_name}</a>

            <div className={"single_product_block"}>
                <div className={"single_proudct_title"}>{product.product_name}</div>
                <div className={"single_im_ds_block"}>
                    <img src={product.product_pic} className={"single_product_image"}></img>
                    <div className={"single_product_description"}>{product.characteristics}</div>
                </div>
                <div className={"single_pr_cart_block"}>
                    <div className={"single_product_cart"}>
                        {
                            localStorage.getItem('user_status') === "false" ?
                                <div>
                                    <button className="count_button" onClick={()=>setCount(count+1)}>+</button>
                                    <button className="count_button" onClick={() => {
                                        if (count > 1) {
                                            setCount(count - 1)
                                        }
                                    }
                                    }>-
                                    </button>
                                    <div>Количество: {count}</div>
                                    <input className={"single_product_btn"} id="buy_button" type="submit" value="В корзину" onClick={()=>{buy(count, localStorage.getItem('user_id'), productId)}}/>
                                </div>
                                :
                                <div></div>
                        }
                    </div>
                    <div className={"single_product_price"}>{product.product_price * count} ₽</div>
                    {
                        localStorage.getItem('user_status') === "true" ?
                            <div>
                                <input className="single_product_price"
                                       type="size"
                                       value={price}
                                       onChange={(event) => setPrice(event.target.value)}
                                />
                                <button onClick={HandleClick} className="action-block34">Изменить</button>
                            </div>
                            :
                            <div></div>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default ProductPage;