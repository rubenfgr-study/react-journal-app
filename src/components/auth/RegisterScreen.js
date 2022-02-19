import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import validator from "validator";
import { startGoogleRegister } from "../../actions/authActions";
import { useForm } from "../../hooks/useForm";

export function RegisterScreen() {
  const dispatch = useDispatch();

  const msgError = useSelector((state) => state.ui.msgError);

  const [formValues, handleInputChange] = useForm({
    name: "test",
    email: "test@gmail.com",
    password: "123456",
    confirm: "123456",
  });

  const { name, email, password, confirm } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startGoogleRegister(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      // dispatch(setErrorAction("name is required"));
      Swal.fire("Error", "Name is required", "error");
      return false;
    } else if (!validator.isEmail(email)) {
      Swal.fire("Error", "Email is not valid", "error");
      return false;
    } else if (password !== confirm || password.length < 6) {
      Swal.fire("Error", "Password is not valid", "error");
      return false;
    }
    // dispatch(unsetErrorAction());

    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister}>
        {msgError && <div className="auth__alert-error">{msgError}</div>}

        <input
          className="auth__input"
          type="text"
          placeholder="name"
          name="name"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="text"
          placeholder="email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="*********"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="*********"
          name="confirm"
          value={confirm}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Register
        </button>

        <Link className="link" to="/auth/login">
          Already registered?
        </Link>
      </form>
    </>
  );
}
