import React from "react";

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

class Clientes extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      clientes: [],
      sedes: []
    };
    this.guardar = this.guardar.bind(this);
    this.modificar = this.modificar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  async fetchData(){
    let response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/cliente');
    let dataClientes = await response.json();
    response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/sede');
    let dataSedes = await response.json();

    dataClientes.forEach(cliente => {
        for (let i = 0; i < dataSedes.length; i++) {
            if(cliente.id_sede === dataSedes[i].id_sede){
                cliente.sede = dataSedes[i].alias;
                break;
            }
        }
    });

    this.setState({clientes: dataClientes, sedes: dataSedes});
  }

  componentWillMount(){
    this.fetchData();
  }

  async guardar(){
    let IDTxt = document.getElementById('txtID');
    let DPITxt = document.getElementById('txtDPI');
    let NITTxt = document.getElementById('txtNIT');
    let NombreTxt = document.getElementById('txtNombre');
    let DireccionTxt = document.getElementById('txtDireccion');
    let sedeSelect = document.getElementById('selectSede');

    const status = await this.makeRequest({
        method:  IDTxt.value === '' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            dpi: DPITxt.value,
            nit: NITTxt.value,
            nombre: NombreTxt.value,
            direccion: DireccionTxt.value,
            id_sede : sedeSelect.options[sedeSelect.selectedIndex].value
        })
    }, IDTxt.value === '' ? '' : '/' + IDTxt.value);

    if(status === 404) console.log("Error")
    else this.fetchData();

    IDTxt.value = '';
    DPITxt.value = '';
    NITTxt.value = '';
    NombreTxt.value = '';
    DireccionTxt.value = '';
    sedeSelect.selectedIndex = 0;
  }

  modificar(id){
    this.setState(state => {
        let IDTxt = document.getElementById('txtID');
        let DPITxt = document.getElementById('txtDPI');
        let NITTxt = document.getElementById('txtNIT');
        let NombreTxt = document.getElementById('txtNombre');
        let DireccionTxt = document.getElementById('txtDireccion');
        let sedeSelect = document.getElementById('selectSede');

        for (let i = 0; i < state.clientes.length; i++) {
            if(state.clientes[i].id_cliente === id){
                IDTxt.value = state.clientes[i].id_cliente;
                DPITxt.value = state.clientes[i].dpi;
                NITTxt.value = state.clientes[i].nit;
                NombreTxt.value = state.clientes[i].nombre;
                DireccionTxt.value = state.clientes[i].direccion;

                for (let j = 0; j < state.sedes.length; j++) {
                    if(state.clientes[i].id_sede === state.sedes[j].id_sede){
                        sedeSelect.selectedIndex = j;
                        break;
                    }
                }

                break;
            }
        }
    });
  }

  eliminar(id){
    console.log("eliminar " + id)
  }

  async makeRequest(request, param = ''){
    const response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/cliente' + param, request);
    return response.status;
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Crear Cliente</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <Input
                            type="hidden"
                            id="txtID"
                            value=''
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>DPI</label>
                          <Input
                            placeholder="DPI"
                            type="text"
                            id="txtDPI"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                            <label>NIT</label>
                            <Input
                                placeholder="NIT"
                                type="text"
                                id="txtNIT"
                            />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Nombre</label>
                          <Input
                            placeholder="Nombre"
                            type="text"
                            id="txtNombre"
                          />
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
                    <Row>
                      <Col md="12">
                            <FormGroup>
                                <label>Sede</label>
                                <Input type="select" name="select" id="selectSede">
                                    {
                                        this.state.sedes.map(sede => {
                                            return (
                                                <option key = {sede.id_sede} value={sede.id_sede}>{sede.alias}</option>
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
                  <Button className="btn-fill" color="primary" type="submit" onClick={this.guardar}>
                    Guardar
                  </Button>
                </CardFooter>
              </Card>
            </Col>

            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Clientes</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>DPI</th>
                        <th>NIT</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Sede</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.clientes.map(cliente => {
                          return (
                            <tr key = {cliente.id_cliente}>
                              <td>{cliente.dpi}</td>
                              <td>{cliente.nit}</td>
                              <td>{cliente.nombre}</td>
                              <td>{cliente.direccion}</td>
                              <td>{cliente.sede}</td>
                              <td>
                                <Button className="btn-fill" color="primary" type="submit" onClick={e => this.modificar(cliente.id_cliente)}>
                                    Modificar
                                </Button>
                              </td>
                              <td>
                                <Button className="btn-fill" color="warning" type="submit" onClick={e => this.eliminar(cliente.id_cliente)}>
                                    Eliminar
                                </Button>
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

export default Clientes;
