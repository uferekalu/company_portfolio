import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

function ServiceItem(props) {
  return (
    <Fragment>
      <img src={props.image} alt={props.imageName} />
      <h3>{props.title}</h3>
      <p>{props.description.slice(0, 100)}</p>
      <NavLink
        to={props.serviceId}
        style={{ marginRight: "10px" }}
        className="btn"
        onClick={props.onViewDetail.bind(this, props.serviceId)}
      >
        Edit
      </NavLink>
      <NavLink
        to={props.serviceId}
        style={{ backgroundColor: "brown" }}
        className="btn"
      >
        Delete
      </NavLink>
    </Fragment>
  );
}

export default ServiceItem;
