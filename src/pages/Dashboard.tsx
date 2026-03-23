import React, { useState, useEffect } from 'react';

const Dashboard: React.FC = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [telemetry, setTelemetry] = useState({ alt: 418.12, vel: 27588 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setTelemetry(prev => ({
        alt: +(prev.alt + (Math.random() * 0.04 - 0.02)).toFixed(2),
        vel: +(prev.vel + (Math.random() * 4 - 2)).toFixed(0),
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page-container">
      {/* HEADER */}
      <header className="dash-header" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div className="title-block">
          <h1 className="terminal-title" style={{ border: 'none', marginBottom: '5px', padding: 0 }}>
            СТРАТЕГИЧЕСКИЙ ЦЕНТР // TJ-ISS
          </h1>
          <p style={{ color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '2px' }}>
            ЦЕЛЬ: ПОЛНОПРАВНОЕ ЧЛЕНСТВО В ПРОГРАММЕ МКС
          </p>
        </div>
        <div className="time-block" style={{ textAlign: 'right' }}>
          <div className="clock" style={{ fontSize: '1.8rem', color: '#fff', fontWeight: 'bold' }}>{time}</div>
          <small style={{ color: 'var(--text-muted)' }}>DUSHANBE_HQ_LINK</small>
        </div>
      </header>

      {/* SECTION 1: ЗАЧЕМ ЭТО НУЖНО? */}
      <h2 className="section-label" style={{ marginBottom: '20px' }}>{'>'} ОБОСНОВАНИЕ_МИССИИ</h2>
      <div className="dash-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        
        <div className="dash-card" style={{ borderTop: '3px solid var(--negotiation)' }}>
          <div className="card-label">01 // ВОДНАЯ БЕЗОПАСНОСТЬ</div>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#ccc' }}>
            Памир — «водонапорная башня» Азии. С МКС мы получаем <b>гиперспектральные данные</b> о состоянии ледников, что жизненно важно для прогноза засух и выживания региона.
          </p>
        </div>

        <div className="dash-card" style={{ borderTop: '3px solid var(--critical)' }}>
          <div className="card-label">02 // НАУЧНЫЙ ПРЕСТИЖ</div>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#ccc' }}>
            Вхождение в МКС — это вход в <b>элитный клуб</b> 15 наций. Это доступ к закрытым технологиям микрогравитации, которые невозможно купить за деньги.
          </p>
        </div>

        <div className="dash-card" style={{ borderTop: '3px solid var(--development)' }}>
          <div className="card-label">03 // ЭФФЕКТ ГАГАРИНА</div>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#ccc' }}>
            Первый таджикский космонавт станет символом <b>интеллектуального возрождения</b>. Это заставит тысячи школьников РТ выбрать науку вместо миграции.
          </p>
        </div>
      </div>

      {/* НОВЫЙ БЛОК: ТЕХНИЧЕСКИЙ ВКЛАД (Что мы даем МКС) */}
      <h2 className="section-label" style={{ marginBottom: '20px' }}>{'>'} ТЕХНИЧЕСКИЙ_ПРОТОКОЛ_ВКЛАДА</h2>
      <div className="dash-grid" style={{ marginBottom: '40px' }}>
        
        <div className="dash-card" style={{ background: 'rgba(0, 255, 65, 0.02)', borderLeft: '4px solid var(--development)' }}>
          <div className="card-label" style={{ color: 'var(--development)' }}>ОПТИЧЕСКИЙ ТРЕКИНГ (САНГЛОХ)</div>
          <ul style={{ fontSize: '0.85rem', color: '#ccc', listStyle: 'none', padding: '10px 0 0 0' }}>
            <li style={{ marginBottom: '8px' }}>• <b>Инструмент:</b> Телескоп Zeiss-1000 (высокогорье).</li>
            <li style={{ marginBottom: '8px' }}>• <b>Задача:</b> Мониторинг космического мусора на орбите МКС.</li>
            <li style={{ marginBottom: '8px' }}>• <b>Ценность:</b> Повышение безопасности стыковок и маневров станции.</li>
          </ul>
        </div>

        <div className="dash-card" style={{ background: 'rgba(0, 170, 255, 0.02)', borderLeft: '4px solid var(--negotiation)' }}>
          <div className="card-label" style={{ color: 'var(--negotiation)' }}>ПРИБОР "ПАМИР-СПЕКТР"</div>
          <ul style={{ fontSize: '0.85rem', color: '#ccc', listStyle: 'none', padding: '10px 0 0 0' }}>
            <li style={{ marginBottom: '8px' }}>• <b>Тип:</b> Внешний гиперспектральный сенсор.</li>
            <li style={{ marginBottom: '8px' }}>• <b>Установка:</b> Внешний борт научного модуля МКС.</li>
            <li style={{ marginBottom: '8px' }}>• <b>Анализ:</b> Сверхточное измерение объема льда и влажности почв.</li>
          </ul>
        </div>

      </div>

      {/* SECTION 2: ТЕЛЕМЕТРИЯ И ГОТОВНОСТЬ */}
      <div className="dash-grid" style={{ marginBottom: '40px' }}>
        
        <div className="dash-card">
          <div className="card-label">АКТУАЛЬНАЯ ПОЗИЦИЯ МКС (LIVE)</div>
          <div className="main-val">{telemetry.alt} <span style={{ color: 'var(--accent)' }}>KM</span></div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <small style={{ color: 'var(--text-muted)' }}>СКОРОСТЬ: {telemetry.vel} КМ/Ч</small>
            <small style={{ color: 'var(--development)' }}>СТАТУС: ОПТИМАЛЬНО</small>
          </div>
          <p style={{ fontSize: '0.7rem', marginTop: '15px', color: 'var(--text-muted)' }}>
            * ДАННЫЕ СИНХРОНИЗИРОВАНЫ С ОБСЕРВАТОРИЕЙ САНГЛОХ
          </p>
        </div>

        <div className="dash-card">
          <div className="card-label">ГОТОВНОСТЬ ИНТЕГРАЦИИ РТ</div>
          <div className="main-val">12.4%</div>
          <div className="progress-mini" style={{ height: '6px', background: 'rgba(255,255,255,0.05)', marginTop: '20px' }}>
            <div className="bar" style={{ 
              width: '12.4%', 
              background: 'var(--accent)', 
              boxShadow: '0 0 15px var(--accent)',
              height: '100%'
            }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--negotiation)' }}>ЭТАП: ПОДГОТОВКА ПАРТНЕРСТВА</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--development)' }}>+0.2% UP</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: СТРАТЕГИЯ */}
      <div className="dash-grid">
        <div className="dash-card">
          <div className="card-label">СТРАТЕГИЯ ВХОДА (ВКЛАД РТ)</div>
          <div className="sys-list" style={{ marginTop: '15px' }}>
             <div className="sys-item" style={{ borderLeftColor: 'var(--accent)' }}>
                <span>ОБСЕРВАТОРИЯ САНГЛОХ</span>
                <span style={{ color: 'var(--accent)' }}>НАЗЕМНЫЙ СЕГМЕНТ</span>
             </div>
             <div className="sys-item" style={{ borderLeftColor: 'var(--negotiation)' }}>
                <span>ПРОГРАММА "ПАМИР-МКС"</span>
                <span style={{ color: 'var(--negotiation)' }}>НАУЧНЫЙ ВКЛАД</span>
             </div>
             <div className="sys-item" style={{ borderLeftColor: 'var(--development)' }}>
                <span>ЦЕНТР ПОДГОТОВКИ (ТТУ)</span>
                <span style={{ color: 'var(--development)' }}>КАДРЫ</span>
             </div>
          </div>
        </div>

        <div className="dash-card" style={{ background: 'rgba(0, 255, 255, 0.02)' }}>
          <div className="card-label">ИТОГОВЫЙ СТАТУС</div>
          <h3 style={{ margin: '15px 0 10px', fontSize: '1rem' }}>ИНТЕГРАЦИЯ ВОЗМОЖНА</h3>
          <p style={{ fontSize: '0.8rem', color: '#aaa', lineHeight: '1.5' }}>
            Таджикистан обладает уникальной географической точкой для контроля МКС. 
            Обмен данных Санглоха на место в экипаже — кратчайший путь к звездам.
          </p>
          <div className="status-tag development" style={{ marginTop: '15px', display: 'inline-block' }}>
            READY_FOR_ORBIT_COOPERATION
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;