import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Link to="/">Главная</Link>
            <h1 className="title">Ozon</h1>
            <Link to='/catalog'>Каталог</Link>
        </div>
    );
}

export default Home;