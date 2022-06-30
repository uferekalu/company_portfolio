import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import RocketImage from "../assets/images/rocket.svg";
import CompanyServices from "../components/services/CompanyServices";
import Spinner from "../components/spinner/Spinner";
import Backdrop from "../components/backdrop/Backdrop";
import Modal from "../components/modal/Modal";
import { client } from "../utils/utility";

let initialState = {
  serviceName: "",
  serviceDescription: ""
};

function Homepage() {
  const [scroll, setScroll] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServiceForDeleting, setSelectedServiceForDeleting] = useState(
    null
  );
  const [serviceInputs, setServiceInputs] = useState(initialState);
  const [fileName, setFileName] = useState("");
  const [cantSubmit, setCantSubmit] = useState(false);

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

  useEffect(() => {
    fetchServices();
  }, []);

  window.onscroll = (e) => {
    console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 100) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  function fetchServices() {
    setLoading(true);
    client
      .get("")
      .then((resData) => {
        const services = resData.data;
        localStorage.setItem("services", JSON.stringify(services));
        const storedServices = JSON.parse(localStorage.getItem("services"));
        if (storedServices) {
          setServices(storedServices);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  const handleScroll = () => {
    document
      .getElementsByTagName("html")[0]
      .scrollIntoView({ behavior: "smooth" });
  };

  function modalCancelHandler() {
    setSelectedService(null);
    setSelectedServiceForDeleting(null);
  }

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
            baseURL: client.get(`/${selectedService._id}`),
            headers: { "Content-Type": "multipart/form-data" },
            data: data
          });
          console.log("Updated service", res.data);
          fetchServices();
        } catch (error) {
          console.log("Failed to post service", error);
        }
      }
    }
  }

  async function modalDeleteHandler() {
    if (cantSubmit) {
      setSelectedServiceForDeleting(null);
      alert("You are permitted to delete any data");
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
      fetchServices();
    }
  }

  const homeServices = services?.slice(0, 6).map((service) => {
    return (
      <CompanyServices
        key={service._id}
        serviceId={service._id}
        image={
          service.serviceImage &&
          service.serviceImage.replace(
            "http://localhost:5000",
            "https://portfolio-ser.herokuapp.com"
          )
        }
        imageName={service.serviceName}
        title={service.serviceName}
        description={service.serviceDescription}
        fetchServices={fetchServices}
        serviceLink={`/`}
        className="services_extra"
        services={services}
        setSelectedService={setSelectedService}
        selectedService={selectedService}
        selectedServiceForDeleting={selectedServiceForDeleting}
        setSelectedServiceForDeleting={setSelectedServiceForDeleting}
        setCantSubmit={setCantSubmit}
        cantSubmit={cantSubmit}
      />
    );
  });

  return (
    <Fragment>
      {(selectedService || selectedServiceForDeleting) && <Backdrop />}
      {scroll && (
        <BsFillArrowUpCircleFill onClick={handleScroll} className="scroll" />
      )}
      <section className="home" id="home">
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
                <input
                  type="file"
                  name="serviceImage"
                  onChange={onChangeFile}
                />
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
        <div className="content">
          <h3>The best organization</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas a
            fugit ipsum provident ab, vitae laborum sed illum quibusdam nulla.
          </p>
          <NavLink to={`/#`} className="btn">
            Read more
          </NavLink>
        </div>
        <div className="image">
          <img src={RocketImage} alt="rocket" />
        </div>
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
      </section>
      <section className="services">
        <h1 className="heading" style={{ marginTop: "7rem" }}>
          our <span>services</span>
        </h1>
        <div className="box-container services__extra">
          {loading ? <Spinner /> : homeServices}
        </div>
      </section>
    </Fragment>
  );
}

export default Homepage;
