import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Click from "./Clicker";
import Home from "./HomePage";
import Catalog from "./Catalog";
import "./App.css"

function App() {

    return (
        <BrowserRouter basename="/" >
            <div>
                <ul>
                    <li>
                        <Link to="/">Старт</Link>
                    </li>
                    <li>
                        <Link to="/catalog">Каталог</Link>
                    </li>
                    <li>
                        <Link to="/click">Клик-клак</Link>
                    </li>
                </ul>
                <hr />
                <Switch>
                    <Route exact path="/">
                        <Home></Home>
                    </Route>
                    <Route path="/catalog">
                        <Catalog></Catalog>
                    </Route>
                    <Route path="/click">
                        <Click></Click>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;