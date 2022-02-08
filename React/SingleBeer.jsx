import React from "react";
import PropTypes from "prop-types";

function SingleBeer(props) {
  const beer = props.beerProp;
  const rowDisplay = props.rowDisplayProp;
  const columnDisplay = props.columnDisplayProp;

  return (
    <tr
      style={{ fontSize: `${columnDisplay.headerFontSize}` }}
      className={rowDisplay.row}
    >
      <td className="text-black-50 text-center">
        <span>{beer.row}</span>
      </td>
      <td>
        <b>{beer.name.replace(/\s/g, "")}</b>
      </td>
      <td className="text-primary text-center">
        <span>{beer.quantityStart}</span>
      </td>
      <td className="text-primary text-center">
        <span>{beer.probabilityA * 100}%</span>
      </td>
      <td className="text-primary text-center">
        <span>{beer.probabilityB * 100}%</span>
      </td>
      <td className="text-primary text-center">
        <span>{beer.probabilityC * 100}%</span>
      </td>
      <td className={columnDisplay.pxFourDisplay}>
        <span className="text-primary">{beer.probabilityD * 100}%</span>
      </td>
      <td className={columnDisplay.pxFiveDisplay}>
        <span className="text-primary">{beer.probabilityE * 100}%</span>
      </td>
      <td className={columnDisplay.pxSixDisplay}>
        <span className="text-primary">{beer.probabilityF * 100}%</span>
      </td>
      <td className="text-primary text-center">
        <span>{beer.growth}</span>
      </td>
    </tr>
  );
}

SingleBeer.propTypes = {
  beerProp: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    quantityStart: PropTypes.number,
    probabilityA: PropTypes.number,
    probabilityB: PropTypes.number,
    probabilityC: PropTypes.number,
    probabilityD: PropTypes.number,
    probabilityE: PropTypes.number,
    probabilityF: PropTypes.number,
    growth: PropTypes.number,
  }),
  rowDisplayProp: PropTypes.shape({
    row: PropTypes.string,
  }),
  columnDisplayProp: PropTypes.shape({
    headerFontSize: PropTypes.string.isRequired,
    pxFour: PropTypes.string,
    pxFive: PropTypes.string,
    pxSix: PropTypes.string,
  }),
};

export default SingleBeer;
