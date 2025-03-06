import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };
  const handleChatClick = () => {
    navigate("/chat");
  };

  return (
    <div className="home-page">
      <header className="header">
        <div className="logo">Gen-Z Forum</div>
        <nav className="main-nav">
          <ul>
            <li><a href="#news">Haberler</a></li>
            <li><a href="#reviews">Yorumlar</a></li>
            <li><a href="#guides">Kılavuzlar</a></li>
            <li><a href="#forums">Forumlar</a></li>
            <li>
              <button 
                className="chat-button" 
                onClick={() => {handleChatClick();}}
              >
                {showChat ? 'Sohbeti Kapat' : 'Sohbet'}
              </button>
            </li>
          </ul>
        </nav>
        <div className="auth-section">
          <div className="auth-buttons">
            <button className="btn" onClick={handleLoginClick}>Giriş Yap</button>
            <button className="btn" onClick={handleRegisterClick}>Kayıt Ol</button>
          </div>
          <div className="profile-logo" onClick={handleProfileClick}>
            <img src="src/image/profile.jpeg" alt="Profile" />
          </div>
        </div>
      </header>

      <main className="content">
        <aside className="sidebar">
          <h2>Kategoriler</h2>
          <ul>
            <li><a href="#technology">Teknoloji</a></li>
            <li><a href="#gaming">Oyun</a></li>
            <li><a href="#hardware">Donanım</a></li>
            <li><a href="#software">Yazılım</a></li>
            <li><a href="#mobile">Mobil</a></li>
          </ul>
        </aside>

        <section className="forum-topics">
          <h1>Öne Çıkan Konular</h1>
          <div className="topics-list">
            <div className="topic-card">
              <h2>Hoş Geldiniz!</h2>
              <p>Gen-Z Forum'a hoş geldiniz. Sohbet özelliğimizi kullanarak diğer üyelerle iletişime geçebilirsiniz.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Gen-Z Forum</p>
      </footer>
    </div>
  );
};

export default Home;