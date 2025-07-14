import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const sportsData = [
  "Tennis",
  "Water Polo",
  "Football",
  "Body Building",
  "Cycling",
  "Baseball",
  "Basketball",
  "Health",
  "Fighting Sports",
  "Fitness",
  "Track & Field",
  "Skiing",
  "Rhythmic",
  "Gymnastics",
  "Snowboard",
  "Sea Sports",
  "Swimming",
  "Cricket",
  "Volley Ball",
  "Hand Ball",
  "Rugby",
];

export default function Sports() {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSports = sportsData.filter((sport) =>
    sport.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSport = (sport: string) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(selectedSports.filter((s) => s !== sport));
    } else {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const handleNext = () => {
    // Navigate to teams selection
    router.push("/teams");
  };

  const handleSkip = () => {
    // Skip to teams selection
    router.push("/teams");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose favorite sports</Text>
        <Text style={styles.headerSubtitle}>
          Your account is ready to use. Tell us more about you and help us
          better prepare content for you
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search your mind..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Sports Grid */}
      <ScrollView
        style={styles.sportsContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sportsGrid}>
          {filteredSports.map((sport, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.sportButton,
                selectedSports.includes(sport) && styles.sportButtonSelected,
              ]}
              onPress={() => toggleSport(sport)}
            >
              <Text
                style={[
                  styles.sportButtonText,
                  selectedSports.includes(sport) &&
                    styles.sportButtonTextSelected,
                ]}
              >
                {sport}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 12,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginHorizontal: 24,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: "#2C3E50",
  },
  sportsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sportsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sportButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    minWidth: "30%",
    alignItems: "center",
  },
  sportButtonSelected: {
    backgroundColor: "#2C3E50",
    borderColor: "#2C3E50",
  },
  sportButtonText: {
    fontSize: 14,
    color: "#2C3E50",
    fontWeight: "500",
  },
  sportButtonTextSelected: {
    color: "#FFFFFF",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  nextButton: {
    backgroundColor: "#2C3E50",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  skipButton: {
    paddingVertical: 12,
  },
  skipButtonText: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
  },
});
