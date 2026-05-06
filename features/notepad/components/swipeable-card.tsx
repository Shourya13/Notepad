import * as Haptics from 'expo-haptics';
import { useCallback, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Fonts } from '@/constants/theme';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/lib/design-tokens';
import { UiPalette } from '@/lib/themes';

interface SwipeableCardProps {
  id: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
  title: string;
  subtitle: string;
  timestamp: string;
  palette: UiPalette;
  isDone?: boolean;
  onPress: () => void;
  onLeftSwipe: () => void;   // swipe left → delete
  onRightSwipe?: () => void; // swipe right → mark done
  showDoneAction?: boolean;
}

const SWIPE_THRESHOLD = 76;
const DISMISS_DISTANCE = 450;

export function SwipeableCard({
  id,
  icon,
  iconColor,
  title,
  subtitle,
  timestamp,
  palette,
  isDone = false,
  onPress,
  onLeftSwipe,
  onRightSwipe,
  showDoneAction = false,
}: SwipeableCardProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const thresholdFired = useRef(false);
  const isSwiping = useRef(false);
  const swipeDistance = useRef(0);

  // Scale action icons as the user drags
  const deleteScale = translateX.interpolate({
    inputRange: [-SWIPE_THRESHOLD * 1.4, -SWIPE_THRESHOLD, -24, 0],
    outputRange: [1.25, 1.0, 0.65, 0.5],
    extrapolate: 'clamp',
  });

  const doneScale = translateX.interpolate({
    inputRange: [0, 24, SWIPE_THRESHOLD, SWIPE_THRESHOLD * 1.4],
    outputRange: [0.5, 0.65, 1.0, 1.25],
    extrapolate: 'clamp',
  });

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const tx = event.nativeEvent.translationX as number;
        swipeDistance.current = tx;
        if (Math.abs(tx) > 4) {
          isSwiping.current = true;
        }
        const crossed = tx < -SWIPE_THRESHOLD || (showDoneAction && tx > SWIPE_THRESHOLD);
        if (crossed && !thresholdFired.current) {
          thresholdFired.current = true;
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        } else if (!crossed) {
          thresholdFired.current = false;
        }
      },
    }
  );

  const animateOut = useCallback(
    (direction: 'left' | 'right', onComplete: () => void) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      Animated.timing(translateX, {
        toValue: direction === 'left' ? -DISMISS_DISTANCE : DISMISS_DISTANCE,
        duration: 230,
        useNativeDriver: false,
      }).start(() => {
        onComplete();
        translateX.setValue(0);
      });
    },
    [translateX]
  );

  const snapBack = useCallback(() => {
    Animated.spring(translateX, {
      toValue: 0,
      tension: 110,
      friction: 12,
      useNativeDriver: false,
    }).start();
  }, [translateX]);

  const onHandlerStateChange = useCallback(
    (event: any) => {
      const { state, translationX: tx } = event.nativeEvent;
      if (state === State.BEGAN) {
        isSwiping.current = false;
        swipeDistance.current = 0;
      }
      if (state === State.END || state === State.CANCELLED || state === State.FAILED) {
        thresholdFired.current = false;
        const wasSwiping = isSwiping.current;
        isSwiping.current = false;
        swipeDistance.current = 0;
        if (tx < -SWIPE_THRESHOLD) {
          animateOut('left', onLeftSwipe);
        } else if (tx > SWIPE_THRESHOLD && showDoneAction && onRightSwipe) {
          animateOut('right', onRightSwipe);
        } else {
          snapBack();
        }
      }
    },
    [animateOut, snapBack, onLeftSwipe, onRightSwipe, showDoneAction]
  );

  const handlePress = useCallback(() => {
    if (isSwiping.current || Math.abs(swipeDistance.current) > 4) {
      return;
    }
    onPress();
  }, [onPress]);

  return (
    <View style={styles.container}>
      {/* Left background — Done (revealed on right swipe) */}
      {showDoneAction && (
        <View style={[styles.actionBg, styles.actionBgLeft, { backgroundColor: palette.success }]}>
          <Animated.View style={{ transform: [{ scale: doneScale }] }}>
            <MaterialIcons name="check-circle-outline" size={22} color="#fff" />
          </Animated.View>
          <Text style={styles.actionLabel}>Done</Text>
        </View>
      )}

      {/* Right background — Delete (revealed on left swipe) */}
      <View style={[styles.actionBg, styles.actionBgRight, { backgroundColor: palette.danger }]}>
        <Animated.View style={{ transform: [{ scale: deleteScale }] }}>
          <MaterialIcons name="delete-sweep" size={22} color="#fff" />
        </Animated.View>
        <Text style={styles.actionLabel}>Delete</Text>
      </View>

      {/* Card */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
        activeOffsetX={[-8, 8]}
        failOffsetY={[-18, 18]}
      >
        <Animated.View
          style={[
            styles.card,
            { backgroundColor: palette.panel, transform: [{ translateX }] },
          ]}
        >
          <Pressable onPress={handlePress} style={styles.pressable} android_ripple={{ color: palette.border }}>
            <View style={styles.content}>
              {/* Leading icon bubble */}
              <View style={[styles.iconBubble, { backgroundColor: palette.accentSoft }]}>
                <MaterialIcons name={icon} size={20} color={iconColor} />
              </View>

              {/* Text hierarchy */}
              <View style={styles.textBlock}>
                <Text
                  style={[
                    styles.title,
                    {
                      color: palette.text,
                      fontFamily: Fonts.rounded,
                      textDecorationLine: isDone ? 'line-through' : 'none',
                      opacity: isDone ? 0.5 : 1,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {title}
                </Text>
                <Text
                  style={[styles.subtitle, { color: palette.muted, fontFamily: Fonts.sans }]}
                  numberOfLines={1}
                >
                  {subtitle}
                </Text>
                <Text
                  style={[styles.timestamp, { color: palette.muted, fontFamily: Fonts.mono }]}
                  numberOfLines={1}
                >
                  {timestamp}
                </Text>
              </View>

              {/* Done checkmark badge */}
              {isDone && (
                <MaterialIcons name="check-circle" size={16} color={palette.success} style={styles.doneBadge} />
              )}
            </View>
          </Pressable>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  actionBg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: Spacing.xs,
  },
  actionBgLeft: {
    alignItems: 'flex-start',
    borderTopLeftRadius: BorderRadius.lg,
    borderBottomLeftRadius: BorderRadius.lg,
  },
  actionBgRight: {
    alignItems: 'flex-end',
    borderTopRightRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
  },
  actionLabel: {
    color: '#fff',
    fontSize: FontSizes.xs,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  card: {
    borderRadius: BorderRadius.lg,
    ...Shadows.subtle,
  },
  pressable: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md + 2,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  iconBubble: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    lineHeight: 22,
  },
  subtitle: {
    fontSize: FontSizes.sm,
    lineHeight: 18,
  },
  timestamp: {
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  doneBadge: {
    flexShrink: 0,
  },
});
