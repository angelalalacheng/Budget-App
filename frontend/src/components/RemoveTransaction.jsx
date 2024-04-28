import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const RemoveTransaction = ({ transactionType, transaction, onRemove }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  /*********************************Function********************************/

  const handleRemove = async () => {
    try {
      await axios.delete(
        `/deleteTransaction?type=${transactionType}&id=${transaction.id}`
      );

      // Call the onRemove function to update the frontend state
      onRemove(transaction);
    } catch (error) {
      console.error(`Error removing ${transactionType}:`, error);
    }
  };
  /*********************************Function********************************/

  return (
    <>
      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => setShowConfirmation(true)}
      >
        <i className="bi bi-trash3-fill"></i>
      </button>

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this {transactionType}?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-success"
            onClick={() => setShowConfirmation(false)}
          >
            <i className="bi bi-x-square me-2"></i>Close
          </Button>
          <Button variant="outline-danger" onClick={handleRemove}>
            <i className="bi bi-trash3-fill me-2"></i>Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveTransaction;
