import Navigation from "@navigations/Navigation";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <GestureHandlerRootView>
      <Navigation />
    </GestureHandlerRootView>
  )
}

export default App;