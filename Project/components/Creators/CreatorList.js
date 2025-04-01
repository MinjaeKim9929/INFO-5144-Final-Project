import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CreatorCard from './CreatorCard';
import { creators } from '../../constants/Creators';

const CreatorList = () => {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#B67C7C', '#412020']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.titleBox}
      >
        <Text style={styles.title}>CREATORS</Text>
      </LinearGradient>

      <LinearGradient
        colors={['#FFFFFF', '#D1D1D1']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.cardContainer}
      >
        {creators.map((creator, index) => (
          <CreatorCard
            key={creator.id}
            name={creator.name}
            avatar={creator.avatar}
            style={[
              index === 0 && { marginTop: 40 },
              index === creators.length - 1 && { marginTop: 40 },
            ]}
          />
        ))}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 24,
    marginTop: 8,
    alignItems: 'center',
  },
  titleBox: {
    width: 200,
    height: 51,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: {
    fontFamily: 'Jaro-Regular',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  cardContainer: {
    borderRadius: 20,
    padding: 16,
    paddingVertical: 32,
    marginTop: -20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
});

export default CreatorList;
