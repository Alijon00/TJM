import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // [!] Добавили импорт

interface Candidate {
  login: string;
  name?: string;
  specialization?: string;
  role: string;
  regDate: string;
  id: number;
}

const AdminPanel: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  const navigate = useNavigate(); // [!] Инициализируем навигацию

  const loadCandidates = () => {
    const list: Candidate[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('user_')) {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        list.push({
          login: data.login || 'Unknown',
          name: data.name || 'НЕ УКАЗАНО',
          specialization: data.specialization || 'ТЕХНИЧЕСКИЙ ПЕРСОНАЛ',
          role: data.role || 'RECRUIT',
          regDate: data.regDate || new Date().toLocaleDateString(),
          id: i
        });
      }
    }
    setCandidates(list);
  };

  useEffect(() => { loadCandidates(); }, []);

  const deleteCandidate = (e: React.MouseEvent, login: string) => {
    e.stopPropagation();
    if (window.confirm(`ВНИМАНИЕ: АННУЛИРОВАТЬ ДОСТУП ОБЪЕКТУ ${login}?`)) {
      localStorage.removeItem(`user_${login}`);
      loadCandidates();
    }
  };

  // [!] Функция для перехода в профиль
  const viewProfile = (e: React.MouseEvent, login: string) => {
    e.stopPropagation(); // Чтобы не срабатывало открытие карточки
    navigate(`/profile/${login}`); 
  };

  return (
    <div className="admin-page" style={{ padding: '60px 5vw', maxWidth: '1600px', margin: '0 auto', fontFamily: 'monospace', color: '#fff' }}>
      
      <div className="admin-header" style={{ 
        position: 'relative', padding: '30px 40px', marginBottom: '60px',
        background: 'linear-gradient(135deg, rgba(255,71,71,0.1) 0%, transparent 100%)',
        borderLeft: '4px solid #ff4747', borderRadius: '4px'
      }}>
        <div style={{ color: '#ff4747', fontSize: '1.8rem', letterSpacing: '3px', fontWeight: 'bold' }}>
          [ СЕКРЕТНЫЙ АРХИВ // ДОСТУП: OVERLORD ]
        </div>
        <p style={{ color: '#888', marginTop: '10px', fontSize: '0.9rem' }}>
          Кликните по идентификатору ID для извлечения расширенных биометрических данных.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
        {candidates.map((c) => (
          <div key={c.id} 
            onMouseEnter={() => setHoveredId(c.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
            style={{ 
              background: 'rgba(20, 20, 25, 0.8)', 
              borderRadius: '8px', 
              border: `1px solid ${expandedId === c.id ? '#00f2ff' : (hoveredId === c.id ? '#ff4747' : 'rgba(255,255,255,0.05)')}`,
              padding: '25px',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: expandedId === c.id ? '0 0 30px rgba(0, 242, 255, 0.15)' : 'none',
              position: 'relative',
              overflow: 'hidden'
            }} 
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              {/* [!] Сделали ID кликабельным */}
              <div 
                onClick={(e) => viewProfile(e, c.login)}
                className="admin-id-link"
                style={{ 
                  color: '#00aaff', 
                  fontWeight: 'bold', 
                  fontSize: '1.1rem',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px'
                }}
              >
                ID: {c.login}
              </div>
              <div style={{ color: '#444', fontSize: '0.75rem' }}>{c.regDate}</div>
            </div>

            <div style={{ 
              padding: '4px 10px', background: 'rgba(0, 170, 255, 0.05)', color: '#00aaff', 
              fontSize: '0.65rem', border: '1px solid rgba(0, 170, 255, 0.3)', 
              borderRadius: '4px', display: 'inline-block', marginBottom: '20px'
            }}>
              TJ-ISS // {c.role}
            </div>

            <div style={{ 
              maxHeight: expandedId === c.id ? '200px' : '0',
              opacity: expandedId === c.id ? 1 : 0,
              overflow: 'hidden',
              transition: 'all 0.4s ease-in-out',
              borderTop: expandedId === c.id ? '1px solid rgba(255,255,255,0.1)' : 'none',
              paddingTop: expandedId === c.id ? '20px' : '0'
            }}>
              <div style={{ marginBottom: '12px' }}>
                <small style={{ color: '#555', display: 'block', fontSize: '0.65rem', marginBottom: '4px' }}>ПОЛНОЕ ИМЯ ОБЪЕКТА:</small>
                <div style={{ color: '#eee', fontSize: '0.95rem', letterSpacing: '0.5px' }}>{c.name}</div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <small style={{ color: '#555', display: 'block', fontSize: '0.65rem', marginBottom: '4px' }}>ТЕКУЩАЯ СПЕЦИАЛИЗАЦИЯ:</small>
                <div style={{ color: '#00ff41', fontSize: '0.9rem', fontWeight: 'bold' }}>{c.specialization}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <span style={{ fontSize: '0.6rem', color: '#444' }}>{expandedId === c.id ? 'КЛИК: СВЕРНУТЬ' : 'КЛИК: ПОДРОБНО'}</span>
              <button 
                onClick={(e) => deleteCandidate(e, c.login)}
                style={{ 
                  background: 'transparent', border: '1px solid rgba(255,71,71,0.4)', color: '#ff4747', 
                  padding: '6px 12px', fontSize: '0.65rem', cursor: 'pointer', borderRadius: '4px',
                  transition: '0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#ff4747'; e.currentTarget.style.color = '#000'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ff4747'; }}
              >
                АННУЛИРОВАТЬ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Статистика без изменений */}
      <div style={{ marginTop: '70px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px' }}>
        {[
          { label: 'ВСЕГО ОБЪЕКТОВ', value: candidates.length.toString().padStart(2, '0'), color: '#ff4747' },
          { label: 'АКТИВНЫЕ СЕССИИ', value: '01', color: '#00aaff' },
          { label: 'СТАТУС ЯДРА', value: 'STABLE', color: '#00ff41' }
        ].map(stat => (
          <div key={stat.label} style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}22`, padding: '25px', borderRadius: '8px' }}>
            <small style={{ color: stat.color, fontSize: '0.7rem' }}>{stat.label}</small>
            <div style={{ fontSize: stat.label === 'СТАТУС ЯДРА' ? '1.8rem' : '3rem', fontWeight: 'bold', marginTop: '10px' }}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;