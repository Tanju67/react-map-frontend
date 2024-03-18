import React, { useContext } from "react";
import styles from "./Login.module.css";
import MainNavigation from "../../shared/UIElements/mainNavigation/MainNavigation";
import Card from "../../shared/UIElements/Card";
import Input from "../../shared/formElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/useForm";
import Button from "../../shared/UIElements/Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-contxt";
import Modal from "../../shared/UIElements/Modal";
import { BeatLoader } from "react-spinners";

function Login() {
  const [inputHandler, formState] = useForm({
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
    isValid: false,
  });

  const navigate = useNavigate();
  const { sendAuthRequest, onLogin, error, isLoading, setError } =
    useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    sendAuthRequest(
      "auth/login",
      {
        email: formState.email.value,
        password: formState.password.value,
      },
      { "Content-Type": "application/json" },
      (data) => {
        console.log(data);
        onLogin(data.user.token, { name: data.user.name, id: data.user.id });
        navigate("/");
      }
    );
  };
  return (
    <div className={styles.page}>
      <MainNavigation />
      {error && !isLoading && (
        <Modal errorMsg={error} handleError={() => setError(null)} />
      )}
      <Card className={styles.loginCard}>
        {isLoading && <BeatLoader className={styles.loader} color="#36d7b7" />}
        <form onSubmit={submitHandler}>
          <h3>Login</h3>
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            placeholder="Email"
            errorMsg="Please enter a valid email!"
            onInput={inputHandler}
            validators={[VALIDATOR_EMAIL()]}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            placeholder="Password"
            errorMsg="Please enter a valid password!"
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(6)]}
          />
          <button
            className={styles.loginBtn}
            disabled={!formState.isValid}
            type="submit"
          >
            Login
          </button>
          <p>
            Doesn't have an account yet?
            <Link to={"/register"}>Register</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}

export default Login;
