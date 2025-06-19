import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { HabitItemProps } from '../types';

const HabitItem: React.FC<HabitItemProps> = ({
  habit,
  onToggle,
  onDelete,
}) => {
  const scaleValue = new Animated.Value(1);

  const handleToggle = () => {
    // Add a subtle animation when toggling
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onToggle(habit.id);
  };

  const handleDelete = () => {
    onDelete(habit.id);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleValue }] }
      ]}
    >
      {/* Checkbox */}
      <TouchableOpacity
        style={[
          styles.checkbox,
          habit.completedToday && styles.checkboxCompleted
        ]}
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        {habit.completedToday && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </TouchableOpacity>

      {/* Habit Name */}
      <TouchableOpacity
        style={styles.habitTextContainer}
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.habitText,
            habit.completedToday && styles.habitTextCompleted
          ]}
        >
          {habit.name}
        </Text>
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#dee2e6',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  habitTextContainer: {
    flex: 1,
  },
  habitText: {
    fontSize: 16,
    color: '#212529',
    lineHeight: 22,
  },
  habitTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#6c757d',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#dc3545',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
  },
});

export default HabitItem;