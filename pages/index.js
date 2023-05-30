import React, { useState } from "react";
import Modal from "../components/Modal/Modal";
import Form from "../components/Form/Form";

const FeedbackForm = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <Modal header = "Нам важно ваше мнение" setIsOpen={setIsOpen}>
          <Form/>
          
        </Modal>
      )}
    </>
  );
};

export default FeedbackForm;
