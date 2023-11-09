import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";

// Notifications.setNotificationHandler({
//   handleNotification: async () => {
//     return {
//       shouldPlaySound: true,
//       shouldShowAlert: true,
//       shouldSetBadge: true,
//     };
//   },
// });

export default function Notification() {
  useEffect(() => {
    const getNotificationInfo = Notifications.addNotificationReceivedListener(
      (Notification) => {
        console.log("Notification");
        // console.log(Notification);
      }
    );

    return () => {
      getNotificationInfo.remove();
    };
  });

  function onPressButtonSeeNotif() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Notif Local",
        body: "Ceci est mon 1er test en local",
        data: { name: "Kry's" },
      },
      trigger: {
        seconds: 5,
      },
    });
  }
  return (
    <View>
      <Text>Notification</Text>
      <Button title="Press Me" onPress={onPressButtonSeeNotif} />
    </View>
  );
}
