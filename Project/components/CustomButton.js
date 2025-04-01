import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const BUTTON_STYLES = {
  primary: {
    backgroundColor: '#EAAC25',
    textColor: '#FFFFFF',
    shadowColor: '#5E491B',
  },
  secondary: {
    backgroundColor: '#EAAC25',
    textColor: '#000000',
    shadowColor: '#5E491B',
  },
  tertiary: {
    backgroundColor: '#5BB3FF',
    textColor: '#000000',
    shadowColor: '#15446D',
  },
};

const CustomButton = ({
  label,
  to,
  type = 'primary',
  disabled = false,
  icon,
}) => {
  const navigation = useNavigation();
  const { backgroundColor, textColor, shadowColor } =
    BUTTON_STYLES[type] || BUTTON_STYLES.primary;

  const handlePress = () => {
    if (!disabled && to) navigation.navigate(to);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.button,
          { backgroundColor, opacity: disabled ? 0.5 : 1 },
        ]}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <View style={styles.innerShadow} />
        {type === 'primary' && <View style={styles.innerShadow} />}

        <View style={styles.contentWrapper}>
          {icon && (
            <Ionicons
              name={icon}
              size={36}
              color={textColor}
              style={styles.icon}
            />
          )}
          <Text
            style={[
              styles.text,
              { color: textColor },
              type === 'primary' && styles.primaryTextShadow,
            ]}
          >
            {label}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={[
          styles.fakeShadow,
          { backgroundColor: shadowColor, opacity: disabled ? 0.5 : 1 },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 254,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  fakeShadow: {
    position: 'absolute',
    width: 254,
    height: 76,
    borderRadius: 24,
    top: 10,
    zIndex: 0,
  },
  button: {
    width: 254,
    height: 76,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
  },
  primaryTextShadow: {
    textShadowColor: '#735413',
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 4,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 3,
    paddingVertical: 4,
  },
  icon: {
    marginRight: 12,
    textShadowColor: '#735413',
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 3,
  },
  text: {
    fontSize: 36,
    fontFamily: 'Jaro-Regular',
    lineHeight: 38,
    fontWeight: '400',
    marginTop: 4,
  },
  innerShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 22,
    borderWidth: 4,
    borderColor: 'rgba(255, 252, 252, 0.18)',
    zIndex: 1,
  },
});

export default CustomButton;
