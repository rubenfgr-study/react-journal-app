import * as moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { activeNoteAction } from "../../actions/noteActions";

export function JournalEntry({id, title, body, date, url}) {
  const dispatch = useDispatch();

  const m = moment(date);

  const handleEntryClick = () => {
    dispatch(activeNoteAction(id, {title, body, date, url}));
  }

  return (
    <div className="journal__entry pointer" onClick={handleEntryClick}>

      {
        url && (
          <div
            className="journal__entry-picture"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${url})`,
            }}
          ></div>
        )
      }
      


      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>
      <div className="journal__entry-date-box">
        <span>{m.format('dddd')}</span>
        <h4>{m.format('Do')}</h4>
      </div>
    </div>
  );
}
