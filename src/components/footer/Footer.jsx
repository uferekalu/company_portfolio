import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <Fragment>
      <section className="footer">
        <div className="box_container">
          <div className="box">
            <h3>The Best Organization</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nihil
              veniam expedita aut sunt, rem quibusdam harum delectus error illum
            </p>
          </div>
          <div className="box">
            <h3>Quick links</h3>
            <NavLink to={`/`}>
              <i className="fas fa-arrow-right"></i> home
            </NavLink>
            <NavLink to={`/services`}>
              <i className="fas fa-arrow-right"></i> services
            </NavLink>
            <NavLink to={`/about`}>
              <i className="fas fa-arrow-right"></i> About Us
            </NavLink>
            <NavLink to={`/portfolio`}>
              <i className="fas fa-arrow-right"></i> Portfolio
            </NavLink>
            <NavLink to={`/contact`}>
              <i className="fas fa-arrow-right"></i> Contact Us
            </NavLink>
          </div>
          <div className="box">
            <h3>our services</h3>
            <NavLink to={``}>
              <i className="fas fa-check"></i> web design
            </NavLink>
            <NavLink to={``}>
              <i className="fas fa-check"></i> seo marketing
            </NavLink>
            <NavLink to={``}>
              <i className="fas fa-check"></i> email marketing
            </NavLink>
            <NavLink to={``}>
              <i className="fas fa-check"></i> web hosting
            </NavLink>
            <NavLink to={``}>
              <i className="fas fa-check"></i> content marketing
            </NavLink>
          </div>
          <div className="box">
            <h3>follow us</h3>
            <NavLink to={`https://facebook.com/uferekalu`}>
              {" "}
              <i className="fab fa-facebook-f"></i> facebook
            </NavLink>
            <NavLink to={`https://twitter.com/uferekalu`}>
              {" "}
              <i className="fab fa-twitter"></i> twitter
            </NavLink>
            <NavLink to={``}>
              {" "}
              <i className="fab fa-instagram"></i> instagram
            </NavLink>
            <NavLink to={``}>
              {" "}
              <i className="fab fa-linkedin"></i> linkedin
            </NavLink>
            <NavLink to={``}>
              {" "}
              <i className="fab fa-pinterest"></i> pinterest
            </NavLink>
          </div>
        </div>
      </section>
      <section className="footer_row footer_copyright">
        <div className="footer_menu">
          <NavLink to={`/`}> home</NavLink>
          <NavLink to={`/`}> services</NavLink>
          <NavLink to={`/`}> About Us</NavLink>
          <NavLink to={`/`}> Portfolio</NavLink>
          <NavLink to={`/`}> Contact Us</NavLink>
        </div>
        <p>Copyright &copy; 2022 Best Organization</p>
      </section>
    </Fragment>
  );
}

export default Footer;
