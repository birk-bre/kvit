import { Book, Heart, Trophy } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <>
      <Tabs
        initialRouteName="index"
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => {
              return <Heart color={focused ? "$blue10" : "black"} />;
            }
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            tabBarLabel: "Progress",
            tabBarIcon: ({ focused }) => {
              return <Trophy color={focused ? "$blue10" : "black"} />;
            }
          }}
        />

        <Tabs.Screen
          name="journal"
          options={{
            tabBarLabel: "Journal",
            tabBarIcon: ({ focused }) => {
              return <Book color={focused ? "$blue10" : "black"} />;
            }
          }}
        />
      </Tabs>
    </>
  );
}
