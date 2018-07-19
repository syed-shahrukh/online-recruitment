import React, { Component } from 'react';
import Aux from '../../Auxilary/Auxilary';
import {
  Breadcrumb
} from "react-bootstrap";

class ManageSection extends Component{
 
    
    /***************************** Functions****************************************************** */
    handleClose = () => {
        this.setState({ parent_show: false });
    }
    
    handleShow = () => {
        this.setState({ parent_show: true });
    }
    handleChildShow = () => {
        this.setState({ child_show: true });
    }
    handleChildClose = () => {
        this.setState({ child_show: false });
    }
    handleDeleteOperation = () => {
        console.log("Delete operation function has been called!!!");
    }
    handleEditOperation = () =>{
        console.log("Edit operation function has been called!!!");
    }
    /***************************** End of Functions****************************************************** */
    
        showGraphicalContent = (event) => {
            const show = event.target.value;
            if(show === "graphical"){
              this.setState({graphic_content: true});
            }
            else{
              this.setState({graphic_content: false});
            }
        }
        summerNote = (content) => {
          console.log(content);
        }
      render() {
        return (
          <Aux>
          
          {/*********************** Bread Crumbs***************************************/}
            <Breadcrumb className="bread-crumb">
              <Breadcrumb.Item active href="/admin-portal/home/">Home</Breadcrumb.Item>
              
            </Breadcrumb>
          {/*********************** End of Bread Crumbs***************************************/}
          </Aux>
        );
      }
    }

export default ManageSection;