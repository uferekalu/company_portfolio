import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CompanyServices from "../components/services/CompanyServices";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import Modal from "../components/modal/Modal";
import Backdrop from "../components/backdrop/Backdrop";
import Spinner from "../components/spinner/Spinner";
import { client } from "../utils/utility";

let initialState = {
  serviceName: "",
  serviceDescription: ""
};

function Services() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [error, setError] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [scroll, setScroll] = useState(false);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [serviceInputs, setServiceInputs] = useState(initialState);
  const [selectedServiceForDeleting, setSelectedServiceForDeleting] = useState(
    null
  );
  const [created, setCreated] = useState(false);
  const [cantSubmit, setCantSubmit] = useState(false);

  const { serviceName, serviceDescription } = serviceInputs;

  function onChangeFile(event) {
    setFileName(event.target.files[0]);
  }

  function handleServiceInputChange(event) {
    const { name, value } = event.target;
    setServiceInputs({
      ...serviceInputs,
      [name]: value
    });
  }

  // console.log("Services", services);

  window.onscroll = (e) => {
    // console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 100) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const handleScroll = () => {
    document
      .getElementsByTagName("html")[0]
      .scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    setFilteredServices(services);
  }, [services]);

  console.log("selected service", selectedService);

  function handleSearchForServices(event) {
    var servicesArray = services?.filter(function(service) {
      return service.serviceName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setSearchItem(event.target.value);
    setError(() => {
      if (servicesArray?.length > 0) {
        return null;
      } else {
        return "No services found!";
      }
    });
    setFilteredServices(servicesArray);
  }

  function handleFilterByTitle(event) {
    var servicesArray = services?.filter(function(service) {
      return service.serviceName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    document.querySelector("[name='filterInput']").value = "";
    setError(null);
    setFilteredServices(servicesArray);
  }

  function handleReset() {
    setSearchItem("");
    setError(null);
    setFilteredServices(services);
  }

  function startCreatServiceHandler() {
    setCreating(true);
    setCantSubmit(true);
  }

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

  async function modalConfirmHandler() {
    if (cantSubmit) {
      setCreating(false);
      alert("You are not permitted to submit any data");
    } else {
    setCreating(false);
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
          method: "post",
          baseURL: client.post(""),
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
          },
          data: data
        });
        console.log("Posted services", res.data);
        setCreated(true);
        // setServices((prevState) => {
        //   return {
        //     ...prevState,
        //     _id: res.data._id,
        //     serviceName: res.data.serviceName,
        //     serviceDescription: res.data.serviceDescription,
        //     serviceImage: res.data.serviceImage
        //   };
        // });
        fetchServices();
      } catch (error) {
        console.log("Failed to post service", error);
      }
    }
    }
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
            baseURL: client.patch(`/${selectedService._id}`),
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

  function modalCancelHandler() {
    setCreating(false);
    setSelectedService(null);
    setSelectedServiceForDeleting(null);
  }

  async function modalDeleteHandler() {
    if (cantSubmit) {
      setSelectedServiceForDeleting(null);
      alert("You are permitted to delete any data");
    } else {
      try {
        setSelectedServiceForDeleting(null);
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

  function success() {
    setCreated(false);
  }

  return (
    <Fragment>
      {(creating ||
        selectedService ||
        selectedServiceForDeleting ||
        created) && <Backdrop />}
      {scroll && (
        <BsFillArrowUpCircleFill onClick={handleScroll} className="scroll" />
      )}
      <section className="add__service_div">
        <input
          type="submit"
          value="Add Service"
          style={{ marginTop: "70px", float: "right" }}
          className="btn add_service"
          onClick={startCreatServiceHandler}
        />
      </section>
      <section className="services">
        {creating && (
          <Modal
            serviceName="Add Service"
            canCancel
            canConfirm
            onCancel={modalCancelHandler}
            onConfirm={modalConfirmHandler}
            confirmText="Submit"
          >
            <form encType="multipart/form-data" method="post">
              <div className="form-control">
                <label htmlFor="title">Service Name:</label>
                <input
                  type="text"
                  id="title"
                  // ref={serviceNameRef}
                  name="serviceName"
                  onChange={handleServiceInputChange}
                  style={{ border: "1px solid black " }}
                />
              </div>
              <div className="form-control">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  rows="4"
                  // ref={serviceDescriptionRef}
                  name="serviceDescription"
                  onChange={handleServiceInputChange}
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
        {created && (
          <Modal
            serviceName={`Success!!!`}
            canCancel
            canConfirm
            onCancel={modalCancelHandler}
            onConfirm={success}
            confirmText="Ok"
          >
            <section>
              <div>
                <p style={{ fontSize: "16px" }}>Service Created Successfully</p>
              </div>
            </section>
          </Modal>
        )}
        <h1 className="heading" style={{ marginTop: "7rem" }}>
          our <span>services</span>
        </h1>
        <div className="filter_service">
          {creating || selectedService ? (
            <div className="filter_service_input">
              <AiOutlineSearch className="search_outline" />
              <input
                onChange={handleSearchForServices}
                value={searchItem}
                name="filterInput"
                type="text"
                placeholder="Search for a service..."
                style={{ background: "transparent" }}
              />
              {searchItem && (
                <AiOutlineCloseCircle
                  onClick={handleReset}
                  className={`close-input`}
                />
              )}
            </div>
          ) : (
            <div className="filter_service_input">
              <AiOutlineSearch className="search_outline" />
              <input
                onChange={handleSearchForServices}
                value={searchItem}
                name="filterInput"
                type="text"
                placeholder="Search for a service..."
              />
              {searchItem && (
                <AiOutlineCloseCircle
                  onClick={handleReset}
                  className={`close-input`}
                />
              )}
            </div>
          )}

          <div>
            <select
              name="filter_select"
              className="filter_select"
              onChange={handleFilterByTitle}
            >
              <option value="">Filter by Title</option>
              {!Array.isArray(services) ? (
                <option value="No service name"></option>
              ) : (
                services.map((service) => (
                  <option key={service._id} value={service.serviceName}>
                    {service.serviceName}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
        {error && (
          <div className="services_error">
            <p>{error}</p>
          </div>
        )}
        <div className="box-container">
          {loading ? (
            <Spinner />
          ) : !Array.isArray(filteredServices) ? (
            "No services"
          ) : (
            filteredServices?.map((service) => (
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
                serviceLink={`/services`}
                services={services}
                setSelectedService={setSelectedService}
                selectedService={selectedService}
                selectedServiceForDeleting={selectedServiceForDeleting}
                setSelectedServiceForDeleting={setSelectedServiceForDeleting}
                setCantSubmit={setCantSubmit}
                cantSubmit={cantSubmit}
              />
            ))
          )}
        </div>
      </section>
    </Fragment>
  );
}

export default Services;
