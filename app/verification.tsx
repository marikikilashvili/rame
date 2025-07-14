import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Verification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    // Start countdown timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      Alert.alert("Error", "Please enter complete verification code");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to onboarding
      router.push("/sports");
    }, 1500);
  };

  const handleResendCode = () => {
    if (!canResend) return;

    Alert.alert("Success", "Verification code sent!");
    setTimer(60);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    inputs.current[0]?.focus();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verification</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="mail-outline" size={64} color="#007AFF" />
        </View>

        <Text style={styles.title}>Check your SMS</Text>
        <Text style={styles.subtitle}>
          We've sent a verification code to{"\n"}
          <Text style={styles.phoneNumber}>+1 555 555001</Text>
        </Text>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(nativeEvent.key, index)
              }
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              autoFocus={index === 0}
            />
          ))}
        </View>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {canResend ? (
              <TouchableOpacity onPress={handleResendCode}>
                <Text style={styles.resendText}>Resend code</Text>
              </TouchableOpacity>
            ) : (
              `Resend code in ${timer}s`
            )}
          </Text>
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[
            styles.verifyButton,
            otp.join("").length === 6 && styles.verifyButtonActive,
          ]}
          onPress={handleVerify}
          disabled={otp.join("").length !== 6 || isLoading}
        >
          <Text style={styles.verifyButtonText}>
            {isLoading ? "Verifying..." : "Verify"}
          </Text>
        </TouchableOpacity>

        {/* Alternative verification */}
        <View style={styles.alternativeContainer}>
          <Text style={styles.alternativeText}>
            Didn't receive the code?{" "}
            <TouchableOpacity onPress={() => Alert.alert("Call", "Calling...")}>
              <Text style={styles.alternativeLink}>Call us</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  phoneNumber: {
    fontWeight: "600",
    color: "#333",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    width: width - 80,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 2,
    borderColor: "#E9ECEF",
    borderRadius: 8,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    backgroundColor: "#F8F9FA",
  },
  otpInputFilled: {
    borderColor: "#007AFF",
    backgroundColor: "#FFFFFF",
  },
  timerContainer: {
    marginBottom: 30,
  },
  timerText: {
    fontSize: 14,
    color: "#666",
  },
  resendText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  verifyButton: {
    backgroundColor: "#CBD5E0",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 30,
  },
  verifyButtonActive: {
    backgroundColor: "#007AFF",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  alternativeContainer: {
    marginTop: 20,
  },
  alternativeText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  alternativeLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
