import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import { useCallback, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

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
const SWIPE_THRESHOLD_RATIO = 0.35; // 35% of card width

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
  const cardWidthRef = useRef(0);

  const getThreshold = () => {
    const ratioBased = cardWidthRef.current * SWIPE_THRESHOLD_RATIO;
    return Math.max(SWIPE_THRESHOLD, ratioBased);
  };

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
        const threshold = getThreshold();
        const crossed = tx < -threshold || (showDoneAction && tx > threshold);
        if (crossed && !thresholdFired.current) {
          thresholdFired.current = true;
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        } else if (!crossed) {
          thresholdFired.current = false;
        }
      },
    }
  );

  const fireAndSnapBack = useCallback(
    (onComplete: () => void) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      Animated.spring(translateX, {
        toValue: 0,
        tension: 110,
        friction: 12,
        useNativeDriver: false,
      }).start();
      onComplete();
    },
    [translateX],
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
        isSwiping.current = false;
        swipeDistance.current = 0;
        const threshold = getThreshold();
        if (tx < -threshold) {
          fireAndSnapBack(onLeftSwipe);
        } else if (tx > threshold && showDoneAction && onRightSwipe) {
          fireAndSnapBack(onRightSwipe);
        } else {
          snapBack();
        }
      }
    },
    [fireAndSnapBack, snapBack, onLeftSwipe, onRightSwipe, showDoneAction]
  );

  const handlePress = useCallback(() => {
    if (isSwiping.current || Math.abs(swipeDistance.current) > 4) {
      return;
    }
    onPress();
  }, [onPress]);

  return (
    <View style={styles.container}>
      {/* Left background — Done/Undo (revealed on right swipe) */}
      {showDoneAction && (
        <View
          style={[
            styles.actionBg,
            styles.actionBgLeft,
            { backgroundColor: isDone ? palette.muted : palette.success },
          ]}
        >
          <Animated.View style={{ transform: [{ scale: doneScale }] }}>
            <MaterialIcons
              name={isDone ? 'undo' : 'check-circle-outline'}
              size={32}
              color="#fff"
            />
          </Animated.View>
        </View>
      )}

      {/* Right background — Delete (revealed on left swipe) */}
      <View style={[styles.actionBg, styles.actionBgRight, { backgroundColor: palette.danger }]}>
        <Animated.View style={{ transform: [{ scale: deleteScale }] }}>
          <MaterialIcons name="delete-sweep" size={32} color="#fff" />
        </Animated.View>
      </View>

      {/* Card */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
        activeOffsetX={[-8, 8]}
        failOffsetY={[-18, 18]}
      >
        <Animated.View
          onLayout={(e) => {
            cardWidthRef.current = e.nativeEvent.layout.width;
          }}
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
                <MaterialIcons name="check-circle" size={24} color={palette.success} style={styles.doneBadge} />
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
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl + 4,
  },
  card: {
    marginVertical: -1,
    marginHorizontal: -1,
    borderRadius: BorderRadius.lg,
    ...Shadows.subtle,
  },
  actionBgLeft: {
    left: 0,
    justifyContent: 'flex-start',
    borderTopLeftRadius: BorderRadius.lg,
    borderBottomLeftRadius: BorderRadius.lg,
  },
  actionBgRight: {
    right: 0,
    justifyContent: 'flex-end',
    borderTopRightRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
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
