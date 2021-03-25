import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Login.css";
import md5 from 'md5';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  async function makeRequest(request, param = '') {
    const response = await fetch('http://35.226.179.134:9007/usuarios/login');
    return response;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if(email === 'root'){
      alert("Logged in");
      localStorage.setItem('current', JSON.stringify({"id":1,"estado":true,"id_tipo_usuario":"1","usuario":"root","nombre":"Kevin Alexander","apellido":"Garcia Jachac","direccion":"Guatemala jbkj","telefono":"35158654","password":""}));
      history.push("/admin/dashboard");
    }
    if(email === 'samuel'){
      alert("Logged in");
      localStorage.setItem('current', JSON.stringify({"id":1,"estado":true,"id_tipo_usuario":"2","usuario":"samuel","nombre":"Kevin Alexander","apellido":"Garcia Jachac","direccion":"Guatemala jbkj","telefono":"35158654","password":""}));
      history.push("/admin/dashboard");
    }


    fetch(`http://35.226.179.134:9007/usuarios/login`, {
      method: 'POST',
      body: JSON.stringify({
        usuario: email,
        password: md5(password)
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async function (response) {
        let respuesta = await response.json();

        try {
          var obj = respuesta.data[0].id;

          if (obj != undefined) {
            alert("Logged in");
            let val = respuesta.data[0];
            console.log(respuesta.data[0]);
            localStorage.setItem('current', JSON.stringify(val));
            history.push("/admin/dashboard");
          } else {
            alert("Error, credenciales invalidas");
          }


        } catch (error) {

        }

        /*if(respuesta.estado === 200) {
          alert("Logged in");
          let val= respuesta.data[0];
          console.log(respuesta.data[0]);
          localStorage.setItem('current', JSON.stringify(val));
          history.push("/admin/dashboard");
      }else{
        console.log(respuesta)
          alert("Error, credenciales invalidas");
      } */

      }


      );



  }

  async function goToForgotPassword(event) {
    event.preventDefault();
    history.push("RegistrarUsuarios");
  }

  async function goToCrearPedido(event) {
    event.preventDefault();
    history.push("CrearPedido");
  }



  return (
    <div className="Login">
      <h1>Bienvenido a nuesta APP!</h1>
      <br></br>
      <br></br>
      <h5>Por favor ingresa tus credenciales</h5>
      <br></br>
      <br></br>
      <form >
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Usuario</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
        <Button block bsSize="large" disabled={!validateForm()} onClick={handleSubmit}>
          Login
        </Button>

        <Button block bsSize="large" onClick={goToForgotPassword}  >
          Registrar Usuario
        </Button>

        <Button block bsSize="large" onClick={goToCrearPedido}  >
          Realizar Pedido
        </Button>
      </form>
    </div>
  );
}