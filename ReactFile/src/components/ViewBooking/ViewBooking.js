import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function ViewBooking() {
  const [show, setShow] = useState(false);
  const [dataList, setDataList] = useState([]);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const prevBookingHandler = () => {
    fetch("http://localhost:4000/vd/passed")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setDataList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const upcomingBookingHandler = () => {
    fetch("http://localhost:4000/vd/upcoming")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setDataList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>View Bookings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onClick={prevBookingHandler}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Previous Bookings
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onClick={upcomingBookingHandler}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Upcoming Bookings
              </label>
            </div>
          </div>
          {dataList && (
            <div className="container-lg">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">User Email</th>
                    <th scope="col">Room Type</th>
                    <th scope="col">Arrival Date</th>
                    <th scope="col">Departure date</th>
                    <th scope="col">Payment Mode</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {dataList.map((item, i) => (
                    <tr key={i}>
                      <td>{item.user_email}</td>
                      <td>{item.room_type}</td>
                      <td>{item.start_date}</td>
                      <td>{item.end_date}</td>
                      <td>{item.mode_of_payment}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <button
        type="button"
        className="btn btn-secondary btn-lg"
        onClick={handleShow}
      >
        View Bookings
      </button>
    </>
  );
}

export default ViewBooking;
