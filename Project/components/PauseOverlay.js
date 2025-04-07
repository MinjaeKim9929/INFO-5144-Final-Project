// components/PauseOverlay.js
import React from 'react';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import IMAGES from '../constants/Images';
import GameCardContainer from './GameCardContainer';
import StrokedText from './StrokedText';
import CustomButton from './CustomButton';

const PauseOverlay = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <Image
        source={IMAGES.closeBtn}
        style={styles.closeImage}
        resizeMode="contain"
      />
      <Pressable style={styles.closeBtnHitbox} onPress={onClose} />
      <GameCardContainer title="PAUSED">
        <View style={styles.labelWrapper}>
          <StrokedText text="DID YOU KNOW" />
        </View>
        <Text style={styles.message}>
          Venus takes 243 Earth days to rotate once but only 225 Earth days to
          orbit the Sun!
        </Text>
      </GameCardContainer>
      <CustomButton label="RESUME" type="secondary" onBtnPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  closeImage: {
    position: 'absolute',
    top: 50,
    width: 90,
    height: 90,
    zIndex: 5,
    alignSelf: 'center',
  },
  closeBtnHitbox: {
    position: 'absolute',
    top: 50,
    width: 90,
    height: 90,
    zIndex: 10,
    alignSelf: 'center',
  },
  labelWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 32,
  },
  message: {
    fontFamily: 'Jaro-Regular',
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
    paddingHorizontal: 24,
  },
});

export default PauseOverlay;
