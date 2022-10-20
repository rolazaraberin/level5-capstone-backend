import React from "react";
import Banner from "../components/Banner";
import Carousel from "../components/bootstrap/Carousel";
import Content from "../components/Content";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";
import Video from "../components/Video";
//import CarouselClone from "./CarouselClone";
//import CarouselCopy from "./CarouselCopy";

export default ExampleCarousel;

function ExampleCarousel() {
  return (
    <>
      <Title>Carousel</Title>

      <Carousel id="carousel1" />
      <Subtitle>Default features</Subtitle>

      <Carousel id="carousel2">
        <Carousel.Indicators />
        <Carousel.Item />
        <Carousel.Item />
        <Carousel.Item />
        <Carousel.ControlPrev />
        <Carousel.ControlNext />
      </Carousel>
      <Subtitle>Default features specified</Subtitle>

      <Carousel id="carousel3">
        <Carousel.Item />
        <Carousel.Item />
        <Carousel.Item />
        <Carousel.ControlPrev />
        <Carousel.ControlNext />
      </Carousel>
      <Subtitle>Default controls, no indicators</Subtitle>

      <Carousel id="carousel4">
        <Carousel.Indicators />
        <Carousel.Item />
        <Carousel.Item />
        <Carousel.Item />
      </Carousel>
      <Subtitle>Default indicators, no controls</Subtitle>

      <Carousel id="carousel4-5">
        <Carousel.Item />
        <Carousel.Item />
        <Carousel.Item />
      </Carousel>
      <Subtitle>Items only, autoscroll</Subtitle>

      <Carousel id="carousel5">
        <Carousel.Item />
        <Carousel.Item />
        <Carousel.Item />
      </Carousel>
      <Carousel.Indicators target="carousel5" data={3} />
      <Subtitle>Default indicators, detached</Subtitle>

      <Carousel id="carousel6">
        <Carousel.Indicators options={{ detached: true }}>
          <div>
            <img
              alt=""
              src="https://images.ctfassets.net/vh25xg5i1h5l/7bDlDJigzaoDknJcMroQOr/e7f1213c35a4fb69e3acecc77084a37b/Inivisalign_icon_TC_overbite.svg"
            />
          </div>
          <div>
            <img
              alt=""
              src="https://images.ctfassets.net/vh25xg5i1h5l/7u57ENkz4ba880bbhR4PQm/e6b039d95ee4178fb20fa3cac6cf5216/Inivisalign_icon_TC_underbite.svg"
            />
          </div>
          <div>
            <img
              alt=""
              src="https://images.ctfassets.net/vh25xg5i1h5l/5aKkbaDubicWZ8dPqcbdzM/29425ae7f7247559f01a6c0d7054b41a/Inivisalign_icon_TC_crossbite.svg"
            />
          </div>
        </Carousel.Indicators>
        <Carousel.Item>
          <Video src="https://videos.ctfassets.net/vh25xg5i1h5l/39dxPtVfuDL5ah4IawH1ct/9ce84666cda02a6aef27dd6ce7ed1cb2/invisalign-treatablecase-overbite.mp4" />
        </Carousel.Item>
        <Carousel.Item>
          <Video src="https://videos.ctfassets.net/vh25xg5i1h5l/2puKsp2Ds0X91KcnYloAnz/0ea047dac67518dfacf2713955cde600/invisalign-treatablecase-underbite.mp4" />
        </Carousel.Item>
        <Carousel.Item>
          <Video src="https://videos.ctfassets.net/vh25xg5i1h5l/1INJ8a8teI3vUl2Up4YZRt/b622087f79e3917ce9dbf6cb2272e9fd/invisalign-treatablecase-crossbite.mp4" />
        </Carousel.Item>
      </Carousel>
      <Subtitle>Custom items and detached indicators</Subtitle>
      {/* <div
          id="carousel"
          class="carousel slide"
          data-bs-ride="false"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carousel"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="..." class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="..." class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="..." class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
                </p>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carousel"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carousel"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div> */}
    </>
  );
}
