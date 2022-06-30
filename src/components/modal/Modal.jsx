import React from "react";
import "./Modal.css";

function Modal(props) {
  const { className } = props;
  return (
    <section className="modal">
      <header className={`modal__header ${className}`}>
        <h1>{props.serviceName}</h1>
      </header>
      <section className="modal__content">{props.children}</section>
      <section className="modal__actions">
        {props.canCancel && (
          <button className="service_button" onClick={props.onCancel}>
            Cancel
          </button>
        )}
        {props.canConfirm && (
          <button
            className="service_button"
            style={
              props.confirmText === "Delete"
                ? { background: "brown" }
                : { background: "teal" }
            }
            onClick={props.onConfirm}
          >
            {props.confirmText}
          </button>
        )}
      </section>
    </section>
  );
}

export default Modal;
