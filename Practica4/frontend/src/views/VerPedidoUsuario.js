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

class VerPedidoUsuario extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      pedidos: [],
      setOpen: false,
      detallePedidos: []
    };

    this.obtenerPedidos = this.obtenerPedidos.bind(this);
    this.obtenerPedidos2 = this.obtenerPedidos2.bind(this);
    this.modificarEstado = this.modificarEstado.bind(this);
    this.obtenerDetalle = this.obtenerDetalle.bind(this);
    this.obtenerDetalle2=this.obtenerDetalle2.bind(this);
    this.obtenerPedidos();
    //this.guardarBodega = this.guardarBodega.bind(this);
    //this.modificarBodega = this.modificarBodega.bind(this);
  }

  obtenerPedidos() {

    console.log("entra");



    var usu = JSON.parse(localStorage.getItem('current'))


    fetch(`http://35.226.179.134:9008/mostrarporUsuario`, {
      method: 'POST',
      body: JSON.stringify({
        pedido_usuario: usu.id,
      }),
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

    var arr2 = respuesta[0]
    var us = JSON.parse(localStorage.getItem('current'));
    var arreglo = [];



    console.log(arr2);


    for (let i = 0; i < arr2.length; i++) {
      let obj = arr2[i];
      console.log(obj)
      if (obj.usuario_id == us.id) {
        obj.arreglo = []
        arreglo.push(obj);
      }

    }

    console.log("----------------------------------------");
    console.log(arreglo);
    this.setState({ pedidos: arreglo });

    

  }


  async obtenerDetalle(i) {
    var usu = JSON.parse(localStorage.getItem('current'))

    //for (let i = 0; i < this.state.pedidos.length; i++) {
      var obj = this.state.pedidos[i];
      console.log(usu.id);
      console.log(obj.pedido_id);

      fetch(`http://35.226.179.134:9008/detallePedido`, {
        method: 'POST',
        body: JSON.stringify({
          "pedido_id": obj.pedido_id,
          "pedido_usuario": usu.id
          
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(
         
          async function (response) {
            let respuesta = await response;
            console.log("-----------------")
    console.log(response);

            //this.obtenerDetalle2(respuesta,i);


          }
        ).catch(error => console.log(error));
   // }

  }

  obtenerDetalle2(respuesta,i){
    console.log(respuesta);
            this.state.pedidos[i].arreglo=respuesta[0]

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
            response => { alert("Modificado"); window.location.reload(); }

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
                     

                     <br />
                     <br />
                     <Table className="tablesorter" responsive>
                       <thead className="text-primary">
                         <tr>
                         <th>Id Pedido</th>

                           <th>Producto</th>
                           <th>Cantidad</th>
                           <th>Fecha</th>

                         </tr>
                       </thead>
                       <tbody>


                  {
                    this.state.pedidos.map((producto, i) => {

                      return (
                      

                         

                                      <tr>
                                        <th>{producto.pedido_id}</th>

                                        <th>{producto.producto_nombre}</th>
                                        <th>{producto.cantidad}</th>
                                        <th>{producto.fecha}</th>

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

export default VerPedidoUsuario;
