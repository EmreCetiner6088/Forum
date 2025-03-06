import React, { useEffect, useState } from "react";
import "../css/Profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface UserData {
  username: string;
  email: string;
}

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/auth/userinfo', {
          withCredentials: true
        });

        if (response.data) {
          const [username, email] = response.data.split(" ");
          setUserData({ username, email });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError("Kullanıcı bilgileri yüklenirken bir hata oluştu");
        setLoading(false);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout', {}, {
        withCredentials: true
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>Profilim</h1>
      {userData ? (
        <div className="profile-info">
          <p>
            <strong>Kullanıcı Adı:</strong> {userData.username}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <button onClick={handleLogout} className="logout-btn">Çıkış Yap</button>
        </div>
      ) : (
        <p>Profil bulunamadı.</p>
      )}
    </div>
  );
};

export default Profile;
