import React from "react";
import "./CarouselCloneNavbar.scss";
//import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

function CarouselCloneNavbar() {
  return (
    <nav className="navbar navbar-expand-sm bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <div className="nav-link active" aria-current="page">
              <div className="tab">
                <img
                  alt=""
                  src="https://images.ctfassets.net/vh25xg5i1h5l/7bDlDJigzaoDknJcMroQOr/e7f1213c35a4fb69e3acecc77084a37b/Inivisalign_icon_TC_overbite.svg"
                />
                <div>Overbite</div>
              </div>
            </div>
            <div className="nav-link">
              <div className="tab">
                <img
                  alt=""
                  src="https://images.ctfassets.net/vh25xg5i1h5l/7u57ENkz4ba880bbhR4PQm/e6b039d95ee4178fb20fa3cac6cf5216/Inivisalign_icon_TC_underbite.svg"
                />
              </div>
              <div>Underbite</div>
            </div>
            <a className="nav-link" href="#">
              Pricing
            </a>
            <a className="nav-link disabled">Disabled</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default CarouselCloneNavbar;
