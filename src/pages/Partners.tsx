import React, { useState, useEffect } from 'react';

const Partners: React.FC = () => {
  const [selectedPartner, setSelectedPartner] = useState<any>(null);

  // Закрытие по ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPartner(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const partners = [
    { 
      name: 'РОСКОСМОС', 
      status: 'ACTIVE', 
      program: 'Основной партнер по МКС: транспорт и обучение.',
      cooperation: 85,
      color: '#ff3e3e',
      details: [
        'Подготовка первого космонавта РТ в ЦПК им. Гагарина.',
        'Выделение квоты на полет на транспортном корабле "Союз МС".',
        'Интеграция научного оборудования РТ на российском сегменте МКС.',
        'Совместное использование данных ДЗЗ.'
      ]
    },
    { 
      name: 'НАНТ (Академия наук РТ)', 
      status: 'ACTIVE', 
      program: 'Научное руководство: разработка экспериментов для МКС.',
      cooperation: 100,
      color: '#00ffcc',
      details: [
        'Координация программы научных исследований "Памир-МКС".',
        'Модернизация обсерватории Санглох для мониторинга безопасности МКС.',
        'Подготовка экспериментов по выращиванию горных кристаллов в невесомости.',
        'Создание Центра космического мониторинга в Душанбе.'
      ]
    },
    { 
      name: 'UNOOSA (ООН)', 
      status: 'ACTIVE', 
      program: 'Юридическая интеграция РТ в космическое право.',
      cooperation: 90,
      color: '#ffffff',
      details: [
        'Регистрация Таджикистана в реестре ООН как участника космической деятельности.',
        'Анализ и ратификация международных договоров по космосу (1967 г. и др.).',
        'Правовая поддержка при подписании соглашения по МКС (IGA).',
        'Участие в Комитете по мирному использованию космоса (COPUOS).'
      ]
    },
    { 
      name: 'ТТУ им. М. Осими', 
      status: 'ACTIVE', 
      program: 'Техническая база: подготовка кадров и инженерия.',
      cooperation: 60,
      color: '#00aaff',
      details: [
        'Запуск магистерской программы "Космическая инженерия и технологии".',
        'Разработка наземных терминалов связи для прямой линии с МКС.',
        'Проектирование учебных наноспутников CubeSat.',
        'Лаборатория симуляции стыковки и работы в космосе.'
      ]
    },
    { 
      name: 'NASA / ESA', 
      status: 'NEGOTIATION', 
      program: 'Глобальный мониторинг: обмен данными по ледникам.',
      cooperation: 15,
      color: '#00aaff',
      details: [
        'Обмен климатическими данными по таянию ледников Памира.',
        'Доступ к API телеметрии орбитальных станций (Earth Science Data).',
        'Возможное размещение таджикских приборов ДЗЗ на внешнем борту.',
        'Участие в международных конференциях по климату.'
      ]
    },
    { 
      name: 'CNSA (Китай)', 
      status: 'PLANNING', 
      program: 'Перспективные миссии: участие в Лунной станции.',
      cooperation: 10,
      color: '#ffcc00',
      details: [
        'Подписание дорожной карты участия в проекте ILRS (Лунная станция).',
        'Совместные научные исследования лунных ресурсов.',
        'Подготовка специалистов по глубокому космосу.',
        'Возможное использование китайских пусковых установок.'
      ]
    }
  ];

  return (
    <div className="page-container">
      <h1 className="terminal-title">{'>'} ГЛОБАЛЬНОЕ_ПАРТНЕРСТВО // КООПЕРАЦИЯ_МКС</h1>
      <div className="partners-list">
        {partners.map((p, i) => (
          <div key={i} className="partner-row" onClick={() => setSelectedPartner(p)} style={{ cursor: 'pointer' }}>
            <div className="p-info">
              <div className="p-name" style={{ borderColor: p.color }}>{p.name}</div>
              <div className="p-status" style={{ color: p.color }}>СТАТУС: {p.status}</div>
            </div>
            <div className="p-details">
              <p>{p.program}</p>
              <div className="sync-bar" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div 
                  className="sync-fill" 
                  style={{ 
                    width: `${p.cooperation}%`, 
                    background: p.color,
                    boxShadow: `0 0 15px ${p.color}44` 
                  }}
                ></div>
              </div>
              <small style={{ color: 'var(--text-muted)' }}>
                УРОВЕНЬ ВЗАИМОДЕЙСТВИЯ: {p.cooperation}%
              </small>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно партнера */}
      {selectedPartner && (
        <div className="modal-overlay" onClick={() => setSelectedPartner(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-scanline"></div>
            
            {/* Кнопка-крестик */}
            <button className="modal-close-icon" onClick={() => setSelectedPartner(null)}>×</button>

            <div className="modal-header" style={{ borderColor: selectedPartner.color }}>
              <div className="modal-p-name">{selectedPartner.name}</div>
              <div className="p-status" style={{ color: selectedPartner.color }}>СТАТУС: {selectedPartner.status}</div>
            </div>
            
            <h2 className="modal-title" style={{ fontSize: '1.4rem' }}>{selectedPartner.program}</h2>
            
            <div className="modal-body">
              <div className="detail-section">
                <span className="section-label">ПРОГРАММА СОТРУДНИЧЕСТВА</span>
                <ul className="details-list">
                  {selectedPartner.details.map((d: string, i: number) => (
                    <li key={i}>
                       <span className="bullet">{'>'}</span> {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-section" style={{marginTop: '30px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                  <span className="section-label">УРОВЕНЬ СИНХРОНИЗАЦИИ</span>
                  <span style={{color: selectedPartner.color, fontWeight: 'bold'}}>{selectedPartner.cooperation}%</span>
                </div>
                <div className="sync-bar" style={{height: '6px', background: 'rgba(255,255,255,0.05)'}}>
                  <div 
                    className="sync-fill" 
                    style={{ 
                      width: `${selectedPartner.cooperation}%`, 
                      background: selectedPartner.color, 
                      boxShadow: `0 0 15px ${selectedPartner.color}44` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
               <div className="system-info">TJ-ISS OPS // PARTNER_DATA // {selectedPartner.name}</div>
               <button className="action-btn" onClick={() => setSelectedPartner(null)} style={{ borderColor: selectedPartner.color, color: selectedPartner.color }}>ЗАКРЫТЬ [ESC]</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partners;