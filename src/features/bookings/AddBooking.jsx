import { useState } from "react";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Row from "../../ui/Row";

import CreateBookingForm from "./CreateBookingForm";

function AddBooking() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <Row>
      <div>
        <Button type="button" onClick={() => setIsOpenModal((show) => !show)}>
          {isOpenModal ? "Close booking form" : "Add new booking"}
        </Button>
      </div>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateBookingForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </Row>
  );
}

export default AddBooking;
