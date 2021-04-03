import { useNavigation } from "@react-navigation/native"
import * as React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import Button from "../components/Button"

import EditScreenInfo from "../components/EditScreenInfo"
import { Text, View } from "../components/Themed"
import { useStore } from "../utils/state"
import Colors from "../constants/Colors"
import { ScrollView } from "react-native-gesture-handler"

export default function TabOneScreen() {
  const navigation = useNavigation()
  const status = useStore((state) => state.status)
  const result = useStore((state) => state.result)
  const resetStatus = useStore((state) => state.resetStatus)

  console.log("!!!!!!!!!!!")
  console.log(result)

  let content = null
  // super ungly and super temporary
  if (result) {
    if (result?.ticket) {
      content = (
        <>
          {Object.keys(result.ticket).map((key) => (
            <Text
              style={styles.getStartedText}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)"
            >
              {typeof result.ticket[key] === "object"
                ? `${key}: ${JSON.stringify(result.ticket[key], null, 1)}`
                : `${key}: ${result.ticket[key]}`}
            </Text>
          ))}
          {result.validationResult &&
            Object.keys(result.validationResult).map((key) => (
              <Text
                style={styles.getStartedText}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
              >
                {typeof result.validationResult[key] === "object"
                  ? `${key}: ${JSON.stringify(result.validationResult[key], null, 1)}`
                  : `${key}: ${result.validationResult[key]}`}
              </Text>
            ))}
        </>
      )
    } else if (typeof result === "object") {
      content = (
        <>
          {Object.keys(result).map((key) => (
            <Text
              style={styles.getStartedText}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)"
            >
              {typeof result[key] === "object" ? "[Object]" : `${key}: ${result[key]}`}
            </Text>
          ))}
        </>
      )
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{status}</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View>
          <View style={styles.getStartedContainer}>{content}</View>

          <Button
            onPress={() => {
              resetStatus()
              navigation.navigate("CameraScreen", { apiRoute: "/api/entry" })
            }}
            title={"Entry"}
            variant="primary-submit"
            style={{ margin: 20 }}
          />

          <Button
            onPress={() => {
              resetStatus()
              navigation.navigate("CameraScreen", { apiRoute: "/api/exit" })
            }}
            title={"Exit"}
            variant="danger"
            style={{ marginHorizontal: 20, marginVertical: 10 }}
          />

          <Button
            onPress={() => {
              resetStatus()
              navigation.navigate("CameraScreen", { apiRoute: "/api/check" })
            }}
            title={"Check"}
            variant="primary"
            style={{ marginHorizontal: 20, marginVertical: 10 }}
          />

          <View style={styles.helpContainer}>
            <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
              Vyberte akciu vyssie a naskenujte QR kod.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 10,
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
})
