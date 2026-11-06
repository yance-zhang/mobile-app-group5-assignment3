import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon sf="person.2" md="group" />
        <NativeTabs.Trigger.Label>Employee</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="signin">
        <NativeTabs.Trigger.Icon sf="person.crop.circle" md="login" />
        <NativeTabs.Trigger.Label>Sign In</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="signup">
        <NativeTabs.Trigger.Icon sf="person.badge.plus" md="person_add" />
        <NativeTabs.Trigger.Label>Sign Up</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
