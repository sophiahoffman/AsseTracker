import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'react-bootstrap'
import React, { Component } from 'react';

class Test extends Component {
    
render () {
    return (
<div>
{/* // <!-- Button trigger modal --> */}
<Button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</Button>

{/* // <!-- Modal --> */}
<Modal className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <Modal className="modal-dialog" role="document">
      <ModalHeader className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <Button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </Button>
      </ModalHeader>
      <ModalBody className="modal-body">
        ...
      </ModalBody>
      <ModalFooter className="modal-footer">
        <Button type="button" className="btn btn-secondary" data-dismiss="modal">Close</Button>
        <Button type="button" className="btn btn-primary">Save changes</Button>
      </ModalFooter>
    </Modal>
  </Modal>
</div>
    )}
}

export default Test