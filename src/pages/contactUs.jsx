import React, { Fragment, useState, createRef, useEffect } from "react";
import Spinner from "../components/spinner/Spinner";

const initialContactState = {
  name: "",
  subject: "",
  number: "",
  message: "",
  email: ""
};

const initialError = {
  nameError: "",
  subjectError: "",
  numberError: "",
  messageError: "",
  emailError: ""
};

function ContactUs() {
  const [contactForm, setContactForm] = useState(initialContactState);
  const [error, setError] = useState(initialError);
  const [status] = useState("Submit");
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("");
  let emailInput = createRef();
  let nameInput = createRef();
  let subjectInput = createRef();
  let numberInput = createRef();
  let messageInput = createRef();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  }

  useEffect(() => {
    loadMap(
      "https://maps.google.com/maps?q=Olokonla%20Lekki%20epe,%20Lagos%20-%20Nigeria&t=&z=13&ie=UTF8&iwloc=&output=embed"
    );
  }, []);

  function styleBorderEmail(input, styles) {
    emailInput.current.style.border = styles;
  }
  function styleBorderName(input, styles) {
    nameInput.current.style.border = styles;
  }
  function styleBorderMessage(input, styles) {
    messageInput.current.style.border = styles;
  }
  function styleBorderNumber(input, styles) {
    numberInput.current.style.border = styles;
  }
  function styleBorderSubject(input, styles) {
    subjectInput.current.style.border = styles;
  }

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  function phoneValidate(number) {
    return String(number).match(
      /^(?:(?:(?:\+?234(?:h1)?|01)h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/gm
    );
  }

  function validateContactForm() {
    let emailError = "";
    let messageError = "";
    let subjectError = "";
    let numberError = "";
    let nameError = "";

    if (!validateEmail(contactForm.email)) {
      emailError = "Email not valid";
      styleBorderEmail(emailInput, "1px solid red");
    } else {
      styleBorderEmail(emailInput, "1px solid black");
    }

    if (!phoneValidate(contactForm.number)) {
      numberError = "Invalid phone number";
      styleBorderNumber(numberInput, "1px solid red");
    } else {
      styleBorderNumber(numberInput, "1px solid black");
    }

    if (contactForm.name.length === 0 || typeof contactForm.name !== "string") {
      nameError = "Please enter your name and it must be a valid name";
      styleBorderName(nameInput, "1px solid red");
    } else {
      styleBorderName(nameInput, "1px solid black");
    }

    if (
      contactForm.subject.length === 0 ||
      typeof contactForm.subject !== "string"
    ) {
      subjectError = "Please enter your subject and must be in words";
      styleBorderSubject(subjectInput, "1px solid red");
    } else {
      styleBorderSubject(subjectInput, "1px solid black");
    }

    if (
      contactForm.message.length === 0 ||
      typeof contactForm.message !== "string"
    ) {
      messageError = "Please enter your message and must be in words";
      styleBorderMessage(messageInput, "1px solid red");
    } else {
      styleBorderMessage(messageInput, "1px solid black");
    }

    if (
      emailError ||
      subjectError ||
      nameError ||
      messageError ||
      numberError
    ) {
      setError({
        ...error,
        emailError,
        subjectError,
        nameError,
        messageError,
        numberError
      });
      return false;
    }
    setError({
      initialError
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    validateContactForm();

    let details = {
      name: contactForm.name,
      email: contactForm.email,
      message: contactForm.message,
      subject: contactForm.subject,
      number: contactForm.number
    };
    console.log(details);
    // let response = await fetch("http://localhost:5000/contact", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(details)
    // });
    // setStatus("Submit");
    // let result = await response.json();
    // alert(result.status);
  }

  function loadMap(url) {
    setLoading(true);
    setSource(url);
    setLoading(false);
  }

  return (
    <section className="contact" id="contact">
      <Fragment>
        <h1 className="heading" style={{ marginTop: "7rem" }}>
          <span>contact</span> us
        </h1>
        <div className="icons-container">
          <div className="icons">
            <i className="fas fa-phone"></i>
            <h3>our number</h3>
            <p>+234-70-329-36214</p>
            <p>+234-81-301-49426</p>
          </div>
          <div className="icons">
            <i className="fas fa-envelope"></i>
            <h3>our email</h3>
            <p className="custom_email">uferepeace@gmail.com</p>
            <p className="custom_email">dekalusha@gmail.com</p>
          </div>
          <div className="icons">
            <i className="fas fa-map-marker-alt"></i>
            <h3>our location</h3>
            <p>Lagos, Lagos - Nigeria</p>
          </div>
        </div>
        <div className="row">
          {loading ? (
            <Spinner />
          ) : (
            <iframe
              className="map"
              src={source}
              allowFullScreen=""
              loading="lazy"
              title="location"
            ></iframe>
          )}
          <form action="" method="POST" onSubmit={handleSubmit}>
            <p style={{ fontSize: "14px" }}>
              Let us know what you think! In order to provide better service,
              please do not hesitate to give us your feedback. Thank you.
            </p>
            <input
              type="text"
              name="name"
              placeholder="name"
              className="box"
              onChange={handleInputChange}
              ref={nameInput}
              onKeyUp={validateContactForm}
            />
            {error.nameError && (
              <span className="contact_error">{error.nameError}</span>
            )}
            <input
              type="email"
              name="email"
              placeholder="email"
              className="box"
              onChange={handleInputChange}
              ref={emailInput}
              onKeyUp={validateContactForm}
            />
            {error.emailError && (
              <span className="contact_error">{error.emailError}</span>
            )}
            <input
              type="text"
              name="subject"
              placeholder="subject"
              className="box"
              onChange={handleInputChange}
              ref={subjectInput}
              onKeyUp={validateContactForm}
            />
            {error.subjectError && (
              <span className="contact_error">{error.subjectError}</span>
            )}
            <input
              type="number"
              name="number"
              placeholder="number"
              className="box"
              onChange={handleInputChange}
              ref={numberInput}
              onKeyUp={validateContactForm}
            />
            {error.numberError && (
              <span className="contact_error">{error.numberError}</span>
            )}
            <div>
              <textarea
                name="message"
                placeholder="message"
                className="box"
                cols="30"
                rows="10"
                onChange={handleInputChange}
                ref={messageInput}
                onKeyUp={validateContactForm}
              ></textarea>
              {error.messageError && (
                <span className="contact_error message_error">
                  {error.messageError}
                </span>
              )}
            </div>
            <input type="submit" value={status} className="btn" />
          </form>
        </div>
      </Fragment>
    </section>
  );
}

export default ContactUs;
