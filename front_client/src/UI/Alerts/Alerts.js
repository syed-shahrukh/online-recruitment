import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';




class Alert extends Component {

    render() {

        return(

            <Modal show={this.props.show} onHide={this.props.handleClose}>
                                <Modal.Header className="academic-modal-header" closeButton>
                                    <Modal.Title>{this.props.status}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                {this.props.message}
                                </Modal.Body>
                                
                            </Modal>
        );
    }
}


export default Alert;