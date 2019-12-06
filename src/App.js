import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Modal, Button } from 'react-bootstrap';


function App() {


      const [show, setShow] = useState(false);
    
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
    
      return (
        <>
          <Button variant="primary" onClick={handleShow} display-toggle="modal" data-target="#exampleModal">
            Launch demo modal
          </Button>
    
          <Modal id="exampleModal" className="modal fade" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );

}

export default App;
