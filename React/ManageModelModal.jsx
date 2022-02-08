import React, { useEffect, useState } from "react";
import * as beersService from "./services/beersService";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { Button, Col, Modal } from "reactstrap";

const ManageModelModal = (props) => {
  const models = props.modelProp;

  const [newModels, setNewModels] = useState({
    modelOptions: [],
    modelName: 0,
    newModelName: "",
    modelNameValid: "",
    modelNameMessage: "Input Name",
    addEditButton: "Add",
    deleteDisplay: "d-none",
  });

  useEffect(() => {
    setNewModels((prevState) => {
      let updatedModel = { ...prevState };
      let initializedModel = { ...models };
      if (initializedModel.modelName < 3) {
        initializedModel.modelName = 0;
        initializedModel.addEditButton = "Add";
        initializedModel.modelNameMessage = "Input Name";
        initializedModel.deleteDisplay = "d-none";
      } else {
        initializedModel.addEditButton = "Modify";
        initializedModel.modelNameMessage = "New Name";
        initializedModel.deleteDisplay =
          "btn-block text-uppercase font-weight-bold font-size-sm mt-4 justify-content-md-center w-25";
      }
      initializedModel.newModelName = "";
      initializedModel.modelNameValid = "";
      console.log(
        `Manage Model Modal Status: ${initializedModel.isOpen},`,
        "Update:",
        updatedModel,
        "Initialized: ",
        initializedModel
      );
      updatedModel = initializedModel;
      return updatedModel;
    });
  }, [models]);

  useEffect(() => {
    setNewModels((prevState) => {
      let updatedModel = { ...prevState };
      if (newModels.modelName < 3) {
        updatedModel.addEditButton = "Add";
        updatedModel.modelNameMessage = "New Model Name";
        updatedModel.deleteDisplay = "d-none";
      } else {
        updatedModel.addEditButton = "Modify";
        updatedModel.modelNameMessage = "New Name";
        updatedModel.deleteDisplay =
          "btn-block text-uppercase font-weight-bold font-size-sm mt-4 justify-content-md-center w-25";
      }
      return updatedModel;
    });
  }, [newModels.modelName]);

  const handleSubmit = () => {
    if (newModels.modelNameValid !== "") {
      return;
    }
    let payload = {};
    payload.id = Number(newModels.modelName);
    payload.name = newModels.newModelName;
    if (newModels.addEditButton === "Add") {
      console.log(
        `Add Model clicked. Model Id: ${payload.id}, Model Name: ${payload.name}`
      );
      beersService
        .addBeerModel(payload)
        .then(onAddModelSuccess)
        .catch(onModelError);
    } else {
      console.log(
        `Modify Model clicked. Model Id: ${payload.id}, Model Name: ${payload.name}`
      );
      beersService
        .updateBeerModelName(payload)
        .then(onUpdateModelSuccess)
        .catch(onModelError);
    }
  };

  const onAddModelSuccess = (response) => {
    console.log("Model added successfully:", response);
    toast.success(`Model ${newModels.newModelName} Added`, {
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

  const onUpdateModelSuccess = (response) => {
    console.log("Model updated successfully:", response);
    toast.success(`Model ${newModels.newModelName} Updated`, {
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

  const onDeleteModel = () => {
    console.log(`Delete Model clicked. Model Id: ${newModels.modelName}`);
    beersService
      .deleteBeerModel(newModels.modelName)
      .then(onDeleteModelSuccess)
      .catch(onModelError);
  };

  const onDeleteModelSuccess = (response) => {
    console.log("Model deleted successfully:", response);
    toast.success(`Model Deleted`, {
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

  const onModelError = (error) => {
    let newError = { ...error };
    error = newError.response.data.errors
      ? newError.response.data.errors[0].slice(0, 85)
      : error;
    console.log(`${newModels.addEditButton} Model Error: ${error}`);
    toast.error(`${error}`, {
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

  const toggleModal = function () {
    console.log("Manage Model Modal Toggled (Close)");
    props.toggleModal();
  };

  const handleChange = (eventData) => {
    let inputName = eventData.target.name;
    let inputValue = eventData.target.value;
    let modelNameValid = newModels.modelNameValid;
    if (inputName === "newModelName") {
      if (inputValue.length > 10) {
        modelNameValid = "Maximum Length is 10 characters";
      } else {
        modelNameValid = "";
      }
    }
    setNewModels((prevState) => {
      let updatedModel = { ...prevState };
      updatedModel[inputName] = inputValue;
      updatedModel.modelNameValid = modelNameValid;
      return updatedModel;
    });
  };

  return (
    <React.Fragment>
      <Modal
        zIndex={2000}
        centered
        size="md"
        isOpen={models.isOpen}
        toggle={toggleModal}
        contentClassName="bg-primary text-white"
      >
        <div className="pt-4 px-5">
          <Col lg="12" sm="12" xl="12" md="12">
            <div
              border="true"
              className="border text-white text-center row d-flex justify-content-around py-2 px-2"
              style={{ fontSize: "large" }}
            >
              <Col lg="10" sm="10" xl="10" md="10">
                <div>Create, Modify, or Delete a Model</div>
              </Col>
            </div>
            <div className="shape-container-top-1" style={{ margin: 0 }}></div>
          </Col>
        </div>
        <div className="row justify-content-start pb-4">
          <Col lg="8" sm="8" xl="8" md="8" className="d-flex">
            <form>
              <div className="input-group mt-4">
                <div className="form-group-prepend col-5 mx-4">
                  <span className="input-group-text border-0" id="modelName">
                    <label
                      className="custom-control-label text-white"
                      style={{ fontWeight: "bold" }}
                      htmlFor="customControlInline"
                    >
                      Select Model
                    </label>
                  </span>
                </div>
                <div className="col-5">
                  <select
                    name="modelName"
                    className="form-control custom-select"
                    value={newModels.modelName}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    {<option value="0">Add New</option>}
                    {models.modelOptions}
                  </select>
                </div>
              </div>
              <div className="input-group mt-4">
                <div className="form-group-prepend col-5 mx-4">
                  <span className="input-group-text border-0" id="newModelName">
                    <label
                      className="custom-control-label text-white"
                      style={{ fontWeight: "bold" }}
                      htmlFor="customControlInline"
                    >
                      {newModels.modelNameMessage}
                    </label>
                  </span>
                </div>
                <div className="col-5">
                  <input
                    name="newModelName"
                    className="form-control custom-select"
                    value={newModels.newModelName}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder=""
                  ></input>
                </div>
                <span className="text-danger text-center mx-4">
                  {newModels.modelNameValid}
                </span>
              </div>
            </form>
          </Col>
        </div>
        <div className="row justify-content-md-center pb-4">
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
                {newModels.addEditButton}
              </Button>
              <Button
                type="select"
                className={newModels.deleteDisplay}
                color="secondary"
                onClick={() => {
                  onDeleteModel();
                }}
              >
                Delete
              </Button>
            </div>
          </Col>
        </div>
      </Modal>
    </React.Fragment>
  );
};

ManageModelModal.propTypes = {
  modelProp: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    userBeerModelOptions: PropTypes.arrayOf(
      PropTypes.shape({
        option: PropTypes.element,
      })
    ),
  }),
  toggleModal: PropTypes.func,
};

export default ManageModelModal;
