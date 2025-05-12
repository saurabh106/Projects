import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, useColorScheme, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { X, Eye, EyeOff, CheckCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useAuth } from '@/providers/AuthProvider';

export default function SignupScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { signup } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSignup = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setError(null);
    signup(email, password, name);
    router.back();
  };
  
  const passwordStrength = password.length >= 8 ? 'strong' : password.length >= 6 ? 'medium' : 'weak';
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <X size={24} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
          Join StoryScape and start your journey
        </Text>
        
        {error && (
          <View style={[styles.errorContainer, { backgroundColor: Colors[colorScheme ?? 'light'].errorBackground }]}>
            <Text style={[styles.errorText, { color: Colors[colorScheme ?? 'light'].error }]}>{error}</Text>
          </View>
        )}
        
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>Name</Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  backgroundColor: Colors[colorScheme ?? 'light'].card,
                  color: Colors[colorScheme ?? 'light'].text,
                  borderColor: Colors[colorScheme ?? 'light'].border,
                }
              ]}
              placeholder="Your full name"
              placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>Email</Text>
            <TextInput
              style={[
                styles.input, 
                { 
                  backgroundColor: Colors[colorScheme ?? 'light'].card,
                  color: Colors[colorScheme ?? 'light'].text,
                  borderColor: Colors[colorScheme ?? 'light'].border,
                }
              ]}
              placeholder="Your email address"
              placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.passwordInput, 
                  { 
                    backgroundColor: Colors[colorScheme ?? 'light'].card,
                    color: Colors[colorScheme ?? 'light'].text,
                    borderColor: Colors[colorScheme ?? 'light'].border,
                  }
                ]}
                placeholder="Create a password"
                placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                style={styles.passwordToggle} 
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color={Colors[colorScheme ?? 'light'].textSecondary} />
                ) : (
                  <Eye size={20} color={Colors[colorScheme ?? 'light'].textSecondary} />
                )}
              </TouchableOpacity>
            </View>
            
            {password && (
              <View style={styles.passwordStrength}>
                <View style={styles.strengthMeter}>
                  <View 
                    style={[
                      styles.strengthIndicator,
                      { 
                        width: passwordStrength === 'weak' ? '33%' : 
                               passwordStrength === 'medium' ? '66%' : '100%',
                        backgroundColor: passwordStrength === 'weak' ? Colors.light.error : 
                                          passwordStrength === 'medium' ? Colors.light.warning : 
                                          Colors.light.success 
                      }
                    ]} 
                  />
                </View>
                <Text style={[
                  styles.strengthText,
                  { 
                    color: passwordStrength === 'weak' ? Colors.light.error : 
                            passwordStrength === 'medium' ? Colors.light.warning : 
                            Colors.light.success 
                  }
                ]}>
                  {passwordStrength === 'weak' ? 'Weak' : 
                   passwordStrength === 'medium' ? 'Medium' : 'Strong'}
                </Text>
              </View>
            )}
            
            <View style={styles.passwordRequirements}>
              <View style={styles.requirementRow}>
                <CheckCircle 
                  size={16} 
                  color={password.length >= 6 ? Colors.light.success : Colors[colorScheme ?? 'light'].textSecondary} 
                />
                <Text 
                  style={[
                    styles.requirementText, 
                    { 
                      color: password.length >= 6 ? 
                        Colors.light.success : 
                        Colors[colorScheme ?? 'light'].textSecondary 
                    }
                  ]}
                >
                  At least 6 characters
                </Text>
              </View>
              
              <View style={styles.requirementRow}>
                <CheckCircle 
                  size={16} 
                  color={/[A-Z]/.test(password) ? Colors.light.success : Colors[colorScheme ?? 'light'].textSecondary} 
                />
                <Text 
                  style={[
                    styles.requirementText, 
                    { 
                      color: /[A-Z]/.test(password) ? 
                        Colors.light.success : 
                        Colors[colorScheme ?? 'light'].textSecondary 
                    }
                  ]}
                >
                  Contains uppercase letter
                </Text>
              </View>
              
              <View style={styles.requirementRow}>
                <CheckCircle 
                  size={16} 
                  color={/[0-9]/.test(password) ? Colors.light.success : Colors[colorScheme ?? 'light'].textSecondary} 
                />
                <Text 
                  style={[
                    styles.requirementText, 
                    { 
                      color: /[0-9]/.test(password) ? 
                        Colors.light.success : 
                        Colors[colorScheme ?? 'light'].textSecondary 
                    }
                  ]}
                >
                  Contains a number
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.termsContainer}>
            <Text style={[styles.termsText, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
              By signing up, you agree to our{' '}
              <Text style={[styles.termsLink, { color: Colors[colorScheme ?? 'light'].primary }]}>
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text style={[styles.termsLink, { color: Colors[colorScheme ?? 'light'].primary }]}>
                Privacy Policy
              </Text>
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.signupButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
            onPress={handleSignup}
          >
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.replace('/auth/login')}>
            <Text style={[styles.loginLink, { color: Colors[colorScheme ?? 'light'].primary }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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