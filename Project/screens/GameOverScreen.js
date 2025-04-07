import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import GameCardContainer from '../components/GameCardContainer';
import IMAGES from '../constants/Images';
import StrokedText from '../components/StrokedText';

const GameOverScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { score } = route.params;

  return (
    <ImageBackground
      source={IMAGES.Background}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <GameCardContainer title="GAME OVER">
          <View style={styles.scoreLabelWrapper}>
            <StrokedText text="YOUR SCORE" />
          </View>

          <ImageBackground
            source={IMAGES.coinScore}
            style={styles.scoreCircle}
            resizeMode="contain"
          >
            <Text style={styles.scoreText}>{score}</Text>
          </ImageBackground>
          <Text style={styles.message}>
            great voiding those obstacles, but you{'\n'}could do better
          </Text>
        </GameCardContainer>

        <CustomButton label="MENU" type="tertiary" to="Home" />
        <View style={{ height: 16 }} />
        <CustomButton label="REPLAY" type="secondary" to="Intro" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  scoreLabelWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 0,
  },
  scoreText: {
    fontFamily: 'Jaro-Regular',
    fontSize: 32,
    marginTop: -15,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
  },
  scoreLabel: {
    fontFamily: 'Jaro-Regular',
    fontSize: 32,
    color: '#5BB3FF',
    textAlign: 'center',
    zIndex: 1,
  },
  stroke: {
    position: 'absolute',
    left: 0,
    right: 0,
    color: '#000',
    zIndex: 0,
    textShadowColor: '#000',
    textShadowOffset: { width: 4, height: 1 },
    textShadowRadius: 1,
  },
  message: {
    fontFamily: 'Jaro-Regular',
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
    paddingHorizontal: 24,
  },
});

export default GameOverScreen;
