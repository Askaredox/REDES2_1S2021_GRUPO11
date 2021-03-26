import React from "react";

import CrearReporte from "./CrearReporte"
import ListarReportes from "./ListarReportes"

import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";

class App extends React.Component {
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
     <Col sm="12" md={{ size: 6, offset: 3 }}>


     <Card >

    
          <Row>
              
              <Card>
                <CardHeader>
                  <h5 className="title">Reportes</h5>
                </CardHeader>
                <CardBody>

                  <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                      <label></label>
                      <CrearReporte />
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
                      <ListarReportes />
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              </Row> 
        </Card>
             </Col>
     </>
    );
  }
}

export default App;
