import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import IMAGES from '../constants/Images';

const GameOverScreen = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const { score } = route.params;

	return <ImageBackground source={IMAGES.Background}></ImageBackground>;
};

export default GameOverScreen;
