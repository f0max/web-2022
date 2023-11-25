import { Link } from 'react-router-dom';

function StartPage() {
    return (
        <div>
            {
                sessionStorage.getItem('token') ?
                    <div className={"start_page"}>Добро пожаловать {localStorage.getItem('user_login')}</div>
                    :
                    <div className={"start_page"}>Войдите в аккаунт</div>
            }
        </div>
    );
}

export default StartPage;