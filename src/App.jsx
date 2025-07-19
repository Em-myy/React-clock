import { useEffect, useState } from "react";
import "./App.css";
import arrowIcon from "./assets/arrow.png";
import pauseIcon from "./assets/pause.png";
import playIcon from "./assets/play.png";
import regenerateIcon from "./assets/regenerate.png";

function App() {
  const [breakLengthText, setBreakLengthText] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [clockTime, setClockTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("Session");

  return (
    <>
      <BackgroundComponent
        breakLengthText={breakLengthText}
        setBreakLengthText={setBreakLengthText}
        clockTime={clockTime}
        setClockTime={setClockTime}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        sessionLength={sessionLength}
        setSessionLength={setSessionLength}
        mode={mode}
        setMode={setMode}
      />
    </>
  );
}

function BackgroundComponent({
  breakLengthText,
  setBreakLengthText,
  clockTime,
  setClockTime,
  isRunning,
  setIsRunning,
  sessionLength,
  setSessionLength,
  mode,
  setMode,
}) {
  return (
    <div className="main-background">
      <div>
        <h3 className="main-background-text">25 + 5 Clock</h3>
      </div>
      <FirstComponent
        breakLengthText={breakLengthText}
        setBreakLengthText={setBreakLengthText}
        clockTime={clockTime}
        setClockTime={setClockTime}
        sessionLength={sessionLength}
        setSessionLength={setSessionLength}
        mode={mode}
        setMode={setMode}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />
      <SecondComponent
        clockTime={clockTime}
        setClockTime={setClockTime}
        sessionLength={sessionLength}
        setSessionLength={setSessionLength}
        breakLengthText={breakLengthText}
        setBreakLengthText={setBreakLengthText}
        mode={mode}
        setMode={setMode}
      />
      <ThirdComponent
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        clockTime={clockTime}
        setClockTime={setClockTime}
        sessionLength={sessionLength}
        setSessionLength={setSessionLength}
        mode={mode}
        setMode={setMode}
        breakLengthText={breakLengthText}
        setBreakLengthText={setBreakLengthText}
      />
      <audio
        id="beep"
        preload="auto"
        src="/sounds/mixkit-sport-start-bleeps-918.wav"
      />
    </div>
  );
}

function FirstComponent({
  breakLengthText,
  setBreakLengthText,
  clockTime,
  setClockTime,
  sessionLength,
  setSessionLength,
  mode,
  setMode,
  isRunning,
  setIsRunning,
}) {
  return (
    <div className="first-component-main-background">
      <FirstComponentLeft
        breakLengthText={breakLengthText}
        setBreakLengthText={setBreakLengthText}
        mode={mode}
        setMode={setMode}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        clockTime={clockTime}
        setClockTime={setClockTime}
      />
      <FirstComponentRight
        clockTime={clockTime}
        setClockTime={setClockTime}
        sessionLength={sessionLength}
        setSessionLength={setSessionLength}
        mode={mode}
        setMode={setMode}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />
    </div>
  );
}

function FirstComponentLeft({
  breakLengthText,
  setBreakLengthText,
  mode,
  setMode,
  clockTime,
  setClockTime,
}) {
  const increaseBreak = () => {
    setBreakLengthText((prev) => {
      const newBreak = prev < 60 ? prev + 1 : prev;
      if (mode === "Break") {
        setClockTime(newBreak * 60);
      }
      return newBreak;
    });
  };

  const decreaseBreak = () => {
    setBreakLengthText((prev) => {
      const newBreak = prev > 1 ? prev - 1 : prev;
      if (mode === "Break") {
        setClockTime(newBreak * 60);
      }
      return newBreak;
    });
  };

  return (
    <div className="first-component-left-main-background">
      <div className="break-length-text" id="break-label">
        Break Length
      </div>
      <div className="break-length-section">
        <img
          id="break-increment"
          className="break-increase-arrow"
          src={arrowIcon}
          onClick={() => increaseBreak()}
        />
        <div className="break-length" id="break-length">
          {breakLengthText}
        </div>
        <img
          id="break-decrement"
          className="break-decrease-arrow"
          src={arrowIcon}
          onClick={() => decreaseBreak()}
        />
      </div>
    </div>
  );
}

function FirstComponentRight({
  clockTime,
  setClockTime,
  sessionLength,
  setSessionLength,
  mode,
  setMode,
  isRunning,
  setIsRunning,
}) {
  const increaseSession = () => {
    if (sessionLength < 60) {
      const newSession = sessionLength + 1;
      setSessionLength(newSession);
      if (!isRunning && mode === "Session") {
        setClockTime(newSession * 60);
      }
    }
  };

  const decreaseSession = () => {
    if (sessionLength > 1) {
      const newSession = sessionLength - 1;
      setSessionLength(newSession);
      if (!isRunning && mode === "Session") {
        setClockTime(newSession * 60);
      }
    }
  };

  return (
    <div className="first-component-right-main-background">
      <div className="session-length-text" id="session-label">
        Session Length
      </div>
      <div className="session-length-session">
        <img
          id="session-increment"
          src={arrowIcon}
          className="session-increase-arrow"
          onClick={() => increaseSession()}
        />
        <div className="session-length" id="session-length">
          {sessionLength}
        </div>
        <img
          id="session-decrement"
          src={arrowIcon}
          className="session-decrease-arrow"
          onClick={() => decreaseSession()}
        />
      </div>
    </div>
  );
}

function SecondComponent({
  clockTime,
  setClockTime,
  sessionLength,
  setSessionLength,
  mode,
  setMode,
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="second-component-main-background">
      <div className="clock-time-text" id="timer-label">
        {mode}
      </div>
      <div className="clock-time" id="time-left">
        {formatTime(clockTime)}
      </div>
    </div>
  );
}

function ThirdComponent({
  isRunning,
  setIsRunning,
  clockTime,
  setClockTime,
  sessionLength,
  setSessionLength,
  mode,
  setMode,
  breakLengthText,
  setBreakLengthText,
}) {
  const toggleTimer = () => {
    if (!isRunning) {
      // Only reset if we're starting fresh (not resuming)
      if (mode === "Session" && clockTime === sessionLength * 60) {
        setClockTime(sessionLength * 60);
      } else if (mode === "Break" && clockTime === breakLengthText * 60) {
        setClockTime(breakLengthText * 60);
      }
    }
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSessionLength(25);
    setBreakLengthText(5);
    setMode("Session");
    setClockTime(25 * 60);

    const beep = document.getElementById("beep");
    if (beep) {
      beep.pause();
      beep.currentTime = 0;
    }
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setClockTime((prev) => {
          if (prev <= 0) {
            const beep = document.getElementById("beep");
            if (beep) {
              beep.currentTime = 0;
              beep.play();
            }

            if (mode === "Session") {
              setMode("Break");
              return breakLengthText * 60;
            } else {
              setMode("Session");
              return sessionLength * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, mode, breakLengthText, sessionLength]);

  return (
    <div className="third-component-main-background">
      <img
        id="start_stop"
        onClick={toggleTimer}
        className={isRunning ? "pause-image" : "play-image"}
        src={isRunning ? pauseIcon : playIcon}
      />
      <img
        id="reset"
        className="regenerate-image"
        onClick={resetTimer}
        src={regenerateIcon}
      />
    </div>
  );
}

export default App;
