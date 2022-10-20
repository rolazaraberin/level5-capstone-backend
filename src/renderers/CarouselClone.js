import React, { useEffect } from "react";
//import Carousel from "react-bootstrap/Carousel";
//import Navbar from "../components/bootstrap/Navbar";
import "./CarouselClone.scss";
import CarouselCloneNavbar from "./CarouselCloneNavbar";
import "bootstrap/js/dist/carousel";
import { waitForElementToBeRemoved } from "@testing-library/react";
import Video from "../components/Video";

//INSPIRED BY THIS EXAMPLE
//https://www.invisalign.com/treatable-cases

function CarouselClone() {
  useEffect(componentDidMount, []);

  return (
    <>
      {/* <CarouselCloneNavbar /> */}
      <div className="carousel-indicators">
        {/* <div> */}
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
          onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseEnter}
        >
          <div className="tab">
            <img
              alt=""
              src="https://images.ctfassets.net/vh25xg5i1h5l/7bDlDJigzaoDknJcMroQOr/e7f1213c35a4fb69e3acecc77084a37b/Inivisalign_icon_TC_overbite.svg"
            />
          </div>
          <div>Overbite</div>
        </button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
          onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseEnter}
        >
          <div className="tab">
            <img
              alt=""
              src="https://images.ctfassets.net/vh25xg5i1h5l/7u57ENkz4ba880bbhR4PQm/e6b039d95ee4178fb20fa3cac6cf5216/Inivisalign_icon_TC_underbite.svg"
            />
          </div>
          <div>Underbite</div>
        </button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
          onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseEnter}
        >
          <div className="tab">
            <img
              alt=""
              src="https://images.ctfassets.net/vh25xg5i1h5l/5aKkbaDubicWZ8dPqcbdzM/29425ae7f7247559f01a6c0d7054b41a/Inivisalign_icon_TC_crossbite.svg"
            />
          </div>
          <div>Crossbite</div>
        </button>
      </div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="false"
        //data-bs-ride="true"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Video src="https://videos.ctfassets.net/vh25xg5i1h5l/39dxPtVfuDL5ah4IawH1ct/9ce84666cda02a6aef27dd6ce7ed1cb2/invisalign-treatablecase-overbite.mp4" />
          </div>
          <div className="carousel-item">
            <Video src="https://videos.ctfassets.net/vh25xg5i1h5l/2puKsp2Ds0X91KcnYloAnz/0ea047dac67518dfacf2713955cde600/invisalign-treatablecase-underbite.mp4" />
            {/* <div>
              <div>
                <video
                  src="https://videos.ctfassets.net/vh25xg5i1h5l/2puKsp2Ds0X91KcnYloAnz/0ea047dac67518dfacf2713955cde600/invisalign-treatablecase-underbite.mp4"
                  className="video"
                  playsInline=""
                  onClick={handlePlay}
                ></video>
                <div>
                  <div>Before</div>
                  <input
                    type="range"
                    min="0"
                    max="2.5"
                    step="0.1"
                    defaultValue="2.538667"
                  />
                  <div>After </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="carousel-item">
            <Video src="https://videos.ctfassets.net/vh25xg5i1h5l/1INJ8a8teI3vUl2Up4YZRt/b622087f79e3917ce9dbf6cb2272e9fd/invisalign-treatablecase-crossbite.mp4" />
            {/* <div>
              <div>
                <video
                  src="https://videos.ctfassets.net/vh25xg5i1h5l/1INJ8a8teI3vUl2Up4YZRt/b622087f79e3917ce9dbf6cb2272e9fd/invisalign-treatablecase-crossbite.mp4"
                  className="video"
                  playsInline=""
                  onClick={handlePlay}
                ></video>
                <div>
                  <div>Before</div>
                  <input
                    type="range"
                    min="0"
                    max="2.5"
                    step="0.1"
                    defaultValue="2.538667"
                  />
                  <div>After </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button> */}
        {/* <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button> */}
      </div>
    </>
  );

  /**********************************/

  function componentDidMount() {
    activeTab = document.querySelector(".carousel-indicators .active");
  }
}

let activeTab;
function handleMouseEnter(entered) {
  entered.preventDefault();
  entered.stopPropagation();
  const tab = entered.target;
  const isTab = tab.attributes["data-bs-target"];
  if (!isTab) return;
  const className = Array.from(tab.classList);
  if (className.includes("active")) return;
  else {
    activeTab.classList.remove("active");
    activeTab = tab;
    tab.classList.add("active");
    tab.click();
  }
}
function handlePlay(clicked) {
  const video = clicked.target;
  video.play();
}
function handleVideo(playing) {
  const video = playing.target;
  console.log(video.duration);
  console.log(video.currentTime);
  //debugger;
}
export default CarouselClone;
