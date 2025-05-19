import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, CheckCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function SignupScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');

  const passwordStrength = password.length >= 8 ? 'strong' : password.length >= 6 ? 'medium' : 'weak';

  const handleSignup = async () => {
    if (!isLoaded) return;

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!emailAddress.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError(null);

    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred during sign-up');
    }
  };

  const handleVerification = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('An error occurred during verification');
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify your email</Text>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={setCode}
        />
        <TouchableOpacity style={styles.button} onPress={handleVerification}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder="Your full name"
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        value={emailAddress}
        placeholder="Your email address"
        onChangeText={setEmailAddress}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Create a password"
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.passwordToggle} onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </TouchableOpacity>
      </View>
      {password && (
        <View style={styles.passwordStrength}>
          <View
            style={[
              styles.strengthIndicator,
              {
                width: passwordStrength === 'weak' ? '33%' : passwordStrength === 'medium' ? '66%' : '100%',
                backgroundColor:
                  passwordStrength === 'weak'
                    ? Colors.light.error
                    : passwordStrength === 'medium'
                    ? Colors.light.warning
                    : Colors.light.success,
              },
            ]}
          />
          <Text
            style={[
              styles.strengthText,
              {
                color:
                  passwordStrength === 'weak'
                    ? Colors.light.error
                    : passwordStrength === 'medium'
                    ? Colors.light.warning
                    : Colors.light.success,
              },
            ]}
          >
            {passwordStrength === 'weak' ? 'Weak' : passwordStrength === 'medium' ? 'Medium' : 'Strong'}
          </Text>
        </View>
      )}
      <View style={styles.passwordRequirements}>
        <View style={styles.requirementRow}>
          <CheckCircle size={16} color={password.length >= 6 ? Colors.light.success : Colors.light.textSecondary} />
          <Text
            style={[
              styles.requirementText,
              { color: password.length >= 6 ? Colors.light.success : Colors.light.textSecondary },
            ]}
          >
            At least 6 characters
          </Text>
        </View>
        <View style={styles.requirementRow}>
          <CheckCircle
            size={16}
            color={/[A-Z]/.test(password) ? Colors.light.success : Colors.light.textSecondary}
          />
          <Text
            style={[
              styles.requirementText,
              { color: /[A-Z]/.test(password) ? Colors.light.success : Colors.light.textSecondary },
            ]}
          >
            Contains uppercase letter
          </Text>
        </View>
        <View style={styles.requirementRow}>
          <CheckCircle
            size={16}
            color={/[0-9]/.test(password) ? Colors.light.success : Colors.light.textSecondary}
          />
          <Text
            style={[
              styles.requirementText,
              { color: /[0-9]/.test(password) ? Colors.light.success : Colors.light.textSecondary },
            ]}
          >
            Contains a number
          </Text>
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
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
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 32,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    paddingRight: 48,
  },
  passwordToggle: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  passwordStrength: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  strengthMeter: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginRight: 8,
  },
  strengthIndicator: {
    height: '100%',
    borderRadius: 2,
  },
  strengthText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  passwordRequirements: {
    marginTop: 16,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 8,
  },
  termsContainer: {
    marginBottom: 24,
  },
  termsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    fontFamily: 'Inter-Medium',
  },
  signupButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  signupButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  loginText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginRight: 4,
  },
  loginLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
});