import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignIn() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("phone"); // "phone" or "email"
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+995",
    flag: "🇬🇪",
    name: "Georgia",
    shortCode: "GE",
  });

  const countries = [
    { code: "+995", flag: "🇬🇪", name: "Georgia", shortCode: "GE" },
    { code: "+1", flag: "🇺🇸", name: "United States", shortCode: "US" },
    { code: "+44", flag: "🇬🇧", name: "United Kingdom", shortCode: "GB" },
    { code: "+33", flag: "🇫🇷", name: "France", shortCode: "FR" },
    { code: "+49", flag: "🇩🇪", name: "Germany", shortCode: "DE" },
    { code: "+39", flag: "🇮🇹", name: "Italy", shortCode: "IT" },
    { code: "+34", flag: "🇪🇸", name: "Spain", shortCode: "ES" },
    { code: "+7", flag: "🇷🇺", name: "Russia", shortCode: "RU" },
    { code: "+86", flag: "🇨🇳", name: "China", shortCode: "CN" },
    { code: "+81", flag: "🇯🇵", name: "Japan", shortCode: "JP" },
    { code: "+91", flag: "🇮🇳", name: "India", shortCode: "IN" },
    { code: "+55", flag: "🇧🇷", name: "Brazil", shortCode: "BR" },
    { code: "+52", flag: "🇲🇽", name: "Mexico", shortCode: "MX" },
    { code: "+61", flag: "🇦🇺", name: "Australia", shortCode: "AU" },
    { code: "+82", flag: "🇰🇷", name: "South Korea", shortCode: "KR" },
    { code: "+90", flag: "🇹🇷", name: "Turkey", shortCode: "TR" },
    { code: "+31", flag: "🇳🇱", name: "Netherlands", shortCode: "NL" },
    { code: "+41", flag: "🇨🇭", name: "Switzerland", shortCode: "CH" },
    { code: "+46", flag: "🇸🇪", name: "Sweden", shortCode: "SE" },
    { code: "+47", flag: "🇳🇴", name: "Norway", shortCode: "NO" },
    { code: "+45", flag: "🇩🇰", name: "Denmark", shortCode: "DK" },
    { code: "+358", flag: "🇫🇮", name: "Finland", shortCode: "FI" },
    { code: "+48", flag: "🇵🇱", name: "Poland", shortCode: "PL" },
    { code: "+380", flag: "🇺🇦", name: "Ukraine", shortCode: "UA" },
    { code: "+420", flag: "🇨🇿", name: "Czech Republic", shortCode: "CZ" },
    { code: "+36", flag: "🇭🇺", name: "Hungary", shortCode: "HU" },
    { code: "+40", flag: "🇷🇴", name: "Romania", shortCode: "RO" },
    { code: "+359", flag: "🇧🇬", name: "Bulgaria", shortCode: "BG" },
    { code: "+30", flag: "🇬🇷", name: "Greece", shortCode: "GR" },
    { code: "+351", flag: "🇵🇹", name: "Portugal", shortCode: "PT" },
    { code: "+32", flag: "🇧🇪", name: "Belgium", shortCode: "BE" },
    { code: "+43", flag: "🇦🇹", name: "Austria", shortCode: "AT" },
    { code: "+353", flag: "🇮🇪", name: "Ireland", shortCode: "IE" },
    { code: "+385", flag: "🇭🇷", name: "Croatia", shortCode: "HR" },
    { code: "+381", flag: "🇷🇸", name: "Serbia", shortCode: "RS" },
    { code: "+374", flag: "🇦🇲", name: "Armenia", shortCode: "AM" },
    { code: "+994", flag: "🇦🇿", name: "Azerbaijan", shortCode: "AZ" },
    { code: "+375", flag: "🇧🇾", name: "Belarus", shortCode: "BY" },
    { code: "+372", flag: "🇪🇪", name: "Estonia", shortCode: "EE" },
    { code: "+371", flag: "🇱🇻", name: "Latvia", shortCode: "LV" },
    { code: "+370", flag: "🇱🇹", name: "Lithuania", shortCode: "LT" },
  ];

  const handleSignIn = () => {
    if (loginMethod === "phone") {
      if (!phone || !password) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
    } else {
      if (!email || !password) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        Alert.alert("Error", "Please enter a valid email address");
        return;
      }
    }

    // Navigate directly to main app
    router.push("/main");
  };

  const handleSocialLogin = (provider: string) => {
    // Handle social login
    Alert.alert("Social Login", `Signing in with ${provider}...`);
    // After successful social login, navigate to main app
    setTimeout(() => {
      router.push("/main");
    }, 1000);
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password" as any);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with curved background */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <Image
                source={require("../assets/images/logo1.png")}
                style={styles.logoImage}
              />
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subtitle}>your account</Text>
          <Text style={styles.description}>
            Experience the world at your fingertips with our social mobile app!
          </Text>

          {/* Login Method Toggle */}
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>
              {loginMethod === "phone" ? "Phone" : "Email"}
            </Text>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() =>
                setLoginMethod(loginMethod === "phone" ? "email" : "phone")
              }
            >
              <Text style={styles.toggleText}>
                {loginMethod === "phone"
                  ? "Login with Email"
                  : "Login with Phone"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            {loginMethod === "phone" ? (
              <View style={styles.phoneInputContainer}>
                <TouchableOpacity
                  style={styles.countryCode}
                  onPress={() => setShowCountryPicker(true)}
                >
                  <Text style={styles.countryShortCode}>
                    {selectedCountry.shortCode}
                  </Text>
                  <Text style={styles.countryCodeText}>
                    {selectedCountry.code}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color="#666" />
                </TouchableOpacity>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="555 555001"
                  placeholderTextColor="#999"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
                <TouchableOpacity style={styles.inputIcon}>
                  <Image
                    source={require("../assets/images/phone.png")}
                    style={styles.phoneIcon}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.emailInputContainer}>
                <TextInput
                  style={styles.emailInput}
                  placeholder="your.email@example.com"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TouchableOpacity style={styles.inputIcon}>
                  <Ionicons name="mail-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.passwordContainer}>
              <Text style={styles.passwordLabel}>Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••••••••"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <Text style={styles.socialText}>Or sign in with</Text>
            <View style={styles.socialContainer1}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialLogin("Apple")}
              >
                <Image
                  source={require("../assets/images/apple.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialLogin("Google")}
              >
                <Image
                  source={require("../assets/images/google.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialLogin("Facebook")}
              >
                <Image
                  source={require("../assets/images/facebook.png")}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Link href="/signup" style={styles.footerLink}>
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Country Picker Modal */}
      <Modal
        visible={showCountryPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.countriesList}>
              {countries.map((country) => (
                <TouchableOpacity
                  key={country.code}
                  style={styles.countryItem}
                  onPress={() => {
                    setSelectedCountry(country);
                    setShowCountryPicker(false);
                  }}
                >
                  <Text style={styles.countryFlag}>{country.flag}</Text>
                  <Text style={styles.countryName}>{country.name}</Text>
                  <Text style={styles.countryCodeText}>{country.code}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    backgroundColor: "#2C3E50",
    height: 280,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  logoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 97,
    height: 85,
    resizeMode: "contain",
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 19,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#263238",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#263238",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 32,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  toggleLabel: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "600",
  },
  toggleButton: {
    paddingVertical: 8,
  },
  toggleText: {
    fontSize: 16,
    color: "#AAAAAA",
    fontWeight: "600",
  },
  inputContainer: {
    marginBottom: 32,
  },
  passwordContainer: {
    marginBottom: 16,
  },
  passwordLabel: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "600",
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 16,
    backgroundColor: "transparent",
    paddingVertical: 8,
  },
  emailInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 16,
    backgroundColor: "transparent",
    paddingVertical: 8,
  },
  emailInput: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 8,
    fontSize: 16,
    color: "#263238",
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 8,
    marginRight: 12,
  },
  countryShortCode: {
    fontSize: 16,
    color: "#AAAAAA",
    fontWeight: "600",
    marginRight: 8,
  },
  countryCodeText: {
    fontSize: 16,
    color: "#AAAAAA",
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 8,
    fontSize: 16,
    color: "#AAAAAA",
  },
  inputIcon: {
    padding: 8,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "transparent",
    paddingVertical: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 8,
    fontSize: 16,
    color: "#AAAAAA",
  },
  passwordToggle: {
    padding: 8,
  },
  forgotPassword: {
    alignSelf: "flex-start",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#AAAAAA",
    fontWeight: "600",
  },
  signInButton: {
    backgroundColor: "#2C3E50",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  socialContainer1: {
    flexDirection: "row",
  },
  socialText: {
    fontSize: 14,
    color: "#666",
    marginRight: 16,
  },
  socialButton: {
    width: 45,
    height: 35,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  socialIcon: {
    width: 45,
    height: 35,
    resizeMode: "contain",
  },
  phoneIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 32,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  footerLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
  countryFlag: {
    fontSize: 16,
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  countriesList: {
    padding: 20,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
});
