import { useEffect, useRef } from "react";
import { sendAnalytics } from "../utils/firebase";
import logger from "../utils/logger";

export default function AnalyticsTracker({ screenName }) {
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    sendAnalytics("screen_view", {
      screen_name: screenName,
    });
    return () => {
      const now = Date.now();
      const timeSpent = (now - startTimeRef.current) / 1000; // seconds
      sendAnalytics("screen_time", {
        screen_name: screenName,
        time_spent_sec: timeSpent,
      });
      logger(`Logged time: ${timeSpent}s on ${screenName}`);
    };
  }, []);

  return <></>;
}
