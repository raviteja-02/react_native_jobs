import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, Platform, Linking } from "react-native";
import { useRouter } from "expo-router";
import * as Location from 'expo-location';

import nearbyStyles from "./nearbyjobs.style";
import { COLORS, SIZES, FONT } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch1 from "../../../hook/useFetch1";
import VerticalScrollBar from "../../common/scrollbar/VerticalScrollBar";

const Nearbyjobs = ({ jobType }) => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setLocation(location);
      } catch (error) {
        setErrorMsg('Error getting location');
        console.error('Location error:', error);
      }
    })();
  }, []);

  const { data, isLoading, error, refetch } = useFetch1("search", {
    query: "React developer",
    num_pages: "1",
    page: "1",
    job_type: jobType?.toLowerCase().replace('-', '') || 'fulltime',
    ...(location && {
      latitude: location.coords.latitude.toString(),
      longitude: location.coords.longitude.toString(),
      radius: "50", // 50km radius
      sort_by: "distance" // Sort by distance from user's location
    }),
    // Additional parameters for better results
    employment_types: jobType?.toLowerCase().replace('-', '') || 'fulltime',
    date_posted: "all",
    job_required_skills: "React, JavaScript, TypeScript",
    job_excluded_keywords: "US only, United States only",
    country: "any"
  });

  const handleCardPress = (item) => {
    if (!item?.job_id) return;
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  const handleLocationError = () => {
    Alert.alert(
      "Location Access Required",
      "Please enable location access to see nearby jobs",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Settings", 
          onPress: () => {
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              Linking.openSettings();
            }
          }
        }
      ]
    );
  };

  const handleRetry = () => {
    if (errorMsg) {
      // If there's a location error, try to get location again
      (async () => {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }

          let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          setLocation(location);
          setErrorMsg(null);
        } catch (error) {
          setErrorMsg('Error getting location');
          console.error('Location error:', error);
        }
      })();
    } else {
      // If it's an API error, retry the fetch
      refetch();
    }
  };

  // Filter out invalid job items
  const validJobs = data?.filter(job => job && job.job_id) || [];

  return (
    <View style={nearbyStyles.container}>
      <View style={nearbyStyles.header}>
        <Text style={nearbyStyles.headerTitle}>
          {location ? "Jobs near you" : "Nearby jobs"}
        </Text>
        <TouchableOpacity onPress={() => router.push("/all-jobs")}>
          <Text style={nearbyStyles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={nearbyStyles.cardsContainer}>
        {errorMsg ? (
          <View style={nearbyStyles.errorContainer}>
            <Text style={nearbyStyles.errorText}>{errorMsg}</Text>
            <TouchableOpacity 
              style={nearbyStyles.retryButton}
              onPress={handleLocationError}
            >
              <Text style={nearbyStyles.retryButtonText}>Enable Location</Text>
            </TouchableOpacity>
          </View>
        ) : isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <View style={nearbyStyles.errorContainer}>
            <Text style={nearbyStyles.errorText}>
              {error.message || 'Failed to fetch jobs'}
            </Text>
            <TouchableOpacity 
              style={nearbyStyles.retryButton}
              onPress={handleRetry}
            >
              <Text style={nearbyStyles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : validJobs.length === 0 ? (
          <Text style={nearbyStyles.noDataText}>No nearby jobs found</Text>
        ) : (
          <VerticalScrollBar>
            {validJobs.map((item) => (
              <NearbyJobCard
                key={`nearby-job-${item.job_id}`}
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

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
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

export default Nearbyjobs;
