import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Images from '../constants/Images';

const GameCardContainer = ({ title, children }) => {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={Images.cardTab}
        style={styles.tab}
        imageStyle={styles.tabImage}
        resizeMode="contain"
      >
        <Text style={styles.tabText}>{title}</Text>
      </ImageBackground>

      <LinearGradient
        colors={['#FFFFFF', '#D1D1D1']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.card}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: 32,
    zIndex: 3,
  },
  tab: {
    width: 361,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
  },
  tabText: {
    fontFamily: 'Jaro-Regular',
    fontSize: 40,
    marginTop: -15,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  tabImage: {
    resizeMode: 'contain',
  },
  card: {
    marginTop: -30,
    width: 283,
    height: 320,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
});

export default GameCardContainer;
