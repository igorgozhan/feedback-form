import React, { useState } from "react";
import styles from "./Form.module.css";
import axios from "axios";

const FeedbackForm = () => {
  const [phone, setPhone] = useState("");
  const [cleanedPhone, setCleanedPhone] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidMessage, setIsValidMessage] = useState(true);
  const [phoneErrorsNum, setPhoneErrorsNum] = useState(0);
  const [nameErrorsNum, setNameErrorsNum] = useState(0);
  const [messageErrorsNum, setMessageErrorsNum] = useState(0);
  const [isFormSendSuccess, setIsFormSendSuccees] = useState(false);
  const [isFormSendError, setIsFormSendError] = useState(false);
  const API_URL = "";

  const handlePhoneChange = (e) => {
    setPhone(formatPhone(e.target.value));
    console.log(phone);
  };
  const handlePhoneBlur = (e) => {
    const phoneRegExp = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
    if (phoneRegExp.test(phone)) {
      setIsValidPhone(true);
      setPhoneErrorsNum(0);
    } else {
      setIsValidPhone(false);
      setPhoneErrorsNum(phoneErrorsNum + 1);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsValidName(true);
  };
  const handleNameBlur = (e) => {
    if (!hasSpecialCharacters(name)) {
      setIsValidName(true);
      setNameErrorsNum(0);
    } else {
      setIsValidName(false);
      setNameErrorsNum(nameErrorsNum + 1);
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setIsValidMessage(true);
  };
  const handleMessageBlur = (e) => {
    if (!hasSpecialCharacters(message)) {
      setIsValidMessage(true);
      setMessageErrorsNum(0);
    } else {
      setIsValidMessage(false);
      setMessageErrorsNum(messageErrorsNum + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    if (!phone || !isValidPhone) {
      setIsValidPhone(false);
      isValid = false;
    }
    if (!name || !isValidName) {
      setIsValidName(false);
      isValid = false;
    }
    if (!message || !isValidMessage) {
      setIsValidMessage(false);
      isValid = false;
    }

    if (isValid) {
      let postData = {
        phone: cleanedPhone,
        name: name,
        message: message,
      };
      axios
        .post(API_URL, postData)
        .then((response) => {
          setIsFormSendSuccees(true);
          setIsFormSendError(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsFormSendSuccees(false);
          setIsFormSendError(true);
        });
      // send form data to backend
    }
  };

  const hasSpecialCharacters = (str) => {
    const regex = /[!@#$%^&*_+\-=[\]{};':"\\|,.<>/?]/g;
    return regex.test(str);
  };
  const formatPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    setCleanedPhone(cleaned);
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }
    return phone;
  };
  return (
    <form onSubmit={handleSubmit}>
      {isFormSendSuccess ? (
        <p>Отправка формы успешна</p>
      ) : (
        <>
          <div className={styles.formRow}>
            <label htmlFor="phone">Номер телефона:</label>
            <input type="tel" id="phone" value={phone} onChange={handlePhoneChange} onBlur={handlePhoneBlur} pattern="\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}" required />
          </div>
          {!isValidPhone && <p className={styles.error}>Пожалуйста, введите корректный номер телефона</p>}
          <div className={styles.formRow}>
            <label htmlFor="name">Имя:</label>
            <input type="text" id="name" value={name} onBlur={handleNameBlur} onChange={handleNameChange} required />
          </div>
          {!isValidName && <p className={styles.error}>Пожалуйста, введите корректное имя</p>}
          <div className={styles.formRow}>
            <label htmlFor="message">Сообщение:</label>
            <textarea id="message" rows={4} value={message} onBlur={handleMessageBlur} onChange={handleMessageChange} required></textarea>
          </div>
          {!isValidMessage && <p className={styles.error}>Пожалуйста, введите корректное сообщение</p>}
          {isFormSendError && <p className={styles.error}>Ошибка отправления сообщения</p>}
          <div className={styles.formRow}>
            <label></label>
            <button type="submit" className={styles.btn}>
              Отправить
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default FeedbackForm;
