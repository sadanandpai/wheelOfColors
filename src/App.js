import { useState } from "react";
import styled from "styled-components";
import Wheel from "./Wheel";
import * as config from "./config.json";

const FlexColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid grey;
  box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  background-color: ${(props) => props.color};
`;

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 50px solid black;
  position: relative;
  bottom: 30px;

  @media (min-width: 375px) {
    border-bottom: 80px solid black;
  }

  @media (min-width: 768px) {
    border-bottom: 100px solid black;
  }
`;

export default function App() {
  const [colorCount, setColorCount] = useState(3);
  const [isRotating, setIsRotating] = useState(false);
  const [winnerColor, setWinnerColor] = useState("");

  function colorCountHandler(event) {
    setWinnerColor("");
    setColorCount(+event.target.value);
  }

  function onStop(index) {
    setWinnerColor(config.sections[index]);
    setIsRotating(false);
  }

  function rotateClickhHandler(index) {
    setWinnerColor("");
    setIsRotating(true);
  }

  return (
    <FlexColumnCenter>
      <h1>Wheel of Colors</h1>
      <div style={{ zIndex: 1, marginBottom: "10px" }}>
        <label>Number of colors: </label>
        <select
          value={colorCount}
          onChange={colorCountHandler}
          disabled={isRotating}
        >
          {config.colorsCount.map((colorNumber) => (
            <option key={colorNumber}>{colorNumber}</option>
          ))}
        </select>
      </div>
      <Wheel
        colorCount={colorCount}
        winnerColor={winnerColor}
        setWinnerColor={setWinnerColor}
        shouldRotate={isRotating}
        onStop={onStop}
      />
      <ArrowUp />
      <Button
        onClick={rotateClickhHandler}
        color={winnerColor}
        disabled={isRotating}
      >
        Rotate
      </Button>
    </FlexColumnCenter>
  );
}
