import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const STUDY_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [time, setTime] = useState(STUDY_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isStudy, setIsStudy] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          if (isStudy) {
            setIsStudy(false);
            return BREAK_TIME;
          }

          setIsStudy(true);
          setCount((prevCount) => prevCount + 1);
          return STUDY_TIME;
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isStudy]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const timeText =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;

  const totalTime = isStudy ? STUDY_TIME : BREAK_TIME;

  const progress = ((totalTime - time) / totalTime) * 100;

  const resetTimer = () => {
    setIsRunning(false);
    setIsStudy(true);
    setTime(STUDY_TIME);
    setCount(0);
  };

  useEffect(() => {
    document.title = `${timeText} · 뽀모도로`;
  }, [timeText]);

  return (
    <main className={`app ${isStudy ? "study" : "break"}`}>
      <section className="timer-card">

        <header className="header">
          <div className="logo">
            <span className="logo-dot"></span>
            pomodoro
          </div>

          <div className="session-count">
            <span>완료</span>
            <strong>{count}</strong>
          </div>
        </header>

        <div className="mode">
          <span className="mode-dot"></span>
          {isStudy ? "집중 시간" : "휴식 시간"}
        </div>

        <div className="timer-area">
          <div className="timer">
            {timeText}
          </div>

          <div className="progress">
            <div
              className="progress-value"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="message">
          {isStudy
            ? "지금은 하나에만 집중하세요."
            : "잠시 쉬어가세요."}
        </p>

        <div className="controls">
          <button
            className="main-button"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? "일시정지" : "시작"}
          </button>

          <button
            className="reset-button"
            onClick={resetTimer}
            aria-label="타이머 초기화"
          >
            ↻
          </button>
        </div>

        <footer>
          <span>25분 집중</span>
          <span className="divider">•</span>
          <span>5분 휴식</span>
        </footer>

      </section>
    </main>
  );
}

export default App;
