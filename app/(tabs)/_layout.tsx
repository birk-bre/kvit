import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <>
      <Tabs
        initialRouteName="index"
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="journal" />
      </Tabs>
    </>
  );
}
