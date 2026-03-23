import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Objectives from "./pages/Objectives";
import Partners from "./pages/Partners";
import Roadmap from "./pages/Roadmap";
import Recruit from "./pages/Recruit";
import AdminPanel from "./pages/AdminPanel";
import Profile from "./pages/Profile";
import "./App.css";

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [loginInput, setLoginInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [specInput, setSpecInput] = useState("ИНЖЕНЕР");

  useEffect(() => {
    const session = localStorage.getItem("tj_session");
    if (session) setCurrentUser(JSON.parse(session));
  }, []);

  const handleAuth = () => {
    if (!loginInput || !passInput || (isRegister && !nameInput)) {
      return alert("СИСТЕМНАЯ ОШИБКА: ЗАПОЛНИТЕ ВСЕ ПОЛЯ");
    }

    const loginUpper = loginInput.trim().toUpperCase();

    if (isRegister) {
      const newUser = {
        login: loginUpper,
        name: nameInput,
        specialization: specInput,
        role: "USER",
        regDate: new Date().toLocaleDateString(),
        email: `${loginUpper.toLowerCase()}@tj-iss.gov`,
        phone: "",
        telegram: "",
        birthDate: "",
      };

      localStorage.setItem(`user_${loginUpper}`, JSON.stringify(newUser));

      const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
      if (!allUsers.find((u: any) => u.login === loginUpper)) {
        allUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(allUsers));
      }

      localStorage.setItem("tj_session", JSON.stringify(newUser));
      setCurrentUser(newUser);
      setShowAuthModal(false);
      navigate("/profile");
    } else {
      if (loginUpper === "ADMIN" && passInput === "PAMIR2026") {
        const admin = { login: "ADMIN", role: "ADMIN", name: "АДМИНИСТРАТОР", specialization: "OVERLORD" };
        localStorage.setItem("tj_session", JSON.stringify(admin));
        setCurrentUser(admin);
        setShowAuthModal(false);
        navigate("/profile"); // Перенаправляем админа в профиль после входа
      } else {
        const saved = localStorage.getItem(`user_${loginUpper}`);
        if (saved) {
          localStorage.setItem("tj_session", saved);
          setCurrentUser(JSON.parse(saved));
          setShowAuthModal(false);
          navigate("/profile");
        } else {
          alert(`ОБЪЕКТ ${loginUpper} НЕ НАЙДЕН В БАЗЕ ДАННЫХ`);
        }
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("tj_session");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div
          className="brand"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <div className="logo-icon"></div>
          <span>TJ-ISS OPS</span>
        </div>

        <nav className="nav-links">
          <NavLink to="/" end>[01] ОБЗОР СИСТЕМ</NavLink>
          <NavLink to="/objectives">[02] СПИСОК ЗАДАЧ</NavLink>
          <NavLink to="/partners">[03] ПАРТНЕРЫ</NavLink>
          <NavLink to="/roadmap">[04] ДОРОЖНАЯ КАРТА</NavLink>
          <NavLink to="/recruit">[05] КОСМОНАВТ</NavLink>

          {currentUser?.role === "ADMIN" && (
            <NavLink to="/admin" className="admin-link">
              [06] АДМИН-ПАНЕЛЬ
            </NavLink>
          )}
        </nav>

        <div
          className="sidebar-user-zone"
          onClick={() => {
            if (currentUser) navigate("/profile");
            else setShowAuthModal(true);
          }}
        >
          <div className={`user-avatar-circle ${currentUser ? "active" : ""}`}>
            {currentUser ? currentUser.login.charAt(0) : "?"}
          </div>
          <div className="user-status-text">
            {currentUser ? (
              <>
                <span className="u-name">{currentUser.login}</span>
                <span
                  className="u-logout"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                  }}
                >
                  ВЫЙТИ
                </span>
              </>
            ) : (
              <span className="u-login-trigger">ВОЙТИ В СИСТЕМУ</span>
            )}
          </div>
        </div>

        <div className="system-footer">
          <p>v1.0.4-STABLE</p>
          <div className="status-ok">SYSTEM READY</div>
        </div>
      </aside>

      <main className="viewport">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/objectives" element={<Objectives />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/recruit" element={<Recruit currentUser={currentUser} />} />
          
          {/* ИСПРАВЛЕННЫЙ РОУТ ПРОФИЛЯ: :id? делает параметр необязательным */}
          <Route
            path="/profile/:id?"
            element={
              <Profile
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/admin"
            element={
              currentUser?.role === "ADMIN" ? (
                <AdminPanel />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </main>

      {showAuthModal && (
        <div className="auth-overlay">
          <div className="auth-modal">
            <button className="close-x" onClick={() => setShowAuthModal(false)}>×</button>
            <div className="auth-header">
              <h3>{isRegister ? "[ РЕГИСТРАЦИЯ РЕКРУТА ]" : "[ АВТОРИЗАЦИЯ ]"}</h3>
              <p>TJ-ISS: СТРАТЕГИЧЕСКИЙ ДОСТУП</p>
            </div>
            <div className="auth-form">
              <div className="input-field">
                <label>ПОЗЫВНОЙ / LOGIN</label>
                <input
                  placeholder="ВВЕДИТЕ ID..."
                  onChange={(e) => setLoginInput(e.target.value)}
                />
              </div>
              {isRegister && (
                <>
                  <div className="input-field">
                    <label>ПОЛНОЕ ИМЯ</label>
                    <input
                      placeholder="Ф.И.О..."
                      onChange={(e) => setNameInput(e.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <label>СПЕЦИАЛИЗАЦИЯ</label>
                    <select
                      value={specInput}
                      onChange={(e) => setSpecInput(e.target.value)}
                    >
                      <option value="ИНЖЕНЕР">ИНЖЕНЕР-ТЕХНИК</option>
                      <option value="БИОЛОГ">БИО-АНАЛИТИК</option>
                      <option value="ПИЛОТ">ПИЛОТ МОДУЛЯ</option>
                    </select>
                  </div>
                </>
              )}
              <div className="input-field">
                <label>КЛЮЧ ДОСТУПА / PASSWORD</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassInput(e.target.value)}
                />
              </div>
              <div className="auth-actions">
                <button className="primary-btn" onClick={handleAuth}>
                  {isRegister ? "ЗАРЕГИСТРИРОВАТЬ ОБЪЕКТ" : "ПОДТВЕРДИТЬ ВХОД"}
                </button>
                <div className="switch-mode" onClick={() => setIsRegister(!isRegister)}>
                  {isRegister ? "ЕСТЬ АККАУНТ? ВОЙТИ" : "НЕТ АККАУНТА? СОЗДАТЬ"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;