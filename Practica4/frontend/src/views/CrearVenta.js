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
import NotificationAlert from "react-notification-alert";
import axios from 'axios';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

// core components


class CrearVenta extends React.Component {

  notify(type, message) {

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





  constructor(props) {
    super(props);

    /*var objetoUsuario = {
      "id_usuario": 12,
      "nombre": "Juan Paco Pedro de la Mar",
      "id_sede": 2
    };*/

    var objetoUsuario = JSON.parse(localStorage.getItem('current'));


    this.state = {
      bigChartData: "data1",
      ListaVendedores: [],
      ListaClientes: [],
      ListaRepartidores: [],
      ListaProductos: [],
      ListaBodegas: [],
      BodegaSeleccionada: 0,
      ListaProductosTransferencia: [],
      id_sede: objetoUsuario.id_sede,
      id_usuario: objetoUsuario.id_usuario
    };

    //USUARIO LOGUEADO
    //var objetoUsuario = localStorage.getItem('usuarioActual');







    this.obtenerClientesAPI();
    //this.obtenerProductosAPI();
    this.obtenerRepartidoresAPI();
    //this.obtenerVendedoresAPI();

    this.agregarProducto = this.agregarProducto.bind(this);
    this.cambiarProductos = this.cambiarProductos.bind(this);
    this.registrarVenta = this.registrarVenta.bind(this);
    this.generarDetalle = this.generarDetalle.bind(this);

    this.obtenerBodegasAPI();
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };









  obtenerVendedoresAPI() {

    fetch("https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/getVendedores").then(res => res.text())
      .then(res => this.setVendedores(res));
  }

  setVendedores(res) {
    var datos = JSON.parse(res);
    this.setState({ ListaVendedores: datos });
  }

  obtenerVendedores() {

    let table = []
    let ListaAuxiliar = this.state.ListaVendedores;
    for (let i = 0; i < ListaAuxiliar.length; i++) {
      table.push(<option key={i} value={ListaAuxiliar[i].id_usuario}>{ListaAuxiliar[i].nombre}</option>);
    }

    return table;
  }





  obtenerClientesAPI() {

    fetch("https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/cliente").then(res => res.text())
      .then(res => this.setClientes(res));
  }

  setClientes(res) {
    var datos = JSON.parse(res);
    this.setState({ ListaClientes: datos });
  }

  obtenerClientes() {

    let table = []
    let ListaAuxiliar = this.state.ListaClientes;

    var id_sede = this.state.id_sede;

    for (let i = 0; i < ListaAuxiliar.length; i++) {

      if (ListaAuxiliar[i].id_sede === id_sede) {
        table.push(<option key={i} value={ListaAuxiliar[i].id_cliente}>{ListaAuxiliar[i].nombre}</option>);
      }
    }

    return table;
  }




  obtenerRepartidoresAPI() {

    fetch("https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/getRepartidores").then(res => res.text())
      .then(res => this.setRepartidores(res));
  }

  setRepartidores(res) {
    var datos = JSON.parse(res);
    this.setState({ ListaRepartidores: datos });
  }

  obtenerRepartidores() {

    let table = []
    let ListaAuxiliar = this.state.ListaRepartidores;

    var id_sede = this.state.id_sede;

    for (let i = 0; i < ListaAuxiliar.length; i++) {
      if (id_sede === ListaAuxiliar[i].id_sede) {
        table.push(<option key={i} value={ListaAuxiliar[i].id_usuario}>{ListaAuxiliar[i].nombre}</option>);
      }
    }

    return table;
  }



  obtenerBodegasAPI() {

    fetch("https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/bodega").then(res => res.text())
      .then(res => this.setBodegas(res));
  }

  setBodegas(res) {
    var datos = JSON.parse(res);
    this.setState({ ListaBodegas: datos });
  }

  obtenerBodegas() {

    let table = []
    let ListaAuxiliar = this.state.ListaBodegas;

    var id_sede = this.state.id_sede;

    for (let i = 0; i < ListaAuxiliar.length; i++) {
      if (id_sede === ListaAuxiliar[i].id_sede) {
        table.push(<option key={i} value={ListaAuxiliar[i].id_bodega}>{ListaAuxiliar[i].nombre}</option>);
      }
    }

    return table;
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
    var descuento = document.getElementById('inputDescuento');

    if (ListaAuxiliar.length > 0) {
      cantidad.disabled = false;
      descuento.disabled = false;
      input.disabled = false;
    } else {
      cantidad.disabled = true;
      descuento.disabled = true;
      input.disabled = true;
    }

  }


  removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for (i = L; i >= 0; i--) {
      selectElement.remove(i);
    }
  }

  tipoVenta() {

    var valor = document.getElementById('inputTipoVenta').value;

    var repartidor = document.getElementById('inputRepartidores');

    if (valor === "1") {
      repartidor.disabled = true;
    } else if (valor === "2") {
      repartidor.disabled = false;
    }

  }


  agregarProducto() {
    var producto = document.getElementById('inputProducto');
    var cantidad = document.getElementById('cantidadProducto');
    var descuento = document.getElementById('inputDescuento');
    var bodega = document.getElementById('inputBodega');

    this.state.ListaProductosTransferencia.push({ "id_bodega": bodega.value, "id_producto": producto.value, "cantidad": cantidad.value, "descuento": descuento.value / 100 });
    producto.value = '';
    cantidad.value = 0;
    descuento.value = 0;

    producto.disabled = true;
    descuento.disabled = true;
    cantidad.disabled = true;

    this.notify("success", "Producto agregado correctamente");
  }


  registrarVenta() {

    var ListaAuxiliar = this.state.ListaProductosTransferencia;



    var cliente = document.getElementById('inputCliente');
    var tipoVenta = document.getElementById('inputTipoVenta').value;

    var objeto = {};

    if (tipoVenta === "1") {
      //Local
      objeto = {
        "id_cliente": cliente.value,
        "vendedor": this.state.id_usuario
      };
    } else if (tipoVenta === "2") {
      //A Domicilio
      var repartidor = document.getElementById('inputRepartidores');

      objeto = {
        "id_cliente": cliente.value,
        "vendedor": this.state.id_usuario,
        "repartidor": repartidor.value
      };
    }



    axios({
      method: 'post',
      url: 'https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/venta',
      data: objeto
    })
      .then(function (response) {
        var id_venta = response.data[0][0].id_venta;


        //var ListaAuxiliar = this.state.ListaProductosTransferencia;

        for (let i = 0; i < ListaAuxiliar.length; i++) {

          alert("id_venta: " + id_venta);
          var objeto = {

            "id_producto": ListaAuxiliar[i].id_producto,
            "id_bodega": ListaAuxiliar[i].id_bodega,
            "id_venta": id_venta,
            "cantidad": ListaAuxiliar[i].cantidad,
            "descuento_unitario": ListaAuxiliar[i].descuento

          };
          console.log(objeto);


          axios({
            method: 'post',
            url: 'https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/detalle_venta',
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


  generarDetalle(id_venta) {


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
                      <h5 className="card-category">Crear Venta</h5>
                      <CardTitle tag="h2">Nueva Venta</CardTitle>
                    </Col>

                  </Row>
                </CardHeader>
                <CardBody>














                  <div className="auth-box">



                    <label>Cliente</label>


                    <select id="inputCliente" className="form-control">
                      <option>Elegir Opcion</option>
                      {this.obtenerClientes()}
                    </select>
                    <hr />





                  </div>













                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <Card className="card-chart">
                <CardHeader>

                  <CardTitle tag="h3">
                    Tipo Entrega
                  </CardTitle>
                </CardHeader>
                <CardBody>





                  <label>Tipo Venta</label>


                  <select id="inputTipoVenta" className="form-control" onChange={this.tipoVenta}>
                    <option>Elegir Opcion</option>
                    <option value="1">Local</option>
                    <option value="2">Domicilio</option>
                  </select>

                  <hr />

                  <label>Repartidor</label>


                  <select id="inputRepartidores" className="form-control" disabled>
                    <option>Elegir Opcion</option>
                    {this.obtenerRepartidores()}
                  </select>



                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
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
                    {this.obtenerBodegas()}
                  </select>

                  <hr />

                  <label>Producto</label>


                  <select id="inputProducto" className="form-control">
                    <option>Elegir Opcion</option>

                  </select>

                  <hr />

                  <label>Cantidad de Producto</label>

                  <input className="form-control" id="cantidadProducto" placeholder="Cantidad Producto" disabled />

                  <hr />

                  <label>Descuento Producto</label>

                  <input className="form-control" id="inputDescuento" placeholder="Descuento Producto" disabled />

                  <hr />

                  <div className="row m-t-30">
                    <div className="col-md-12">
                      <button type="button" onClick={this.agregarProducto} className="btn btn-danger btn-md btn-block waves-effect text-center m-b-20" >Agregar Producto</button>
                    </div>
                  </div>

                </CardBody>
              </Card>
            </Col>

          </Row>

          <Row>
            <hr />


            <div className="col-md-12">
              <button type="button" onClick={this.registrarVenta} className="btn btn-success btn-md btn-block waves-effect text-center m-b-20" >Generar Factura</button>
            </div>


          </Row>

        </div>
      </>
    );
  }
}

export default CrearVenta;
