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


class CrearProductos extends React.Component {

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
    this.state = {
      imageSrc: "data:image/png;base64,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",
      imageName: "",
      loaded: true,
      tipoImg: "",
      productos: [],
      categorias: []

    };

    this.notify=this.notify.bind(this);
    this.guardar = this.guardar.bind(this);
    this.modificar = this.modificar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }



  

  async guardar() {
    let IDTxt = document.getElementById('txtID');
    let NombreTxt = document.getElementById('txtNombre');
    let PrecioTxt = document.getElementById('txtPrecio');
    let DescripcionTxt = document.getElementById('txtDescripcion');

    let usuario = JSON.parse(localStorage.getItem('current'));
    console.log(usuario);
    /*const status = await this.makeRequest({
      method: IDTxt.value === '' ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: NombreTxt.value,
        descripcion: DescripcionTxt.value,
        precio: PrecioTxt.value,
      })
    }, IDTxt.value === '' ? '' : '/' + IDTxt.value);

    if (status === 404) console.log("Error")
    else this.fetchData();*/
    let split=this.state.imageSrc.split(',');

    fetch(`http://35.226.179.134:9001/producto/crear_producto`, {
      method: 'POST',
      body: JSON.stringify({
        "nombre": NombreTxt.value,
        "precio": PrecioTxt.value,
        "foto": split[1],
        "usuario": usuario.id,
        "descripcion": DescripcionTxt.value,
        "extension": this.state.tipoImg
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async function (response) {
        let respuesta = await response.json();
        console.log(respuesta);
        if (respuesta.estado === 200) {

          alert("Producto agregado correctamente");
          window.location.reload();
        } else {
          console.log(respuesta)
          alert("Error al crear el producto");
        }

      }


      ).catch(error => console.log(error));


    IDTxt.value = '';
    NombreTxt.value = '';
    PrecioTxt.value = '';
    DescripcionTxt.value = '';
  }

  modificar(id) {
    this.setState(state => {
      let IDTxt = document.getElementById('txtID');
      let NombreTxt = document.getElementById('txtNombre');
      let PrecioTxt = document.getElementById('txtPrecio');
      let DescripcionTxt = document.getElementById('txtDescripcion');

      for (let i = 0; i < state.productos.length; i++) {
        if (state.productos[i].id_producto === id) {
          IDTxt.value = state.productos[i].id_producto;
          NombreTxt.value = state.productos[i].nombre;
          PrecioTxt.value = state.productos[i].precio;
          DescripcionTxt.value = state.productos[i].descripcion;

          break;
        }
      }
    });
  }

  eliminar(id) {
    console.log("eliminar ")
    console.log(id)
  }


  onFileChange(e, file1) {
    console.log("on-file-change");
    var file = file1 || e.target.files[0],
      pattern = /image-*/,
      reader = new FileReader();
    console.log(file.name);
    console.log(file);
    if (!file.type.match(pattern)) {
      alert("Formato inválido");
      return;
    }
    var tipo = String(file.type)
    var separador = tipo.split("/")
    console.log(this);
    this.setState({ tipoImg: separador[1] });
    this.setState({ loaded: false });

    reader.onload = e => {

      this.setState({ imageSrc: reader.result });
      this.setState({ loaded: true });

      console.log(reader.result);
    };
    reader.readAsDataURL(file);
  }


  async makeRequest(request, param = '') {
    const response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/producto' + param, request);
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
                          <label>Nombre</label>
                          <Input
                            placeholder="Nombre"
                            type="text"
                            id="txtNombre"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Precio</label>
                          <Input
                            placeholder="Precio"
                            type="text"
                            id="txtPrecio"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>Descripción</label>
                          <Input
                            placeholder="Descripción"
                            type="text"
                            id="txtDescripcion"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="12">

                        <label>Fotografía del Producto</label>

                        <Input
                          type="file"
                          accept="image/*"
                          onChange={this.onFileChange}
                          id="imagenProducto"

                        />

                        <img src={this.state.imageSrc} width="300" height="300" alt='Imagen del Producto' />


                      </Col>
                    </Row>


                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={this.guardar}>
                    Registrar Producto
                  </Button>
                </CardFooter>
              </Card>
            </Col>

          </Row>
        </div>
      </>
    );
  }
}

export default CrearProductos;
