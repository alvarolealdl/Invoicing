import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Icons from "./Icons";
import CreateUser from "./CreateUser";
import ControlPanel from "./ControlPanel";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorFixed, setIsErrorFixed] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showControlPanel, setShowControlPanel] = useState(false);
  const errorRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const userName = usernameRef.current.value.toLowerCase();
    const userPassword = passwordRef.current.value;

    try {
      const response = await axios.get("http://localhost:3000/users");
      const users = response.data;

      const foundUser = users.find(
        (user) =>
          user.username.toLowerCase() === userName.toLowerCase() &&
          user.password === userPassword
      );

      if (foundUser) {
        setErrorMessage("");
        setUsername("");
        setPassword("");
        setShowControlPanel(true);
      } else {
        setErrorMessage("Usuário ou senha inválidos!");
      }
    } catch (error) {
      setErrorMessage(
        "Erro ao fazer login. Por favor, tente novamente mais tarde!"
      );
    }

    if (!userName || !userPassword) {
      setErrorMessage("Por favor, preencha todos os campos!");
      return;
    }

    setIsErrorFixed(true);
    if (errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(() => {
      setErrorMessage("");
      setIsErrorFixed(false);
    }, 5000);
  };

  return (
    <>
      {!showLoginForm && !showControlPanel ? (
        <div className="login-form">
          {errorMessage && (
            <div
              className={`error-message ${
                isErrorFixed ? "error-message-fixed" : ""
              }`}
              ref={errorRef}
            >
              {errorMessage}
            </div>
          )}

          <h2>Login - Controle de NFs</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Usuário:</label>
              <input
                id="username"
                maxLength={30}
                onChange={handleUsernameChange}
                ref={usernameRef}
                type="text"
                value={username}
              />
              <div>
                <label htmlFor="password">Senha:</label>
                <div className="password-input">
                  <input
                    autoComplete="current-password"
                    id="password"
                    name="password"
                    onChange={handlePasswordChange}
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"}
                    value={password}
                  />
                  <Icons
                    className="login-form__icon"
                    typeIcon={
                      showPassword ? "visible-password" : "hidden-password"
                    }
                    onClick={handleShowPassword}
                  />
                </div>
              </div>
            </div>
            <div className="login-form__btn-wrapper">
              <button className="login-form__btn-submit" type="submit">
                Entrar
              </button>
              <button
                className="login-form__btn-create-user"
                type="button"
                onClick={handleShowLoginForm}
              >
                Criar Usuário
              </button>
            </div>
          </form>
        </div>
      ) : showLoginForm ? (
        <CreateUser />
      ) : (
        <ControlPanel />
      )}
    </>
  );
};

export default LoginForm;
