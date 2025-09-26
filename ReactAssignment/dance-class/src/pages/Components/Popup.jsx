import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Popup.css";

export default function Popup({ name, email, matter }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button type="button" className="submit-btn" onClick={handleShow}>
        Submit
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form">
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="inline-name">Name</label>
              </div>
              <div className="form-input">
                <input id="inline-name" type="text" value={name} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-label">
                <label htmlFor="inline-email">Email</label>
              </div>
              <div className="form-input">
                <input id="inline-email" type="text" value={email} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-label">
                <label htmlFor="inline-matter">Matter</label>
              </div>
              <div className="form-input">
                <textarea id="inline-matter" type="text" value={matter} />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
