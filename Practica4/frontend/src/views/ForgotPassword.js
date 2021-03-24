import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Login.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function validateForm() {
    return email.length > 0;
  }
  async function makeRequest1(request, param = ''){
    const response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/forgot' + param, request);
    return response;
  }
  async function makeRequest2(request, param = ''){
    const response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/send' + param, request);
    return response;
  }

  async function handleSubmit(event){
    event.preventDefault();
    const response = await makeRequest1({
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            correo: email,
            contraseña: password
        })
    }, '');
    //console.log(response);
    if(response.status === 201) {
        //si hay un usuario con ese correo.
        let usuario= await response.json();
        //console.log(usuario);
        const response2 = await makeRequest2({
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Administrador de la plataforma",
                email: email,
                messageHtml: `<!doctype html>
                <html lang="en">
                  <head>
                    <!-- Required meta tags -->
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                
                    <!-- Bootstrap CSS -->
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                
                    <title>Recuperacion de contraseña</title>
                  </head>
                  <body>
                    <h1>Hola, `+usuario[0].nombre+`</h1>
                    <p>Estamos atentos a tus necesitades. Tu contraseña actual es:</p>
                    <p class="text-center"><strong>`+usuario[0].contraseña+`</strong></p>
                  </body>
                </html>
                `
            })
        }, '');
        if(response2.status === 201){
            alert("Tu contraseña fue enviada satisfactoriamente :)");
            history.push("login");
        }else{
            alert("No ha sido posible enviarte tu contraseña a tu correo registrado :/");
        }
    }else{
        alert("Error, no hay ningun usuario asociado con ese correo :/");
    } 

  }






  return (
    <div className="ForgotPassword">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Lamentamos tu perdida, pero estamos para servirte!</h1>
        <br></br>
        <br></br>
        <h5>Por favor ingresa tus credenciales</h5>
        <br></br>
        <br></br>
      <form >
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} onClick={handleSubmit}>
          Send Email
        </Button>
      </form>
    </div>
  );
}