import * as React from "react"
import { StyleSheet } from "react-native"

import EditScreenInfo from "../components/EditScreenInfo"
import Row from "../components/Row"
import { Text, View } from "../components/Themed"
import { facilities, useStore } from "../utils/state"

export default function TabTwoScreen() {
  const currentFacility = useStore((state) => state.facility)
  const setFacility = useStore((state) => state.setFacility)

  return (
    <View style={styles.container}>
      {facilities.map((f) => (
        <Row
          title={f.title}
          subtitle={currentFacility === f.value ? "[SELECTED]" : ""}
          onPress={() => setFacility(f.value)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
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
