import React, { useState } from 'react';

const Roadmap: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<any>(null);

  const steps = [
    {
      year: '2024 - 2025',
      title: 'ФУНДАМЕНТ И НАЗЕМНАЯ БАЗА',
      status: 'active',
      progress: 65,
      goals: [
        'Модернизация обсерватории Санглох (Zeiss-1000) для трекинга МКС.',
        'Ратификация международных договоров ООН о мирном космосе.',
        'Создание Центра управления полетами (ЦУП) в Душанбе.'
      ],
      description: 'На этом этапе мы превращаем существующую инфраструктуру в современный хаб. Обсерватория Санглох становится "глазами" проекта, отслеживая траекторию МКС с точностью до миллисекунд.'
    },
    {
      year: '2026 - 2028',
      title: 'НАУЧНАЯ ИНТЕГРАЦИЯ',
      status: 'pending',
      progress: 25,
      goals: [
        'Запуск программы "Памир-МКС": подготовка био-экспериментов.',
        'Отбор и базовая подготовка первой группы кандидатов в космонавты.',
        'Установка таджикского оборудования ДЗЗ на внешнем борту станции.'
      ],
      description: 'Переход к практическим действиям. Мы начинаем отбор людей и подготовку научного оборудования, которое будет работать непосредственно на борту МКС.'
    },
    {
      year: '2029 - 2031',
      title: 'ПЕРВЫЙ ШАГ НА ОРБИТУ',
      status: 'pending',
      progress: 5,
      goals: [
        'Полет первого космонавта Республики Таджикистан на МКС.',
        'Проведение серии высокогорных экспериментов в микрогравитации.',
        'Прямая линия связи "Орбита — Таджикистан" для школ.'
      ],
      description: 'Исторический момент. Присутствие гражданина Таджикистана на МКС закрепит за республикой статус космической державы в составе международного партнерства.'
    },
    {
      year: '2032 - 2035',
      title: 'НАЦИОНАЛЬНЫЙ СЕГМЕНТ',
      status: 'pending',
      progress: 0,
      goals: [
        'Развертывание малого исследовательского модуля "Сомони".',
        'Постоянное присутствие таджикских ученых в экипажах.',
        'Интеграция систем ИИ для управления ресурсами станции.'
      ],
      description: 'Финальная цель — создание собственного рабочего пространства на орбитальном комплексе для независимых исследований и технологических прорывов.'
    }
  ];

  return (
    <div className="page-container">
      <h1 className="terminal-title">{'>'} STRATEGIC_ROADMAP_2035 // ISS_PATH</h1>
      
      <div className="roadmap-axis">
        {steps.map((step, i) => (
          <div 
            key={i} 
            className={`roadmap-step ${step.status}`} 
            onClick={() => setSelectedStep(step)}
            style={{ cursor: 'pointer' }}
          >
            <div className="step-year">{step.year}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <div className="progress-mini" style={{ width: '100px', marginBottom: '10px' }}>
                {/* Исправляем баг с закрашиванием: добавляем % в width */}
                <div className="bar" style={{ width: `${step.progress}%`, boxShadow: '0 0 10px var(--accent)' }}></div>
              </div>
              <ul>
                {step.goals.slice(0, 1).map((goal, idx) => (
                  <li key={idx}>{goal}</li>
                ))}
                <li style={{ color: 'var(--accent)', fontSize: '0.7rem' }}>[ НАЖМИТЕ ДЛЯ ПОДРОБНОСТЕЙ ]</li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Модалка для этапа Roadmap */}
      {selectedStep && (
        <div className="modal-overlay" onClick={() => setSelectedStep(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-scanline"></div>
            <button className="modal-close-icon" onClick={() => setSelectedStep(null)}>×</button>

            <div className="step-year" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{selectedStep.year}</div>
            <h2 className="modal-title">{selectedStep.title}</h2>
            
            <div className="modal-body">
              <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '20px' }}>{selectedStep.description}</p>
              
              <div className="detail-section">
                <span className="section-label">КЛЮЧЕВЫЕ ЗАДАЧИ ЭТАПА</span>
                <ul className="details-list">
                  {selectedStep.goals.map((goal: string, idx: number) => (
                    <li key={idx}><span className="bullet">{'>'}</span> {goal}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-section" style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="section-label">ГОТОВНОСТЬ ЭТАПА</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{selectedStep.progress}%</span>
                </div>
                <div className="progress-mini" style={{ height: '6px', background: 'rgba(255,255,255,0.05)' }}>
                  <div className="bar" style={{ width: `${selectedStep.progress}%`, boxShadow: '0 0 15px var(--accent)' }}></div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <div className="system-info">PROJECT: TJ-ISS // STRATEGY_PHASE_{selectedStep.year.slice(0,4)}</div>
              <button className="action-btn" onClick={() => setSelectedStep(null)}>ЗАКРЫТЬ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;