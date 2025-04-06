import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import CreatorList from '../components/Creators/CreatorList';
import IMAGES from '../constants/Images';

const IntroScreen = () => {
	const navigation = useNavigation();

	return (
		<ImageBackground source={IMAGES.Background} style={styles.background}>
			<View style={styles.container}>
				<Image source={IMAGES.Hero} style={styles.heroLogo} resizeMode="contain" />

				<View style={styles.creatorsSection}>
					<CreatorList />
				</View>

				<View style={styles.instructions}>
					<Text style={styles.instructionsTitle}>INSTRUCTIONS</Text>
					<Text style={styles.instructionsText}>
						Avoid the flying objects that wants to stop the space ship from reaching the moon and collect coins
					</Text>
				</View>

				<CustomButton label="Start" to="Game" type="primary" icon="play" />
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
	heroLogo: {
		width: 180,
		height: 180,
		marginTop: 20,
	},
	instructions: {
		marginVertical: 24,
		alignItems: 'center',
		paddingHorizontal: 12,
	},
	instructionsTitle: {
		color: '#fff',
		fontSize: 32,
		fontFamily: 'Jaro-Regular',
		letterSpacing: 1,
		marginBottom: 8,
		textShadowColor: '#000',
		textShadowOffset: { width: 0, height: 3 },
		textShadowRadius: 3,
	},
	instructionsText: {
		color: '#fff',
		fontSize: 24,
		fontFamily: 'Jaro-Regular',
		lineHeight: 22,
		textAlign: 'center',
		paddingHorizontal: 24,
	},
});

export default IntroScreen;
