import React from "react";
import "./EliminarProducto.css";

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


class EliminarProductos extends React.Component {

  notify(type, message) {

    var options = {};

    options = {
      place: "tr",
      message: message,
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.notifRef.current.notificationAlert(options);
  };

  constructor(props) {
    super(props);
    this.state = {
      imageName: "",
      loaded: true,
      tipoImg: "",
      productos: [],
      categorias: []

    };


    this.notifRef = React.createRef();
    this.notify = this.notify.bind(this);
    this.guardar = this.guardar.bind(this);
    this.modificar = this.modificar.bind(this);
    this.obtenerProductos = this.obtenerProductos.bind(this);
    this.obtenerProductos2 = this.obtenerProductos2.bind(this);
    this.eliminarProducto = this.eliminarProducto.bind(this);
    this.eliminarProducto2 = this.eliminarProducto2.bind(this);
    this.onFileChange = this.onFileChange.bind(this);

    this.obtenerProductos();
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
    let split = this.state.imageSrc.split(',');

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
    console.log(respuesta);
    if (respuesta.estado === 200) {
      console.log(respuesta.data[0]);

      let arreglo = [];
      let usuario = JSON.parse(localStorage.getItem('current'));
      for (let i = 0; i < respuesta.data[0].length; i++) {
        let obj = respuesta.data[0][i]
        if (obj.producto_usuario == usuario.id) {
          arreglo.push(obj)
          console.log(obj);
        }
      }
      
      this.setState({ productos: arreglo });

    } else {
      console.log(respuesta)
      alert("Error al crear el producto");
    }

  }

  eliminarProducto(id) {




    fetch(`http://35.226.179.134:9004/producto/eliminar_producto`, {
      method: 'POST',
      body: JSON.stringify({
        "id": id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => this.eliminarProducto2(response)


      ).catch(error => console.log(error));



  }


  async eliminarProducto2(response) {

    let respuesta = await response.json();
    console.log(respuesta);
    if (respuesta.estado === 200) {

      alert("Producto eliminado correctamente");
      window.location.reload();
    } else {
      console.log(respuesta)
      alert("Producto agregado insatisfactoriamente");
    }


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

            
           




                  {
                    this.state.productos.map(producto => {
                      return (


                        <Col xs={12} xl={4}>
                          <Card>
                            <CardImg top width="100%" src={producto.foto} alt="Card image cap" />
                            <CardBody>
                              <CardTitle tag="h3">{producto.nombre}</CardTitle>
                              <CardSubtitle tag="h6" className="mb-2 text-muted">Descripcion</CardSubtitle>
                              <CardText>{producto.descripcion}</CardText>
                              <Button onClick={e => this.eliminarProducto(producto.id)}>Eliminar</Button>
                            </CardBody>
                          </Card>
                        </Col>






                      );
                    })
                  }
























         
          </Row>
        </div>
      </>
    );
  }
}

export default EliminarProductos;
