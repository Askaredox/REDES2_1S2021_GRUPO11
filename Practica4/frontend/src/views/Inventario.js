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
  Col
} from "reactstrap";

class Inventarios extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      inventarios: [],
      bodegas: [],
      productos: []
    };
    this.guardar = this.guardar.bind(this);
    this.modificar = this.modificar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  async fetchData(){
    let response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/inventario');
    let dataInventarios = await response.json();
    response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/bodega');
    let dataBodegas = await response.json();
    response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/producto');
    let dataProductos = await response.json();

    dataInventarios.forEach(inventario => {
      for (let index = 0; index < dataBodegas.length; index++) {
        if(inventario.id_bodega === dataBodegas[index].id_bodega){
          inventario.bodega = dataBodegas[index];
          break;
        }
      }
      for (let index = 0; index < dataProductos.length; index++) {
        if(inventario.id_producto === dataProductos[index].id_producto){
          inventario.producto = dataProductos[index];
          break;
        }
      }
    });

    dataInventarios.sort( (a, b) => {
      if(a.bodega.nombre > b.bodega.nombre){
        return 1;
      }else if(a.bodega.nombre < b.bodega.nombre){
        return -1;
      }
      return 0;
    });

    this.setState({inventarios: dataInventarios, bodegas: dataBodegas, productos: dataProductos});
  }

  componentWillMount(){
    this.fetchData();
  }

  async guardar(){
    let IDTxt = document.getElementById('txtID');
    let bodegaSelect = document.getElementById('selectBodega');
    let productoSelect = document.getElementById('selectProducto');
    let cantidadTxt = document.getElementById('txtCantidad');

    const status = await this.makeRequest({
        method:  IDTxt.value === '' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_producto: productoSelect.options[productoSelect.selectedIndex].value,
            id_bodega: bodegaSelect.options[bodegaSelect.selectedIndex].value,
            cantidad_nueva: cantidadTxt.value,
            motivo: 'Entrada Productos',
            encargado: "1"
        })
    }, IDTxt.value === '' ? '' : `/${productoSelect.options[productoSelect.selectedIndex].value}/${bodegaSelect.options[bodegaSelect.selectedIndex].value}`);

    if(status === 404) console.log("Error")
    else this.fetchData();

    bodegaSelect.selectedIndex = 0;
    productoSelect.selectedIndex = 0;
    cantidadTxt.value = '';
  }

  modificar(i){
    this.setState(state => {
        let IDTxt = document.getElementById('txtID');
        let bodegaSelect = document.getElementById('selectBodega');
        let productoSelect = document.getElementById('selectProducto');
        let cantidadTxt = document.getElementById('txtCantidad');
        
        IDTxt.value = i;

        for (let index = 0; index < state.bodegas.length; index++) {
          if(state.inventarios[i].id_bodega === state.bodegas[index].id_bodega){
            bodegaSelect.selectedIndex = index;
            break;
          }
        }

        for (let index = 0; index < state.productos.length; index++) {
          if(state.inventarios[i].id_producto === state.productos[index].id_producto){
            productoSelect.selectedIndex = index;
            break;
          }
        }

        cantidadTxt.value = state.inventarios[i].cantidad;
    });
  }

  eliminar(id){
    console.log("eliminar " + id)
  }

  async makeRequest(request, param = ''){
    const response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/inventario' + param, request);
    return response.status;
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Crear Producto</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <Input
                            type="hidden"
                            id="txtID"
                            value=''
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Bodega</label>
                          <Input type="select" name="select" id="selectBodega">
                            {
                                this.state.bodegas.map(bodega => {
                                    return (
                                        <option key = {bodega.id_bodega} value={bodega.id_bodega}>{bodega.nombre}</option>
                                    );
                                })
                            }
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Producto</label>
                          <Input type="select" name="select" id="selectProducto">
                            {
                                this.state.productos.map(producto => {
                                    return (
                                        <option key = {producto.id_producto} value={producto.id_producto}>{producto.nombre}</option>
                                    );
                                })
                            }
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>Cantidad</label>
                          <Input
                            placeholder="Cantidad"
                            type="number"
                            id="txtCantidad"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={this.guardar}>
                    Guardar
                  </Button>
                </CardFooter>
              </Card>
            </Col>

            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Productos</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Bodega</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.inventarios.map((inventario, index) => {
                          return (
                            <tr key = {index}>
                              <td>{inventario.bodega.nombre}</td>
                              <td>{inventario.producto.nombre}</td>
                              <td>{inventario.cantidad}</td>
                              <td>
                                <Button className="btn-fill" color="primary" type="submit" onClick={e => this.modificar(index)}>
                                    Modificar
                                </Button>
                              </td>
                              <td>
                                <Button className="btn-fill" color="warning" type="submit" onClick={e => this.eliminar(index)}>
                                    Eliminar
                                </Button>
                              </td>
                            </tr>
                          );

                        })

                      }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Inventarios;
