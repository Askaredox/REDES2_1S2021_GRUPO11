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
import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios';
import NotificationAlert from "react-notification-alert";


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
  Alert,
  UncontrolledAlert
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.js";




class CrearTransferencia extends React.Component {
  notify(type, message) {
    var datosGlobal = [];
    var options = {};

    options = {
      place: "tr",
      message: message,
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  };

  handleChange(state, e) {
    this.setState({ [state]: e.target.value });
  }

  constructor(props) {

    super(props);

    var guar = {
      id_usuario: 10,
      dpi: "3006565345434",
      nombre: "Kevin Alexander Garcia",
      fecha_nacimiento: "0000-00-00",
      correo: "kevinalexandergarcia1999@gmail.com",
      id_sede: 3
    };

    //localStorage.setItem('current', JSON.parse(guar));

    var objetoUsuario = JSON.parse(localStorage.getItem('current'));



    this.state = {
      cantidadProducto: 0,
      idEncargado: 0,
      ListaUsuarios: [],
      ListaBodegas: [],
      ListaProductos: [],
      ListaProductosTransferencia: [],
      ListaSedes: [],
      ListaBodegas2: [],
      BodegaSeleccionada: 0,
      SedeSeleccionada: 0,
      id_sede: objetoUsuario.id_sede,
      id_usuario: objetoUsuario.id_usuario
    };

    this.obtenerUsuariosAPI();
    this.obtenerSedesAPI();
    this.obtenerProductosAPI();
    this.getBodegasAPI();

    this.cambiarProductos = this.cambiarProductos.bind(this);
    this.cambiarBodegas = this.cambiarBodegas.bind(this);
    this.agregarTransferencia = this.agregarTransferencia.bind(this);
    this.cambiarSede = this.cambiarSede.bind(this);

  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };





  obtenerUsuariosAPI() {

    fetch("https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/usuario").then(res => res.text())
      .then(res => this.setUsuarios(res));
  }

  setUsuarios(res) {
    var datos = JSON.parse(res);
    this.setState({ ListaUsuarios: datos });
  }

  obtenerUsuarios() {

    let table = []
    let ListaAuxiliar = this.state.ListaUsuarios;
    for (let i = 0; i < ListaAuxiliar.length; i++) {
      table.push(<option key={i} value={ListaAuxiliar[i].id_usuario}>{ListaAuxiliar[i].nombre}</option>);
    }

    return table;
  }

  obtenerSedesAPI() {
    fetch("https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/sede").then(res => res.text())
      .then(res => this.setSedes(res));
  }

  setSedes(res) {
    var datos = JSON.parse(res);
    this.setState({ ListaSedes: datos });
  }

  obtenerSedes() {

    let table = []
    let ListaAuxiliar = this.state.ListaSedes;
    for (let i = 0; i < ListaAuxiliar.length; i++) {
      table.push(<option key={i} value={ListaAuxiliar[i].id_sede}>{ListaAuxiliar[i].alias}</option>);
    }

    return table;
  }

  obtenerProductosAPI() {
    var bodega = document.getElementById('numeroBodega');
    var data1 = JSON.parse(JSON.stringify({ "id": "1" }));



    /*axios({
      method: 'post',
      url: 'http://localhost:5000/rutas/obtenerProductos/',
      data: data1
    })
      .then(function (response) {
        this.setProductosBodega(response.data);
      });*/


    //  fetch("http://localhost:5000/rutas/obtenerProductos/").then(res => res.text())

    //.then(res => this.setProductosBodega(res));
  }




  cambiarProductos() {
    var idBodega = document.getElementById('inputBodega').value;

    this.setState({ BodegaSeleccionada: idBodega });

    fetch("https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/inventario3/" + idBodega).then(res => res.text())
      .then(res => this.cambiarProductos2(res));




  }

  cambiarProductos2(res) {
    var datos = JSON.parse(res);
    let ListaAuxiliar = datos;

    var input = document.getElementById('inputProducto');

    this.removeOptions(input);

    for (let i = 0; i < ListaAuxiliar.length; i++) {
      var option = document.createElement("option");
      option.text = ListaAuxiliar[i].nombre_producto;
      option.value = ListaAuxiliar[i].id_producto;
      input.add(option);
    }


    var cantidad = document.getElementById('cantidadProducto');
    var producto = document.getElementById('inputProducto');

    if (ListaAuxiliar.length > 0) {
      cantidad.disabled = false;
      producto.disabled = false;

    } else {
      cantidad.disabled = true;
      producto.disabled = false;

    }

  }


  removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for (i = L; i >= 0; i--) {
      selectElement.remove(i);
    }
  }




  cambiarSede() {

    var input = document.getElementById('tipoTransferencia');

    var descripcion = document.getElementById('descripcionTransferencia');

    var tipoTransferencia = document.getElementById('tipoTransferencia');

    if (tipoTransferencia.value === "1") {

      var idSede = this.state.id_sede;

      this.setState({ SedeSeleccionada: idSede });

      fetch("https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/bodega2/" + idSede).then(res => res.text())
        .then(res => this.cambiarBodegas2(res));

    }

    if (input.value === "1") {
      document.getElementById('inputSede').disabled = true;
    } else {
      var input = document.getElementById('inputBodega');

      this.removeOptions(input);
      document.getElementById('inputSede').disabled = false;

      tipoTransferencia.disabled = false;
    }

  }






  cambiarBodegas() {
    var tipoTransferencia = document.getElementById('tipoTransferencia');


    var idSede = document.getElementById('inputSede').value;

    this.setState({ SedeSeleccionada: idSede });

    fetch("https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/bodega2/" + idSede).then(res => res.text())
      .then(res => this.cambiarBodegas2(res));

  }

  cambiarBodegas2(res) {
    var datos = JSON.parse(res);
    let ListaAuxiliar = datos;

    var input = document.getElementById('inputBodega');

    this.removeOptions(input);

    for (let i = 0; i < ListaAuxiliar.length; i++) {
      var option = document.createElement("option");
      option.text = ListaAuxiliar[i].nombre;
      option.value = ListaAuxiliar[i].id_bodega;
      input.add(option);
    }


    var inputBodega = document.getElementById('inputBodega');


    if (ListaAuxiliar.length > 0) {
      inputBodega.disabled = false;

    } else {
      inputBodega.disabled = true;

    }

  }





  agregarProducto() {
    var producto = document.getElementById('inputProducto');
    var cantidad = document.getElementById('cantidadProducto');


    this.state.ListaProductosTransferencia.push({ "idProducto": producto.value, "cantidad": cantidad.value });
    producto.value = '';
    cantidad.value = 0;

    producto.disabled = true;
    producto.disabled = true;

    this.notify("success", "Producto agregado correctamente");
  }


  agregarTransferencia() {
    var tipoTransferenciaInput = document.getElementById('tipoTransferencia');

    var ListaAuxiliar = this.state.ListaProductosTransferencia;

    var descripcionInput = document.getElementById('descripcionTransferencia');

    var objeto2 = {
      "id_solicitante": this.state.id_usuario,
      "contenido_descripcion": descripcionInput.value,
    };

    if (tipoTransferenciaInput.value === "2") {
      var sedeInput = document.getElementById('inputSede');
      var bodegaInput = document.getElementById('inputBodega2');

      objeto2 = {
        "id_solicitante": this.state.id_usuario,
        "contenido_descripcion": descripcionInput.value,
        "bodega_entrante": bodegaInput.value,
        "sede_destino": sedeInput
      }

    }

    console.log(objeto2);




    axios({
      method: 'post',
      url: 'https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/orden',
      data: objeto2
    })
      .then(function (response) {
        var id_orden = response.data[0][0].id_orden;
        alert(id_orden);
        console.log(response.data[0][0]);

        //var ListaAuxiliar = this.state.ListaProductosTransferencia;

        for (let i = 0; i < ListaAuxiliar.length; i++) {


          var objeto = {

            "id_producto": ListaAuxiliar[i].idProducto,
            "id_orden": id_orden,
            "cantidad": ListaAuxiliar[i].cantidad,
          };

          console.log(objeto);


          axios({
            method: 'post',
            url: 'https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/detalle_orden',
            data: objeto
          })
            .then(function (response) {
              console.log(response);
              window.location.reload();
            });
          setTimeout(function () {

          }, 2000);
        }



      });




  }





  getBodegasAPI() {




    fetch("https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/bodega2/" + this.state.id_sede).then(res => res.text())
      .then(res => this.setBodegas(res));

  }

  setBodegas(res) {
    var datos = JSON.parse(res);
    this.setState({ ListaBodegas2: datos });
  }

  getBodegas() {
    let table = []
    let ListaAuxiliar = this.state.ListaBodegas2;

    for (let i = 0; i < ListaAuxiliar.length; i++) {
      console.log(ListaAuxiliar[i]);
      table.push(<option key={i} value={ListaAuxiliar[i].id_bodega}>{ListaAuxiliar[i].nombre}</option>);
    }

    return table;
  }








  obtenerDatos() {
    //this.sendAPI();
    var m1 = document.getElementById('inputState1');
    alert(m1.value);
    //return this.obtenerUsuarios();
    this.notify("success", "Registro correcto");
  }






  sendAPI() {

    let ar = {};
    ar["ruta"] = "pruebaaaaaaaaaaaaaaaaaaaaa";


    var text = '{ "employees" : [' +
      '{ "firstName":"John" , "lastName":"Doe" },' +
      '{ "firstName":"Anna" , "lastName":"Smith" },' +
      '{ "firstName":"Peter" , "lastName":"Jones" } ]}';

    var data1 = JSON.parse(text);
    alert(data1);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' },
      body: { "ruta": "pruebaaaaaaaaaaaaaaaaaa" },
    };

    fetch('http://localhost:5000/rutas/enviar/', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

  }



  render() {

    return (
      <>





        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert" />
        </div>
        <div className="content">

          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Crear Transferencia</h5>
                      <CardTitle tag="h2">Transferencia</CardTitle>
                    </Col>

                  </Row>
                </CardHeader>
                <CardBody>














                  <div className="auth-box">


                    <label>Tipo Transferencia</label>


                    <select id="tipoTransferencia" className="form-control" onChange={this.cambiarSede}>

                      <option value="1">Interna</option>
                      <option value="2">Externa</option>
                    </select>

                    <hr />

                    <label>Descripcion Transferencia</label>


                    <input className="form-control" id="descripcionTransferencia" placeholder="Descripcion Transferencia" />






                    <hr />

                    <label>Bodega a Abastecer</label>


                    <select id="inputBodega2" className="form-control"  >
                      <option>Elegir Opcion</option>
                      {this.getBodegas()}
                    </select>

                    <hr />

                    <label>Sede</label>


                    <select id="inputSede" className="form-control" disabled onChange={this.cambiarBodegas}>
                      <option>Elegir Opcion</option>

                      {this.obtenerSedes()}
                    </select>


                  </div>













                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>


            <Card className="card-chart">
              <CardHeader>

                <CardTitle tag="h3">
                  Listado de Productos
                  </CardTitle>
              </CardHeader>
              <CardBody>

                <label>Bodega</label>


                <select id="inputBodega" className="form-control" onChange={this.cambiarProductos} >
                  <option>Elegir Opcion</option>
                  {this.getBodegas()}
                </select>

                <hr />

                <label>Producto</label>
                <select disabled id="inputProducto" className="form-control">
                </select>

                <hr />

                <label>Cantidad de Producto</label>

                <input disabled className="form-control" id="cantidadProducto" placeholder="Cantidad Producto" />

                <hr />



                <div className="row m-t-30">
                  <div className="col-md-12">
                    <button type="button" onClick={() => this.agregarProducto()} className="btn btn-danger btn-md btn-block waves-effect text-center m-b-20" >Agregar Producto</button>
                  </div>
                </div>

              </CardBody>
            </Card>


          </Row>

          <Row>
            <hr />


            <div className="col-md-12">
              <button type="button" onClick={() => this.agregarTransferencia()} className="btn btn-success btn-md btn-block waves-effect text-center m-b-20" >Generar Transferencia</button>
            </div>


          </Row>

        </div>
      </>
    );
  }

}

export default CrearTransferencia;