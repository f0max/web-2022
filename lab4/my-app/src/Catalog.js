import {useEffect, useState} from "react";

const data = [
    'Еда',
    'Мебель',
    'Электроника',
];

function Catalog() {
    // типо каталог в виде выпадающего списка
    const [categories, setCategories] = useState(data);

    const [showProducts, setShowProducts] = useState(true);

    const handleSwitch = () => {
        setShowProducts(state => !state)
    }

    useEffect(() => {
        setCategories(categories=>[...categories])
    }, [])

    return (
        <div className="container">
            <h2 className="title">Каталог</h2>
            <button className="btn" onClick={handleSwitch}>{showProducts ? 'Свернуть' :'Развернуть'}</button>
            {showProducts && <ul>
                {categories.map((category, index) => {
                    return (
                        <li>
                            <h3 className="title">{category}</h3>
                        </li>
                    )
                })}
            </ul>
            }
        </div>
    );
};

export default Catalog;