import { collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export async function addFavorite(userId: string, productId: number) {
  const ref = doc(db, "favorites", `${userId}_${productId}`);
  await setDoc(ref, { userId, productId });
}

export async function removeFavorite(userId: string, productId: number) {
  const ref = doc(db, "favorites", `${userId}_${productId}`);
  await deleteDoc(ref);
}

export async function getUserFavorites(userId: string) {
  const favCol = collection(db, "favorites");
  const snapshot = await getDocs(favCol);
  const favs: number[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.userId === userId) favs.push(data.productId);
  });
  return favs;
}
