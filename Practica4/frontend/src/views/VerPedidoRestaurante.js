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
  Col,
  CardImg,
  CardSubtitle,
  CardText,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  useState
} from "reactstrap";







//Nombre
//● Dirección
//● Estado (activa o inactiva)
//● Encargado

class VerPedidoRestaurante extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      pedidos: [],
      setOpen: false
    };

    this.obtenerPedidos = this.obtenerPedidos.bind(this);
    this.obtenerPedidos2 = this.obtenerPedidos2.bind(this);
    this.modificarEstado = this.modificarEstado.bind(this);

    //this.guardarBodega = this.guardarBodega.bind(this);
    //this.modificarBodega = this.modificarBodega.bind(this);
  }

  obtenerPedidos() {



    fetch(`http://35.226.179.134:9008/mostrar`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(
        response => this.obtenerPedidos2(response)

      ).catch(error => console.log(error));





  }

  async obtenerPedidos2(response) {
    let respuesta = await response.json();
    console.log(respuesta);
    if (respuesta.estado === 200) {
      console.log(respuesta.data);
      var us = JSON.parse(localStorage.getItem('current'));
      var arreglo = [];

      for (let i = 0; i < respuesta.data.lenght; i++) {
        let obj = respuesta.data[i];
        //Tengo que obtener el detalle de pedidos, y donde se tenga un producto con id de ese restaurante, lo coloco  
        if (obj.pedido_usuario == us.id) {
          arreglo.push(obj);
        }

      }

      this.setState({ pedidos: arreglo });

    } else {
      console.log(respuesta)
      alert("Error al crear el producto");
    }

  }


  modificarEstado(i, objeto) {
    var estado = document.getElementById('estado' + i);

    if (estado != objeto.pedido_estado) {
      try {
        let num = parseInt(estado);

        fetch(`http://35.226.179.134:9008/modificarOrden`, {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(
            response => {alert("Modificado"); window.location.reload();}

          ).catch(error => console.log(error));

      } catch (error) {
        alert("Debe ingresar un número");
      }
    } else {
      alert("El estado es el mismo");
    }


  }



  render() {

    return (
      <>
        <div className="content">







          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h1">Pedidos</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                    <CardSubtitle tag="h4">Estado #1: "Nueva Orden"</CardSubtitle>
                  <br/>
                  <CardSubtitle tag="h4">Estado #2: "Preparación"</CardSubtitle>
                  <br/>
                  <CardSubtitle tag="h4">Estado #3: "En Camino"</CardSubtitle>
                  <br/>
                  
                    </Col>
                  <Col>
                  <CardSubtitle tag="h4">Estado #4: "Entregado"</CardSubtitle>
                  <br/>
                  <CardSubtitle tag="h4">Estado #5: "Cancelado"</CardSubtitle>
                  <br/>
                  <CardSubtitle tag="h4">Estado #6: "Pagado"</CardSubtitle>
                  </Col>
                  </Row>
                

                 <Row>
                   <br/>
                   <br/>

                 <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Descripcion</th>
                        <th>Subtotal</th>
                        <th>Estado</th>
                        <th>Modificar</th>
                      </tr>
                    </thead>
                    <tbody id="cuerpo">
                      {
                        this.state.pedidos.map((producto, i) => {

                          return (


                            <tr>
                              <th>{producto.nombre}</th>
                              <th>{producto.cantidad}</th>
                              <th>{producto.descripcion}</th>
                              <th>{producto.subtotal}</th>
                              <th><Input id={"estado" + i}>{producto.estado}</Input></th>
                              <th><Button onClick={e => this.modificarEstado(i, producto)}>Modificar Estado</Button></th>
                            </tr>


                          );
                        })
                      }
                    </tbody>
                  </Table>
                
                 </Row>
                
                </CardBody>

              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default VerPedidoRestaurante;
