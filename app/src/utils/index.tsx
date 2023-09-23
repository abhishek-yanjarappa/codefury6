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
        title: "Daily Notification",
        body: "This is a daily notification",
        id: 1,
        schedule: {
          at: new Date(
            new Date().setHours(
              Number(notificationTime.split(":")[0]),
              Number(notificationTime.split(":")[1])
            )
          ),
          repeats: true,
          every: "day",
        },
      },
    ],
  });
}
