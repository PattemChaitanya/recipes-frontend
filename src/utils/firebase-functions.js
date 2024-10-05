import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

export const firebaseCallingFunctions = async (functionType, functionData) => {
  const uuid = uuidv4();

  switch (functionType) {
    case "post":
      try {
        await setDoc(doc(db, "usersAnalytics", uuid), {
          deviceInfo: functionData,
          timestamp: new Date(),
        });
      } catch (error) {
        console.error("Error storing device info: ", error);
      }
      break;
    default:
      break;
  }
};
