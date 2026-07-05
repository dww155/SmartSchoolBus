import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Custom Button Component
 * 
 * @param {string} title - Button text
 * @param {function} onPress - Press handler
 * @param {string} variant - 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
 * @param {string} size - 'small' | 'medium' | 'large'
 * @param {boolean} disabled - Disable button
 * @param {boolean} loading - Show loading spinner
 * @param {string} icon - Icon emoji to display
 * @param {string} iconPosition - 'left' | 'right'
 * @param {boolean} fullWidth - Take full width
 * @param {object} style - Custom style
 * @param {object} textStyle - Custom text style
 */
export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
}) {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`button_${size}`]];
    
    if (fullWidth) baseStyle.push(styles.fullWidth);
    if (disabled || loading) baseStyle.push(styles.disabled);
    
    // Add variant styles for non-gradient buttons
    if (variant !== 'primary' && variant !== 'danger') {
      baseStyle.push(styles[`button_${variant}`]);
    }
    
    if (style) baseStyle.push(style);
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseTextStyle = [styles.text, styles[`text_${size}`]];
    baseTextStyle.push(styles[`text_${variant}`]);
    if (textStyle) baseTextStyle.push(textStyle);
    return baseTextStyle;
  };

  const renderContent = () => (
    <View style={styles.content}>
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' || variant === 'ghost' ? '#E50914' : '#fff'} 
          size={size === 'small' ? 'small' : 'small'}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Text style={[styles.icon, styles[`icon_${size}`], { marginRight: 8 }]}>
              {icon}
            </Text>
          )}
          <Text style={getTextStyle()}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Text style={[styles.icon, styles[`icon_${size}`], { marginLeft: 8 }]}>
              {icon}
            </Text>
          )}
        </>
      )}
    </View>
  );

  // Gradient buttons (primary and danger)
  if ((variant === 'primary' || variant === 'danger') && !disabled && !loading) {
    const colors = variant === 'primary' 
      ? ['#E50914', '#B20710']
      : ['#f44336', '#c62828'];
    
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={getButtonStyle()}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Solid color buttons (disabled state or other variants)
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={getButtonStyle()}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Size variants
  button_small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  button_medium: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  button_large: {
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  
  // Color variants
  button_secondary: {
    backgroundColor: '#4CAF50',
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#E50914',
  },
  button_ghost: {
    backgroundColor: 'transparent',
  },
  
  // Disabled state
  disabled: {
    backgroundColor: '#e0e0e0',
    opacity: 0.6,
  },
  
  // Text styles
  text: {
    fontWeight: 'bold',
  },
  text_small: {
    fontSize: 14,
  },
  text_medium: {
    fontSize: 16,
  },
  text_large: {
    fontSize: 18,
  },
  
  // Text color variants
  text_primary: {
    color: '#fff',
  },
  text_secondary: {
    color: '#fff',
  },
  text_outline: {
    color: '#E50914',
  },
  text_ghost: {
    color: '#E50914',
  },
  text_danger: {
    color: '#fff',
  },
  
  // Icon styles
  icon: {
    fontSize: 18,
  },
  icon_small: {
    fontSize: 14,
  },
  icon_medium: {
    fontSize: 18,
  },
  icon_large: {
    fontSize: 22,
  },
});
