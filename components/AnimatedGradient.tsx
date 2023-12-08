import { Dimensions, View } from "react-native";
import LottieView from "lottie-react-native";
export function Gradient() {
  const dimensons = Dimensions.get("window");

  return (
    <View
      style={{
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        width: dimensons.width,
        height: dimensons.height
      }}
    >
      <LottieView
        source={require("../assets/gradient2.json")}
        autoPlay
        loop
        speed={0.1}
      />
    </View>
  );
}
