import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Icons from "./Icons";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isErrorFixed, setIsErrorFixed] = useState(false);
  const confirmPasswordRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const msgRef = useRef(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsErrorFixed(true);
    scrollToSuccess();

    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
      setIsErrorFixed(false);
    }, 5000);

    const userEmail = usernameRef.current.value;
    const userPassword = passwordRef.current.value;
    const userConfirmPassword = confirmPasswordRef.current.value;

    if (!userEmail || !userPassword || !userConfirmPassword) {
      setErrorMessage("Por favor, preencha todos os campos!");
      scrollToError();
      return;
    }

    if (userPassword !== userConfirmPassword) {
      setErrorMessage("As senhas devem ser a mesma!");
      scrollToError();
      return;
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/;

    if (!passwordRegex.test(userPassword)) {
      setErrorMessage(
        "A senha deve conter pelo menos um número, um caractere especial e uma letra maiúscula!"
      );
      return;
    }

    if (userPassword.length > 50) {
      setErrorMessage("A senha deve ter no máximo 50 caracteres!");
      return;
    }

    if (userPassword.length < 5) {
      setErrorMessage("A senha deve ter pelo menos 5 caracteres!");
      return;
    }

    try {
      const userObject = {
        username: username,
        password: password,
      };

      const response = await axios.post(
        "http://localhost:3000/users",
        userObject
      );

      if (response.status === 201) {
        setSuccessMessage("Usuário criado com sucesso!");
      } else {
        setErrorMessage("Erro ao criar usuário. Verifique suas informações.");
      }
    } catch (error) {
      setErrorMessage("Erro ao criar usuário. Verifique suas informações.");
    }
  };

  const scrollToError = () => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToSuccess = () => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="create-user">
      {errorMessage && (
        <div className="error-message" ref={msgRef}>
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="success-message" ref={msgRef}>
          {successMessage}
        </div>
      )}

      <h2>Criar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuário:</label>
          <input
            className="create-user__username"
            id="username"
            maxLength={30}
            onChange={handleUsernameChange}
            ref={usernameRef}
            type="text"
            value={username}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            autoComplete="new-password"
            className="create-user__password"
            id="password"
            name="password"
            onChange={handlePasswordChange}
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            value={password}
          />
        </div>
        <div className="password-input">
          <label htmlFor="confirmPassword">Confirmação Senha:</label>
          <input
            className="create-user__confirm-password"
            id="confirmPassword"
            onChange={handleConfirmPasswordChange}
            ref={confirmPasswordRef}
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
          />
          <Icons
            className="create-user__icon"
            onClick={handleShowPassword}
            typeIcon={showPassword ? "visible-password" : "hidden-password"}
          />
        </div>
        <button className="create-user__btn" type="submit">
          Criar Usuário
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
