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

  render() {
    const imgUrl = new URL("../images/", import.meta.url);
    // const modules = import.meta.glob("../images/backgrounds/*.png");
    // console.log(modules);
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
                className="absolute"
                src={imgUrl + "neck/" + this.state.neck + ".png"}
              />
              <img
                className="absolute"
                src={imgUrl + "ears/" + this.state.ears + ".png"}
              />

              <img
                className="absolute"
                src={imgUrl + "nose/" + this.state.nose + ".png"}
              />
              <img
                className="absolute"
                src={imgUrl + "mouth/" + this.state.mouth + ".png"}
              />

              <img
                className="absolute"
                src={imgUrl + "hair/" + this.state.hair + ".png"}
              />
              <img
                className="absolute"
                src={imgUrl + "accessories/" + this.state.accessories + ".png"}
              />
              <img
                className="absolute"
                src={imgUrl + "eyes/" + this.state.eyes + ".png"}
              />

              <img
                className="absolute"
                src={imgUrl + "leg/" + this.state.leg + ".png"}
              />
              <img
                className=""
                src={imgUrl + "backgrounds/" + this.state.backgrounds + ".png"}
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
              <button className="py-3 px-8 bg-white rounded-md text-md  text-black font-extrabold border-2 hover:border-gray-600 hover:shadow-md">
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
      </div>
    );
  }
}

export default App;
