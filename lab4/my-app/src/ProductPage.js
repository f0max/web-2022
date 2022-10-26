import {Link} from "react-router-dom";
import {useParams} from "react-router";

export const ProductPage = ({data}) =>{
    const {id} = useParams()
    const product = data.filter(product=>product.id === +id)
    return (
        product[0] ?
            <div>
                <Link to="/">Главная</Link><Link to="/catalog">/Каталог</Link><Link to={`/catalog/product/${product[0].id}`}>/{product[0].name}</Link>

                <div className="productInfo">
                    <p>Название: {product[0].name}</p>
                    <p>Категория: {product[0].category}</p>
                </div>
            </div>:
            <h1>Такого товара нет</h1>
    );
};