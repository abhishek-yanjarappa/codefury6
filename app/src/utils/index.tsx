import { LocalNotifications } from "@capacitor/local-notifications";

export function getCurrentUser(): {
  displayName: string;
  photoUrl: string;
  uid: string;
  email: string;
} | null {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user?.email ? user : null;
}

export async function scheduleNotifications() {
  const perms = await LocalNotifications.checkPermissions();
  console.log(perms);
  if (!perms) {
    try {
      await LocalNotifications.requestPermissions();
    } catch {
      console.log("Permission denied");
      return;
    }
  }
  const notificationTime = localStorage.getItem("journalTime") || "08:00";
  LocalNotifications.schedule({
    notifications: [
      {
        title: "It's time to Journal",
        body: "It's time rewind and write down what you feel 😌",
        id: 1,
        schedule: {
          allowWhileIdle: true,
          on: {
            hour: Number(notificationTime.split(":")[0]),
            minute: Number(notificationTime.split(":")[1]),
          },
        },
      },
    ],
  });
}
