import React, { useEffect, useState } from "react";
import * as beersService from "./services/beersService";
import modelInstruction from "./beerModelInstructions";
import BeerDataCard from "./BeerDataCard";
import { toast } from "react-toastify";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import { Button, Col, Modal } from "reactstrap";

const _logger = debug.extend("BeerDataModal");

const BeerDataModal = (props) => {
  const beer = props.beerProp;

  const [newBeerData, setNewBeerData] = useState([
    {
      id: 1,
      name: "",
      quantityStart: 0,
      probabilityA: 1,
      probabilityB: 0,
      probabilityC: 0,
      probabilityD: 0,
      probabilityE: 0,
      probabilityF: 0,
      growth: 0,
      row: 1,
      displayFont: "",
    },
    {
      id: 2,
      name: "",
      quantityStart: 0,
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
      name: "",
      quantityStart: 0,
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
      name: "",
      quantityStart: 0,
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
      name: "",
      quantityStart: 0,
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
      name: "",
      quantityStart: 0,
      probabilityA: 0,
      probabilityB: 0,
      probabilityC: 0,
      probabilityD: 0,
      probabilityE: 0,
      probabilityF: 1,
      growth: 0,
    },
  ]);

  const [newDataScheme, setNewDataScheme] = useState({
    numberProducts: 6,
    modalSizeValue: "xl",
    pxColumnWidth: "1",
    pxFourDisplay: "",
    pxFiveDisplay: "",
    pxSixDisplay: "",
  });

  useEffect(() => {
    setNewBeerData((prevState) => {
      let updatedBeerData = [...prevState];
      let initializeBeerData = [...beer.newBeerData];
      for (let i = 0; i < initializeBeerData.length; i++) {
        initializeBeerData[i].row = i + 1;
      }
      console.log("Beer Data Modal Status:", beer.isOpen);
      console.log("Beer Data Modal Update:", updatedBeerData);
      console.log("Beer Data Modal Initialized:", initializeBeerData);
      updatedBeerData = initializeBeerData;
      return updatedBeerData;
    });
  }, [beer.isOpen, beer.newBeerData]);

  const mapBeerData = (oneBeerRow) => {
    return (
      <BeerDataCard
        key={`Beer-${oneBeerRow.id}`}
        beerDataProp={oneBeerRow}
        beerDisplayProp={newDataScheme}
        onKeyDown={onKeyDown}
        onMouseOut={onMouseLeave}
      />
    );
  };

  const handleSubmit = () => {
    _logger("Beer Data Update Submitted:", newBeerData);
    console.log("Beer Data Update Submitted:", newBeerData);
    let totalProbability = [];
    let probabilityError = 0;
    for (let i = 0; i < newBeerData.length; i++) {
      totalProbability[i] =
        newBeerData[i].probabilityA +
        newBeerData[i].probabilityB +
        newBeerData[i].probabilityC +
        newBeerData[i].probabilityD +
        newBeerData[i].probabilityE +
        newBeerData[i].probabilityF;
      if (Number(totalProbability[i].toFixed(4)) !== 1) {
        probabilityError += 1;
        toast.warn(
          `Row ${newBeerData[i].id} (${
            newBeerData[i].name
          }) probability (${totalProbability[i].toFixed(4)}) must add to 1)`,
          {
            theme: "colored",
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    }
    if (probabilityError === 0) {
      if (newBeerData[0].modelId < 3) {
        toast.warn(`System Models (Example1 and Example2) are "read only"`, {
          theme: "colored",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        let payload = { beers: newBeerData };
        console.log("Update Beer Data Payload", payload);
        beersService
          .updateBeerData(payload)
          .then(onUpdateBeerDataSuccess)
          .catch(onUpdateBeerDataError);
      }
    }
  };

  const onUpdateBeerDataSuccess = (response) => {
    console.log("Probability Model Updated Successfully", response);
    toast.success(`Probability Data Update Success!`, {
      theme: "colored",
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    toggleModal();
  };

  const toggleModal = function () {
    setNewDataScheme((prevState) => {
      let updatedDataScheme = { ...prevState };
      updatedDataScheme.numberProducts = 6;
      updatedDataScheme.modalSizeValue = "xl";
      updatedDataScheme.pxColumnWidth = "1";
      updatedDataScheme.pxFourDisplay = "";
      updatedDataScheme.pxFiveDisplay = "";
      updatedDataScheme.pxSixDisplay = "";
      return updatedDataScheme;
    });
    props.toggleModal();
  };

  const onUpdateBeerDataError = (error) => {
    let newError = { ...error };
    console.log(
      "Probability Model Update Failed",
      error,
      newError.response.data.errors[0]
    );
    toast.error(
      `${error}. ${newError.response.data.errors[0].slice(0, 40)}...`,
      {
        theme: "colored",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
    if (
      keyEvent.keyCode === 9 ||
      (keyEvent.charCode || keyEvent.keyCode) === 13
    ) {
      onEvent(keyEvent, setNewBeerData);
    }
  };

  const onMouseLeave = (mouseEvent) => {
    onEvent(mouseEvent, setNewBeerData);
  };

  const onEvent = (eventData, setNewBeerData) => {
    let inputName = eventData.target.name;
    let inputValue = "";
    if (inputName === "name") {
      inputValue = eventData.target.value;
    } else {
      inputValue = Number(Number(eventData.target.value).toFixed(4));
    }
    let inputRow = Number(eventData.target.attributes.inputnamevalue.value) - 1;
    setNewBeerData((prevState) => {
      let updatedBeerData = [...prevState];
      updatedBeerData[inputRow][inputName] = inputValue;
      return updatedBeerData;
    });
  };

  const onProductEvent = (eventData) => {
    let inputName = eventData.target.name;
    let inputValue = eventData.target.value;
    let modalSize = Number(inputValue) > 3 ? "xl" : "lg";
    let pxColumn = Number(inputValue) > 3 ? "1" : "2";
    let pxFourFont = Number(inputValue) < 4 ? "d-none" : "";
    let pxFiveFont = Number(inputValue) < 5 ? "d-none" : "";
    let pxSixFont = Number(inputValue) < 6 ? "d-none" : "";
    setNewDataScheme((prevState) => {
      let updatedDataScheme = { ...prevState };
      updatedDataScheme[inputName] = inputValue;
      updatedDataScheme.modalSizeValue = modalSize;
      updatedDataScheme.pxColumnWidth = pxColumn;
      updatedDataScheme.pxFourDisplay = pxFourFont;
      updatedDataScheme.pxFiveDisplay = pxFiveFont;
      updatedDataScheme.pxSixDisplay = pxSixFont;
      return updatedDataScheme;
    });
    let display = "d-none";
    setNewBeerData((prevState) => {
      let updatedBeerData = [...prevState];
      console.log("Products Array Length:", inputValue);
      for (let i = 0; i < updatedBeerData.length; i++) {
        if (Number(inputValue) === 3) {
          updatedBeerData[i].probabilityD = i === 3 ? 1 : 0;
          updatedBeerData[i].probabilityE = i === 4 ? 1 : 0;
          updatedBeerData[i].probabilityF = i === 5 ? 1 : 0;
          if (i >= 3) {
            updatedBeerData[i].quantityStart = 0;
            updatedBeerData[i].probabilityA = 0;
            updatedBeerData[i].probabilityB = 0;
            updatedBeerData[i].probabilityC = 0;
            updatedBeerData[i].growth = 0;
            updatedBeerData[i].displayFont = display;
          }
        } else if (Number(inputValue) === 4) {
          updatedBeerData[i].probabilityE = i === 4 ? 1 : 0;
          updatedBeerData[i].probabilityF = i === 5 ? 1 : 0;
          if (i >= 4) {
            updatedBeerData[i].quantityStart = 0;
            updatedBeerData[i].probabilityA = 0;
            updatedBeerData[i].probabilityB = 0;
            updatedBeerData[i].probabilityC = 0;
            updatedBeerData[i].probabilityD = 0;
            updatedBeerData[i].growth = 0;
            updatedBeerData[i].displayFont = display;
          } else {
            updatedBeerData[i].displayFont = "";
          }
        } else if (Number(inputValue) === 5) {
          updatedBeerData[i].probabilityF = i === 5 ? 1 : 0;
          if (i >= 5) {
            updatedBeerData[i].quantityStart = 0;
            updatedBeerData[i].probabilityA = 0;
            updatedBeerData[i].probabilityB = 0;
            updatedBeerData[i].probabilityC = 0;
            updatedBeerData[i].probabilityD = 0;
            updatedBeerData[i].probabilityE = 0;
            updatedBeerData[i].growth = 0;
            updatedBeerData[i].displayFont = display;
          } else {
            updatedBeerData[i].displayFont = "";
          }
        } else {
          updatedBeerData[i].displayFont = "";
        }
      }
      return updatedBeerData;
    });
  };

  const onReset = () => {
    console.log("Beer Model Data Reset");
    setNewDataScheme((prevState) => {
      let updatedDataScheme = { ...prevState };
      updatedDataScheme.numberProducts = 6;
      updatedDataScheme.modalSizeValue = "xl";
      updatedDataScheme.pxColumnWidth = "1";
      updatedDataScheme.pxFourDisplay = "";
      updatedDataScheme.pxFiveDisplay = "";
      updatedDataScheme.pxSixDisplay = "";
      return updatedDataScheme;
    });
    setNewBeerData((prevState) => {
      let updatedBeerData = [...prevState];
      for (let i = 0; i < updatedBeerData.length; i++) {
        updatedBeerData[i].name = i === 0 ? "A" : updatedBeerData[i].name;
        updatedBeerData[i].name = i === 1 ? "B" : updatedBeerData[i].name;
        updatedBeerData[i].name = i === 2 ? "C" : updatedBeerData[i].name;
        updatedBeerData[i].name = i === 3 ? "D" : updatedBeerData[i].name;
        updatedBeerData[i].name = i === 4 ? "E" : updatedBeerData[i].name;
        updatedBeerData[i].name = i === 5 ? "F" : updatedBeerData[i].name;
        updatedBeerData[i].probabilityA = i === 0 ? 1 : 0;
        updatedBeerData[i].probabilityB = i === 1 ? 1 : 0;
        updatedBeerData[i].probabilityC = i === 2 ? 1 : 0;
        updatedBeerData[i].probabilityD = i === 3 ? 1 : 0;
        updatedBeerData[i].probabilityE = i === 4 ? 1 : 0;
        updatedBeerData[i].probabilityF = i === 5 ? 1 : 0;
        updatedBeerData[i].quantityStart = 0;
        updatedBeerData[i].growth = 0;
        updatedBeerData[i].displayFont = "";
      }
      return updatedBeerData;
    });
  };

  return (
    <React.Fragment>
      <Modal
        zIndex={2000}
        centered
        size={newDataScheme.modalSizeValue}
        isOpen={beer.isOpen}
        toggle={toggleModal}
        contentClassName="bg-primary text-white"
      >
        <div className="pt-4 px-5">
          <Col lg="12" sm="12" xl="12" md="12">
            <div
              border="true"
              className="border text-white text-center row d-flex justify-content-between py-2 px-2"
            >
              <div className="pb-2" style={{ textAlign: "left" }}>
                <Col lg="12" sm="12" xl="12" md="12">
                  {modelInstruction.dataInstruction}
                </Col>
              </div>
              <hr />
              <Col lg="2" sm="2" xl="2" md="2">
                <div>Beer</div>
              </Col>
              <Col lg="2" sm="2" xl="2" md="2">
                <div>Initial Count</div>
              </Col>
              <Col
                lg={newDataScheme.pxColumnWidth}
                sm={newDataScheme.pxColumnWidth}
                xl={newDataScheme.pxColumnWidth}
                md={newDataScheme.pxColumnWidth}
              >
                <div>Px ({beer.newBeerData[0].name})</div>
              </Col>
              <Col
                lg={newDataScheme.pxColumnWidth}
                sm={newDataScheme.pxColumnWidth}
                xl={newDataScheme.pxColumnWidth}
                md={newDataScheme.pxColumnWidth}
              >
                <div>Px ({beer.newBeerData[1].name})</div>
              </Col>
              <Col
                lg={newDataScheme.pxColumnWidth}
                sm={newDataScheme.pxColumnWidth}
                xl={newDataScheme.pxColumnWidth}
                md={newDataScheme.pxColumnWidth}
              >
                <div>Px ({beer.newBeerData[2].name})</div>
              </Col>
              <Col
                lg="1"
                sm="1"
                xl="1"
                md="1"
                className={newDataScheme.pxFourDisplay}
              >
                <div>Px ({beer.newBeerData[3].name})</div>
              </Col>
              <Col
                lg="1"
                sm="1"
                xl="1"
                md="1"
                className={newDataScheme.pxFiveDisplay}
              >
                <div>Px ({beer.newBeerData[4].name})</div>
              </Col>
              <Col
                lg="1"
                sm="1"
                xl="1"
                md="1"
                className={newDataScheme.pxSixDisplay}
              >
                <div>Px ({beer.newBeerData[5].name})</div>
              </Col>
              <Col lg="2" sm="2" xl="2" md="2">
                <div>Growth</div>
              </Col>
            </div>
            <>{beer.newBeerData.map(mapBeerData)}</>
          </Col>
          <div className="shape-container-top-1" style={{ margin: 0 }}></div>
        </div>
        <div className="row justify-content-md-center pb-4">
          <Col
            lg="4"
            sm="4"
            xl="4"
            md="4"
            className="d-flex justify-content-around"
          >
            <form>
              <div className="input-group mt-4">
                <div className="form-group-prepend Col-2">
                  <span
                    className="input-group-text border-0"
                    id="numberProducts"
                  >
                    <label
                      className="custom-control-label align-middle text-white"
                      style={{ fontWeight: "bold" }}
                      htmlFor="customControlInline"
                    >
                      Number of Products
                    </label>
                  </span>
                </div>
                <div className="Col-2">
                  <select
                    name="numberProducts"
                    className="form-control custom-select text-center"
                    value={newDataScheme.numberProducts}
                    onChange={(value) => {
                      onProductEvent(value);
                    }}
                  >
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                  </select>
                </div>
              </div>
            </form>
          </Col>
          <Col lg="8" sm="8" xl="8" md="8">
            <div className="d-flex justify-content-around">
              <Button
                type="select"
                className="btn-block text-uppercase font-weight-bold font-size-sm mt-4 justify-content-md-center w-25"
                color="secondary"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Update
              </Button>
              <Button
                type="select"
                className="btn-block text-uppercase font-weight-bold font-size-sm mt-4 justify-content-md-center w-25"
                color="secondary"
                onClick={() => {
                  onReset();
                }}
              >
                Reset
              </Button>
            </div>
          </Col>
        </div>
      </Modal>
    </React.Fragment>
  );
};

BeerDataModal.propTypes = {
  beerProp: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    newBeerData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        probabilityA: PropTypes.number.isRequired,
        probabilityB: PropTypes.number.isRequired,
        probabilityC: PropTypes.number.isRequired,
        probabilityD: PropTypes.number.isRequired,
        probabilityE: PropTypes.number.isRequired,
        probabilityF: PropTypes.number.isRequired,
        quantityStart: PropTypes.number.isRequired,
        growth: PropTypes.number.isRequired,
      })
    ),
  }),
  toggleModal: PropTypes.func,
};

export default BeerDataModal;
