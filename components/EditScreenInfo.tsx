import { useNavigation } from "@react-navigation/native"
import * as WebBrowser from "expo-web-browser"
import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"

import Colors from "../constants/Colors"
import { MonoText } from "./StyledText"
import { Text, View } from "./Themed"

export default function EditScreenInfo({ path }: { path: string }) {
  const navigation = useNavigation()
  return null
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})
