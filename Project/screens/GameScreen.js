import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from '../entities';
import Physics from '../Physics';
import IMAGES from '../constants/Images';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import PauseOverlay from '../components/PauseOverlay';

const GameScreen = () => {
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const navigation = useNavigation();

  const handlePauseToggle = () => {
    setPaused((prev) => !prev);
  };

  const onEvent = (e) => {
    if (e.type === 'game-over') {
      navigation.navigate('GameOver', { score });
    }
  };

  const systems = [Physics];

  return (
    <ImageBackground source={IMAGES.Background} style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        {paused ? (
          <PauseOverlay onClose={handlePauseToggle} />
        ) : (
          <>
            <Image source={IMAGES.Grid} style={styles.grid} />
            <View style={styles.scoreContainer}>
              <Image
                source={IMAGES.gameCoin}
                style={styles.coinImage}
                resizeMode="contain"
              />
              <Text style={styles.scoreText}>: {score}</Text>
            </View>
            <Pressable style={styles.pauseButton} onPress={handlePauseToggle}>
              <View style={styles.pauseCircle}>
                <View style={styles.pauseIcon}>
                  <View style={styles.pauseBar} />
                  <View style={styles.pauseBar} />
                </View>
              </View>
            </Pressable>
          </>
        )}
        <GameEngine
          entities={entities({setScore})}
          running={!paused}
          systems={systems}
          style={styles.gameContainer}
          onEvent={onEvent}
          dispatch={onEvent}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    zIndex: -1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },

  gameContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  grid: {
    opacity: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  scoreContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 3,
  },
  coinImage: {
    width: 48,
    height: 48,
    marginRight: 8,
  },
  scoreText: {
    fontFamily: 'Jaro-Regular',
    fontSize: 32,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  pauseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 2,
  },
  pauseCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fff',
    borderWidth: 6,
    borderColor: '#4E3D3D',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },

  pauseIcon: {
    flexDirection: 'row',
    gap: 4,
  },

  pauseBar: {
    width: 6,
    height: 20,
    borderRadius: 1,
    backgroundColor: '#333',
  },
});

export default GameScreen;
