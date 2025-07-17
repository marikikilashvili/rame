import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Main() {
  const [likedPosts, setLikedPosts] = useState(new Set());

  const toggleLike = (postId) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const posts = [
    {
      id: 1,
      username: "Vakhtang Vakhtangadze",
      handle: "@Mamarda",
      time: "7h",
      verified: true,
      content:
        "The best keeper in the Universe უტიერმებრი ხელოვნება ხელოვნობისაა დღეში",
      image: require("../assets/images/stadium.png"),
      likes: 12,
      comments: 3,
      shares: 1,
    },
    {
      id: 2,
      username: "Vakhtang Vakhtangadze",
      handle: "@Mamarda",
      time: "12h",
      verified: true,
      content:
        "Amazing match today! Champions League finals were incredible უტიერმებრი ხელოვნება",
      image: require("../assets/images/stadium.png"),
      likes: 25,
      comments: 8,
      shares: 4,
    },
    {
      id: 3,
      username: "Vakhtang Vakhtangadze",
      handle: "@Mamarda",
      time: "1d",
      verified: true,
      content:
        "Training session completed. Ready for the next big game! უტიერმებრი ხელოვნება ხელოვნობისაა",
      image: require("../assets/images/stadium.png"),
      likes: 18,
      comments: 5,
      shares: 2,
    },
    {
      id: 4,
      username: "Vakhtang Vakhtangadze",
      handle: "@Mamarda",
      time: "2d",
      verified: true,
      content:
        "Great atmosphere at the stadium today! Fans were amazing უტიერმებრი ხელოვნება დღეში",
      image: require("../assets/images/stadium.png"),
      likes: 32,
      comments: 12,
      shares: 6,
    },
    {
      id: 5,
      username: "Vakhtang Vakhtangadze",
      handle: "@Mamarda",
      time: "3d",
      verified: true,
      content:
        "Victory! What a game! Thank you to all the supporters უტიერმებრი ხელოვნება ხელოვნობისაა დღეში",
      image: require("../assets/images/stadium.png"),
      likes: 45,
      comments: 20,
      shares: 10,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#8E8E93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search ..."
            placeholderTextColor="#8E8E93"
          />
        </View>

        <View style={styles.headerBottom}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo1.png")}
              style={styles.logoImage}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsScrollView}
            contentContainerStyle={styles.tabsContainer}
          >
            <TouchableOpacity style={styles.tab}>
              <Image
                source={require("../assets/images/shape.png")}
                style={styles.tabImage}
              />
              <Text style={styles.tabText}>Niki</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Image
                source={require("../assets/images/shape.png")}
                style={styles.tabImage}
              />
              <Text style={styles.tabText}>Reçar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Image
                source={require("../assets/images/shape.png")}
                style={styles.tabImage}
              />
              <Text style={styles.tabText}>Sherry</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Image
                source={require("../assets/images/shape.png")}
                style={styles.tabImage}
              />
              <Text style={styles.tabText}>Alon</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <View key={post.id} style={styles.postWrapper}>
            <View style={styles.postContainer}>
              {/* Post Header */}
              <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                  <View style={styles.avatar}>
                    <Image
                      source={require("../assets/images/img.png")}
                      style={styles.avatarImage}
                    />
                  </View>
                  <View style={styles.userDetails}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.username}>{post.username}</Text>
                      {post.verified && (
                        <Ionicons
                          name="checkmark-circle"
                          size={16}
                          color="#1DA1F2"
                        />
                      )}
                    </View>
                    <Text style={styles.handle}>{post.handle}</Text>
                  </View>
                </View>
                <View style={styles.postTime}>
                  <Text style={styles.timeText}>{post.time}</Text>
                  <TouchableOpacity>
                    <Ionicons
                      name="ellipsis-horizontal"
                      size={20}
                      color="#657786"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Post Content */}
              <View style={styles.postContent}>
                <Text style={styles.postText}>{post.content}</Text>
                <View style={styles.imageContainer}>
                  <Image source={post.image} style={styles.postImage} />
                </View>
              </View>

              {/* Post Actions */}
              <View style={styles.postActions}>
                <View style={styles.leftActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => toggleLike(post.id)}
                  >
                    <Ionicons
                      name={likedPosts.has(post.id) ? "heart" : "heart-outline"}
                      size={25}
                      color={likedPosts.has(post.id) ? "#FF3040" : "#000000"}
                      style={
                        likedPosts.has(post.id)
                          ? {}
                          : {
                              shadowColor: "#000000",
                              shadowOffset: { width: 0, height: 0 },
                              shadowOpacity: 1,
                              shadowRadius: 0,
                            }
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Image
                      source={require("../assets/images/comment.png")}
                      style={styles.actionIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Image
                      source={require("../assets/images/share.png")}
                      style={styles.actionIcon}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.actionButton}>
                  <Image
                    source={require("../assets/images/save.png")}
                    style={styles.actionIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#263238",
  },
  header: {
    backgroundColor: "#263238",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#263238",
    paddingHorizontal: 0,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  searchInput: {
    flex: 1,
    color: "#E0E0E0",
    fontSize: 16,
    marginLeft: 10,
  },
  headerBottom: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginRight: 20,
  },
  logoImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  tabsScrollView: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    flexDirection: "column",
    marginRight: 10,
  },
  tabImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginBottom: 5,
  },
  tabText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  postWrapper: {
    marginHorizontal: 20,
    marginVertical: 10,
    marginTop: 51,
  },
  postContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 36,
    shadowColor: "#AAAAAA",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    overflow: "hidden",
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userDetails: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  username: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#14171A",
  },
  handle: {
    fontSize: 15,
    color: "#657786",
    marginTop: 2,
  },
  postTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  timeText: {
    fontSize: 15,
    color: "#657786",
  },
  postContent: {
    marginBottom: 12,
  },
  postText: {
    fontSize: 15,
    color: "#14171A",
    lineHeight: 20,
    marginBottom: 12,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 12,
    position: "relative",
    alignItems: "center",
  },
  postImage: {
    padding: 10,
    width: "100%",
    height: 220,
    resizeMode: "cover",
    borderRadius: 16,
  },
  imageSizeOverlay: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  imageSizeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 0,
  },
  leftActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  actionButton: {
    padding: 0,
  },
  actionIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  actionText: {
    fontSize: 13,
    color: "#657786",
    fontWeight: "500",
  },
});
