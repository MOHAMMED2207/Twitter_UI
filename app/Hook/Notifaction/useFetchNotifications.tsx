import { IRootObjectModelNotification } from "../../Types/type";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useFetchNotifications = () => {
  const [notifications, setNotifications] = useState<
    IRootObjectModelNotification[]
  >([]);
  const [prevUnreadCount, setPrevUnreadCount] = useState(0);
  const [showNotificationBox, setShowNotificationBox] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("https://twitter-backend-mauve.vercel.app/api/notifications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const data: IRootObjectModelNotification[] = await res.json(); // Type the data

      // Filter unread notifications
      const unreadNotifications = data.filter(
        (notification) => !notification.read
      );

      setNotifications(unreadNotifications);

      const unreadCount = unreadNotifications.length;

      if (unreadCount > prevUnreadCount) {
        setShowNotificationBox(true);
        setTimeout(() => {
          setShowNotificationBox(false);
        }, 5000); // Close after 5 seconds
      }

      setPrevUnreadCount(unreadCount);
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate: readNotifications, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(
          "https://twitter-backend-mauve.vercel.app/api/notifications/Read",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    
  });

  useEffect(() => {
    fetchNotifications(); // Fetch immediately on component mount
    const interval = setInterval(fetchNotifications, 5000); // Fetch every 8 seconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevUnreadCount]);

  const firstUnreadNotification = notifications
    ? (notifications[0] as IRootObjectModelNotification)
    : null; // Type the first unread notification

  return {
    firstUnreadNotification,
    showNotificationBox,
    prevUnreadCount,
    readNotifications,
  };
};
