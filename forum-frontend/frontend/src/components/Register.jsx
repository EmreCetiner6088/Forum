import React, { useState } from 'react';
import '../css/Register.css';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            name: username,
            email: email,
            password: password
          };
      
          try {
            // POST isteği gönderme
            const response = await axios.post('/students', user); // Backend URL
            console.log('Response:', response.data);
            alert('Kayıt başarıyla oluşturuldu!');
          } catch (error) {
            console.error('Error during registration:', error);
            alert('Kayıt sırasında bir hata oluştu.');
          }
    };



    return (
        <div className="form-container">
            <h2>Kayıt Ol</h2>
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
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div className="form-group">
                    <label>Şifreyi Tekrar Girin:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Kayıt Ol</button>
            </form>
        </div>
    );
}

export default Register;
