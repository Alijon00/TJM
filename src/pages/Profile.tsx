import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = ({ currentUser, setCurrentUser }: any) => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const targetLogin = id || currentUser?.login;

  const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");
  const userData = getUsers().find((u: any) => u.login === targetLogin) || {};

  const [editForm, setEditForm] = useState({
    name: userData?.fullName || userData?.name || "",
    birthDate: userData?.birthDate || "",
    location: userData?.location || "Dushanbe, Tajikistan",
    specialization: userData?.specialty || userData?.specialization || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    telegram: userData?.telegram || "",
  });

  useEffect(() => {
    if (userData) {
      setEditForm({
        name: userData?.fullName || userData?.name || "",
        birthDate: userData?.birthDate || "",
        location: userData?.location || "Dushanbe, Tajikistan",
        specialization: userData?.specialty || userData?.specialization || "",
        email: userData?.email || (targetLogin ? `${targetLogin.toLowerCase()}@tj-iss.gov` : ""),
        phone: userData?.phone || "",
        telegram: userData?.telegram || "",
      });
    }
  }, [targetLogin, isEditing, userData]);

  if (!currentUser) return <div className="error-denied">ДОСТУП ЗАПРЕЩЕН: АВТОРИЗУЙТЕСЬ</div>;

  const handleSave = () => {
    const allUsers = getUsers();
    const updatedUser = {
      ...userData,
      ...editForm,
      fullName: editForm.name,
      specialty: editForm.specialization,
      login: targetLogin,
    };

    const newUsersList = allUsers.map((u: any) => u.login === targetLogin ? updatedUser : u);
    localStorage.setItem("users", JSON.stringify(newUsersList));

    if (targetLogin === currentUser.login) {
      localStorage.setItem("tj_session", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
    }

    setIsEditing(false);
    window.dispatchEvent(new Event("storage"));
  };

  const isOwnProfile = !id || id.toLowerCase() === currentUser.login.toLowerCase();

  return (
    <div className="profile-page">
      <div className="terminal-header">
        <span className="blink-dot"></span>
        <h2>БИОМЕТРИЧЕСКИЙ ПРОФИЛЬ // ID: {targetLogin?.toUpperCase()}</h2>
      </div>

      <div className="profile-grid">
        <aside className="profile-sidebar-inner">
          
          <div className="profile-main-info" style={{ marginTop: '0' }}>
            <h2 className="profile-name">{userData.fullName || userData.name || targetLogin}</h2>
          </div>

          <div className="profile-info-block terminal-border">
            <div className="info-line"><span>LOC:</span> {userData.location || "Dushanbe, Tajikistan"}</div>
            <div className="info-line"><span>BORN:</span> {userData.birthDate || "21.03.1998"}</div>
            <div className="info-line"><span>MAIL:</span> {userData.email || "—"}</div>
            <div className="info-line"><span>TEL:</span> {userData.phone || "NONE"}</div>
            <div className="info-line"><span>TG:</span> {userData.telegram || "@user"}</div>
            <div className="info-line highlight-cyan"><span>REG:</span> 19.03.2026</div>
          </div>

          {isOwnProfile && (
            <button className="primary-btn edit-trigger" onClick={() => setIsEditing(true)}>
              РЕДАКТИРОВАТЬ ПРОФИЛЬ
            </button>
          )}
        </aside>

        <section className="profile-main-area">
          <div className="profile-stats-row">
            <div className="stat-box terminal-border">
              <label>СПЕЦИАЛИЗАЦИЯ</label>
              <div className="stat-value green-text">{userData.specialty || userData.specialization || "НЕ УКАЗАНО"}</div>
              <div className="terminal-corner c-tr"></div>
            </div>
            <div className="stat-box terminal-border">
              <label>РЕЙТИНГ ПОДГОТОВКИ (STAGE I)</label>
              <div className="stat-value cyan-text">{userData.score !== undefined ? `${userData.score}%` : "0%"}</div>
              <div className="terminal-corner c-tr"></div>
            </div>
          </div>

          <div className="activity-section terminal-border">
            <h3 className="section-label">БИОМЕТРИЧЕСКИЙ МОНИТОРИНГ (REAL-TIME)</h3>
            <div className="profile-graph-box" style={{ position: "relative", overflow: "hidden", height: "150px", background: "#000" }}>
              <div className="pulse-container">
                <svg width="100%" height="100" style={{ stroke: "var(--accent)", strokeWidth: 2, fill: "none" }}>
                  <polyline points="0,50 40,50 50,20 60,80 70,50 120,50 130,10 140,90 150,50 200,50 210,45 220,55 230,50 300,50" className="pulse-line" />
                </svg>
              </div>
              <div className="scanline"></div>
              <div style={{ position: "absolute", bottom: "10px", left: "10px", fontSize: "0.6rem", color: "var(--accent)" }}>
                BPM: 72 | SPO2: 98% | STRESS: LOW
              </div>
            </div>
          </div>
        </section>
      </div>

      {isEditing && (
        <div className="cyber-modal-overlay">
          <div className="cyber-modal auth-modal" style={{ maxWidth: "550px", maxHeight: "90vh", overflowY: "auto" }}>
            <div className="auth-header">
              <h3>[ ПРАВКА БИОДАННЫХ ]</h3>
            </div>
            <div className="auth-form">
              <div className="input-field">
                <label>ПОЛНОЕ ИМЯ</label>
                <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
              </div>

              <div className="input-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <div className="input-field">
                  <label>ДАТА РОЖДЕНИЯ</label>
                  <input placeholder="ДД.ММ.ГГГГ" value={editForm.birthDate} onChange={(e) => setEditForm({ ...editForm, birthDate: e.target.value })} />
                </div>
                <div className="input-field">
                  <label>ЛОКАЦИЯ (LOC)</label>
                  <input value={editForm.location} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} />
                </div>
              </div>

              <div className="input-field">
                <label>СПЕЦИАЛИЗАЦИЯ</label>
                <input value={editForm.specialization} onChange={(e) => setEditForm({ ...editForm, specialization: e.target.value })} />
              </div>

              <div className="input-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <div className="input-field">
                  <label>ТЕЛЕФОН</label>
                  <input placeholder="+992..." value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                </div>
                <div className="input-field">
                  <label>TELEGRAM</label>
                  <input placeholder="@username" value={editForm.telegram} onChange={(e) => setEditForm({ ...editForm, telegram: e.target.value })} />
                </div>
              </div>

              <div className="input-field">
                <label>EMAIL</label>
                <input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
              </div>

              <div className="auth-actions" style={{ marginTop: "20px" }}>
                <button className="primary-btn" onClick={handleSave}>СОХРАНИТЬ</button>
                <span className="switch-mode" onClick={() => setIsEditing(false)}>ОТМЕНИТЬ</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .pulse-line { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw-pulse 3s linear infinite; }
        @keyframes draw-pulse { to { stroke-dashoffset: 0; } }
        .pulse-container { animation: slide-pulse 5s linear infinite; width: 200%; }
        @keyframes slide-pulse { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
};

export default Profile;