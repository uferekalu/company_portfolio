import React from "react";
import { NavLink } from "react-router-dom";

function CompanyServices(props) {
  const { className } = props;

  function showDetailHandler(serviceId) {
    props.setCantSubmit(true)
    const selectedService = props.services.find(
      (service) => service._id === serviceId
    );
    props.setSelectedService(selectedService);
  }

  function startDeletingHandler(serviceId) {
    props.setCantSubmit(true)
    const selectedServiceForDeleting = props.services.find(
      (service) => service._id === serviceId
    );
    props.setSelectedServiceForDeleting(selectedServiceForDeleting);
  }

  return (
    <div className={`box ${className}`}>
      <img src={props.image} alt={props.imageName} />
      <NavLink to={`/services/${props.serviceId}`}>
        <h3>{props.title}</h3>
      </NavLink>
      <p>{props.description.slice(0, 100)}</p>
      <button
        style={{ marginRight: "10px", marginTop: "0" }}
        className="btn"
        onClick={() => showDetailHandler(props.serviceId)}
      >
        Edit
      </button>
      <button
        style={{ backgroundColor: "brown" }}
        className="btn"
        onClick={() => startDeletingHandler(props.serviceId)}
      >
        Delete
      </button>
    </div>
  );
}

export default CompanyServices;
