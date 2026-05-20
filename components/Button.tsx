import React from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle 
} from 'react-native';

import { Colors } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button = ({ 
  title, 
  onPress, 
  type = 'primary', 
  loading = false, 
  disabled = false,
  style,
  textStyle 
}: ButtonProps) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'secondary': return styles.secondary;
      case 'outline': return styles.outline;
      default: return styles.primary;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'outline': return styles.outlineText;
      case 'secondary': return styles.secondaryText;
      default: return styles.buttonText;
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.button, getButtonStyle(), style, (disabled || loading) && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={type === 'outline' ? Colors.text : Colors.white} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buttonText: {
    color: Colors.white, // Linen white text on forest green primary button for optimal readability
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  outlineText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
