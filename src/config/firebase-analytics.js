import { logEvent } from "firebase/analytics";
import { analytics } from "./firebaseConfig";

export const globalAnalytics = (page) => {
  logEvent(analytics, `Recipe_Viewer_${page?.eventName}`, {
    content_type: page?.type,
  });
};
