import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  languageToggle: {
    position: "absolute",
    top: 60,
    right: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    zIndex: 1,
  },
  languageText: {
    fontSize: 14,
    fontWeight: "600",
  },
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  form: {
    flex: 1,
    justifyContent: "center",
  },
  submitButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  modeToggle: {
    alignItems: "center",
    paddingVertical: 16,
  },
  modeToggleText: {
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});
