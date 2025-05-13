import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: (selectedJob, jobId) => ({
    width: 250,
    padding: SIZES.xLarge,
    borderRadius: SIZES.medium,
    backgroundColor: selectedJob === jobId ? COLORS.primary : "#FFF",
    shadowColor: COLORS.lightWhite,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }),
  logoContainer: (selectedJob, jobId) => ({
    width: 50,
    height: 50,
    backgroundColor: selectedJob === jobId ? "#FFF" : COLORS.lightWhite,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "70%",
    height: "70%",
  },
  textContainer: {
    marginTop: SIZES.small,
  },
  jobName: (selectedJob) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: selectedJob === jobId ? COLORS.lightWhite : COLORS.primary,
  }),
  jobType: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: COLORS.gray,
    marginTop: 3,
  },
});

export default styles; 