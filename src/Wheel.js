import { useEffect } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import SectionSlice from "./SectionSlice";
import * as config from "./config.json";

const Wheel = animated(styled.div`
  position: relative;
  border-radius: 50%;
  height: 84vw;
  width: 84vw;
  max-width: 65vh;
  max-height: 65vh;
  overflow: hidden;
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.4);
  border: 2px solid black;
  margin: 10px;
`);

let sectionAngle;

export default function App({ colorCount, winnerColor, shouldRotate, onStop }) {
  sectionAngle = 360 / colorCount;

  const [spring, setSpring] = useSpring(() => ({
    angle: 0,
    config: {
      mass: config.mass,
      tension: config.tension,
      friction: config.friction,
      clamp: true,
    },
    onRest: onRest,
  }));

  function onRest({ angle }) {
    if (angle !== 0) {
      let rotationAngle = angle % 360;
      if (rotationAngle < 0) {
        rotationAngle = 360 + rotationAngle;
      }
      const index = Math.floor((360 - rotationAngle) / sectionAngle);
      onStop(index);
    }
  }

  useEffect(() => {
    if (shouldRotate) {
      setSpring({
        angle: Math.round(Math.random() * 50000 + Math.random() * 50000),
      });
    }
  }, [setSpring, shouldRotate]);

  return (
    <Wheel
      style={{
        transform: spring.angle.interpolate((angle) => `rotate(${angle}deg)`),
      }}
    >
      <SectionSlice
        sections={config.sections.slice(0, colorCount)}
        sectionAngle={sectionAngle}
        winnerColor={winnerColor}
      />
    </Wheel>
  );
}
