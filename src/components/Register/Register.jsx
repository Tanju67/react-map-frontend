import React from "react";
import styles from "./Register.module.css";
import MainNavigation from "../../shared/UIElements/mainNavigation/MainNavigation";
import Card from "../../shared/UIElements/Card";
import Input from "../../shared/formElements/Input";
import { useForm } from "../../shared/hooks/useForm";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { Link } from "react-router-dom";

function Register() {
  const [inputHandler, formState] = useForm({
    name: { value: "", isValid: false },
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
    isValid: false,
  });
  return (
    <div className={styles.page}>
      <MainNavigation />
      <Card className={styles.loginCard}>
        <form>
          <h3>Register</h3>
          <Input
            id="name"
            element="input"
            type="name"
            label="Name"
            placeholder="Name"
            errorMsg="Please enter a name!"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
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
            Register
          </button>
          <p>
            Do you have already an account?
            <Link to={"/login"}>Login</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}

export default Register;
