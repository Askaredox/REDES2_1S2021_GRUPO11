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
  Col,
  Label,
} from "reactstrap";
import { FormControl, ControlLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";

class usuario extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      carnet: -1,
      nombre: '',
      curso: '',
      detalle: '',
    };
    // this.guardar = this.guardar.bind(this);
    this.eliminar = this.eliminar.bind(this);




    this.handleChangeCarnet = this.handleChangeCarnet.bind(this);
    this.handleChangeNombre = this.handleChangeNombre.bind(this);
    this.handleChangeCursoPoryecto = this.handleChangeCursoPoryecto.bind(this);
    this.handleChangeDetalle = this.handleChangeDetalle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChangeCarnet(event) {
    this.setState({ carnet: event.target.value });
  }

  async handleChangeNombre(event) {
    this.setState({ nombre: event.target.value });
  }

  async handleChangeCursoPoryecto(event) {
    this.setState({ curso: event.target.value });
  }

  async handleChangeDetalle(event) {
    this.setState({ detalle: event.target.value });
  }

  async handleSubmit() {

    // console.log(event)
    // event.preventDefault();

    let obj = JSON.stringify({
          carnet:  parseInt(this.state.carnet, 10),
          nombre: this.state.nombre + "",
          curso: this.state.curso + "",
          mensaje: this.state.detalle + ""
        })

        console.log(obj)
    fetch(`http://172.35.71.2:80/add_reporte`, {
      method: 'POST',
      body: obj,
      headers: {
          'Content-Type': 'application/json'
      }
    }).then(async function (response) {
      console.log(response)

      // let respuesta = await response.json();

      // console.log(respuesta)
      
      if(response.ok) return alert('Dato ingresado')
      alert('error')

    });


  }


  async fetchData() {
    // let dataUsuario = JSON.parse(localStorage.getItem('current'))
 
    // this.setState({ usuario: dataUsuario });
  }

  componentWillMount() {
    this.fetchData();
  }



  eliminar(id) {
    console.log("eliminar " + id)
  }



  render() {
    return (
      <>
    
                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 3 }}>
                      <label>Carnet</label>
                      <FormGroup>

                        <FormControl
                          // autoFocus
                          type="text"
                          // alue={this.state.usuario['usuario']}
                          onChange={this.handleChangeCarnet}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 3 }}>
                      <label>Nombre</label>
                      <FormGroup>

                        <FormControl
                          // autoFocus
                          type="text"
                          // defaultValue={this.state.usuario['nombre']}
                          onChange={this.handleChangeNombre}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 3 }}>
                      <label>Curso/Proyecto</label>
                      <FormGroup>

                        <FormControl
                          // autoFocus
                          type="text"
                          // defaultValue={this.state.usuario['apellido']}
                          onChange={this.handleChangeCursoPoryecto}
                        />
                        
                      </FormGroup>
                    </Col>


                  </Row>
                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 3 }}>
                      <label>Detalle del Reporte</label>
                      {/* <FormGroup>

                        <FormControl
                          // autoFocus
                          type="textarea"
                          // defaultValue={this.state.usuario['direccion']}
                          
                        />
                      </FormGroup > */}

                        <FormGroup>
                          {/* <Label for="exampleText">Text Area</Label> */}
                          <Input 
                            type="textarea" 
                            name="text" 
                            onChange={this.handleChangeDetalle}
                          />
                        </FormGroup>
      
                    </Col>
                  </Row>
          
                  <Button className="btn-fill" color="primary" type="submit" onClick={this.handleSubmit}>
                    Guardar
                  </Button>
                
      </>
    );
  }
}

export default usuario;
