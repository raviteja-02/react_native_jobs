import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Platform,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import * as Location from 'expo-location';

import styles from "./popularjobs.style";
import { COLORS, SIZES, FONT } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch1 from "../../../hook/useFetch1";
import HorizontalScrollBar from "../../common/scrollbar/HorizontalScrollBar";

const Popularjobs = ({ jobType }) => {
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
    })
  });

  const handleCardPress = (item) => {
    if (!item?.job_id) return;
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  const handleLocationError = () => {
    Alert.alert(
      "Location Access Required",
      "Please enable location access to see popular jobs",
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {location ? "Popular jobs near you" : "Popular jobs"}
        </Text>
        <TouchableOpacity onPress={() => router.push("/all-jobs")}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {errorMsg ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMsg}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={handleLocationError}
            >
              <Text style={styles.retryButtonText}>Enable Location</Text>
            </TouchableOpacity>
          </View>
        ) : isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {error.message || 'Failed to fetch jobs'}
            </Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={handleRetry}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : !data || data.length === 0 ? (
          <Text style={styles.noDataText}>No popular jobs found</Text>
        ) : (
          <HorizontalScrollBar
            contentContainerStyle={{ paddingHorizontal: SIZES.medium }}
          >
            {data.map((item) => (
              <PopularJobCard
                key={`popular-job-${item.job_id}`}
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            ))}
          </HorizontalScrollBar>
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

export default Popularjobs;
