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

class Sedes extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      sedesData: [],
      encargadosData: [],
      municipiosData: []
    };
    this.guardarSede = this.guardarSede.bind(this);
    this.modificarSede = this.modificarSede.bind(this);
    this.eliminarSede = this.eliminarSede.bind(this);
  }

  callAPI(){
    fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/sede')
      .then(res => res.text())
      .then(res => this.setState({sedesData: JSON.parse(res)}));

    fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/usuario_rol2/5')
      .then(res => res.text())
      .then(res => this.setState({encargadosData: JSON.parse(res)}));

    fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/municipio')
      .then(res => res.text())
      .then(res => this.setState({municipiosData: JSON.parse(res)}));
  }

  componentWillMount(){
    this.callAPI();
  }

  guardarSede(){
    console.log("Guardar Sede");
    var alias = document.getElementById('txtAlias');
    var encargado = document.getElementById('selectEncargado');
    var municipio = document.getElementById('selectMunicipio');
    var direccion = document.getElementById('txtDireccion');
    console.log("Alias: " + alias.value);
    console.log("encargado: " + encargado[encargado.selectedIndex].id);
    console.log("municipio: " + municipio[municipio.selectedIndex].id);
    console.log("direccion: " + direccion.value);
  
    //return;
    fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/sede', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ alias: alias.value, encargado: encargado[encargado.selectedIndex].id, id_mun: municipio[municipio.selectedIndex].id, direccion: direccion.value })
    }).then(res => res.json())
      .then(res => console.log(res));
    
    alias.value = '';
    direccion.value = '';
  }
  
  modificarSede(){
    console.log("Modificar Sede");
    var alias = document.getElementById('txtAlias');
    var encargado = document.getElementById('selectEncargado');
    var municipio = document.getElementById('selectMunicipio');
    var direccion = document.getElementById('txtDireccion');
    var id_sede = document.getElementById('id_sede');
    console.log("Alias: " + alias.value);
    console.log("encargado: " + encargado[encargado.selectedIndex].id);
    console.log("municipio: " + municipio[municipio.selectedIndex].id);
    console.log("direccion: " + direccion.value);
    console.log("id_sede: " + id_sede.innerText);
  
    fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/sede/' + id_sede.innerText, {
      method: 'put',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ alias: alias.value, encargado: encargado[encargado.selectedIndex].id, id_mun: municipio[municipio.selectedIndex].id, direccion: direccion.value})
    }).then(res => res.json())
      .then(res => console.log(res));
    
    alias.value = '';
    direccion.value = '';
  }

  eliminarSede(){
    console.log("eliminarSede: ");
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Crear Sede</h5>
                  <br></br>
                  <h5 className="title" id="id_sede"></h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Alias</label>
                          <Input
                            placeholder="Nombre"
                            type="text"
                            id="txtAlias"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                            <label>Encargado</label>
                            <Input type="select" name="select" id="selectEncargado">
                              {
                                this.state.encargadosData.map(function(encargado) {
                                  return (
                                  <option key={encargado.id_usuario} id={encargado.id_usuario}>{encargado.nombre}</option>
                                    );
                                })
                              }
                            </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Municipio</label>
                          <Input type="select" name="select" id="selectMunicipio">
                              {
                                this.state.municipiosData.map(function(municipio) {
                                  return (
                                  <option key={municipio.id_mun} id={municipio.id_mun}>{municipio.nombre}</option>
                                    );
                                })
                              }
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                            <label>Dirección</label>
                            <Input
                                placeholder="Dirección"
                                type="text"
                                id="txtDireccion"
                            />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={this.guardarSede}>
                    Guardar
                  </Button>
                  <Button className="btn-fill" color="secondary" type="submit" onClick={this.modificarSede}>
                    Modificar
                  </Button>
                </CardFooter>
              </Card>
            </Col>

            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Sedes</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Alias</th>
                        <th>Dirección</th>
                        <th>Municipio</th>
                        <th>Encargado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.sedesData.map(function(sede) {
                          return (
                            <tr key = {sede.id_sede}>
                              <td>{sede.alias}</td>
                              <td>{sede.direccion}</td>
                              <td>{sede.nombre_mun}</td>
                              <td>{sede.nombre_encargado}</td>
                              <td>
                                <Row>
                                  <Col md="6">
                                    <span id="list" onClick={() =>{
                                        console.log('Modificar: ' + sede.id_sede);
                                        var alias = document.getElementById('txtAlias');
                                        var direccion = document.getElementById('txtDireccion'); 
                                        var id_sede = document.getElementById('id_sede');
                                        var encargado = document.getElementById('selectEncargado');
                                        encargado.value = sede.nombre_encargado;
                                        encargado[encargado.selectedIndex].id = sede.encargado;
                                        id_sede.innerText = sede.id_sede;
                                        alias.value = sede.alias;
                                        direccion.value = sede.direccion;
                                    }}>
                                      <i className="tim-icons icon-pencil"></i>
                                    </span>
                                    
                                  </Col>
                                  <Col md="6">
                                    <span id="list" onClick={() =>{
                                        console.log('Eliminar: ' + sede.id_sede);
                                        /*fetch('http://jsonplaceholder.typicode.com/todos/' + usuario.id)
                                          .then(res => res.text())
                                          .then(res=> console.log(res))*/
                                    }}>
                                      <i className="tim-icons icon-simple-remove"></i>
                                    </span>
                                  </Col>
                                </Row>
                              </td>
                            </tr>
                          );

                        })
                      }
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

export default Sedes;
