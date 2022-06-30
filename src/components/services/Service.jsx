import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import Backdrop from "../backdrop/Backdrop";
import Modal from "../modal/Modal";
import { client } from "../../utils/utility";

let initialState = {
  serviceName: "",
  serviceDescription: ""
};

function Service(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState("");
  const [loading, setLoading] = useState(false);
  const [serviceInputs, setServiceInputs] = useState(initialState);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServiceForDeleting, setSelectedServiceForDeleting] = useState(
    null
  );
  const [cantSubmit, setCantSubmit] = useState(false);

  const [fileName, setFileName] = useState("");

  const { serviceName, serviceDescription } = serviceInputs;

  function handleServiceInputChange(event) {
    const { name, value } = event.target;
    setServiceInputs({
      ...serviceInputs,
      [name]: value
    });
  }

  function onChangeFile(event) {
    setFileName(event.target.files[0]);
  }

  console.log("the service", service);

  useEffect(() => {
    getService();

    function getService() {
      setLoading(true);
      client
        .get(`/${id}`)
        .then((response) => {
          setService(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  async function modalUpdateHandler() {
    if (cantSubmit) {
      setSelectedService(null);
      alert("You are not permitted to update any data");
    } else {
      setSelectedService(null);
      const { serviceName, serviceDescription } = serviceInputs;
      if (
        serviceName.trim().length === 0 ||
        serviceDescription.trim().length === 0
      ) {
        return;
      } else {
        const data = new FormData();
        data.append("serviceName", serviceName);
        data.append("serviceDescription", serviceDescription);
        if (fileName) {
          data.append("serviceImage", fileName);
        }
        try {
          const res = await axios({
            method: "patch",
            baseURL: client.patch(`/${service._id}`),
            headers: { "Content-Type": "multipart/form-data" },
            data: data
          });
          console.log("Updated service", res.data);
          navigate("/services");
        } catch (error) {
          console.log("Failed to post service", error);
        }
      }
    }
  }

  async function modalDeleteHandler() {
    if (cantSubmit) {
      setSelectedServiceForDeleting(null);
      alert("You are not permitted to delete any data");
    } else {
      setSelectedServiceForDeleting(null);
      try {
        const res = await client.delete(`/${selectedServiceForDeleting._id}`);
        console.log(
          `Service with id ${selectedServiceForDeleting._id} has been successfully deleted.`,
          res
        );
      } catch (error) {
        console.log(error);
      }
      navigate(`/services`);
    }
  }

  function modalCancelHandler() {
    setSelectedService(null);
    setSelectedServiceForDeleting(null);
  }

  return (
    <section className="service__detail">
      {(selectedService || selectedServiceForDeleting) && <Backdrop />}
      {selectedService && (
        <Modal
          serviceName={selectedService.serviceName}
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={modalUpdateHandler}
          confirmText="Update"
        >
          <form encType="multipart/form-data" method="post">
            <div className="form-control">
              <label htmlFor="title">Service Name:</label>
              <input
                type="text"
                id="title"
                name={serviceName}
                defaultValue={selectedService.serviceName}
                onChange={handleServiceInputChange}
                style={{ border: "1px solid black " }}
              />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name={serviceDescription}
                defaultValue={selectedService.serviceDescription}
                onChange={handleServiceInputChange}
                rows="4"
                style={{ border: "1px solid black " }}
              />
            </div>
            <div className="form-control">
              <label htmlFor="title">Choose service image:</label>
              <input type="file" name="serviceImage" onChange={onChangeFile} />
            </div>
          </form>
        </Modal>
      )}
      {selectedServiceForDeleting && (
        <Modal
          serviceName={`Want to delete ${selectedServiceForDeleting.serviceName}`}
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={modalDeleteHandler}
          confirmText="Delete"
          className="delete__service__modal"
        >
          <section>
            <div className="delete__a__service">
              <i
                className="fas fa-exclamation-triangle"
                style={{
                  fontSize: "80px",
                  marginBottom: "20px",
                  color: "yellowgreen"
                }}
              ></i>
              <p
                style={{ fontSize: "16px" }}
              >{`Are you sure to delete "${selectedServiceForDeleting.serviceName}"?`}</p>
            </div>
          </section>
        </Modal>
      )}
      <div className="box-container">
        {loading ? (
          <Spinner />
        ) : (
          <div className="box">
            <img
              src={
                service.serviceImage &&
                service.serviceImage.replace(
                  "http://localhost:5000",
                  "https://portfolio-ser.herokuapp.com"
                )
              }
              alt={service.serviceName}
            />
            <h3>{service.serviceName}</h3>
            <p>{service.serviceDescription}</p>
            <button
              to={""}
              style={{ marginRight: "10px" }}
              className="btn"
              onClick={() => {
                setSelectedService(service);
                setCantSubmit(true);
              }}
            >
              Edit
            </button>
            <button
              to={""}
              style={{ backgroundColor: "brown" }}
              className="btn"
              onClick={() => {
                setSelectedServiceForDeleting(service);
                setCantSubmit(true);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Service;
