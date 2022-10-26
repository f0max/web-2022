import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { products_data, data } from "./ProductsDict";

function Catalog() {
    // типо каталог в виде выпадающего списка
    // const [categories, setCategories] = useState(data);
    const [products, setProducts] = useState(products_data);

    const [showProducts, setShowProducts] = useState(true);

    const handleSwitch = () => {
        setShowProducts(state => !state)
    }

    useEffect(() => {
        // setCategories(categories=>[...categories])
        setProducts(products => [...products])
    }, [])

    return (
        <div className="container">
            <Link to="/">Главная</Link><Link to="/catalog">/Каталог</Link>
            <h2 className="title">Каталог</h2>
            <button className="btn" onClick={handleSwitch}>{showProducts ? 'Свернуть' :'Развернуть'}</button>
            {showProducts && <ul>
                {products.map((product, index) => {
                    return (
                        <li>
                            {/*<Link to={`/click/${category}`}>{category}</Link>*/}
                            <Link to={`/product/${product.id}`}>{product.name}</Link>
                        </li>
                    )
                })}
            </ul>
            }
        </div>
    );
};

export default Catalog;