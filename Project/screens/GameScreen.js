import { View, StyleSheet, Text } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from '../entities';
import Physics from '../Physics';

export default function GameScreen() {
  return (
    <View style={styles.container}>
      <Text>Game Logic Here</Text>
      <GameEngine
        entities={entities()}
        systems={[Physics]}
        style={styles.gameContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
