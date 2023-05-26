import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch1 from "../../../hook/useFetch1";

const Nearbyjobs = () => {
  const navigation = useNavigation();

  const { data, isLoading, error } = useFetch1("search", {
    query: "React developer",
    num_pages: "1",
    page: "1",
  });

  const handleNavigate = (jobId) => {
    navigation.navigate("JobDetails", { jobId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AllJobs")}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              key={`nearby-job-${job.job_id}`}
              job={job}
              handleNavigate={() => handleNavigate(job.job_id)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
