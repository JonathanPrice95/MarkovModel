import React from "react";
import PropTypes from "prop-types";
import { Col } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import beerSchema from "./beerSchema";

const basicSchema = beerSchema;

function BeerDataCard(props) {
  const beerData = props.beerDataProp;
  const displayFont = props.beerDisplayProp;

  const onKeyDown = function (keyValue) {
    props.onKeyDown(keyValue);
  };

  const onMouseOut = function (value) {
    props.onMouseOut(value);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={beerData}
        validationSchema={basicSchema}
      >
        <Form
          onKeyDown={(keyValue) => {
            onKeyDown(keyValue);
          }}
        >
          <div className={beerData.displayFont}>
            <div className="row d-flex justify-content-between pt-3 px-1">
              <Col lg="2" sm="2" xl="2" md="2">
                <div id="name">
                  <Field
                    type="text"
                    inputnamevalue={beerData.row}
                    name="name"
                    className="form-control text-center"
                    onMouseOut={(value) => {
                      onMouseOut(value);
                    }}
                  ></Field>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="has-error"
                  />
                </div>
              </Col>
              <Col lg="2" sm="2" xl="2" md="2">
                <div id="quantityStart">
                  <Field
                    type="number"
                    inputnamevalue={beerData.row}
                    name="quantityStart"
                    className="form-control text-center"
                    onMouseOut={(value) => {
                      onMouseOut(value);
                    }}
                  ></Field>
                  <ErrorMessage
                    name="quantityStart"
                    component="div"
                    className="has-error"
                  />
                </div>
              </Col>
              <Col
                lg={displayFont.pxColumnWidth}
                sm={displayFont.pxColumnWidth}
                xl={displayFont.pxColumnWidth}
                md={displayFont.pxColumnWidth}
              >
                <div id="probabilityA">
                  <Field
                    type="decimal"
                    inputnamevalue={beerData.row}
                    name="probabilityA"
                    className="form-control text-center"
                    onMouseOut={(value) => {
                      onMouseOut(value);
                    }}
                  ></Field>
                  <ErrorMessage
                    name="probabilityA"
                    component="div"
                    className="has-error"
                  />
                </div>
              </Col>
              <Col
                lg={displayFont.pxColumnWidth}
                sm={displayFont.pxColumnWidth}
                xl={displayFont.pxColumnWidth}
                md={displayFont.pxColumnWidth}
              >
                <div id="probabilityB">
                  <Field
                    type="decimal"
                    inputnamevalue={beerData.row}
                    name="probabilityB"
                    className="form-control text-center"
                    onMouseOut={(value) => {
                      onMouseOut(value);
                    }}
                  ></Field>
                  <ErrorMessage
                    name="probabilityB"
                    component="div"
                    className="has-error"
                  />
                </div>
              </Col>
              <Col
                lg={displayFont.pxColumnWidth}
                sm={displayFont.pxColumnWidth}
                xl={displayFont.pxColumnWidth}
                md={displayFont.pxColumnWidth}
              >
                <div id="probabilityC">
                  <Field
                    type="decimal"
                    inputnamevalue={beerData.row}
                    name="probabilityC"
                    className="form-control text-center"
                    onMouseOut={(value) => {
                      onMouseOut(value);
                    }}
                  ></Field>
                  <ErrorMessage
                    name="probabilityC"
                    component="div"
                    className="has-error"
                  />
                </div>
              </Col>
              <Col
                lg="1"
                sm="1"
                xl="1"
                md="1"
                className={displayFont.pxFourDisplay}
              >
                <div id="probabilityD">
                  <Field
                    type="decimal"
                    inputnamevalue={beerData.row}
                    name="probabilityD"
                    className="form-control text-center"
                    onMouseOut={(value) => {
                      onMouseOut(value);
                    }}
                  ></Field>
                  <ErrorMessage
                    name="probabilityD"
                    component="div"
                    className="has-error"
                  />
                </div>
              </Col>
              <Col
                lg="1"
                sm="1"
                xl="1"
                md="1"
                className={displayFont.pxFiveDisplay}
              >
                <div id="probabilityE">
                  <Field
                    type="decimal"
                    inputnamevalue={beerData.row}
                    name="probabilityE"
                    className="form-control text-center"
                    onMouseOut={(value) => {
                      onMouseOut(value);
                    }}
                  ></Field>
                  <ErrorMessage
                    name="probabilityE"
                    component="div"
                    className="has-error"
                  />
                </div>
              </Col>
              <Col
                lg="1"
                sm="1"
                xl="1"
                md="1"
                className={displayFont.pxSixDisplay}
              >
                <div id="probabilityF">
                  <Field
                    type="decimal"
                    inputnamevalue={beerData.row}
                    name="probabilityF"
                    className="form-control text-center"
                    onMouseOut={(value) => {
                      onMouseOut(value);
                    }}
                  ></Field>
                  <ErrorMessage
                    name="probabilityF"
                    component="div"
                    className="has-error"
                  />
                </div>
              </Col>
              <Col lg="2" sm="2" xl="2" md="2">
                <div id="growth">
                  <Field
                    type="number"
                    inputnamevalue={beerData.row}
                    name="growth"
                    className="form-control text-center"
                    onMouseOut={(value) => {
                      onMouseOut(value);
                    }}
                  ></Field>
                  <ErrorMessage
                    name="growth"
                    component="div"
                    className="has-error"
                  />
                </div>
              </Col>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}

BeerDataCard.propTypes = {
  beerDataProp: PropTypes.shape({
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
  }),
  beerDisplayProp: PropTypes.shape({
    displayFont: PropTypes.string,
    pxFourDisplay: PropTypes.string,
    pxFiveDisplay: PropTypes.string,
    pxSixDisplay: PropTypes.string,
  }),
  onKeyDown: PropTypes.func,
  onMouseOut: PropTypes.func,
};

export default BeerDataCard;
