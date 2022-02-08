import React from "react";
import * as beersService from "./services/beersService";
import SingleBeer from "./SingleBeer";
import BeerChart from "./BeerChart";
import ManageModelModal from "./ManageModelModal";
import BeerDataModal from "./BeerDataModal";
import MoreInfoModal from "./MoreInfoModal";
import { toast } from "react-toastify";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import { Table, Card, CardHeader, Button, Col } from "reactstrap";

const _logger = debug.extend("BeerModel");

class BeerModel extends React.Component {
  state = {
    beerData: [
      {
        id: 1,
        name: "Beer A",
        quantityStart: 1000,
        probabilityA: 1,
        probabilityB: 0,
        probabilityC: 0,
        probabilityD: 0,
        probabilityE: 0,
        probabilityF: 0,
        growth: 0,
      },
      {
        id: 2,
        name: "Beer B",
        quantityStart: 1000,
        probabilityA: 0,
        probabilityB: 1,
        probabilityC: 0,
        probabilityD: 0,
        probabilityE: 0,
        probabilityF: 0,
        growth: 0,
      },
      {
        id: 3,
        name: "Beer C",
        quantityStart: 1000,
        probabilityA: 0,
        probabilityB: 0,
        probabilityC: 1,
        probabilityD: 0,
        probabilityE: 0,
        probabilityF: 0,
        growth: 0,
      },
      {
        id: 4,
        name: "Beer D",
        quantityStart: 1000,
        probabilityA: 0,
        probabilityB: 0,
        probabilityC: 0,
        probabilityD: 1,
        probabilityE: 0,
        probabilityF: 0,
        growth: 0,
      },
      {
        id: 5,
        name: "Beer E",
        quantityStart: 1000,
        probabilityA: 0,
        probabilityB: 0,
        probabilityC: 0,
        probabilityD: 0,
        probabilityE: 1,
        probabilityF: 0,
        growth: 0,
      },
      {
        id: 6,
        name: "Beer F",
        quantityStart: 1000,
        probabilityA: 0,
        probabilityB: 0,
        probabilityC: 0,
        probabilityD: 0,
        probabilityE: 0,
        probabilityF: 1,
        growth: 0,
      },
    ],
    dataToBeUpdated: {
      isOpen: false,
      newBeerData: [
        {
          id: 1,
          name: "Beer A",
          quantityStart: 1000,
          probabilityA: 1,
          probabilityB: 0,
          probabilityC: 0,
          probabilityD: 0,
          probabilityE: 0,
          probabilityF: 0,
          growth: 0,
        },
        {
          id: 2,
          name: "Beer B",
          quantityStart: 1000,
          probabilityA: 0,
          probabilityB: 1,
          probabilityC: 0,
          probabilityD: 0,
          probabilityE: 0,
          probabilityF: 0,
          growth: 0,
        },
        {
          id: 3,
          name: "Beer C",
          quantityStart: 1000,
          probabilityA: 0,
          probabilityB: 0,
          probabilityC: 1,
          probabilityD: 0,
          probabilityE: 0,
          probabilityF: 0,
          growth: 0,
        },
        {
          id: 4,
          name: "Beer D",
          quantityStart: 1000,
          probabilityA: 0,
          probabilityB: 0,
          probabilityC: 0,
          probabilityD: 1,
          probabilityE: 0,
          probabilityF: 0,
          growth: 0,
        },
        {
          id: 5,
          name: "Beer E",
          quantityStart: 1000,
          probabilityA: 0,
          probabilityB: 0,
          probabilityC: 0,
          probabilityD: 0,
          probabilityE: 1,
          probabilityF: 0,
          growth: 0,
        },
        {
          id: 6,
          name: "Beer F",
          quantityStart: 1000,
          probabilityA: 0,
          probabilityB: 0,
          probabilityC: 0,
          probabilityD: 0,
          probabilityE: 0,
          probabilityF: 1,
          growth: 0,
        },
      ],
    },
    modelSchema: {
      maximumCycles: 20,
      steadyState: 0.005,
      steadyStateMessage: "",
      maximumCyclesMessage: "",
      beerModelName: 1,
    },
    dataTableSchema: {
      headerFontSize: "85%",
      pxFourDisplay: "",
      pxFiveDisplay: "",
      pxSixDisplay: "",
    },
    manageModel: {
      isOpen: false,
    },
    modelInstructions: {
      isOpen: false,
    },
  };

  componentDidMount() {
    _logger("Beer Model Running");
    this.getBeerData();
    this.getBeerModelNames();
  }

  getBeerData() {
    beersService
      .getBeerData()
      .then(this.onGetBeerDataSuccess)
      .catch(this.onGetBeerDataError);
  }

  getBeerModelNames() {
    beersService
      .getBeerModelNames()
      .then(this.onGetBeerModelNamesSuccess)
      .catch(this.onGetBeerDataError);
  }

  onGetBeerModelNamesSuccess = (response) => {
    _logger("Beer Model Names:", response.data.items);
    console.log("Beer Model Names:", response.data.items);
    this.setState((prevState) => {
      let mappedBeerModelOptions = response.data.items.map(
        this.mapBeerModelOptions
      );
      let userBeerModelOptions = response.data.items
        .filter(this.filterBeerModelOptions)
        .map(this.mapBeerModelOptions);
      return { mappedBeerModelOptions, userBeerModelOptions };
    });
  };

  filterBeerModelOptions = (oneModel) => {
    let result = true;
    if (oneModel.createdBy === 1) {
      result = false;
    }
    return result;
  };

  mapBeerModelOptions = (oneModel) => (
    <option value={oneModel.id} key={`BeerModel-${oneModel.id}`}>
      {oneModel.name}
    </option>
  );

  onGetBeerDataSuccess = (response) => {
    console.log("Beer Data:", response.data.items);
    this.setDataTableSchema(response.data.items);
    let chartData = this.markovChain([...response.data.items]);
    for (let i = 0; i < response.data.items.length; i++) {
      response.data.items[i].row = i + 1;
    }
    console.log("Chart Data:", chartData);
    this.setState((prevState) => {
      return {
        beerChartData: chartData.series,
        beerData: response.data.items,
        chartedBeers: this.chartedData(chartData.series, chartData.xaxis),
        mappedBeers: response.data.items.map(this.mapBeers),
      };
    });
  };

  onGetBeerDataError = (error) => {
    console.log("Get Beer Data Error: ", error);
    toast.warn(`Data Fetch ${error}`, {
      theme: "colored",
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  markovChain = (data) => {
    let maximumCycles = Number(this.state.modelSchema.maximumCycles);
    let steadyState = Number(this.state.modelSchema.steadyState);
    let probability = "";
    console.log(
      `Model Schema.  Steady State Precision: ${steadyState}, Maximum Cycles: ${maximumCycles}`
    );
    console.log("Markov Chain array:", data, data.length);
    let series = [];
    let xaxis = {};
    xaxis.categories = [0];
    for (let i = 0; i < data.length; i++) {
      series.push({ name: data[i].name, data: [data[i].quantityStart] });
    }
    console.log("Markov Chain starting series:", series);
    for (let j = 0; j < maximumCycles; j++) {
      for (let k = 0; k < data.length; k++) {
        if (k === 0) {
          probability = "probabilityA";
        } else if (k === 1) {
          probability = "probabilityB";
        } else if (k === 2) {
          probability = "probabilityC";
        } else if (k === 3) {
          probability = "probabilityD";
        } else if (k === 4) {
          probability = "probabilityE";
        } else if (k === 5) {
          probability = "probabilityF";
        }
        series[k].data.push(
          series[0].data[j] * data[0][probability] +
            series[1].data[j] * data[1][probability] +
            series[2].data[j] * data[2][probability] +
            series[3].data[j] * data[3][probability] +
            series[4].data[j] * data[4][probability] +
            series[5].data[j] * data[5][probability] +
            data[k].growth
        );
      }
      xaxis.categories.push(j + 1);
      if (
        (Math.abs(series[0].data[j] / series[0].data[j - 1] - 1) <
          steadyState ||
          series[0].data[j - 1] === 0) &&
        (Math.abs(series[1].data[j] / series[1].data[j - 1] - 1) <
          steadyState ||
          series[1].data[j - 1] === 0) &&
        (Math.abs(series[2].data[j] / series[2].data[j - 1] - 1) <
          steadyState ||
          series[2].data[j - 1] === 0) &&
        (Math.abs(series[3].data[j] / series[3].data[j - 1] - 1) <
          steadyState ||
          series[3].data[j - 1] === 0) &&
        (Math.abs(series[4].data[j] / series[4].data[j - 1] - 1) <
          steadyState ||
          series[4].data[j - 1] === 0) &&
        (Math.abs(series[5].data[j] / series[5].data[j - 1] - 1) <
          steadyState ||
          series[5].data[j - 1] === 0)
      ) {
        break;
      }
    }
    return { series, xaxis };
  };

  chartedData = (markovData, xaxis) => {
    let selectedMarkovData = markovData.filter(this.filterMarkovData);
    console.log(
      "Full Markov Data: ",
      markovData,
      "Filtered (no zero start counts) Markov Data",
      selectedMarkovData
    );
    return <BeerChart chartProp={selectedMarkovData} xaxisProp={xaxis} />;
  };

  filterMarkovData = (oneSeries) => {
    let result = false;
    if (oneSeries.data[0] > 0) {
      result = true;
    }
    return result;
  };

  setDataTableSchema = (data) => {
    let dataTableSchema = {};
    dataTableSchema.headerFontSize = "85%";
    dataTableSchema.pxFourDisplay = "text-center";
    dataTableSchema.pxFiveDisplay = "text-center";
    dataTableSchema.pxSixDisplay = "text-center";
    for (let i = 3; i < data.length; i++) {
      if (i === 3 && data[i].quantityStart === 0) {
        dataTableSchema.pxFourDisplay = "d-none";
      } else if (i === 4 && data[i].quantityStart === 0) {
        dataTableSchema.pxFiveDisplay = "d-none";
      } else if (i === 5 && data[i].quantityStart === 0) {
        dataTableSchema.pxSixDisplay = "d-none";
      }
    }
    if (
      data[3].quantityStart === 0 ||
      data[4].quantityStart === 0 ||
      data[5].quantityStart === 0
    ) {
      dataTableSchema.headerFontSize = "100%";
    }
    this.setState((prevState) => {
      return {
        dataTableSchema: dataTableSchema,
      };
    });
  };

  mapBeers = (oneBeer) => {
    let rowDisplay = {};
    if (oneBeer.quantityStart === 0) {
      rowDisplay.row = "d-none";
    }
    return (
      // The key element must be in the first element of the return, even if the first line is <React.Fragment>
      <SingleBeer
        key={`Beer-${oneBeer.id}`}
        beerProp={oneBeer}
        rowDisplayProp={rowDisplay}
        columnDisplayProp={this.state.dataTableSchema}
      />
    );
  };

  onManageModelClick = () => {
    console.log("Manage Model Clicked");
    this.setState((prevState) => {
      let manageModel = { ...prevState.manageModel };
      manageModel.modelOptions = [...prevState.userBeerModelOptions];
      manageModel.modelName = prevState.modelSchema.beerModelName;
      manageModel.isOpen = !prevState.manageModel.isOpen;
      return { manageModel };
    });
  };

  toggleManageModal = () => {
    console.log("Manage Model Modal Toggled");
    this.setState((prevState) => {
      let manageModel = { ...prevState.manageModel };
      manageModel.isOpen = !prevState.manageModel.isOpen;
      return { manageModel };
    });
    this.getBeerModelNames();
  };

  onUpdateAllClick = () => {
    console.log("Update all Clicked");
    this.setState((prevState) => {
      let dataToBeUpdated = { ...prevState.dataToBeUpdated };
      dataToBeUpdated.newBeerData = [...prevState.beerData];
      dataToBeUpdated.isOpen = !prevState.dataToBeUpdated.isOpen;
      return { dataToBeUpdated };
    });
  };

  toggleModal = () => {
    console.log("Update Data Modal Toggled");
    this.setState((prevState) => {
      let dataToBeUpdated = { ...prevState.dataToBeUpdated };
      dataToBeUpdated.isOpen = !prevState.dataToBeUpdated.isOpen;
      return { dataToBeUpdated };
    });
    this.getNewBeerData();
  };

  onMoreInfoClick = () => {
    console.log("More Info Clicked");
    this.setState((prevState) => {
      let modelInstructions = { ...this.state.modelInstructions };
      modelInstructions.isOpen = !this.state.modelInstructions.isOpen;
      return { modelInstructions };
    });
  };

  toggleMoreInfoModal = () => {
    console.log("More Info Modal Closing");
    this.setState((prevState) => {
      let modelInstructions = { ...this.state.modelInstructions };
      modelInstructions.isOpen = !this.state.modelInstructions.isOpen;
      return { modelInstructions };
    });
  };

  getNewBeerData() {
    beersService
      .getBeerDataByModel(this.state.modelSchema.beerModelName)
      .then(this.onGetNewBeerDataSuccess)
      .catch(this.onGetBeerDataError);
  }

  onGetNewBeerDataSuccess = (response) => {
    console.log("New Beer Data Refresh:", response.data.items);
    this.setDataTableSchema(response.data.items);
    for (let i = 0; i < response.data.items.length; i++) {
      response.data.items[i].row = i + 1;
    }
    this.setState((prevState) => {
      return {
        beerData: response.data.items,
        mappedBeers: response.data.items.map(this.mapBeers),
      };
    });
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    let steadyStateMessage = this.state.modelSchema.steadyStateMessage;
    let maximumCyclesMessage = this.state.modelSchema.maximumCyclesMessage;
    let isInteger = Number.isInteger(Number(value));
    let isInRange = value > 0.15 ? false : value < 0 ? false : true;
    let isPositive = value >= 1;
    let isTooLarge = value > 1000;
    if (name === "maximumCycles") {
      value = value - (value - Math.floor(value));
      if (!isPositive || !isInteger) {
        maximumCyclesMessage =
          "Maximum Cycles must be a positive whole number.";
      } else if (isTooLarge) {
        maximumCyclesMessage = "Maximum Cycles cannot exceed 1000.";
      } else {
        maximumCyclesMessage = "";
      }
    } else if (name === "steadyState") {
      if (!isInRange) {
        steadyStateMessage = "Steady State must be from 0 to 0.15.";
      } else {
        steadyStateMessage = "";
      }
    } else if (name === "beerModelName") {
      console.log("Beer Model Changed:", name, value);
    }
    this.setState(
      (prevState) => {
        let modelSchema = { ...prevState.modelSchema };
        modelSchema[name] = value;
        modelSchema.steadyStateMessage = steadyStateMessage;
        modelSchema.maximumCyclesMessage = maximumCyclesMessage;
        return { modelSchema };
      },
      () => {
        if (name === "beerModelName") {
          this.getNewBeerData();
        }
      }
    );
  };

  onRunModel = () => {
    if (
      this.state.modelSchema.steadyStateMessage !== "" ||
      this.state.modelSchema.maximumCyclesMessage !== ""
    ) {
      return;
    } else {
      console.log("Model Running:", this.state.beerData);
      let chartData = this.markovChain([...this.state.beerData]);
      console.log("New Chart Data:", chartData);
      this.setState((prevState) => {
        return {
          beerChartData: chartData.series,
          chartedBeers: this.chartedData(chartData.series, chartData.xaxis),
        };
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Card className="card-box mb-5 container">
          <CardHeader className="card-header-alt p-0">
            <div className="mb-2 bg-light rounded-5">
              <div className="row d-flex align-items-center container-fluid py-2 mx-3">
                <Col lg="10" sm="10" xl="10" md="10">
                  <h1 className="display-6 fw-bold text-primary">
                    Beer Model #{this.state.modelSchema.beerModelName}
                  </h1>
                </Col>
                <Col lg="2" sm="2" xl="2" md="2">
                  <Button
                    color="primary"
                    className="rounded-sm text-uppercase font-size-xs font-weight-bold py-0 shadow-none hover-scale-sm w-auto mx-4"
                    onClick={this.onMoreInfoClick}
                    style={{ alignContent: "right" }}
                  >
                    More Info
                  </Button>
                </Col>
              </div>
            </div>
          </CardHeader>
          <div className="divider" />
          <div className="row d-flex justify-content-between pt-4 px-4">
            <Col lg="6" sm="6" xl="6" md="6">
              <Table
                responsive
                className="table-alternate-spaced mb-0 mt-5"
                border="primary"
              >
                <thead
                  className="thead-light text-capitalize font-size-sm font-weight-bold"
                  style={{
                    fontSize: `${this.state.dataTableSchema.headerFontSize}`,
                  }}
                >
                  <tr>
                    <th className="text-center px-4">#</th>
                    <th className="text-left">Beer</th>
                    <th className="text-center">Initial Count</th>
                    <th className="text-center">
                      Px ({this.state.beerData[0].name.replace(/\s/g, "")})
                    </th>
                    <th className="text-center">
                      Px ({this.state.beerData[1].name.replace(/\s/g, "")})
                    </th>
                    <th className="text-center">
                      Px ({this.state.beerData[2].name.replace(/\s/g, "")})
                    </th>
                    <th className={this.state.dataTableSchema.pxFourDisplay}>
                      Px ({this.state.beerData[3].name.replace(/\s/g, "")})
                    </th>
                    <th className={this.state.dataTableSchema.pxFiveDisplay}>
                      Px ({this.state.beerData[4].name.replace(/\s/g, "")})
                    </th>
                    <th className={this.state.dataTableSchema.pxSixDisplay}>
                      Px ({this.state.beerData[5].name.replace(/\s/g, "")})
                    </th>
                    <th className="text-center">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  <>{this.state.mappedBeers}</>
                </tbody>
              </Table>
            </Col>
            <Col lg="6" sm="6" xl="6" md="6">
              <>{this.state.chartedBeers}</>
            </Col>
          </div>
          <div className="divider mt-3" />
          <div className="row card-footer p-4">
            <Col
              lg="6"
              sm="6"
              xl="6"
              md="6"
              className="d-flex justify-content-around"
            >
              <form>
                <div className="input-group">
                  <div className="form-group-prepend Col-2">
                    <span
                      className="input-group-text border-0"
                      id="beerModelName"
                    >
                      <label
                        className="custom-control-label align-middle"
                        style={{ fontWeight: "bold" }}
                        htmlFor="customControlInline"
                      >
                        Model Name
                      </label>
                    </span>
                  </div>
                  <div className="Col-2">
                    <select
                      name="beerModelName"
                      className="form-control custom-select text-center"
                      value={this.state.modelSchema.beerModelName}
                      onChange={this.handleChange}
                    >
                      {this.state.mappedBeerModelOptions}
                    </select>
                  </div>
                  <div className="form-group-prepend Col-2">
                    <span
                      className="input-group-text border-0"
                      id="steadyState"
                    >
                      <label
                        className="custom-control-label align-middle"
                        style={{ fontWeight: "bold" }}
                        htmlFor="customControlInline"
                      >
                        Steady State
                      </label>
                    </span>
                  </div>
                  <input
                    type="text"
                    name="steadyState"
                    className="form-control Col-2 text-center"
                    value={this.state.modelSchema.steadyState}
                    onChange={this.handleChange}
                    placeholder={0.005}
                  ></input>
                  <div className="form-group-prepend col-3">
                    <span
                      className="input-group-text border-0"
                      id="maximumCycles"
                    >
                      <label
                        className="custom-control-label align-middle"
                        style={{ fontWeight: "bold" }}
                        htmlFor="customControlInline"
                      >
                        Maximum Cycles
                      </label>
                    </span>
                  </div>
                  <input
                    type="number"
                    name="maximumCycles"
                    className="form-control Col-1 text-center"
                    value={this.state.modelSchema.maximumCycles}
                    onChange={this.handleChange}
                    placeholder="50"
                  ></input>
                  <span className="text-danger align-right">
                    {this.state.modelSchema.steadyStateMessage}
                  </span>
                  <span className="text-danger align-right">
                    {this.state.modelSchema.maximumCyclesMessage}
                  </span>
                </div>
              </form>
            </Col>
            <Col
              lg="6"
              sm="6"
              xl="6"
              md="6"
              className="d-flex justify-content-around"
            >
              <Button
                color="primary"
                className="rounded-sm text-uppercase font-size-xs font-weight-bold mr-4 py-0 shadow-none hover-scale-sm w-auto d-40"
                onClick={this.onManageModelClick}
              >
                Manage Model
              </Button>
              <Button
                color="primary"
                className="rounded-sm text-uppercase font-size-xs font-weight-bold mr-4 py-0 shadow-none hover-scale-sm w-auto d-40"
                onClick={this.onUpdateAllClick}
              >
                Update Data
              </Button>
              <Button
                color="primary"
                className="rounded-sm text-uppercase font-size-xs font-weight-bold mr-4 py-0 shadow-none hover-scale-sm w-auto d-40"
                onClick={this.onRunModel}
              >
                Run Model
              </Button>
            </Col>
          </div>
        </Card>
        <ManageModelModal
          modelProp={this.state.manageModel}
          toggleModal={this.toggleManageModal}
        ></ManageModelModal>
        <BeerDataModal
          beerProp={this.state.dataToBeUpdated}
          toggleModal={this.toggleModal}
        ></BeerDataModal>
        <MoreInfoModal
          isOpen={this.state.modelInstructions.isOpen}
          toggleModal={this.toggleMoreInfoModal}
        ></MoreInfoModal>
      </React.Fragment>
    );
  }
}

BeerModel.propTypes = {
  beerData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      quantityStart: PropTypes.number,
      probabilityA: PropTypes.number,
      probabilityB: PropTypes.number,
      probabilityC: PropTypes.number,
      probabilityD: PropTypes.number,
      probabilityE: PropTypes.number,
      probabilityF: PropTypes.number,
      growth: PropTypes.number,
    })
  ),
};

export default BeerModel;
