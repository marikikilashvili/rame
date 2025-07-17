import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Modal,
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
    countryOfResidence: "Georgia",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showCountryCodePicker, setShowCountryCodePicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+995",
    shortCode: "GE",
    name: "Georgia",
    flag: "🇬🇪",
  });
  const [signupMethod, setSignupMethod] = useState<"phone" | "email">("phone");

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

    // Navigate to verification page with form data
    const userIdentifier =
      signupMethod === "phone" ? formData.phone : formData.email;
    const userData = {
      fullName: formData.fullName,
      identifier: userIdentifier,
      method: signupMethod,
    };

    router.push({
      pathname: "/verification",
      params: userData,
    });
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
        {/* Form Container */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create content {"\n"}creator account</Text>
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
              underlineColorAndroid="#DDDDDD"
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
                  onPress={() => setShowCountryCodePicker(true)}
                >
                  <Text style={styles.countryShortCode}>
                    {selectedCountry.shortCode}
                  </Text>
                  <Text style={styles.countryCodeText}>
                    {selectedCountry.code}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color="#999" />
                </TouchableOpacity>
                <TextInput
                  style={[styles.phoneInput, errors.phone && styles.inputError]}
                  placeholder="555 555001"
                  placeholderTextColor="#999"
                  underlineColorAndroid="transparent"
                  value={formData.phone}
                  onChangeText={(text) => handleInputChange("phone", text)}
                  keyboardType="phone-pad"
                />
                <TouchableOpacity style={styles.phoneInputIcon}>
                  <Image
                    source={require("../assets/images/phone.png")}
                    style={styles.phoneIcon}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="your.email@example.com"
                placeholderTextColor="#999"
                underlineColorAndroid="#DDDDDD"
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
                underlineColorAndroid="#DDDDDD"
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
              underlineColorAndroid="#DDDDDD"
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
              underlineColorAndroid="#DDDDDD"
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
            <Text style={styles.label}>Instagram Account link</Text>
            <TextInput
              style={[
                styles.input,
                errors.instagramAccount && styles.inputError,
              ]}
              placeholder="https://www.instagram.com/nataliajoana/"
              placeholderTextColor="#999"
              underlineColorAndroid="#DDDDDD"
              value={formData.instagramAccount}
              onChangeText={(text) =>
                handleInputChange("instagramAccount", text)
              }
            />
            <Image
              source={require("../assets/images/instafb.png")}
              style={[styles.inputIcon, styles.socialLinkIcon]}
            />
            {errors.instagramAccount && (
              <Text style={styles.errorText}>{errors.instagramAccount}</Text>
            )}
          </View>

          {/* Facebook Account */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Facebook Account link</Text>
            <TextInput
              style={[
                styles.input,
                errors.facebookAccount && styles.inputError,
              ]}
              placeholder="https://www.facebook.com/nataliajoana/"
              placeholderTextColor="#999"
              underlineColorAndroid="#DDDDDD"
              value={formData.facebookAccount}
              onChangeText={(text) =>
                handleInputChange("facebookAccount", text)
              }
            />
            <Image
              source={require("../assets/images/instafb.png")}
              style={[styles.inputIcon, styles.socialLinkIcon]}
            />
            {errors.facebookAccount && (
              <Text style={styles.errorText}>{errors.facebookAccount}</Text>
            )}
          </View>

          {/* Country of Residence */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Country of residence</Text>
            <TouchableOpacity
              style={[
                styles.countrySelector,
                errors.countryOfResidence && styles.inputError,
              ]}
              onPress={() => setShowCountryPicker(true)}
            >
              <Ionicons name="chevron-down" size={20} color="#AAAAAA" />
              <Text style={styles.countrySelectorText}>
                {formData.countryOfResidence || "Select Country"}
              </Text>
            </TouchableOpacity>
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
                  color={formData.acceptTerms ? "#007AFF" : "#AAAAAA"}
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
        statusBarTranslucent={true}
        onRequestClose={() => setShowCalendar(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCalendar(false)}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Birthday</Text>
              <TouchableOpacity onPress={() => setShowCalendar(false)}>
                <Ionicons name="close" size={24} color="#000000" />
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
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Country Picker Modal */}
      <Modal
        visible={showCountryPicker}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCountryPicker(false)}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                <Ionicons name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.countriesList}>
              {countries.map((country) => (
                <TouchableOpacity
                  key={country.code}
                  style={styles.countryItem}
                  onPress={() => {
                    // Set country for residence field
                    handleInputChange("countryOfResidence", country.name);
                    setShowCountryPicker(false);
                  }}
                >
                  <Text style={styles.countryFlag}>{country.flag}</Text>
                  <Text style={styles.countryName}>{country.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Country Code Picker Modal for Phone */}
      <Modal
        visible={showCountryCodePicker}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setShowCountryCodePicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCountryCodePicker(false)}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country Code</Text>
              <TouchableOpacity onPress={() => setShowCountryCodePicker(false)}>
                <Ionicons name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.countriesList}>
              {countries.map((country) => (
                <TouchableOpacity
                  key={country.code}
                  style={styles.countryItem}
                  onPress={() => {
                    // Set country for phone code
                    setSelectedCountry(country);
                    setShowCountryCodePicker(false);
                  }}
                >
                  <Text style={styles.countryFlag}>{country.flag}</Text>
                  <Text style={styles.countryName}>{country.name}</Text>
                  <Text style={styles.countryCodeText}>{country.code}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 50,
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 38,
  },
  subtitle: {
    fontSize: 14,
    color: "#aaaaaa",
    marginBottom: 63,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 20,
    position: "relative",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "transparent",
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 12,
    fontSize: 14,
    color: "#000000",
    borderWidth: 0,
    paddingRight: 30,
  },
  inputWrapper: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    right: 0,
    top: 36,
  },
  phoneHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  emailOption: {
    color: "#aaaaaa",
    fontSize: 12,
    fontWeight: "500",
  },
  phoneInputContainer: {
    flexDirection: "row",
    gap: 10,
    position: "relative",
    paddingBottom: 0,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  countryCode: {
    backgroundColor: "transparent",
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 12,
    fontSize: 14,
    color: "#000000",
    borderWidth: 0,
    width: 60,
    textAlign: "center",
  },
  phoneInput: {
    backgroundColor: "transparent",
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 12,
    fontSize: 14,
    color: "#000000",
    borderWidth: 0,
    flex: 1,
    paddingRight: 50,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
    paddingHorizontal: 5,
  },
  checkbox: {
    marginRight: 10,
  },
  termsText: {
    fontSize: 12,
    color: "#AAAAAA",
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
    backgroundColor: "#263238",
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
    color: "#AAAAAA",
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
  phoneIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  socialLinkIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  phoneInputIcon: {
    position: "absolute",
    right: 0,
    top: 10,
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#AAAAAA",
    textAlign: "center",
  },
  footerLink: {
    color: "#007AFF",
    fontWeight: "500",
  },
  inputError: {
    borderBottomColor: "#FF3B30",
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
    right: -5,
    top: 1,
    padding: 5,
  },
  countryCodeButton: {
    backgroundColor: "transparent",
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 12,
    fontSize: 14,
    color: "#AAAAAA",
    borderWidth: 0,
    minWidth: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 4,
  },
  countryFlag: {
    fontSize: 16,
  },
  countryShortCode: {
    fontSize: 14,
    color: "#AAAAAA",
    fontWeight: "500",
  },
  countryCodeText: {
    fontSize: 14,
    color: "#AAAAAA",
    fontWeight: "500",
  },
  countrySelector: {
    backgroundColor: "transparent",
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 12,
    fontSize: 14,
    color: "#000000",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  countrySelectorText: {
    fontSize: 14,
    color: "#AAAAAA",
    flex: 1,
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
    borderBottomColor: "#DDDDDD",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
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
    color: "#000000",
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
    color: "#000000",
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
    color: "#000000",
  },
});
