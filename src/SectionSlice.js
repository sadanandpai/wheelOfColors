import styled from "styled-components";

let angle = 0;

const Section = styled.div`
  width: 60%;
  height: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: left top;
  border: 2px solid white;
`;

const ColoredSection = styled(Section)`
  background-color: ${(props) => props.color};
  transform: rotate(${(props) => props.angle}deg)
    skew(0deg, ${(props) => 90 - props.sectionAngle}deg);
  border: ${(props) => (props.highlight ? "4px dashed black" : "")};
`;

export default function SectionSlice({ sections, sectionAngle, winnerColor }) {
  return sections.map((sectionColor) => {
    angle = angle + sectionAngle;
    return (
      <ColoredSection
        key={angle}
        color={sectionColor}
        angle={angle}
        sectionAngle={sectionAngle}
        highlight={winnerColor === sectionColor}
      />
    );
  });
}
