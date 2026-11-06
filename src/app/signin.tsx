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

const signInSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormState = z.infer<typeof signInSchema>;

export default function SignInScreen() {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm<SignInFormState>({
        resolver: zodResolver(signInSchema),
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (form: SignInFormState) => {
        Alert.alert("Sign in form submitted", JSON.stringify(form, null, 2));
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
                    <Text style={styles.title}>Sign In</Text>
                    <Text style={styles.subtitle}>
                        Sign in page with React Hook Form + Zod validation.
                    </Text>

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

                    <Text style={styles.label}>Password</Text>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholder="Password"
                                secureTextEntry
                                style={[styles.input, errors.password && styles.inputError]}
                            />
                        )}
                    />
                    {!!errors.password && (
                        <Text style={styles.errorText}>{errors.password.message}</Text>
                    )}

                    <Pressable
                        onPress={handleSubmit(onSubmit)}
                        disabled={!isValid || isSubmitting}
                        style={[
                            styles.button,
                            (!isValid || isSubmitting) && styles.buttonDisabled,
                        ]}
                    >
                        <Text style={styles.buttonText}>Sign In</Text>
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