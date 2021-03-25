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
  CardText
} from "reactstrap";

//Nombre
//● Dirección
//● Estado (activa o inactiva)
//● Encargado

class CrearPedido extends React.Component {





  constructor(props) {
    super(props);
    this.state = {
      ListaCarrito: [],
      productos: [],
      allowCustom: true
    };



    this.obtenerProductos = this.obtenerProductos.bind(this);
    this.obtenerProductos2 = this.obtenerProductos2.bind(this);
    this.agregarCarrito = this.agregarCarrito.bind(this);
    this.onChange = this.onChange.bind(this);
    this.generarCompra = this.generarCompra.bind(this);
    this.obtenerProductos();
    //this.guardarBodega = this.guardarBodega.bind(this);
    //this.modificarBodega = this.modificarBodega.bind(this);
  }

  onChange(event) {
    console.log(event.target.checked)
    this.setState({
      allowCustom: event.target.checked
    });
  }

  obtenerProductos() {



    fetch(`http://35.226.179.134:9003/producto/obtener_productos`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(
        response => this.obtenerProductos2(response)

      ).catch(error => console.log(error));





  }

  async obtenerProductos2(response) {

    let respuesta = await response.json();
    console.log(respuesta.data);
    if (respuesta.estado === 200) {
      console.log(respuesta.data[0]);
      this.setState({ productos: respuesta.data[0] });

    } else {
      console.log(respuesta)
      alert("Error al crear el producto");
    }

  }


  agregarCarrito(i) {
    var cantidad = document.getElementById('cant' + i);
    var boton = document.getElementById('butt' + i);

    var objeto = this.state.productos[i];

    var js = { "id_producto": objeto.id, "nombre": objeto.nombre, "descripcion": objeto.descripcion, "cantidad": cantidad.value, "subtotal": parseInt(cantidad.value) * parseInt(objeto.precio) };

    //this.state.ListaCarrito.push(js);
    var lista = this.state.ListaCarrito;
    lista.push(js);
    this.setState({ ListaCarrito: lista });
    cantidad.value = "";
    cantidad.disabled = true;

    boton.disabled = true;
    console.log(this.state.ListaCarrito);

  }


  generarCompra() {


    var usu = JSON.parse(localStorage.getItem('current'))
    var direc = document.getElementById('txtDireccion').value;
    var arr = this.state.ListaCarrito;
    //console.log(this.state.allowCustom);
    console.log(usu);
    console.log(direc);
    var id_usuario=1;
    if(usu!=null){
      id_usuario=usu.id;
    }


    fetch(`http://35.226.179.134:9008/crearOrden`, {
      method: 'POST',
      body: JSON.stringify({
        pedido_usuario: id_usuario,
        enviar: this.state.allowCustom,
        direccion: direc
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async function (response) {
        let respuesta = await response.json();
        console.log(respuesta[0].id);
        

        

          try {
            

          for (let i = 0; i < arr.length; i++) {



            fetch(`http://35.226.179.134:9008/detalleOrden`, {
              method: 'POST',
              body: JSON.stringify({
                "id": respuesta[0].id,
                "pedido_producto": arr[i].id_producto,
                "pedido_usuario": id_usuario,
                "cantidad": arr[i].cantidad
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(async function (response) {
                let respuesta = await response.json();
                console.log(respuesta);
                alert("Producto agregado correctamente");
                window.location.reload();


              }


              ).catch(error => console.log(error));









          }
          } catch (error) {
            alert(error)
          }





        

      }


      ).catch(error => console.log(error));
   

  }


  render() {
    const allowCustom = this.state.allowCustom;
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h1 className="title">Pedido</h1>
                </CardHeader>
                <CardBody>


                  <Row>
                    {
                      this.state.productos.map((producto, i) => {
                        return (


                          <Col xs={12} xl={4}>
                            <Card>
                              <CardImg top width="100%" src={producto.foto} alt="Card image cap" />
                              <CardBody>
                                <CardTitle tag="h3">{producto.nombre}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Descripcion</CardSubtitle>
                                <CardText>{producto.descripcion}</CardText>
                                <br />
                                <CardSubtitle tag="h6" className="mb-2 text-muted">Cantidad Pedido</CardSubtitle>

                                <Input type="text" id={"cant" + i} ></Input>
                                <Button id={"butt" + i} onClick={e => this.agregarCarrito(i)}>Agregar a Carrito</Button>
                              </CardBody>
                            </Card>
                          </Col>






                        );
                      })
                    }


                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Carrito</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Descripcion</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody id="cuerpo">
                      {
                        this.state.ListaCarrito.map((producto, i) => {

                          return (


                            <tr>
                              <th>{producto.nombre}</th>
                              <th>{producto.cantidad}</th>
                              <th>{producto.descripcion}</th>
                              <th>{producto.subtotal}</th>
                            </tr>


                          );
                        })
                      }
                    </tbody>
                  </Table>
                </CardBody>

                <div className="example-config">
                  <input id="ac" type="checkbox" className="k-checkbox" onChange={this.onChange} checked={allowCustom} />
                  <label className="k-checkbox-label" for="ac">Enviar Pedido</label>
                </div>

                <Input
                  placeholder="Direccion de Entrega"
                  type="text"
                  id="txtDireccion"
                />

                <CardFooter><Button onClick={this.generarCompra}>Generar Compra</Button></CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default CrearPedido;
