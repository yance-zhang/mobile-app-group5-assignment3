import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import { z } from "zod";

const employeeSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be 50 characters or less"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[0-9+\-()\s]{7,20}$/, "Phone number format is invalid"),
  position: z
    .string()
    .min(2, "Position must be at least 2 characters")
    .max(40, "Position must be 40 characters or less"),
  postalCode: z
    .string()
    .regex(/^[A-Za-z0-9\s-]{3,10}$/, "Postal code format is invalid"),
});

type EmployeeFormState = z.infer<typeof employeeSchema>;

export default function EmployeeFormScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<EmployeeFormState>({
    resolver: zodResolver(employeeSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      position: "",
      postalCode: "",
    },
  });

  const onSubmit = (form: EmployeeFormState) => {
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
            Employee form with React Hook Form + Zod validation.
          </Text>

          <Text style={styles.label}>Full name</Text>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Full name"
                style={[styles.input, errors.fullName && styles.inputError]}
              />
            )}
          />
          {!!errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName.message}</Text>
          )}

          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                style={[styles.input, errors.email && styles.inputError]}
              />
            )}
          />
          {!!errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}

          <Text style={styles.label}>Phone</Text>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Phone"
                keyboardType="phone-pad"
                style={[styles.input, errors.phone && styles.inputError]}
              />
            )}
          />
          {!!errors.phone && (
            <Text style={styles.errorText}>{errors.phone.message}</Text>
          )}

          <Text style={styles.label}>Position</Text>
          <Controller
            control={control}
            name="position"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Position"
                style={[styles.input, errors.position && styles.inputError]}
              />
            )}
          />
          {!!errors.position && (
            <Text style={styles.errorText}>{errors.position.message}</Text>
          )}

          <Text style={styles.label}>Postal code</Text>
          <Controller
            control={control}
            name="postalCode"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Postal code"
                autoCapitalize="characters"
                style={[styles.input, errors.postalCode && styles.inputError]}
              />
            )}
          />
          {!!errors.postalCode && (
            <Text style={styles.errorText}>{errors.postalCode.message}</Text>
          )}

          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || isSubmitting}
            style={[
              styles.button,
              (!isValid || isSubmitting) && styles.buttonDisabled,
            ]}
          >
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
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: -4,
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
  inputError: {
    borderColor: "#dc2626",
    backgroundColor: "#fef2f2",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 12,
    marginTop: -6,
  },
  button: {
    marginTop: 4,
    backgroundColor: "#111827",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});
