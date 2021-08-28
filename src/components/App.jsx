import React, { Children, cloneElement } from "react";
import "../style/App.css";
import seed from "../seed";

function clsx(...str) {
  return str.join(" ");
}

function RadioGroup(props) {
  const { name, legend, children, onClick } = props;

  return (
    <div>
      <form className="mt-8 flex space-x-2">
        <fieldset className="flex flex-wrap">
          <legend className="block font-extrabold mb-4">{legend}</legend>
          {Children.map(children, (child) =>
            cloneElement(child, { name, onClick }),
          )}
        </fieldset>
      </form>
    </div>
  );
}

function RadioBtn(props) {
  const { id, name, selection, onClick } = props;

  return (
    <div className="">
      <input
        type="radio"
        name={name}
        id={id}
        className="sr-only peer"
        checked={selection === id ? true : false}
        onChange={(e) => onClick(e)}
      />
      <label
        htmlFor={id}
        className={clsx(
          "block mb-2 mr-2 px-4 py-2 capitalize border-2 border-blue-200 rounded-full",
          "hover:bg-blue-300 hover:text-gray-700 text-blue-300 font-bold",
          "peer-checked:bg-blue-900 peer-checked:border-blue-900 peer-checked:text-white",
        )}
      >
        {id}
      </label>
    </div>
  );
}

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
    console.log(e.target.name);
    console.log(e.target.id);
    // const k = e.target.name;
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
    // const canvas = this.refs.canvas;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const bgEl = this.backgroundRef.current;
    const hairEl = this.hairRef.current;
    const earsEl = this.earsRef.current;
    const neckEl = this.neckRef.current;
    const noseEl = this.noseRef.current;
    const mouthEl = this.mouthRef.current;
    const accessoriesEl = this.accessoriesRef.current;
    const eyesEl = this.eyesRef.current;
    const legEl = this.legRef.current;

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
          <h1 className="text-5xl font-bold mb-4">
            Alpaca Generator <span className="text-lg">by William Kang</span>
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

            <div className="flex justify-center mt-4">
              <button
                className={clsx(
                  "mr-10",
                  "py-3 px-8 bg-white border-2 rounded-md",
                  "font-extrabold text-md text-black",
                  "hover:border-gray-600 hover:shadow-md",
                )}
                onClick={this.randomStyleHandler}
              >
                Random
              </button>
              <button
                className="py-3 px-8 bg-white rounded-md text-md  text-black font-extrabold border-2 hover:border-gray-600 hover:shadow-md"
                onClick={this.toImage}
              >
                Download
              </button>
            </div>
          </section>
          <section className="sm:w-1/2 px-4">
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
        <canvas
          className="hidden"
          ref={this.canvasRef}
          width={535}
          height={535}
        />
      </div>
    );
  }
}

export default App;
