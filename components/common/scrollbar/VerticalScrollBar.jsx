import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants';

const VerticalScrollBar = ({ children, style, contentContainerStyle, ...props }) => {
  return (
    <View style={[styles.container, style]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
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
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    flexGrow: 1,
  },
  scrollbarContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: SIZES.small,
    backgroundColor: 'transparent',
  },
  scrollbarTrack: {
    flex: 1,
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.small / 2,
    marginVertical: SIZES.small,
  },
  scrollbarThumb: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small / 2,
    opacity: 0.5,
  },
});

export default VerticalScrollBar; 