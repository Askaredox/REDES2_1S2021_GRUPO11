/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import Usuario from "./Usuario"
import ModificarProducto from "./ModificarProducto"
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  CardImg
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1"
    };
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  render() {
    return (
     <>
          <Row>
              
              <Card>
                <CardHeader>
                  <h5 className="title">Reportes</h5>
                </CardHeader>
                <CardBody>

                  <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                      <label></label>
                      <Usuario />
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h5 className="title">Reportes</h5>
                </CardHeader>
                <CardBody>

                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 3 }}>
                      <label></label>
                      <ModificarProducto />
                    </Col>
                  </Row>
                </CardBody>
              </Card>


              </Row>
     </>
    );
  }
}

export default Dashboard;
