import { useRef } from 'react';
import { Animated, View, Text, Pressable, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { UiPalette } from '@/lib/themes';
import { Spacing, BorderRadius, Shadows, FontSizes } from '@/lib/design-tokens';

type SwipeActionType = 'delete' | 'done' | 'edit';

interface SwipeableCardProps {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  timestamp: string;
  palette: UiPalette;
  isDone?: boolean;
  onPress: () => void;
  onLeftSwipe: () => void; // Delete action
  onRightSwipe?: () => void; // Mark done action (optional for shopping)
  showDoneAction?: boolean; // Whether to show right swipe action
}

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
  const actionPreview = useRef(new Animated.Value(0)).current;
  const swipeThreshold = 60;

  const onGestureEvent = Animated.event([{ nativeEvent: { translationX: translateX } }], {
    useNativeDriver: false,
  });

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;

      if (translationX < -swipeThreshold) {
        // Left swipe - DELETE
        Animated.timing(translateX, {
          toValue: -120,
          duration: 200,
          useNativeDriver: false,
        }).start();
        setTimeout(() => onLeftSwipe(), 100);
      } else if (translationX > swipeThreshold && showDoneAction && onRightSwipe) {
        // Right swipe - MARK DONE
        Animated.timing(translateX, {
          toValue: 120,
          duration: 200,
          useNativeDriver: false,
        }).start();
        setTimeout(() => onRightSwipe(), 100);
      } else {
        // Reset
        Animated.timing(translateX, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  // Update action preview based on swipe distance
  const showDeletePreview = translateX.__getValue?.() < -20;
  const showDonePreview = showDoneAction && translateX.__getValue?.() > 20;

  return (
    <View style={styles.container}>
      {/* Background Actions */}
      {showDoneAction && (
        <View
          style={[
            styles.actionLeft,
            {
              backgroundColor: palette.success,
            },
          ]}
        >
          <MaterialIcons name="done-all" size={24} color="#fff" />
          <Text style={styles.actionText}>Done</Text>
        </View>
      )}

      <View
        style={[
          styles.actionRight,
          {
            backgroundColor: palette.danger,
          },
        ]}
      >
        <MaterialIcons name="delete-outline" size={24} color="#fff" />
        <Text style={styles.actionText}>Delete</Text>
      </View>

      {/* Swipeable Card */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
        activeOffsetX={[-5, 5]}
      >
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: palette.surface,
              transform: [{ translateX }],
            },
          ]}
        >
          <Pressable
            onPress={onPress}
            style={styles.pressable}
          >
            <View style={styles.cardContent}>
              {/* Icon */}
              <View
                style={[
                  styles.iconWrapper,
                  {
                    backgroundColor: palette.accentLight,
                  },
                ]}
              >
                <MaterialIcons name={icon} size={20} color={iconColor} />
              </View>

              {/* Text Content */}
              <View style={styles.textContent}>
                <Text
                  style={[
                    styles.title,
                    {
                      color: palette.text,
                      textDecorationLine: isDone ? 'line-through' : 'none',
                    },
                  ]}
                  numberOfLines={1}
                >
                  {title}
                </Text>
                <Text
                  style={[styles.subtitle, { color: palette.textTertiary }]}
                  numberOfLines={1}
                >
                  {subtitle}
                </Text>
                <Text
                  style={[styles.timestamp, { color: palette.textTertiary }]}
                  numberOfLines={1}
                >
                  {timestamp}
                </Text>
              </View>

              {/* Swipe Action Preview (Right Side) */}
              {showDeletePreview && (
                <View style={styles.previewIcon}>
                  <MaterialIcons name="delete-outline" size={20} color={palette.danger} />
                </View>
              )}

              {showDonePreview && (
                <View style={styles.previewIcon}>
                  <MaterialIcons name="done-all" size={20} color={palette.success} />
                </View>
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
    marginBottom: Spacing.md,
    overflow: 'hidden',
    borderRadius: BorderRadius.lg,
  },
  actionLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    borderRadius: BorderRadius.lg,
    zIndex: 0,
  },
  actionRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    borderRadius: BorderRadius.lg,
    zIndex: 0,
  },
  actionText: {
    color: '#fff',
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  card: {
    borderRadius: BorderRadius.lg,
    ...Shadows.subtle,
    zIndex: 1,
  },
  pressable: {
    flex: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContent: {
    flex: 1,
    gap: Spacing.xs,
  },
  title: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    lineHeight: 20,
  },
  subtitle: {
    fontSize: FontSizes.sm,
    fontWeight: '400',
    lineHeight: 16,
  },
  timestamp: {
    fontSize: FontSizes.xs,
    fontWeight: '400',
    lineHeight: 14,
  },
  previewIcon: {
    marginLeft: Spacing.sm,
  },
});
