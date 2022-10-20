import React from "react";
import Subtitle from "../components/Subtitle";
import Typewriter from "../components/Typewriter";
import "./ExampleTypewriter.scss";

function ExampleTypewriter() {
  return (
    <>
      {/* <Typewriter />
      <Subtitle>Default typewriter, example phrases</Subtitle> */}

      <Typewriter erase={false}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse ea,
        magnam voluptas similique fugiat fugit molestiae quod nulla velit
        dolorum laudantium consequatur consectetur ipsum voluptatem.
      </Typewriter>
      <Subtitle>Text phrase, no erase</Subtitle>

      <Typewriter.Alternator>
        <Typewriter>Lorem ipsum dolor sit amet.</Typewriter>
        <Typewriter>Consectetur adipisicing elit.</Typewriter>
        <Typewriter>Totam eveniet quasi nobis dicta!</Typewriter>
      </Typewriter.Alternator>
      <Subtitle>Typewriter alternator</Subtitle>

      {/* <Typewriter>
        <div>Lorem ipsum dolor sit amet.</div>
      </Typewriter>
      <Subtitle>Text phrase innerHTML</Subtitle> */}

      {/* <Typewriter>
        <div className="flat">Lorem ipsum</div>
        <div className="flat">
          {" "}
          <i>dolor</i>
        </div>
        <div className="flat"> sit amet</div>.
      </Typewriter>
      <Subtitle>Flattened HTML phrase</Subtitle> */}

      {/* <Typewriter>
        <div>
          Lorem ipsum <i>dolor</i> sit amet.
        </div>
      </Typewriter>
      <Subtitle>HTML phrase</Subtitle> */}

      {/* <Typewriter>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse ea,
          magnam voluptas similique fugiat fugit molestiae quod nulla velit
          dolorum laudantium consequatur consectetur ipsum voluptatem.
        </div>
      </Typewriter>
      <Subtitle>No erase</Subtitle> */}

      <div className="motto">
        We create{" "}
        <Typewriter.Alternator>
          <Typewriter>connections</Typewriter>
          <Typewriter>brand identity</Typewriter>
          <Typewriter>digital experiences</Typewriter>
        </Typewriter.Alternator>
      </div>
      <Subtitle>CSS styled phrases</Subtitle>
    </>
  );
}

export default ExampleTypewriter;
