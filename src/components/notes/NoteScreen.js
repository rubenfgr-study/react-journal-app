import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNoteAction, startDelete } from "../../actions/noteActions";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {

  const dispatch = useDispatch();

  const {active: note} = useSelector(state => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const {title, body} = formValues;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNoteAction(note.id, formValues));
  }, [formValues])
  
  const handleDelete = () => {
    dispatch(startDelete(note.id));
  }

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          name="title"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          name="body"
          placeholder="What happened today"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {
          note.url && (
            <div className="notes__image">
              <img
                src={note.url}
                alt="Custom"
              />
            </div>
          )
        }
        
      </div>

      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  );
};
