import React, { useState, useEffect } from "react";

export default function Counter() {


  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [multiplyValue, setMultiplyValue] = useState("");
  const [showCount, setShowCount] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);



  useEffect(() => {

    if (count === 0) {
      document.body.style.backgroundColor = "black";
    } else if (count < 20) {
      document.body.style.backgroundColor = "blue";
    } else {
      document.body.style.backgroundColor = "green";
    }

  }, [count]);



  useEffect(() => {

    setIsAnimating(true);

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);

  }, [count]);



  const increment = () => {
    const value = inputValue === "" ? 1 : Number(inputValue);
    setCount(count + value);
    setInputValue("");
  };


  const decrement = () => {
    const value = inputValue === "" ? 1 : Number(inputValue);

    if (count - value >= 0) {
      setCount(count - value);
    }

    setInputValue("");
  };


  const multiplyCount = () => {
    if (multiplyValue === "") return;

    const value = Number(multiplyValue);
    setCount(count === 0 ? value * 2 : count * value);

    setMultiplyValue("");
  };


  const reset = () => setCount(0);

  const resetToTen = () => setCount(10);

  const toggleVisibility = () => setShowCount(!showCount);



  const counterStyle = {
    fontSize: isAnimating ? "50px" : "25px",
    transition: "font-size 0.3s ease",
    backgroundColor: "white",
    color: "red",
    padding: "10px",
    display: "inline-block"
  };



  return (

    <div style={{ textAlign: "center", padding: "40px" }}>

      {showCount && <h2 style={counterStyle}>Count: {count}</h2>}

      <br />

      <input
        type="number"
        value={inputValue}
        placeholder="Enter value"
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={increment}>Add</button>

      <button onClick={decrement}>Subtract</button>

      <br /><br />

      <input
        type="number"
        value={multiplyValue}
        placeholder="Multiply by"
        onChange={(e) => setMultiplyValue(e.target.value)}
      />

      <button onClick={multiplyCount}>Multiply</button>

      <br /><br />

      <button onClick={reset}>Reset</button>

      <button onClick={resetToTen}>Reset to 10</button>

      <button onClick={toggleVisibility}>
        {showCount ? "Hide Count" : "Show Count"}
      </button>

    </div>

  );
}