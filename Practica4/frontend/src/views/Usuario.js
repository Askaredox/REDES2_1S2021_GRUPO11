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
      usuario: {},
      nUsuario: '',
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      contrasena: '',
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
    this.setState({ nUsuario: event.target.value });
  }

  async handleChangeNombre(event) {
    this.setState({ nombre: event.target.value });
  }

  async handleChangeCursoPoryecto(event) {
    this.setState({ apellido: event.target.value });
  }

  async handleChangeDetalle(event) {
    this.setState({ direccion: event.target.value });
  }

  async handleSubmit() {

    // console.log(event)
    // event.preventDefault();

    let obj = JSON.stringify({
      id: this.state.usuario.id + "",
      estado: this.state.usuario.estado === 1,
      id_tipo_usuario: this.state.usuario.tipo_usuario + "",
      usuario: this.state.nUsuario != '' ? this.state.nUsuario : this.state.usuario.usuario,
      nombre: this.state.nombre != '' ? this.state.nombre : this.state.usuario.nombre,
      apellido: this.state.apellido != '' ? this.state.apellido : this.state.usuario.apellido,
      direccion: this.state.direccion != '' ? this.state.direccion : this.state.usuario.direccion,
      telefono: this.state.telefono != '' ? this.state.telefono : this.state.usuario.telefono,
      password: this.state.contrasena != '' ? this.state.contrasena : this.state.usuario.contrasenia,
    })

    let newUser = this.state.nUsuario != '' ? this.state.nUsuario : this.state.usuario.usuario
    let newPass = this.state.contrasena != '' ? this.state.contrasena : this.state.usuario.contrasenia
    console.log(obj)

    fetch(`http://35.226.179.134:9006/usuarios/modificar_usuario`, {
      method: 'POST',
      body: obj,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async function (response) {
      let respuesta = await response.json();

      console.log(respuesta)
      if (respuesta.estado === 200) {


        alert("Modificado Correctamente");
        // console.log(this.state.usuario)
        let aJsonObj = JSON.stringify({
          usuario: newUser,
          password: newPass
        })
        fetch(`http://35.226.179.134:9007/usuarios/login`, {
          method: 'POST',
          body: aJsonObj,
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(async function (response) {
            let respuesta = await response.json();

            if (respuesta.estado === 200) {
              let val = respuesta.data;
              console.log(val[0]);
              localStorage.setItem('current', JSON.stringify(val[0]));

            } else {
              console.log(respuesta)
              alert("Error, credenciales invalidas");
            }

          });

      } else {
        console.log(respuesta)
        alert("Error, credenciales invalidas");
      }

    });


  }

  async fetchData() {
    let dataUsuario = JSON.parse(localStorage.getItem('current'))
 
    this.setState({ usuario: dataUsuario });
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
                          Change={this.handleChangeCarnet}
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
                          onChange={this.handleChangeDetalle}
                        />
                      </FormGroup > */}

                        <FormGroup>
                          {/* <Label for="exampleText">Text Area</Label> */}
                          <Input type="textarea" name="text" id="exampleText" />
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
