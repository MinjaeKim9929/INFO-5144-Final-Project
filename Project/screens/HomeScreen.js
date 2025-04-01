import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Images from '../constants/Images';
import CustomButton from '../components/CustomButton';

const HomeScreen = () => {
  const navigation = useNavigation();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => setIsReady(true));
  }, []);

  const handleStart = () => {
    if (isReady) navigation.navigate('Game');
  };

  const fillWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <ImageBackground
      source={Images.Background}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image source={Images.Hero} style={styles.hero} resizeMode="contain" />

        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[styles.progressFillWrapper, { width: fillWidth }]}
          >
            <LinearGradient
              colors={['#EAC225', '#CCA404']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              <View style={styles.whiteLine} />
            </LinearGradient>
          </Animated.View>
        </View>

        <CustomButton
          label="START"
          to="Intro"
          type="primary"
          icon="play"
          disabled={!isReady}
        />
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    alignItems: 'center',
    gap: 40,
  },

  hero: {
    width: 240,
    height: 240,
  },

  progressBarContainer: {
    width: 287,
    height: 39,
    borderRadius: 24,
    borderWidth: 6,
    borderColor: '#F4F4F4',
    backgroundColor: '#5D563A',
    overflow: 'hidden',
  },

  progressFillWrapper: {
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },

  whiteLine: {
    height: 4,
    marginHorizontal: 8,
    marginTop: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.48)',
  },

  gradient: {
    flex: 1,
  },
});
