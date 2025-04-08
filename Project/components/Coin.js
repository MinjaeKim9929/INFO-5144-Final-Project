// components/Coin.js
import React from 'react';
import { View, Image } from 'react-native';
import Images from '../constants/Images';

const Coin = (props) => {
  const width = props.size.width;
  const height = props.size.height;

  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: xPos,
        top: yPos,
        width,
        height,
      }}
    >
      <Image
        source={Images.Coin}
        style={{ width, height }}
      />
    </View>
  );
};

export default Coin;
