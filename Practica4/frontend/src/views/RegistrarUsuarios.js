import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Login.css";
import md5 from 'md5';
import NotificationAlert from "react-notification-alert";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Form,
  CardFooter,
  Input,
  Row,
  Col,
  CardImg,
  CardSubtitle,
  CardText,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";



export default function RegistrarUsuarios() {

  const [usuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("");









  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const history = useHistory();

  function validateForm(e) {
    //return email.length > 0 && password.length > 0;
    console.log(e);
  }

  function notificaciones(type, message) {
    var options = {};

    options = {
      place: "tr",
      message: message,
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.notificationAlert(options);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    console.log(usuario);
    console.log(nombre);
    console.log(apellido);
    console.log(direccion);
    console.log(tipo);
    console.log(md5(password));


    if(tipo==3||tipo==4){
      fetch(`http://35.226.179.134:9005/usuarios/crear_usuario`, {
      method: 'POST',
      body: JSON.stringify({
        usuario: usuario,
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        telefono: telefono,
        estado: true,
        id_tipo_usuario: tipo,
        password: md5(password)
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async function (response) {
        let respuesta = await response.json();
        console.log(respuesta);
        if (respuesta.estado === 200) {

          alert("Usuario creado correctamente");
          history.push("/login");
        } else {
          console.log(respuesta)
          alert(respuesta.mensaje);
        }

      }


      ).catch(error => console.log(error));
    }else{
      alert("Se debe elegir un tipo de usuario")
    }



  }


  function select(event) {
    
      console.log(event.target.innerText)
    
  }





  return (
    <div className="Login">
      <h1>Bienvenido a nuesta APP!</h1>
      <br></br>
      <br></br>
      <h5>Por favor ingresa tus datos para registrarte</h5>
      <br></br>
      <br></br>
      <form >
        <FormGroup controlId="usuario" bsSize="large">
          <ControlLabel>Usuario</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="nombre" bsSize="large">
          <ControlLabel>Nombre</ControlLabel>
          <FormControl
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="apellido" bsSize="large">
          <ControlLabel>Apellido</ControlLabel>
          <FormControl
            value={apellido}
            onChange={e => setApellido(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="direccion" bsSize="large">
          <ControlLabel>Direccion</ControlLabel>
          <FormControl
            value={direccion}
            onChange={e => setDireccion(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="telefono" bsSize="large">
          <ControlLabel>Telefono</ControlLabel>
          <FormControl
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>


        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Tipo Usuario</ControlLabel> <br/>
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret  color="primary">
              Tipo de Usuario
      </DropdownToggle>
            <DropdownMenu>
              <DropdownItem value="3" onClick={e => setTipo(e.target.value)}>Restaurante</DropdownItem>
              <DropdownItem value="4" onClick={e => setTipo(e.target.value)}>Cliente</DropdownItem> 
            </DropdownMenu>
          </ButtonDropdown>

          
        </FormGroup>






        <Button block bsSize="large" onClick={handleSubmit}>
          Registrar Usuario
        </Button>


      </form>
    </div>
  );
}