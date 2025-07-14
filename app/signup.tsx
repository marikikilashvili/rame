import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
    instagramAccount: "",
    facebookAccount: "",
    countryOfResidence: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+995",
    flag: "��",
    name: "Georgia",
  });
  const [signupMethod, setSignupMethod] = useState<"phone" | "email">("phone");

  const countries = [
    { code: "+995", flag: "🇬🇪", name: "Georgia" },
    { code: "+1", flag: "🇺🇸", name: "United States" },
    { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
    { code: "+33", flag: "🇫🇷", name: "France" },
    { code: "+49", flag: "🇩🇪", name: "Germany" },
    { code: "+39", flag: "🇮🇹", name: "Italy" },
    { code: "+34", flag: "🇪🇸", name: "Spain" },
    { code: "+7", flag: "🇷🇺", name: "Russia" },
    { code: "+86", flag: "🇨🇳", name: "China" },
    { code: "+81", flag: "🇯🇵", name: "Japan" },
    { code: "+91", flag: "🇮🇳", name: "India" },
    { code: "+55", flag: "🇧🇷", name: "Brazil" },
    { code: "+52", flag: "🇲🇽", name: "Mexico" },
    { code: "+61", flag: "🇦🇺", name: "Australia" },
    { code: "+82", flag: "🇰🇷", name: "South Korea" },
    { code: "+90", flag: "🇹🇷", name: "Turkey" },
    { code: "+31", flag: "🇳🇱", name: "Netherlands" },
    { code: "+41", flag: "🇨🇭", name: "Switzerland" },
    { code: "+46", flag: "🇸🇪", name: "Sweden" },
    { code: "+47", flag: "🇳🇴", name: "Norway" },
    { code: "+45", flag: "🇩🇰", name: "Denmark" },
    { code: "+358", flag: "🇫🇮", name: "Finland" },
    { code: "+48", flag: "🇵🇱", name: "Poland" },
    { code: "+380", flag: "🇺🇦", name: "Ukraine" },
    { code: "+420", flag: "🇨🇿", name: "Czech Republic" },
    { code: "+36", flag: "🇭🇺", name: "Hungary" },
    { code: "+40", flag: "🇷🇴", name: "Romania" },
    { code: "+359", flag: "🇧🇬", name: "Bulgaria" },
    { code: "+30", flag: "🇬🇷", name: "Greece" },
    { code: "+351", flag: "🇵🇹", name: "Portugal" },
    { code: "+32", flag: "🇧🇪", name: "Belgium" },
    { code: "+43", flag: "🇦🇹", name: "Austria" },
    { code: "+353", flag: "🇮🇪", name: "Ireland" },
    { code: "+385", flag: "🇭🇷", name: "Croatia" },
    { code: "+381", flag: "🇷🇸", name: "Serbia" },
    { code: "+374", flag: "🇦🇲", name: "Armenia" },
    { code: "+994", flag: "🇦🇿", name: "Azerbaijan" },
    { code: "+375", flag: "🇧🇾", name: "Belarus" },
    { code: "+372", flag: "🇪🇪", name: "Estonia" },
    { code: "+371", flag: "🇱🇻", name: "Latvia" },
    { code: "+370", flag: "🇱🇹", name: "Lithuania" },
  ];
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Phone/Email validation
    if (signupMethod === "phone") {
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (formData.phone.length < 7) {
        newErrors.phone = "Please enter a valid phone number";
      }
    } else {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // Birthday validation
    if (!formData.birthday.trim()) {
      newErrors.birthday = "Birthday is required";
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formData.birthday)) {
      newErrors.birthday = "Please enter birthday in DD/MM/YYYY format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Instagram Account validation
    if (!formData.instagramAccount.trim()) {
      newErrors.instagramAccount = "Instagram account is required";
    } else if (
      !formData.instagramAccount.includes("instagram.com") &&
      !formData.instagramAccount.includes("@")
    ) {
      newErrors.instagramAccount =
        "Please enter a valid Instagram URL or username";
    }

    // Facebook Account validation
    if (!formData.facebookAccount.trim()) {
      newErrors.facebookAccount = "Facebook account is required";
    } else if (
      !formData.facebookAccount.includes("facebook.com") &&
      !formData.facebookAccount.includes("@")
    ) {
      newErrors.facebookAccount =
        "Please enter a valid Facebook URL or username";
    }

    // Country validation
    if (!formData.countryOfResidence.trim()) {
      newErrors.countryOfResidence = "Country of residence is required";
    }

    // Terms validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDate = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, "");

    // Format as DD/MM/YYYY
    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 4) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    } else if (cleaned.length <= 8) {
      return (
        cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4) + "/" + cleaned.slice(4)
      );
    } else {
      return (
        cleaned.slice(0, 2) +
        "/" +
        cleaned.slice(2, 4) +
        "/" +
        cleaned.slice(4, 8)
      );
    }
  };

  const handleBirthdayChange = (text: string) => {
    const formatted = formatDate(text);
    handleInputChange("birthday", formatted);
  };

  const handleDateChange = (day: number, month: number, year: number) => {
    const formattedDay = day.toString().padStart(2, "0");
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    handleInputChange("birthday", formattedDate);
    setShowCalendar(false);
  };

  const openCalendar = () => {
    setShowCalendar(true);
  };

  const generateCalendarDays = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 80; i <= currentYear; i++) {
      years.push(i);
    }
    return years.reverse();
  };

  const generateMonths = () => {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  };

  const openLink = (url: string) => {
    if (url) {
      Linking.openURL(url).catch(() => {
        Alert.alert("Error", "Cannot open this link");
      });
    }
  };

  const handleSignUp = () => {
    if (!validateForm()) {
      return;
    }

    // Navigate to verification page
    router.push("/verification");
  };

  const handleSocialLogin = (provider: string) => {
    // Handle social login
    Alert.alert("Social Login", `Signing in with ${provider}...`);
    // After successful social login, navigate to main app
    setTimeout(() => {
      router.push("/main");
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sign Up Page</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create content creator account</Text>
          <Text style={styles.subtitle}>
            Experience the world at your fingertips with our travel mobile app!
          </Text>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, errors.fullName && styles.inputError]}
              placeholder="Clifton Simmons"
              placeholderTextColor="#999"
              value={formData.fullName}
              onChangeText={(text) => handleInputChange("fullName", text)}
            />
            <Ionicons
              name="person-outline"
              size={20}
              color="#999"
              style={styles.inputIcon}
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}
          </View>

          {/* Phone/Email */}
          <View style={styles.inputGroup}>
            <View style={styles.phoneHeader}>
              <Text style={styles.label}>
                {signupMethod === "phone" ? "Phone" : "Email"}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setSignupMethod(signupMethod === "phone" ? "email" : "phone")
                }
              >
                <Text style={styles.emailOption}>
                  {signupMethod === "phone"
                    ? "Sign Up with Email"
                    : "Sign Up with Phone"}
                </Text>
              </TouchableOpacity>
            </View>

            {signupMethod === "phone" ? (
              <View style={styles.phoneInputContainer}>
                <TouchableOpacity
                  style={styles.countryCodeButton}
                  onPress={() => setShowCountryPicker(true)}
                >
                  <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
                  <Text style={styles.countryCodeText}>
                    {selectedCountry.code}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color="#999" />
                </TouchableOpacity>
                <TextInput
                  style={[styles.phoneInput, errors.phone && styles.inputError]}
                  placeholder="555 555001"
                  placeholderTextColor="#999"
                  value={formData.phone}
                  onChangeText={(text) => handleInputChange("phone", text)}
                  keyboardType="phone-pad"
                />
              </View>
            ) : (
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="your.email@example.com"
                placeholderTextColor="#999"
                value={formData.email || ""}
                onChangeText={(text) => handleInputChange("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}

            {errors.phone && signupMethod === "phone" && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
            {errors.email && signupMethod === "email" && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Birthday */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Birthday</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, errors.birthday && styles.inputError]}
                placeholder="16/02/2001"
                placeholderTextColor="#999"
                value={formData.birthday}
                onChangeText={handleBirthdayChange}
                keyboardType="numeric"
                maxLength={10}
              />
              <TouchableOpacity
                onPress={openCalendar}
                style={styles.calendarIcon}
              >
                <Ionicons name="calendar-outline" size={20} color="#999" />
              </TouchableOpacity>
            </View>
            {errors.birthday && (
              <Text style={styles.errorText}>{errors.birthday}</Text>
            )}
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="••••••••••••"
              placeholderTextColor="#999"
              value={formData.password}
              onChangeText={(text) => handleInputChange("password", text)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.inputIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={[
                styles.input,
                errors.confirmPassword && styles.inputError,
              ]}
              placeholder="••••••••••••"
              placeholderTextColor="#999"
              value={formData.confirmPassword}
              onChangeText={(text) =>
                handleInputChange("confirmPassword", text)
              }
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              style={styles.inputIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          {/* Instagram Account */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Instagram Account link</Text>
              {formData.instagramAccount && (
                <TouchableOpacity
                  onPress={() => openLink(formData.instagramAccount)}
                >
                  <Text style={styles.linkText}>Open</Text>
                </TouchableOpacity>
              )}
            </View>
            <TextInput
              style={[
                styles.input,
                errors.instagramAccount && styles.inputError,
              ]}
              placeholder="https://www.instagram.com/nataliajoana/"
              placeholderTextColor="#999"
              value={formData.instagramAccount}
              onChangeText={(text) =>
                handleInputChange("instagramAccount", text)
              }
            />
            <Ionicons
              name="logo-instagram"
              size={20}
              color="#999"
              style={styles.inputIcon}
            />
            {errors.instagramAccount && (
              <Text style={styles.errorText}>{errors.instagramAccount}</Text>
            )}
          </View>

          {/* Facebook Account */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Facebook Account link</Text>
              {formData.facebookAccount && (
                <TouchableOpacity
                  onPress={() => openLink(formData.facebookAccount)}
                >
                  <Text style={styles.linkText}>Open</Text>
                </TouchableOpacity>
              )}
            </View>
            <TextInput
              style={[
                styles.input,
                errors.facebookAccount && styles.inputError,
              ]}
              placeholder="https://www.facebook.com/nataliajoana/"
              placeholderTextColor="#999"
              value={formData.facebookAccount}
              onChangeText={(text) =>
                handleInputChange("facebookAccount", text)
              }
            />
            <Ionicons
              name="logo-facebook"
              size={20}
              color="#999"
              style={styles.inputIcon}
            />
            {errors.facebookAccount && (
              <Text style={styles.errorText}>{errors.facebookAccount}</Text>
            )}
          </View>

          {/* Country of Residence */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Country of residence</Text>
            <TextInput
              style={[
                styles.input,
                errors.countryOfResidence && styles.inputError,
              ]}
              placeholder="Georgia"
              placeholderTextColor="#999"
              value={formData.countryOfResidence}
              onChangeText={(text) =>
                handleInputChange("countryOfResidence", text)
              }
            />
            {errors.countryOfResidence && (
              <Text style={styles.errorText}>{errors.countryOfResidence}</Text>
            )}
          </View>

          {/* Terms and Conditions */}
          <View style={styles.inputGroup}>
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() =>
                  setFormData((prev) => ({
                    ...prev,
                    acceptTerms: !prev.acceptTerms,
                  }))
                }
              >
                <Ionicons
                  name={formData.acceptTerms ? "checkbox" : "square-outline"}
                  size={20}
                  color={formData.acceptTerms ? "#007AFF" : "#999"}
                />
              </TouchableOpacity>
              <Text style={styles.termsText}>
                Accept <Text style={styles.termsLink}>Terms and condition</Text>
              </Text>
              <Ionicons
                name="lock-closed-outline"
                size={16}
                color="#999"
                style={styles.lockIcon}
              />
            </View>
            {errors.acceptTerms && (
              <Text style={styles.errorText}>{errors.acceptTerms}</Text>
            )}
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Or sign in with */}
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
              Already have an account?{" "}
              <Link href="/signin">
                <Text style={styles.footerLink}>Sign In</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Birthday</Text>
              <TouchableOpacity onPress={() => setShowCalendar(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.calendarContainer}>
              <View style={styles.datePickerRow}>
                <Text style={styles.datePickerLabel}>Day</Text>
                <Text style={styles.datePickerLabel}>Month</Text>
                <Text style={styles.datePickerLabel}>Year</Text>
              </View>
              <View style={styles.datePickerRow}>
                <ScrollView
                  style={styles.datePickerColumn}
                  showsVerticalScrollIndicator={false}
                >
                  {generateCalendarDays().map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={styles.datePickerItem}
                      onPress={() => handleDateChange(day, 1, 2000)}
                    >
                      <Text style={styles.datePickerText}>{day}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <ScrollView
                  style={styles.datePickerColumn}
                  showsVerticalScrollIndicator={false}
                >
                  {generateMonths().map((month, index) => (
                    <TouchableOpacity
                      key={month}
                      style={styles.datePickerItem}
                      onPress={() => handleDateChange(1, index + 1, 2000)}
                    >
                      <Text style={styles.datePickerText}>{month}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <ScrollView
                  style={styles.datePickerColumn}
                  showsVerticalScrollIndicator={false}
                >
                  {generateYears().map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={styles.datePickerItem}
                      onPress={() => handleDateChange(1, 1, year)}
                    >
                      <Text style={styles.datePickerText}>{year}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  header: {
    backgroundColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
  formContainer: {
    paddingHorizontal: 19,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 20,
    position: "relative",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    paddingRight: 40,
  },
  inputIcon: {
    position: "absolute",
    right: 15,
    top: 36,
  },
  phoneHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  emailOption: {
    color: "#007AFF",
    fontSize: 12,
    fontWeight: "500",
  },
  phoneInputContainer: {
    flexDirection: "row",
    gap: 10,
  },
  countryCode: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    width: 60,
    textAlign: "center",
  },
  phoneInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    flex: 1,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  checkbox: {
    marginRight: 10,
  },
  termsText: {
    fontSize: 12,
    color: "#666",
    flex: 1,
  },
  termsLink: {
    color: "#007AFF",
    fontWeight: "500",
  },
  lockIcon: {
    marginLeft: 5,
  },
  signUpButton: {
    backgroundColor: "#4A5568",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#CBD5E0",
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    },
    socialContainer1: {
            flexDirection: "row",

    },
  socialText: {
    fontSize: 12,
    color: "#666",
    marginRight: 15,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialButton: {
    width: 45,
    height: 35,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
  },
  socialIcon: {
    width: 45,
    height: 35,
    resizeMode: "contain",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  footerLink: {
    color: "#007AFF",
    fontWeight: "500",
  },
  inputError: {
    borderColor: "#FF3B30",
    borderWidth: 1,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 5,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  linkText: {
    color: "#007AFF",
    fontSize: 12,
    fontWeight: "600",
  },
  inputWithIcon: {
    position: "relative",
  },
  calendarIcon: {
    position: "absolute",
    right: 15,
    top: 12,
    padding: 5,
  },
  countryCodeButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    minWidth: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  countryFlag: {
    fontSize: 16,
  },
  countryCodeText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
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
  calendarContainer: {
    padding: 20,
    maxHeight: 400,
  },
  datePickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  datePickerLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    flex: 1,
  },
  datePickerColumn: {
    flex: 1,
    maxHeight: 300,
    marginHorizontal: 5,
  },
  datePickerItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    alignItems: "center",
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
  },
});
