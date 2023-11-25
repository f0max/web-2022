import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import StartPage from "./pages/StartPage";
import ProductPage from "./pages/ProductPage";
import "./App.css";
import { ProductsProvider } from "./contexts";
import Navigation from "./pages/Navigation";
import CartPage from "./pages/CartPage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import PurchasePage from "./pages/PurchasePage";
import ManagerPage from "./pages/ManagerPage";
import ProductManagingPage from "./pages/ProductManagingPage";

function App() {

    return (
        <div className="App">
            <BrowserRouter basename="/" >
                <Navigation />
                <Switch>
                    <Route exact path="/"><StartPage /></Route>

                    <Route path="/cart"><CartPage /></Route>

                    <Route path="/products">
                        <ProductsProvider>
                            <SearchPage />
                        </ProductsProvider>
                    </Route>

                    <Route path="/product/:id">
                        <ProductsProvider>
                            <ProductPage />
                        </ProductsProvider>
                    </Route>

                    <Route path="/login"><LoginPage /></Route>

                    <Route path="/registration"><RegistrationPage /></Route>

                    <Route path="/purchase"><PurchasePage /></Route>

                    <Route path="/managers"><ManagerPage /></Route>

                    <Route path="/manager/:id"><ProductManagingPage /></Route>

                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;