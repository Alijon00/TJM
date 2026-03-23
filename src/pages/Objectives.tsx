import React, { useState, useEffect } from 'react';

const Objectives: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<any>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTask(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const tasks = [
    { 
      id: 'ISS-01', 
      title: 'Интеграция в правовое поле МКС', 
      status: 'в_разработке', 
      ready: '25%', 
      details: [
        'Подготовка межправительственного соглашения (IGA) о партнерстве на МКС.',
        'Присоединение к Кодексу поведения экипажа станции.',
        'Определение ответственности за национальные научные модули.'
      ] 
    },
    { 
      id: 'AST-01', 
      title: 'Наземный сегмент: Обсерватория Санглох', 
      status: 'активная', 
      ready: '65%', 
      details: [
        'Использование телескопов РТ для мониторинга безопасности подлета к МКС.',
        'Цифровая привязка обсерватории к сети управления полетами.',
        'Контроль космического мусора на орбите наклонения станции.'
      ] 
    },
    { 
      id: 'BIO-01', 
      title: 'Научная программа "Памир-МКС"', 
      status: 'в_разработке', 
      ready: '30%', 
      details: [
        'Разработка протоколов выращивания горных растений в невесомости.',
        'Подготовка контейнеров для отправки на российский или американский сегменты.',
        'Эксперименты по кристаллизации белков в условиях микрогравитации.'
      ] 
    },
    { 
      id: 'HUM-01', 
      title: 'Подготовка кандидата в космонавты РТ', 
      status: 'планирование', 
      ready: '5%', 
      details: [
        'Переговоры о выделении квоты на полет представителя Таджикистана.',
        'Предварительный отбор среди инженеров и врачей республики.',
        'Согласование программы тренировок в Звездном городке.'
      ] 
    },
    { 
      id: 'ENG-01', 
      title: 'Разработка научного модуля "Сомони"', 
      status: 'планирование', 
      ready: '10%', 
      details: [
        'Проектирование малогабаритного внешнего прибора для монтажа на МКС.',
        'Тестирование систем защиты от радиации и перепадов температур.',
        'Разработка интерфейсов сопряжения с бортовой сетью станции.'
      ] 
    },
    { 
      id: 'DIP-01', 
      title: 'Меморандум с партнерами МКС', 
      status: 'переговоры', 
      ready: '35%', 
      details: [
        'Согласование условий научно-технического обмена с Роскосмос/NASA/ESA.',
        'Участие делегации РТ в заседаниях многостороннего координационного совета.',
        'Подписание дорожной карты вхождения в проект.'
      ] 
    },
    { 
      id: 'EDU-01', 
      title: 'Аэрокосмический центр подготовки (ТТУ)', 
      status: 'в_разработке', 
      ready: '45%', 
      details: [
        'Создание симуляторов стыковки и работы в открытом космосе.',
        'Подготовка специалистов по обслуживанию систем жизнеобеспечения.',
        'Лекции от действующих космонавтов для студентов Таджикистана.'
      ] 
    },
    { 
      id: 'GEO-01', 
      title: 'Прибор ДЗЗ для установки на МКС', 
      status: 'в_разработке', 
      ready: '15%', 
      details: [
        'Создание мультиспектральной камеры для анализа ледников Памира с борта станции.',
        'Разработка софта для мгновенной передачи данных на станцию "Душанбе".',
        'Испытание оптики на вибростендах.'
      ] 
    },
    { 
      id: 'NET-01', 
      title: 'Линия прямой связи МКС — Душанбе', 
      status: 'планирование', 
      ready: '12%', 
      details: [
        'Выделение частотных диапазонов для радиосвязи с экипажем.',
        'Установка терминалов для видеоконференций с орбитой в Академии наук.',
        'Организация сеансов связи "Школа — МКС" для популяризации науки.'
      ] 
    },
    { 
      id: 'IT-01', 
      title: 'Кибер-безопасность шлюзов данных', 
      status: 'в_разработке', 
      ready: '20%', 
      details: [
        'Защита каналов телеметрии от несанкционированного доступа.',
        'Внедрение алгоритмов шифрования национального стандарта.',
        'Резервное копирование полетной информации.'
      ] 
    },
    { 
      id: 'MED-01', 
      title: 'Система биомониторинга экипажа', 
      status: 'переговоры', 
      ready: '18%', 
      details: [
        'Разработка носимых датчиков для контроля стресса космонавтов.',
        'Изучение влияния высокогорной адаптации на выносливость в космосе.',
        'Совместные медицинские тесты с ИМБП РАН.'
      ] 
    },
    { 
      id: 'POWER-01', 
      title: 'Энергоэффективные системы питания', 
      status: 'планирование', 
      ready: '8%', 
      details: [
        'Проектирование солнечных концентраторов для малых узлов МКС.',
        'Тестирование аккумуляторов повышенной емкости.',
        'Минимизация потерь при распределении энергии.'
      ] 
    },
    { 
      id: 'SAFE-01', 
      title: 'Система обнаружения микрометеоритов', 
      status: 'в_разработке', 
      ready: '22%', 
      details: [
        'Разработка акустических датчиков столкновения для корпуса модуля.',
        'Алгоритмы триангуляции места пробоя.',
        'Тестирование на сверхзвуковых установках.'
      ] 
    },
    { 
      id: 'MINE-01', 
      title: 'Астероидная разведка (Deep Space)', 
      status: 'планирование', 
      ready: '5%', 
      details: [
        'Участие в экспериментах МКС по захвату имитаторов астероидов.',
        'Спектральный анализ внеземных пород.',
        'Подготовка к будущей добыче ресурсов в космосе.'
      ] 
    },
    { 
      id: 'AI-01', 
      title: 'ИИ-помощник для таджикистанского сегмента', 
      status: 'планирование', 
      ready: '10%', 
      details: [
        'Разработка голосового интерфейса на таджикском и русском языках.',
        'Автоматизация контроля климата в научном отсеке.',
        'Интеллектуальная обработка аварийных сигналов.'
      ] 
    },
    { 
      id: 'FLAG-01', 
      title: 'Миссия "Первый шаг": Флаг РТ на орбите', 
      status: 'активная', 
      ready: '80%', 
      details: [
        'Символическая отправка флага и герба на МКС через партнеров.',
        'Подготовка памятных знаков из анодированного алюминия.',
        'Организация фото- и видеофиксации символики в модуле Купола.'
      ] 
    }
  ];

  return (
    <div className="page-container">
      <h1 className="terminal-title">{'>'} ISS_INTEGRATION_STRATEGY_2035</h1>
      
      <div className="objectives-grid">
        {tasks.map(task => (
          <div key={task.id} className="obj-card" onClick={() => setSelectedTask(task)}>
            <div className="obj-header">
              <span className="id-tag">{task.id}</span>
              <span className={`status-tag ${task.status}`}>{task.status.replace('_', ' ')}</span>
            </div>
            <h3 style={{fontSize: '1rem', minHeight: '2.5rem'}}>{task.title}</h3>
            <div className="progress-mini">
              <div className="bar" style={{ width: task.ready }}></div>
            </div>
            <p style={{fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '12px'}}>
              ESTABLISHING_LINK // PROGRESS: {task.ready}
            </p>
          </div>
        ))}
      </div>

      {selectedTask && (
        <div className="modal-overlay" onClick={() => setSelectedTask(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-scanline"></div>
            
            <button className="modal-close-icon" onClick={() => setSelectedTask(null)}>×</button>

            <div className="obj-header">
              <span className="id-tag">{selectedTask.id}</span>
              <span className={`status-tag ${selectedTask.status}`}>
                {selectedTask.status.toUpperCase()}
              </span>
            </div>
            
            <h2 className="modal-title">{selectedTask.title}</h2>
            
            <div className="modal-body">
              <div className="detail-section">
                <span className="section-label">ЭТАПЫ ИНТЕГРАЦИИ В МКС</span>
                <ul className="details-list">
                  {selectedTask.details.map((d: string, i: number) => (
                    <li key={i}>
                       <span className="bullet">{'>'}</span> {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-section" style={{marginTop: '30px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                  <span className="section-label">ГОТОВНОСТЬ К ЗАПУСКУ</span>
                  <span style={{color: 'var(--accent)', fontWeight: 'bold'}}>{selectedTask.ready}</span>
                </div>
                <div className="progress-mini" style={{height: '6px', background: 'rgba(255,255,255,0.05)'}}>
                  <div className="bar" style={{ width: selectedTask.ready, boxShadow: '0 0 15px var(--accent)' }}></div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
               <div className="system-info">TJ-ISS CORE // TARGET: LEO_ORBIT</div>
               <button className="action-btn" onClick={() => setSelectedTask(null)}>ЗАКРЫТЬ ТЕРМИНАЛ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Objectives;