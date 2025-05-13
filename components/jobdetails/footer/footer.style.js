import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: COLORS.gray2,
    shadowColor: COLORS.gray2,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  likeBtn: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    shadowColor: COLORS.gray2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  likeBtnImage: {
    width: "40%",
    height: "40%",
    tintColor: COLORS.tertiary,
  },
  applyBtn: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SIZES.medium,
    borderRadius: SIZES.medium,
    shadowColor: COLORS.tertiary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  applyBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default styles;
