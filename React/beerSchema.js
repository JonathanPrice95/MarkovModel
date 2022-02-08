import * as Yup from "yup";

const YupBeer = () => {
  const validate = Yup.object().shape({
    name: Yup.string().typeError("You must specify a name").min(1, "Minimum of 1 character.").max(25, "Maximum of 25 characters").required("Required"),
    quantityStart: Yup.number().typeError("You must specify a number").min(0).required("Required"),
    probabilityA: Yup.number().typeError("You must specify a number").min(0.00).max(1).required("Required"),
    probabilityB: Yup.number().typeError("You must specify a number").min(0.00).max(1).required("Required"),
    probabilityC: Yup.number().typeError("You must specify a number").min(0.00).max(1).required("Required"),
    probabilityD: Yup.number().typeError("You must specify a number").min(0.00).max(1).required("Required"),
    probabilityE: Yup.number().typeError("You must specify a number").min(0.00).max(1).required("Required"),
    probabilityF: Yup.number().typeError("You must specify a number").min(0.00).max(1).required("Required"),
    growth: Yup.number().integer("You must specify a whole number").required("Required"),
  });

  return validate;
};

export default YupBeer;