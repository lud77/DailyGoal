import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import HabitList from '../components/HabitList';
import AddHabitModal from '../components/AddHabitModal';
import useHabits from '../hooks/useHabits';

const HomeScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { habits, addHabit, toggleHabit, deleteHabit } = useHabits();
  const insets = useSafeAreaInsets();

  const handleAddHabit = (habitName: string) => {
    addHabit(habitName);
    setIsModalVisible(false);
  };

  const getTodayString = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const completedCount = habits.filter((habit) => habit.completedToday).length;
  const totalCount = habits.length;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Daily Habits</Text>
        <Text style={styles.date}>{getTodayString()}</Text>
        {totalCount > 0 && (
          <Text style={styles.progress}>
            {completedCount} of {totalCount} completed
          </Text>
        )}
      </View>

      {/* Habit List */}
      <View style={styles.content}>
        <HabitList
          habits={habits}
          onToggleHabit={toggleHabit}
          onDeleteHabit={deleteHabit}
        />
      </View>

      {/* Add Button */}
      <TouchableOpacity
        style={[styles.addButton, { bottom: 30 + insets.bottom }]}
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Add Habit Modal */}
      <AddHabitModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddHabit={handleAddHabit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 8,
  },
  progress: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '300',
  },
});

export default HomeScreen;