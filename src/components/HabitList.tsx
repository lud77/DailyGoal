import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import HabitItem from './HabitItem';
import { HabitListProps, Habit } from '../types';

const HabitList: React.FC<HabitListProps> = ({
  habits,
  onToggleHabit,
  onDeleteHabit,
}) => {
  const renderHabitItem: ListRenderItem<Habit> = ({ item }) => (
    <HabitItem
      habit={item}
      onToggle={onToggleHabit}
      onDelete={onDeleteHabit}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🎯</Text>
      <Text style={styles.emptyTitle}>No habits yet</Text>
      <Text style={styles.emptyDescription}>
        Tap the + button to add your first habit
      </Text>
    </View>
  );

  const renderHeader = () => {
    if (habits.length === 0) return null;

    const completedCount = habits.filter(habit => habit.completedToday).length;
    const totalCount = habits.length;

    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Today's Progress: {completedCount}/{totalCount}
        </Text>
        {completedCount === totalCount && totalCount > 0 && (
          <Text style={styles.congratsText}>🎉 All done! Great job!</Text>
        )}
      </View>
    );
  };

  const keyExtractor = (item: Habit) => item.id;

  return (
    <FlatList
      data={habits}
      renderItem={renderHabitItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={renderEmptyState}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={habits.length === 0 ? styles.emptyList : styles.list}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingTop: 8,
    paddingBottom: 100, // Space for FAB
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    textAlign: 'center',
  },
  congratsText: {
    fontSize: 14,
    color: '#28a745',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
});

export default HabitList;