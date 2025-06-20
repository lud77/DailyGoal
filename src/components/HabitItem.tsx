import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { HabitItemProps } from '../types';

const HabitItem: React.FC<HabitItemProps> = ({
  habit,
  onToggle,
  onDelete,
}) => {
  const handleToggle = () => {
    onToggle(habit.id);
  };

  const handleDelete = () => {
    onDelete(habit.id);
  };

  const hasDescription = habit.name.trim().length > 0;
  const displayText = hasDescription ? habit.name : 'No description';

  return (
    <View style={styles.container}>
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
            habit.completedToday && styles.habitTextCompleted,
            !hasDescription && styles.noDescription,
          ]}
        >
          {displayText}
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
    </View>
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
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 18,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  noDescription: {
    color: '#aaa',
    fontStyle: 'italic',
  }
});

export default HabitItem;