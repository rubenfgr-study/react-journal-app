import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
  return async (dispatch, getState) => {

    const {uid} = getState().auth;
    
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    }

    // eslint-disable-next-line no-use-before-define
    const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote);

    dispatch(activeNoteAction(docRef.id, newNote));
    dispatch(notesAddNew({...newNote, id: docRef.id}));
  }
}

export const notesAddNew = (note) => ({
  type: types.notesAddNew,
  payload: note
});

export const activeNoteAction = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotesAction(notes));
  }
}

export const setNotesAction = (notes) => ({
  type: types.notesLoad,
  payload: notes
});

export const startSaveNote = (note) => {

  return async (dispatch, getState) => {
    const {uid} = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = {...note};
    delete noteToFirestore.id;
    await updateDoc(doc(db, `${uid}/journal/notes/${note.id}`), noteToFirestore);

    dispatch(refreshNote(note.id, note));
    Swal.fire('Saved', 'Your note has been saved', 'success');
  }
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note
  }
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
      const {active: activeNote} = getState().notes;

      Swal.fire({
        title: 'Uploading',
        html: 'Please wait...',
        showConfirmButton: false,
        allowOutsideClick: false,
        
        willOpen: () => {
          Swal.showLoading(Swal.getDenyButton());
        }
      });

      const fileUrl = await fileUpload(file);

      dispatch(startSaveNote({...activeNote, url: fileUrl}));

      Swal.close();
  }
}

export const startDelete = (id) => {
  return async (dispatch, getState) => {
    await deleteDoc(doc(db, `${getState().auth.uid}/journal/notes/${id}`));
    Swal.fire('Deleted', 'Your note has been deleted', 'success');
    dispatch(deleteNote(id));
  }
}

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id
});

export const notesLogoutCleaning = () => ({
  type: types.notesLogoutCleaning,
});