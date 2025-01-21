import React from 'react';
import { Link } from 'react-router-dom'; // Link bileşeni, sayfalar arası geçişi sağlar
import '../css/Home.css';

function Home() {
    return (
        <div className="home-container">
            <h2>Hoş Geldiniz!</h2>
            <div className="buttons-container">
                <Link to="/login">
                    <button className="home-button">Giriş Yap</button>
                </Link>
                <Link to="/register">
                    <button className="home-button">Kayıt Ol</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
