import React, { useState } from 'react';
import "./Clicker.css"

function Click() {
    // Объявление новой переменной состояния «count»
    const [count, setCount] = useState(0);
    return (
        <div>
            <button className="btn" onClick={() => setCount(count + 1)}>{count}</button>
            <button className="btn" onClick={() => setCount(0)}>Сброс счетчика</button>
        </div>
    );
}

export default Click;