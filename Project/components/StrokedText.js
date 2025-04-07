// components/StrokedText.js
import React from 'react';
import { Svg, Text as SvgText } from 'react-native-svg';

const StrokedText = ({
  text,
  fontSize = 32,
  strokeWidth = 2,
  strokeColor = '#000',
  fillColor = '#5BB3FF',
}) => {
  return (
    <Svg height={fontSize + 10} width="100%">
      <SvgText
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={fillColor}
        fontSize={fontSize}
        fontFamily="Jaro-Regular"
        x="50%"
        y="50%"
        alignmentBaseline="middle"
        textAnchor="middle"
      >
        {text}
      </SvgText>
    </Svg>
  );
};

export default StrokedText;
