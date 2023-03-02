import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DeleteBooking from "../DeleteBooking/DeleteBooking";
import ViewBooking from "../ViewBooking/ViewBooking";
import swal from "sweetalert";
import $ from "jquery";

function Header() {
  const [show, setShow] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [roomType, setRoomType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);


  const handleClose = () => {
    setShow(false);
    setUserEmail("");
    setRoomType("");
    setStartDate("");
    setEndDate("");
    setPaymentMode("");
  };

  const handleShow = () => {
    setIsUpdate(false);
    setShow(true);
  };

  const updateHandler = () => {
    setShow(true);
    setIsUpdate(true);
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

  const submitHandler = (event) => {
    console.log("FORM");
    event.preventDefault();

    $.ajax({
      type: "POST",
      url: `http://localhost:4000/bk/bookRoom`,
      data: JSON.stringify({
        UserEmail: userEmail,
        RoomType: roomType,
        StartDate: start,
        EndDate: end,
        PaymentMode: paymentMode,
    }),

      success: (response) => {
        console.log(response)
        swal({
          title: "Done!",
          text: "Room booked successfully!",
          type: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setShow(false);
      }
    }).fail(function (response) {
      console.log(response)
      swal({
        title: "Failed to book the room.",
        text: "Please check the input!",
        type: "error",
        timer: 4000,
        showConfirmButton: false,
      });
    });
  };

  return (
    <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isUpdate ? "Update Room Booking" : "Book New Room"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="bookingForm.ControlInput1"
              >
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
                controlId="bookingForm.ControlInput2"
              >
                <Form.Label>Room Type*</Form.Label>
                <select
                  name="roomType"
                  class="form-select"
                  aria-label="Default select example"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                >
                  <option selected>Select</option>
                  <option>Single room (50 Rs per hour)</option>
                  <option>Double room (100 Rs per hour)</option>
                </select>
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
              <Form.Group
                className="mb-3"
                controlId="bookingForm.ControlInput5"
              >
                <Form.Label>Mode of payment*</Form.Label>
                <select
                  name="paymentMode"
                  class="form-select"
                  aria-label="Default select example"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                >
                  <option selected>Select</option>
                  <option>Cash</option>
                  <option>Card</option>
                  <option>UPI</option>
                </select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={handleClose}
            >
              Cancel
            </button>
            {isUpdate ? (
              <button
                type="submit"
                className="btn btn-success btn-lg"
                onClick={submitHandler}
              >
                Update
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-success btn-lg"
                onClick={submitHandler}
              >
                Book
              </button>
            )}
          </Modal.Footer>
        </Modal>
      <>
        <nav className="navbar navbar-dark bg-dark p-2">
          <h1 className="text-white">Hotel Room Management</h1>
          <div class="topnav-right">
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={handleShow}
          >
            Book New Room
          </button>&emsp;
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={updateHandler}
          >
            Update Booking
          </button>&emsp;
          <DeleteBooking />&emsp;
          <ViewBooking/>
          </div>
        </nav>
        <div>
          <img
            src="https://i.imgur.com/3pcJdqF.jpg"
            alt="Wintry Mountain Landscape"
            style={{ height: "800px", width: "1900px" }}
          />
        </div>
      </>
    </>
  );
}

export default Header;
