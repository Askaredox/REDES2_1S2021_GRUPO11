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



// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Form,
  Button,
  CardFooter,
  FormGroup,
  Input,
  Row,
  Col
} from "reactstrap";

//Nombre
//● Dirección
//● Estado (activa o inactiva)
//● Encargado

class ActualizarInventario extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      inventarioData: [],
      bodegasData: [{"nombre": "Bodegona", "direccion": "Mixco", "id": 1}, {"nombre": "Bodegona 3", "direccion": "Mixco 2", "id": 2}],
      postId: ''
    };
  }

  callAPI(){
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.text())
      .then(res => this.setState({inventarioData: JSON.parse(res)}));
  }

  componentWillMount(){
    this.callAPI();
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
          <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Modificar Inventario</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="px-md-1" md="12">
                        <FormGroup>
                            <label>Bodega</label>
                            <Input type="select" name="select" id="selectEncargado">
                              {
                                this.state.bodegasData.map(function(bodega) {
                                  return (
                                  <option key={bodega.id}>{bodega.nombre} - {bodega.id}</option>
                                    );
                                })
                              }
                            </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={this.guardarBodega}>
                    Guardar
                  </Button>
                  <Button className="btn-fill" color="secondary" type="submit" onClick={this.modificarBodega}>
                    Modificar
                  </Button>
                </CardFooter>
              </Card>
            </Col>

            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Bodegas</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Estado</th>
                        <th>Encargado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>

                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ActualizarInventario;
