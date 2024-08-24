import "./App.css";
import { useState, useRef } from "react";

function App() {
  let intervalRef = useRef(null);
  const [time, setTime] = useState(5 * 60);
  const [title, setTitle] = useState(
    "LET'S BEGIN THE BY TAPPING THE START BUTTON"
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const padTime = (times) => {
    return times.toString().padStart(2, "0");
  };
  const minutes = padTime(Math.floor(time / 60));
  const seconds = padTime(time - minutes * 60);

  // Start Button
  const startBtn = () => {
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => {
      setTime((prevState) => {
        if (prevState >= 1) return prevState - 1;
        resetBtn();
        return 0;
      });
    }, 1000);
    setTitle("LET'S GO!");

    setIsPlaying(!isPlaying);
  };

  //Stop Button
  const stopBtn = () => {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    setTitle("YOU'RE DOING GREAT!");
    intervalRef.current = null;
    setIsPlaying(!isPlaying);
  };

  //Reset Button
  const resetBtn = () => {
    clearInterval(intervalRef.current);
    setTitle("READY FOR ANOTHER ROUND?");
    setTime(5 * 60);
  };
  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isPlaying && <button onClick={startBtn}>Start</button>}
        {isPlaying && <button onClick={stopBtn}>Stop</button>}
        <button onClick={resetBtn}>Reset</button>
      </div>
    </div>
  );
}

export default App;
