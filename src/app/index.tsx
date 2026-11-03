import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type EmployeeFormState = {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  postalCode: string;
};

const defaultForm: EmployeeFormState = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  postalCode: "",
};

export default function EmployeeFormScreen() {
  const [form, setForm] = useState<EmployeeFormState>(defaultForm);

  const handleChange = (key: keyof EmployeeFormState, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = () => {
    Alert.alert("Employee form submitted", JSON.stringify(form, null, 2));
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Employee Information</Text>
          <Text style={styles.subtitle}>
            Basic form skeleton for Assignment 3.
          </Text>

          <TextInput
            value={form.fullName}
            onChangeText={(text) => handleChange("fullName", text)}
            placeholder="Full name"
            style={styles.input}
          />

          <TextInput
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <TextInput
            value={form.phone}
            onChangeText={(text) => handleChange("phone", text)}
            placeholder="Phone"
            keyboardType="phone-pad"
            style={styles.input}
          />

          <TextInput
            value={form.position}
            onChangeText={(text) => handleChange("position", text)}
            placeholder="Position"
            style={styles.input}
          />

          <TextInput
            value={form.postalCode}
            onChangeText={(text) => handleChange("postalCode", text)}
            placeholder="Postal code"
            autoCapitalize="characters"
            style={styles.input}
          />

          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    gap: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  button: {
    marginTop: 4,
    backgroundColor: "#111827",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});
