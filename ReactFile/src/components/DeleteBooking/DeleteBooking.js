import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import $ from "jquery";

function DeleteBooking() {
  const [show, setShow] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setUserEmail("");
  };


  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  const start = new Date(startDate);
  const end = new Date(endDate);

  const deleteHandler = () => {
    console.log("DELETE");
    const formdata = new FormData();
    formdata.append("email", userEmail);
    formdata.append("startDate", start);
    formdata.append("endDate", end);

    $.ajax({
      type: "POST",
      url: `http://localhost:4000/cr/cancelRoom`,
      data: formdata,

      success: (response) => {
        swal({
          title: "Done!",
          text: "Booking cancelled successfully!",
          type: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setShow(false)
      },

      contentType: false,
      processData: false,
    }).fail(function (response) {
      swal({
        title: "Failed to cancel the booking.",
        text: "Please check the input!",
        type: "error",
        timer: 4000,
        showConfirmButton: false,
      });
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Cancel Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="bookingForm.ControlInput1">
              <Form.Label>User Email*</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="name@example.com"
                autoFocus
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="bookingForm.ControlInput3"
              >
                <Form.Label>Arrival date*</Form.Label>
                <Form.Control
                  name="startDate"
                  type="datetime-local"
                  required=""
                  min={disablePastDate()}
                  aria-required="true"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="bookingForm.ControlInput4"
              >
                <Form.Label>Departure date*</Form.Label>
                <Form.Control
                  name="endDate"
                  type="datetime-local"
                  required=""
                  min={disablePastDate()}
                  aria-required="true"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="submit"
            className="btn btn-success btn-lg"
            onClick={deleteHandler}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      <button
        type="button"
        className="btn btn-secondary btn-lg"
        onClick={handleShow}
      >
        Cancel Booking
      </button>
    </>
  );
}

export default DeleteBooking;
