import React, { useState } from 'react';
import '../css/Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Giriş işlemleri yapılacak (API çağrısı vs.)
        if (username === '' || password === '') {
            setError('Lütfen tüm alanları doldurun');
            return;
        }

        setError('');
        console.log("Giriş Başarılı", { username, password });
    };

    return (
        <div className="form-container">
            <h2>Giriş Yap</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Kullanıcı Adı:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Şifre:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Giriş Yap</button>
            </form>
        </div>
    );
}

export default Login;
