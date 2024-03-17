import React from "react";
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
import { Link } from "react-router-dom";

function Login() {
  const [inputHandler, formState] = useForm({
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
    isValid: false,
  });
  return (
    <div className={styles.page}>
      <MainNavigation />
      <Card className={styles.loginCard}>
        <form>
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
