import { useEffect } from "react";
import * as Notifications from "expo-notifications";

import expoPushTokensApi from "../api/expoPushTokens";

export default function useNotifications (notificationListener) {
  useEffect(() => {
    registerForPushNotifications();

    if (notificationListener) Notifications.addNotificationReceivedListener(notificationListener);
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") return;

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      expoPushTokensApi.register(token);
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
};
