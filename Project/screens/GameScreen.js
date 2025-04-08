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
import { useEffect, useState } from 'react';
import PauseOverlay from '../components/PauseOverlay';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const GameScreen = () => {
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const navigation = useNavigation();
  const [sound, setSound] = useState(null);

  const handlePauseToggle = () => {
    setPaused((prev) => !prev);
  };

  const toggleSound = async () => {
    setIsSoundOn((prev) => !prev);
    if (sound) {
      console.log(sound);
      if (isSoundOn) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }
  };

  const onEvent = (e) => {
    if (e.type === 'game-over') {
      navigation.navigate('GameOver', { score });
      sound && sound.unloadAsync();
    }
  };

  const systems = [Physics];

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sound.mp3'),
        {
          isLooping: true,
          volume: 0.6,
          shouldPlay: isSoundOn,
        }
      );
      setSound(sound);

      if (isSoundOn) await sound.playAsync();
    };

    loadSound();

    return () => {
      sound && sound.unloadAsync();
    };
  }, []);

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
            <Pressable style={styles.soundButton} onPress={toggleSound}>
              <Ionicons
                name={isSoundOn ? 'volume-high' : 'volume-mute'}
                size={28}
                color="#fff"
              />
            </Pressable>
          </>
        )}
        <GameEngine
          entities={entities({ setScore })}
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
  soundButton: {
    position: 'absolute',
    top: 120,
    right: 30,
    zIndex: 2,
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
