import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ReactSlider from "react-slider";
import "../styles/SearchPage.css";
import {BACKEND_URL} from "../contexts/provider";


function  SearchPage() {
    const [search_input, set_search_input] = useState(''); //значение для поиска, вводимое пользователем
    const [products, setProducts] = useState([]); //список моделей, которые отображаются на странице
    const [minPrice, setMinPrice] = useState(0); //значение текущей минимальной цены в фильтре
    const [maxPrice, setMaxPrice] = useState(70000); //значение текущей максимальной цены в фильтре

    const [minrice, setMinrice] = useState();
    const [maxrice, setMaxrice] = useState();

    //запрос списка моделей с учётом фильтрации
    const getProducts = () => {
        const response = fetch(`${BACKEND_URL}/product/?product_name=${search_input}&product_price_min=${minPrice}&product_price_max=${maxPrice}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
    }


    const GetPrices = () => {
        fetch(`${BACKEND_URL}/minmax/`)
            .then(response => response.json())
            .then(data => {
                setMinrice(data[0].product_price__min)
                setMaxrice(data[0].product_price__max)
                setMinPrice(data[0].product_price__min)
                setMaxPrice(data[0].product_price__max)
            })

    }


    useEffect( () => {
        getProducts()
        GetPrices()
    }, [])


    const filteredProducts = products.filter(product => {
        return product.product_name.toLowerCase().includes(search_input.toLowerCase())
    })

    return (
        <div className="search_body">
            <div className="search_slider_block">
                <div className="bread">
                    <a href="/">Главная/</a>
                    <a href="/products">Товары/</a>
                </div>
                <form className="search_form">
                    <input type={"text"} placeholder={"Поиск"} className={"search_input"}
                           value={search_input}
                           onChange={(event) => set_search_input(event.target.value)}/>
                </form>

                <div className={'search_filter'}>
                    <ReactSlider
                        value={[minPrice, maxPrice]}
                        min={minrice} max={maxrice}
                        trackClassName="tracker"
                        minDistance={50}
                        step={50}
                        withTracks={true}
                        pearling={true}
                        renderThumb={(props) => {
                            return <div {...props} className="thumb"></div>;
                        }}
                        renderTrack={(props) => {
                            return <div {...props} className="track"></div>;
                        }}
                        onChange={([minPrice, maxPrice]) => {
                            setMinPrice(minPrice);
                            setMaxPrice(maxPrice);
                            const response = fetch(`${BACKEND_URL}/product/?product_name=${search_input}&product_price_min=${minPrice}&product_price_max=${maxPrice}`)
                                .then(response => response.json())
                                .then(data => {
                                    setProducts(data);
                                })
                        }}
                    />
                    <div className={'values-wrapper'}>
                        <p>
                            Min:
                            <span> {minPrice} ₽</span>
                        </p>
                        <p>
                            Max:
                            <span> {maxPrice} ₽</span>
                        </p>
                    </div>
                </div>
                <p></p>
            </div>
            <div className="search_row">
                {filteredProducts.map(product=>(
                    <div key={product.id} className="search_block">
                        <div>
                            <Link to={`/product/${product.id}`}>
                                <img className="search_image" src={`${product.product_pic}`} />
                            </Link>
                        </div>
                        <Link className="search_link" to={`/product/${product.id}`}>{product.product_name} | {Number(product.product_price)} ₽</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;