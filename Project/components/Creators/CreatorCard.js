import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CreatorCard = ({ name, avatar, style }) => {
  return (
    <View style={[styles.card, style]}>
      <Image source={avatar} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Jaro-Regular',
    fontSize: 16,
    color: '#000',
  },
});

export default CreatorCard;
