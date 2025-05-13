import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./nearbyjobcard.style";
import { checkImageURL } from "../../../../utils";
import { COLORS } from "../../../../constants";

const NearbyJobCard = ({ item, selectedJob, handleCardPress }) => {
  if (!item) return null;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selectedJob === item?.job_id && { backgroundColor: COLORS.primary }
      ]}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity 
        style={[
          styles.logoContainer,
          selectedJob === item?.job_id && { backgroundColor: COLORS.white }
        ]}
      >
        <Image
          source={{
            uri: checkImageURL(item?.employer_logo)
              ? item.employer_logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text 
          style={[
            styles.jobName,
            selectedJob === item?.job_id && { color: COLORS.white }
          ]} 
          numberOfLines={1}
        >
          {item?.job_title || "No title"}
        </Text>
        <Text 
          style={[
            styles.jobType,
            selectedJob === item?.job_id && { color: COLORS.lightWhite }
          ]}
        >
          {item?.job_employment_type || "Full-time"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
