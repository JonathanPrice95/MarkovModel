import React from "react";
import modelInstruction from "./beerModelInstructions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const MoreInfoModal = (props) => {
  return (
    <React.Fragment>
      <Modal
        zIndex={2000}
        centered
        size="xl"
        isOpen={props.isOpen}
        toggle={props.toggleModal}
        contentClassName="bg-primary text-white"
      >
        <ModalHeader>The Beer Model</ModalHeader>
        <ModalBody>
          <p> {modelInstruction.modelInformation1} </p>
          <p>
            {modelInstruction.modelInformation2}{" "}
            {modelInstruction.modelInformation3}{" "}
            {modelInstruction.modelInformation4}
          </p>
          <p>{modelInstruction.modelInformation5}</p>
          <p>
            {modelInstruction.modelInformation6}{" "}
            {modelInstruction.modelInformation7}{" "}
            {modelInstruction.modelInformation8}{" "}
            {modelInstruction.modelInformation9}{" "}
            {modelInstruction.modelInformation10}
          </p>
          <p>{modelInstruction.modelInformation11}</p>
          <p>
            {modelInstruction.modelInformation12}{" "}
            {modelInstruction.modelInformation13}{" "}
          </p>
          <p>
            {modelInstruction.modelInformation14}{" "}
            {modelInstruction.modelInformation15}{" "}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default MoreInfoModal;
