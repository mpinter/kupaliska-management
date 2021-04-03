import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  unstable_batchedUpdates,
} from "react-native"
import { Camera } from "expo-camera"
import { TabOneParamList } from "../types"
import { StackScreenProps } from "@react-navigation/stack"
import { useStore } from "../utils/state"
import { useNavigation } from "@react-navigation/core"

export default function CameraScreen({ route }: StackScreenProps<TabOneParamList, "CameraScreen">) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [didScan, setDidScan] = useState(false)
  const check = useStore((state) => state.check)
  const navigation = useNavigation()

  useEffect(() => {
    ;(async () => {
      if (Platform.OS === "web") {
        setHasPermission(true)
      } else {
        const { status } = await Camera.requestPermissionsAsync()
        setHasPermission(status === "granted")
      }
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }
  return (
    <View style={styles.container}>
      <Camera
        type={type}
        style={{ width: "100%", height: "100%" }}
        onBarCodeScanned={async (result) => {
          if (didScan) return
          setDidScan(true)
          check(result.data, route.params.apiRoute)
          navigation.navigate("TabOneScreen")
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})
