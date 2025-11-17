// app/modal.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ModalProps {
  message: string;
}

export default function Modal({ message }: ModalProps) {
  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});