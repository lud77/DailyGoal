import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { AddHabitModalProps } from '../types';

const AddHabitModal: React.FC<AddHabitModalProps> = ({
  visible,
  onClose,
  onAddHabit,
}) => {
  const [habitName, setHabitName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Validate input
  useEffect(() => {
    const trimmedName = habitName.trim();
    setIsValid(trimmedName.length >= 3 && trimmedName.length <= 50);
  }, [habitName]);

  // Auto-focus when modal opens
  useEffect(() => {
    if (visible) {
      // Small delay to ensure modal is fully rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      // Reset form when modal closes
      setHabitName('');
    }
  }, [visible]);

  const handleAdd = () => {
    const trimmedName = habitName.trim();

    if (!isValid) {
      Alert.alert(
        'Invalid Habit Name',
        'Habit name must be between 3 and 50 characters long.',
        [{ text: 'OK' }]
      );
      return;
    }

    onAddHabit(trimmedName);
    setHabitName('');
  };

  const handleCancel = () => {
    setHabitName('');
    onClose();
  };

  const handleSubmitEditing = () => {
    if (isValid) {
      handleAdd();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleCancel}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity activeOpacity={1} onPress={() => {}}>
              <View style={styles.modalContent}>
                {/* Header */}
                <View style={styles.header}>
                  <Text style={styles.title}>Add New Habit</Text>
                  <Text style={styles.subtitle}>
                    What healthy habit do you want to build?
                  </Text>
                </View>

                {/* Input Section */}
                <View style={styles.inputSection}>
                  <TextInput
                    ref={inputRef}
                    style={[
                      styles.input,
                      !isValid && habitName.length > 0 && styles.inputInvalid
                    ]}
                    value={habitName}
                    onChangeText={setHabitName}
                    placeholder="e.g., Drink 8 glasses of water"
                    placeholderTextColor="#9ca3af"
                    maxLength={50}
                    onSubmitEditing={handleSubmitEditing}
                    returnKeyType="done"
                    blurOnSubmit={false}
                  />

                  {/* Character Counter */}
                  <View style={styles.counterContainer}>
                    <Text style={[
                      styles.counter,
                      habitName.length > 45 && styles.counterWarning
                    ]}>
                      {habitName.length}/50
                    </Text>
                  </View>

                  {/* Validation Message */}
                  {habitName.length > 0 && !isValid && (
                    <Text style={styles.validationText}>
                      {habitName.trim().length < 3
                        ? 'Habit name must be at least 3 characters'
                        : 'Habit name is too long'
                      }
                    </Text>
                  )}
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancel}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.addButton,
                      !isValid && styles.addButtonDisabled
                    ]}
                    onPress={handleAdd}
                    disabled={!isValid}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.addButtonText,
                      !isValid && styles.addButtonTextDisabled
                    ]}>
                      Add Habit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  inputSection: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#212529',
    backgroundColor: '#f8f9fa',
  },
  inputInvalid: {
    borderColor: '#dc3545',
  },
  counterContainer: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  counter: {
    fontSize: 12,
    color: '#6c757d',
  },
  counterWarning: {
    color: '#fd7e14',
    fontWeight: '500',
  },
  validationText: {
    fontSize: 12,
    color: '#dc3545',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
  },
  addButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#007bff',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#e9ecef',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  addButtonTextDisabled: {
    color: '#adb5bd',
  },
});

export default AddHabitModal;