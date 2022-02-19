import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/authActions";
import { notesLogoutCleaning, startNewNote } from "../../actions/noteActions";
import { JournalEntries } from "./JournalEntries";

export function Sidebar() {
  const dispatch = useDispatch();

  const {name} = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
    dispatch(notesLogoutCleaning());
  };

  const handleAddNew = () => {
    dispatch(startNewNote());
  }

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span>{name}</span>
        </h3>
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="journal__new-entry" onClick={handleAddNew}>
        <i className="fas fa-calendar-plus fa-5x"></i>
        <p>New entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
}
