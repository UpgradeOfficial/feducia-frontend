import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import {console} from "console-browserify"

export const getCampaignById = async (id) => {
  const docRef = doc(db, "campaign", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};
