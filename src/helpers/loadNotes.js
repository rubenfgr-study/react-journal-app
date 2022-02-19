import { collection, getDocsFromServer, query } from "firebase/firestore";
import { db } from "../firebase/firebase-config";


export const loadNotes = async (uid) => {

    const q = query(collection(db, `${uid}/journal/notes`));

    const docSnap = await getDocsFromServer(q);

    const notes = [];

    docSnap.forEach(snap => {
        notes.push({
            id: snap.id,
            ...snap.data()
        });
    });

    return notes;
}