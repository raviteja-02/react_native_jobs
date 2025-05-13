import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

const HorizontalScrollBar = ({ children, style, contentContainerStyle, ...props }) => {
  return (
    <View style={[styles.container, style]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        horizontal
        {...props}
      >
        {children}
      </ScrollView>
      <View style={styles.scrollbarContainer}>
        <View style={styles.scrollbarTrack}>
          <View style={styles.scrollbarThumb} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  scrollContent: {
    flexGrow: 1,
  },
  scrollbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SIZES.small,
    backgroundColor: 'transparent',
  },
  scrollbarTrack: {
    flex: 1,
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.small / 2,
    marginHorizontal: SIZES.small,
  },
  scrollbarThumb: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small / 2,
    opacity: 0.5,
  },
});

export default HorizontalScrollBar; 