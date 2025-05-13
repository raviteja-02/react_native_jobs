import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import styles from "./remotejobs.style";
import { COLORS, SIZES, FONT } from "../../../constants";
import RemoteJobCard from "../../common/cards/remote/RemoteJobCard";
import useFetch1 from "../../../hook/useFetch1";
import VerticalScrollBar from "../../common/scrollbar/VerticalScrollBar";

const Remotejobs = () => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState();

  const { data, isLoading, error, refetch } = useFetch1("search", {
    query: "React developer",
    num_pages: "1",
    page: "1",
    job_type: "fulltime",
    remote_jobs_only: true
  });

  const handleCardPress = (item) => {
    if (!item?.job_id) return;
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Remote Jobs</Text>
        <TouchableOpacity onPress={() => router.push("/all-jobs")}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {error.message || 'Failed to fetch remote jobs'}
            </Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={handleRetry}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : !data || data.length === 0 ? (
          <Text style={styles.noDataText}>No remote jobs found</Text>
        ) : (
          <VerticalScrollBar>
            {data.map((item) => (
              <RemoteJobCard
                key={`remote-job-${item.job_id}`}
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            ))}
          </VerticalScrollBar>
        )}
      </View>
    </View>
  );
};

const additionalStyles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.medium
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: SIZES.medium,
    fontFamily: FONT.medium
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.medium,
    borderRadius: SIZES.small
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontFamily: FONT.medium
  },
  noDataText: {
    color: COLORS.gray2,
    textAlign: 'center',
    marginTop: SIZES.medium,
    fontFamily: FONT.medium
  }
});

export default Remotejobs; 