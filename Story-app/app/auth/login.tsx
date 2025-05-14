import Colors from "@/constants/Colors";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import { Eye, EyeOff, X } from "lucide-react-native";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!password) {
      setError("Please enter yours password");
      return;
    }

    setError(null);
    login(email, password);
    router.back();
  };

  const handleAnonymousLogin = () => {
    login("anonymous", "");
    router.back();
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].background },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <X size={24} color={Colors[colorScheme ?? "light"].text} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text
          style={[styles.title, { color: Colors[colorScheme ?? "light"].text }]}
        >
          Welcome Back
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: Colors[colorScheme ?? "light"].textSecondary },
          ]}
        >
          Sign in to continue your storytelling journey
        </Text>

        {error && (
          <View
            style={[
              styles.errorContainer,
              {
                backgroundColor: Colors[colorScheme ?? "light"].errorBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.errorText,
                { color: Colors[colorScheme ?? "light"].error },
              ]}
            >
              {error}
            </Text>
          </View>
        )}

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text
              style={[
                styles.label,
                { color: Colors[colorScheme ?? "light"].text },
              ]}
            >
              Email
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: Colors[colorScheme ?? "light"].card,
                  color: Colors[colorScheme ?? "light"].text,
                  borderColor: Colors[colorScheme ?? "light"].border,
                },
              ]}
              placeholder="Your email address"
              placeholderTextColor={
                Colors[colorScheme ?? "light"].textSecondary
              }
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text
              style={[
                styles.label,
                { color: Colors[colorScheme ?? "light"].text },
              ]}
            >
              Password
            </Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.passwordInput,
                  {
                    backgroundColor: Colors[colorScheme ?? "light"].card,
                    color: Colors[colorScheme ?? "light"].text,
                    borderColor: Colors[colorScheme ?? "light"].border,
                  },
                ]}
                placeholder="Your password"
                placeholderTextColor={
                  Colors[colorScheme ?? "light"].textSecondary
                }
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                 <EyeOff 
          size={20} 
          color={Colors[colorScheme ?? 'light'].textSecondary} 

        />
                ) : (
                  <Eye
                    size={20}
                    color={Colors[colorScheme ?? "light"].textSecondary}
                  />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.forgotPassword}>
              <Text
                style={[
                  styles.forgotPasswordText,
                  { color: Colors[colorScheme ?? "light"].primary },
                ]}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.loginButton,
              { backgroundColor: Colors[colorScheme ?? "light"].primary },
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View
              style={[
                styles.dividerLine,
                { backgroundColor: Colors[colorScheme ?? "light"].border },
              ]}
            />
            <Text
              style={[
                styles.dividerText,
                { color: Colors[colorScheme ?? "light"].textSecondary },
              ]}
            >
              or
            </Text>
            <View
              style={[
                styles.dividerLine,
                { backgroundColor: Colors[colorScheme ?? "light"].border },
              ]}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.anonymousButton,
              { borderColor: Colors[colorScheme ?? "light"].border },
            ]}
            onPress={handleAnonymousLogin}
          >
            <Text
              style={[
                styles.anonymousButtonText,
                { color: Colors[colorScheme ?? "light"].text },
              ]}
            >
              Continue as Guest
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text
            style={[
              styles.signupText,
              { color: Colors[colorScheme ?? "light"].textSecondary },
            ]}
          >
            Don&apos;t have an account?
          </Text>
          <TouchableOpacity onPress={() => router.replace("/auth/signup")}>
            <Text
              style={[
                styles.signupLink,
                { color: Colors[colorScheme ?? "light"].primary },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  closeButton: {
    padding: 8,
    alignSelf: "flex-start",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontFamily: "Merriweather-Bold",
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    marginBottom: 32,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
  },
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    paddingRight: 48,
  },
  passwordToggle: {
    position: "absolute",
    right: 16,
    top: 12,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  forgotPasswordText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
  },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  loginButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    paddingHorizontal: 16,
  },
  anonymousButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
  },
  anonymousButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: 24,
  },
  signupText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    marginRight: 4,
  },
  signupLink: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
  },
});
