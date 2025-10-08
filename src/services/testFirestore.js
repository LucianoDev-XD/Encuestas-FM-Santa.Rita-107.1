import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"

export async function testWrite() {
  await addDoc(collection(db, "test"), { ok: true, ts: Date.now() })
}
