import axios from "axios";

export const client = axios.create({
  baseURL: "https://portfolio-ser.herokuapp.com/api/services"
});

export const servicesArray = (event, services) => {
    var servicesArray = services?.filter(function(service) {
        return service.serviceName
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      return servicesArray
}
