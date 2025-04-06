import { View, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from '../entities';
import Physics from '../Physics';
import IMAGES from '../constants/Images';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

const GameScreen = () => {
	const [score, setScore] = useState(0);
	const navigation = useNavigation();

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
				<Image source={IMAGES.Grid} style={styles.grid} />
				<Text style={styles.score}>Score: {score}</Text>

				<GameEngine
					entities={entities()}
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
	score: {
		position: 'absolute',
		top: 20,
		right: 20,
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
		zIndex: 1,
	},
});

export default GameScreen;
