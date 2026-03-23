import React, { useState, useEffect } from 'react';

interface RecruitProps {
  currentUser: any;
}

const testQuestions = [
  { q: "Сколько длится один оборот МКС вокруг Земли?", a: ["~90 минут", "~24 часа", "~60 минут"], correct: 0 },
  { q: "Какова примерная высота орбиты МКС?", a: ["100 км", "400 км", "36000 км"], correct: 1 },
  { q: "Какое основное условие для существования ледников Памира?", a: ["Вечная мерзвота", "Отрицательный баланс массы", "Превышение аккумуляции над абляцией"], correct: 2 },
  { q: "Первая космическая скорость для выхода на орбиту?", a: ["7.9 км/с", "11.2 км/с", "300,000 км/с"], correct: 0 },
  { q: "Сколько рассветов видят космонавты на МКС за 24 часа?", a: ["1", "8", "16"], correct: 2 },
  { q: "Где находится обсерватория Санглох?", a: ["Душанбе", "Нурек", "Хорог"], correct: 1 },
  { q: "Какой газ преобладает в составе Солнца?", a: ["Гелий", "Водород", "Кислород"], correct: 1 },
  { q: "Кто был первым человеком в космосе?", a: ["Нил Армстронг", "Юрий Гагарин", "Алексей Леонов"], correct: 1 },
  { q: "Как называется таджикский сегмент на МКС (проектный)?", a: ["Сомони", "Вахш", "Памир"], correct: 0 },
  { q: "Что такое микрогравитация?", a: ["Отсутствие воздуха", "Состояние свободного падения", "Низкое давление"], correct: 1 },
  { q: "Какое оборудование планируется к размещению на МКС?", a: ["Радар", "Гиперспектральный сенсор", "Лазер"], correct: 1 },
  { q: "Температура кипения воды в вакууме космоса?", a: ["100°C", "0°C", "Закипает мгновенно"], correct: 2 },
  { q: "Самая высокая точка Таджикистана?", a: ["Пик Исмоила Сомони", "Пик Ленина", "Пик Корженевской"], correct: 0 },
  { q: "Какая смесь используется для дыхания на МКС?", a: ["Чистый кислород", "Азотно-кислородная смесь", "Углекислый газ"], correct: 1 },
  { q: "Какой корабль доставляет космонавтов на МКС?", a: ["Прогресс", "Союз МС", "Протон"], correct: 1 }
];

const Recruit: React.FC<RecruitProps> = ({ currentUser }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isEditingAnketa, setIsEditingAnketa] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0); // Счёт теста
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [logs, setLogs] = useState<string[]>(["[SYSTEM]: Инициализация протокола отбора...", "[SYSTEM]: Ожидание ввода данных..."]);
  
  const [currentScore, setCurrentScore] = useState(currentUser?.score || 0);

  const [anketaFields, setAnketaFields] = useState({
    fio: currentUser?.fullName || currentUser?.name || '',
    specialty: currentUser?.specialty || '',
    age: currentUser?.age || '',
    experience: currentUser?.experience || '',
    achievements: currentUser?.achievements || '',
    citizenship: currentUser?.citizenship || '',
    education: currentUser?.education || '',
    health: currentUser?.health || 'Группа 2'
  });

  useEffect(() => {
    setCurrentScore(currentUser?.score || 0);
  }, [currentUser]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-4), `[LOG]: ${msg}`]);
  };

  const calculateTotalProgress = (fields: any, testScore: number) => {
    let total = 0;
    if (fields.citizenship.toLowerCase().includes('таджикистан')) total += 20;
    const ageNum = parseInt(fields.age);
    if (ageNum >= 25 && ageNum <= 35) total += 15;
    if (fields.education.includes('Высшее') || fields.education.includes('PhD')) total += 15;
    if (fields.health === 'Группа 1 (Идеальное)') total += 20;
    
    const expNum = parseInt(fields.experience);
    if (expNum >= 3) total += 5;
    if (expNum >= 7) total += 10;
    
    const testContribution = Math.round((testScore / testQuestions.length) * 20);
    total += testContribution;

    return Math.min(total, 100);
  };

  const saveToDb = (data: any) => {
    if (!currentUser) return;
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = allUsers.map((u: any) => 
      u.login === currentUser.login ? { ...u, ...data } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem("tj_session", JSON.stringify({ ...currentUser, ...data }));
    window.dispatchEvent(new Event('storage'));
  };

  const handleSaveAnketa = () => {
    const lastTestResult = currentUser?.lastTestScore || 0;
    const newProgress = calculateTotalProgress(anketaFields, lastTestResult);
    setCurrentScore(newProgress);
    saveToDb({ ...anketaFields, score: newProgress, fullName: anketaFields.fio });
    setIsEditingAnketa(false);
    addLog("Данные анкеты синхронизированы.");
  };

  // ФУНКЦИЯ СБРОСА И ЗАПУСКА ТЕСТА
  const startTest = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setShowTest(true);
    setSubmitted(false);
    addLog("Запуск технического экзамена... СЕССИЯ ОБНУЛЕНА.");
  };

  const handleAnswer = (index: number) => {
    const isCorrect = index === testQuestions[currentQuestion].correct;
    const newScore = isCorrect ? score + 1 : score;
    const newAnswers = [...userAnswers, index];
    
    setScore(newScore);
    setUserAnswers(newAnswers);

    if (currentQuestion + 1 < testQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalProgress = calculateTotalProgress(anketaFields, newScore);
      setCurrentScore(finalProgress);
      saveToDb({ score: finalProgress, lastTestScore: newScore });
      setShowTest(false);
      setSubmitted(true);
      addLog(`Тест завершен: ${Math.round((newScore/testQuestions.length)*100)}%`);
    }
  };

  const testPercent = Math.round((score / testQuestions.length) * 100);
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px', background: '#000', border: '1px solid #333', color: '#fff', marginBottom: '10px', fontSize: '0.8rem'
  };

  return (
    <div className="page-container">
      <header className="dash-header">
        <div className="title-block">
          <h1 className="terminal-title">КАНДИДАТ В КОСМОНАВТЫ // TJ-ISS</h1>
          <p style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>ПРОГРАММА ПОДГОТОВКИ ЭКИПАЖА "ПАМИР-1"</p>
        </div>
      </header>

      <div className="astro-profile-terminal" style={{ minHeight: '320px', display: 'flex', gap: '30px', padding: '30px', background: 'rgba(0,242,255,0.02)', border: '1px solid rgba(0,242,255,0.1)', position: 'relative', marginBottom: '40px' }}>
        <div className="terminal-corner c-tr"></div>
        
        <div style={{ width: '180px' }}>
            <div className="astro-photo-container" style={{ width: '180px', height: '220px', border: '1px solid #222', background: '#000', position: 'relative' }}>
            <div className="scanner-line"></div>
            <div style={{ fontSize: '5rem', textAlign: 'center', marginTop: '40px', opacity: 0.2 }}>👤</div>
            <div style={{ position: 'absolute', bottom: 0, width: '100%', background: 'var(--accent)', color: '#000', fontSize: '0.6rem', textAlign: 'center', fontWeight: 'bold' }}>BIOMETRY SCAN</div>
            </div>
            
            <div style={{ marginTop: '15px', fontFamily: 'monospace', fontSize: '0.55rem', color: '#555', background: '#000', padding: '5px', border: '1px solid #111' }}>
                {logs.map((log, i) => <div key={i}>{log}</div>)}
            </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <div className="card-label" style={{ color: 'var(--accent)' }}>// АНКЕТА КАНДИДАТА</div>
            <button 
                onClick={() => isEditingAnketa ? handleSaveAnketa() : setIsEditingAnketa(true)}
                style={{ background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', fontSize: '0.7rem', padding: '4px 12px', cursor: 'pointer' }}
            >
              {isEditingAnketa ? '[ СОХРАНИТЬ ДАННЫЕ ]' : '[ РЕДАКТИРОВАТЬ ]'}
            </button>
          </div>

          {isEditingAnketa ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ fontSize: '0.6rem', color: '#555' }}>ФИО</label>
                <input style={inputStyle} value={anketaFields.fio} onChange={e => setAnketaFields({...anketaFields, fio: e.target.value})} />
                <label style={{ fontSize: '0.6rem', color: '#555' }}>ГРАЖДАНСТВО</label>
                <input style={inputStyle} value={anketaFields.citizenship} placeholder="Республика Таджикистан" onChange={e => setAnketaFields({...anketaFields, citizenship: e.target.value})} />
                <label style={{ fontSize: '0.6rem', color: '#555' }}>ОБРАЗОВАНИЕ</label>
                <select style={inputStyle} value={anketaFields.education} onChange={e => setAnketaFields({...anketaFields, education: e.target.value})}>
                  <option value="">Не выбрано</option>
                  <option value="Высшее техническое">Высшее техническое</option>
                  <option value="PhD / Ученая степень">PhD / Ученая степень</option>
                  <option value="Среднее">Среднее</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.6rem', color: '#555' }}>ВОЗРАСТ / СТАЖ</label>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <input style={inputStyle} type="number" placeholder="Лет" value={anketaFields.age} onChange={e => setAnketaFields({...anketaFields, age: e.target.value})} />
                  <input style={inputStyle} type="number" placeholder="Стаж" value={anketaFields.experience} onChange={e => setAnketaFields({...anketaFields, experience: e.target.value})} />
                </div>
                <label style={{ fontSize: '0.6rem', color: '#555' }}>ГРУППА ЗДОРОВЬЯ</label>
                <select style={inputStyle} value={anketaFields.health} onChange={e => setAnketaFields({...anketaFields, health: e.target.value})}>
                  <option value="Группа 1 (Идеальное)">Группа 1 (Идеальное)</option>
                  <option value="Группа 2">Группа 2</option>
                </select>
                <label style={{ fontSize: '0.6rem', color: '#555' }}>СПЕЦИАЛИЗАЦИЯ</label>
                <input style={inputStyle} value={anketaFields.specialty} onChange={e => setAnketaFields({...anketaFields, specialty: e.target.value})} />
              </div>
            </div>
          ) : (
            <div className="astro-stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="stat-box"><small>ОБЪЕКТ:</small> <span style={{ color: '#fff' }}>{anketaFields.fio || '—'}</span></div>
              <div className="stat-box"><small>РОЛЬ:</small> <span style={{ color: 'var(--accent)' }}>{anketaFields.specialty || '—'}</span></div>
              <div className="stat-box"><small>ЗДОРОВЬЕ:</small> <span>{anketaFields.health}</span></div>
              <div className="stat-box"><small>СТАЖ:</small> <span>{anketaFields.experience ? `${anketaFields.experience} лет` : '—'}</span></div>
              <div className="stat-box" style={{ gridColumn: 'span 2' }}>
                <small>ОБРАЗОВАНИЕ:</small> <span style={{ color: '#888' }}>{anketaFields.education || '—'}</span>
              </div>
            </div>
          )}

          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <small style={{ fontSize: '0.6rem', color: '#555' }}>ГОТОВНОСТЬ К STAGE II:</small>
              <small style={{ color: 'var(--accent)' }}>{currentScore}%</small>
            </div>
            <div style={{ height: '2px', background: '#111' }}>
              <div style={{ width: `${currentScore}%`, height: '100%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)', transition: 'width 0.8s ease-in-out' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
          <div className="recruit-panel" style={{ border: '1px solid #222', padding: '20px' }}>
              <div className="card-label" style={{ color: 'var(--critical)' }}>// ПРОВЕРКА КРИТЕРИЕВ</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #111', fontSize: '0.8rem' }}>
                <span>ГРАЖДАНСТВО РТ</span>
                <span style={{ color: anketaFields.citizenship.toLowerCase().includes('таджикистан') ? 'var(--accent)' : '#444' }}>{anketaFields.citizenship.toLowerCase().includes('таджикистан') ? '[OK]' : '[WAIT]'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #111', fontSize: '0.8rem' }}>
                <span>ОПЫТ (3+ ГОДА)</span>
                <span style={{ color: (parseInt(anketaFields.experience) >= 3) ? 'var(--accent)' : '#444' }}>{(parseInt(anketaFields.experience) >= 3) ? '[OK]' : '[WAIT]'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #111', fontSize: '0.8rem' }}>
                <span>ЗДОРОВЬЕ (ГР. 1)</span>
                <span style={{ color: anketaFields.health.includes('Идеальное') ? 'var(--accent)' : '#444' }}>{anketaFields.health.includes('Идеальное') ? '[OK]' : '[WAIT]'}</span>
              </div>
          </div>

          <div className="recruit-panel" style={{ border: '1px solid #222', padding: '20px' }}>
              <div className="card-label" style={{ color: 'var(--negotiation)' }}>// СТАТУС ПРОГРАММЫ</div>
              <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '10px' }}>ЭТАП: <span style={{color: 'var(--negotiation)'}}>{currentScore >= 100 ? '[ II ] ФИЗИЧЕСКАЯ ПОДГОТОВКА' : '[ I ] ПЕРВИЧНЫЙ ОТБОР'}</span></p>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
                {['I', 'II', 'III', 'IV'].map((st, i) => {
                  const isActive = (i === 0 && currentScore < 100) || (i === 1 && currentScore >= 100);
                  return (
                    <div key={i} style={{ flex: 1 }}>
                      <div style={{ height: '4px', background: isActive ? 'var(--negotiation)' : '#111', boxShadow: isActive ? '0 0 10px var(--negotiation)' : 'none' }}></div>
                      <div style={{ fontSize: '0.5rem', color: isActive ? '#fff' : '#333', marginTop: '5px' }}>STAGE {st}</div>
                    </div>
                  )
                })}
              </div>
          </div>
      </div>

      <footer style={{ textAlign: 'center' }}>
        {submitted ? (
          <div className="results-panel" style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto', background: '#050505', padding: '30px', border: '1px solid var(--accent)' }}>
            <h2 style={{ textAlign: 'center', color: 'var(--accent)', marginBottom: '20px' }}>РЕЗУЛЬТАТ ТЕСТА: {testPercent}%</h2>
            <div className="review-block" style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
              {testQuestions.map((q, i) => (
                <div key={i} style={{ marginBottom: '15px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
                  <p style={{ fontSize: '0.85rem' }}>{i + 1}. {q.q}</p>
                  <div style={{ fontSize: '0.75rem', marginTop: '5px' }}>
                    <span style={{ color: userAnswers[i] === q.correct ? 'var(--development)' : 'var(--critical)' }}>Ответ: {q.a[userAnswers[i]]}</span>
                    {userAnswers[i] !== q.correct && <span style={{ color: 'var(--development)', marginLeft: '10px' }}>[ Верно: {q.a[q.correct]} ]</span>}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button onClick={() => setSubmitted(false)} style={{ background: 'var(--accent)', color: '#000', border: 'none', padding: '10px 30px', cursor: 'pointer', fontWeight: 'bold' }}>ЗАКРЫТЬ ОТЧЕТ</button>
            </div>
          </div>
        ) : showTest ? (
          <div className="test-panel" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left', border: '1px solid var(--accent)', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ color: 'var(--accent)' }}>ВОПРОС {currentQuestion + 1} / {testQuestions.length}</h3>
                <span style={{ color: '#444', fontSize: '0.8rem' }}>TECH_EXAM_v1.04</span>
            </div>
            <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>{testQuestions[currentQuestion].q}</p>
            {testQuestions[currentQuestion].a.map((ans, i) => (
              <button key={i} onClick={() => handleAnswer(i)} style={{ display: 'block', width: '100%', padding: '12px', background: 'none', border: '1px solid #333', color: '#ccc', textAlign: 'left', marginBottom: '10px', cursor: 'pointer', transition: '0.2s' }}>{ans}</button>
            ))}
          </div>
        ) : (
          <button className="recruit-btn" onClick={startTest} style={{ padding: '20px 60px', background: 'none', border: '2px solid var(--accent)', color: 'var(--accent)', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>ПРОЙТИ ТЕХНИЧЕСКИЙ ТЕСТ</button>
        )}
      </footer>
    </div>
  );
};

export default Recruit;