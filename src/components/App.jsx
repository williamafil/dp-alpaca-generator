import React from "react";
import { RadioGroup, RadioBtn } from "./RadioGroup";
import Button from "./Button";
import clsx from "../utilities/clsx";
import "../style/App.css";
import seed from "../seed";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSection: "hair",
      backgrounds: "blue50",
      accessories: "headphone",
      ears: "default",
      eyes: "default",
      hair: "default",
      leg: "default",
      mouth: "default",
      neck: "default",
      nose: "default",
    };
    this.canvasRef = React.createRef();
    this.accessoriesRef = React.createRef();
    this.backgroundRef = React.createRef();
    this.earsRef = React.createRef();
    this.eyesRef = React.createRef();
    this.hairRef = React.createRef();
    this.legRef = React.createRef();
    this.mouthRef = React.createRef();
    this.neckRef = React.createRef();
    this.noseRef = React.createRef();
  }

  onChangeSectionHandler = (e) => {
    console.log("click: " + e.target.id);
    this.setState({
      selectedSection: e.target.id,
    });
  };

  onChangeStyle = (e) => {
    this.setState({
      [e.target.name]: e.target.id,
    });
  };

  randomStyleHandler = () => {
    const obj = {};
    for (const property in seed) {
      const randomNum = Math.ceil(Math.random() * seed[property].length) - 1;
      obj[property] = seed[property][randomNum];
    }

    this.setState({ ...this.state, ...obj });
  };

  toImage = () => {
    const bgEl = this.backgroundRef.current;
    const hairEl = this.hairRef.current;
    const earsEl = this.earsRef.current;
    const neckEl = this.neckRef.current;
    const noseEl = this.noseRef.current;
    const mouthEl = this.mouthRef.current;
    const accessoriesEl = this.accessoriesRef.current;
    const eyesEl = this.eyesRef.current;
    const legEl = this.legRef.current;

    const canvas = this.canvasRef.current;
    canvas.width = bgEl.width;
    canvas.height = bgEl.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(bgEl, 0, 0, bgEl.width, bgEl.height);
    ctx.drawImage(neckEl, 0, 0, neckEl.width, neckEl.height);
    ctx.drawImage(earsEl, 0, 0, earsEl.width, earsEl.height);
    ctx.drawImage(noseEl, 0, 0, noseEl.width, noseEl.height);
    ctx.drawImage(mouthEl, 0, 0, mouthEl.width, mouthEl.height);
    ctx.drawImage(hairEl, 0, 0, hairEl.width, hairEl.height);
    ctx.drawImage(
      accessoriesEl,
      0,
      0,
      accessoriesEl.width,
      accessoriesEl.height,
    );
    ctx.drawImage(eyesEl, 0, 0, eyesEl.width, eyesEl.height);
    ctx.drawImage(legEl, 0, 0, legEl.width, legEl.height);

    const link = document.createElement("a");

    link.href = canvas.toDataURL("image/png");
    link.download = "alpaca.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  render() {
    const imgUrl = new URL("/images/", import.meta.url).href;

    return (
      <div className="container mx-auto px-4">
        <header>
          <h1 className="text-5xl font-bold mb-2">
            Alpaca Generator{" "}
            <span className="text-lg block md:inline-block">
              by William Kang
            </span>
          </h1>
        </header>
        <main className="flex flex-col sm:flex-row mx-auto">
          <section className=" sm:w-1/2">
            <div className="relative leading-none">
              <img
                ref={this.neckRef}
                className="absolute"
                src={imgUrl + "/neck/" + this.state.neck + ".png"}
              />
              <img
                ref={this.earsRef}
                className="absolute"
                src={imgUrl + "/ears/" + this.state.ears + ".png"}
              />

              <img
                ref={this.noseRef}
                className="absolute"
                src={imgUrl + "/nose/" + this.state.nose + ".png"}
              />
              <img
                ref={this.mouthRef}
                className="absolute"
                src={imgUrl + "/mouth/" + this.state.mouth + ".png"}
              />

              <img
                ref={this.hairRef}
                className="absolute"
                src={imgUrl + "/hair/" + this.state.hair + ".png"}
              />
              <img
                ref={this.accessoriesRef}
                className="absolute"
                src={imgUrl + "/accessories/" + this.state.accessories + ".png"}
              />
              <img
                ref={this.eyesRef}
                className="absolute"
                src={imgUrl + "/eyes/" + this.state.eyes + ".png"}
              />

              <img
                ref={this.legRef}
                className="absolute"
                src={imgUrl + "/leg/" + this.state.leg + ".png"}
              />
              <img
                ref={this.backgroundRef}
                className=""
                src={imgUrl + "/backgrounds/" + this.state.backgrounds + ".png"}
              />
            </div>

            <div className="flex justify-between mt-4">
              <Button
                name="Random"
                className="mr-10"
                onClick={this.randomStyleHandler}
              />
              <Button name="Download" onClick={this.toImage} />
            </div>
          </section>
          <section className="sm:w-1/2 sm:px-4 md:px-8">
            <RadioGroup
              name="outfit"
              legend="Accessorize Alpaca's"
              onClick={this.onChangeSectionHandler}
            >
              <RadioBtn
                id="accessories"
                selection={this.state.selectedSection}
              />
              <RadioBtn
                id="backgrounds"
                selection={this.state.selectedSection}
              />
              <RadioBtn id="ears" selection={this.state.selectedSection} />
              <RadioBtn id="eyes" selection={this.state.selectedSection} />
              <RadioBtn id="hair" selection={this.state.selectedSection} />
              <RadioBtn id="leg" selection={this.state.selectedSection} />
              <RadioBtn id="mouth" selection={this.state.selectedSection} />
              <RadioBtn id="neck" selection={this.state.selectedSection} />
            </RadioGroup>

            <RadioGroup
              name={this.state.selectedSection}
              legend="Style"
              onClick={this.onChangeStyle}
            >
              {seed[this.state.selectedSection].map((style) => (
                <RadioBtn
                  key={style}
                  selection={this.state[this.state.selectedSection]}
                  id={style}
                />
              ))}
            </RadioGroup>
          </section>
        </main>
        <canvas className="hidden" ref={this.canvasRef} />
      </div>
    );
  }
}

export default App;
