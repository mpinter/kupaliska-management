export type RootStackParamList = {
  Root: undefined
  NotFound: undefined
}

export type BottomTabParamList = {
  TabOne: undefined
  TabTwo: undefined
}

export type TabOneParamList = {
  TabOneScreen: undefined
  CameraScreen: {
    apiRoute: "/api/entry" | "/api/exit" | "/api/check"
  }
}

export type TabTwoParamList = {
  TabTwoScreen: undefined
}
