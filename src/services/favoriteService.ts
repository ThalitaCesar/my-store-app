import { collection, doc, setDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export async function addFavorite(userId: string, productId: number) {
  const ref = doc(db, "favorites", `${userId}_${productId}`);
  await setDoc(ref, { userId, productId });
}

export async function removeFavorite(userId: string, productId: number) {
  const ref = doc(db, "favorites", `${userId}_${productId}`);
  await deleteDoc(ref);
}

export async function getUserFavorites(userId: string): Promise<number[]> {
  const favCol = collection(db, "favorites");
  const q = query(favCol, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  const favs: number[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    favs.push(data.productId);
  });
  return favs;
}
