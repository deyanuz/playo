import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { AuthProvider } from "./AuthContext";
import { ModalPortal } from "react-native-modals";

export default function App() {
  return (
    <AuthProvider>
      <StackNavigator />
      <ModalPortal />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

//mongodb+srv://zunayedkhanofficial:<db_password>@cluster0.tmtff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
