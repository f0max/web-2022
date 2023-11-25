import { Link } from "react-router-dom";
import { GetProducts } from "../contexts/provider";

function AllProductsPage() {
    return (
        <div>
            <a href="/" className="breadcrumbs">Главная </a>
            <a href="/products" className="breadcrumbs">- Каталог </a>

            <div className="links">
                {GetProducts().map(product =>
                    <div className="product_block" key={product.id}>
                        <Link className="product_link" to={`/product/${product.id}`}>{product.product_name}</Link><br/>
                        <img src={product.product_pic}/>
                        <div className="product_price">{product.product_price}₽</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllProductsPage;