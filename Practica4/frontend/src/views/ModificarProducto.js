import React, { useState , setState} from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  // Table,
  Form,
  Button,
  CardFooter,
  FormGroup,
  Input,
  Row,
  Col,
  CardImg, 
  CardText,
  CardSubtitle, 
} from "reactstrap";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchBar from "material-ui-search-bar";

import { FormControl, ControlLabel } from "react-bootstrap";

class ModificarProducto extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      productos: [],
      nombre: '',
      descripcion: '',
      precio: 0,
      searched: '',
      // categorias: []
    };

    // const [searched, setSearched] = useState("");

    // this.guardar = this.guardar.bind(this);
    // this.modificar = this.modificar.bind(this);
    // this.eliminar = this.eliminar.bind(this);
    this.handleChangeNombre = this.handleChangeNombre.bind(this);
    this.handleChangeDescripcion = this.handleChangeDescripcion.bind(this);
    this.handleChangePrecio = this.handleChangePrecio.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  async handleChangeNombre(event) {    
    // alert(event.target.value)
    this.setState({nombre: event.target.value});  
  }


  async handleChangeDescripcion(event) {    
    // alert(event.target.value)
    this.setState({descripcion: event.target.value});  
  }

  async handleChangePrecio(event) {    
    // alert(event.target.value)
    this.setState({precio: event.target.value});  
  }
  
  async handleSubmit(event) {

    console.log(event)
    // event.preventDefault();

        fetch(`http://35.226.179.134:9002/producto/modificar_producto`,{
      method: 'POST',
      body: JSON.stringify({
          id: event.id,
         foto:event.foto,
          producto_usuario:event.producto_usuario,
          nombre: this.state.nombre != '' ? this.state.nombre : event.nombre,
          descripcion: this.state.descripcion != '' ? this.state.descripcion : event.descripcion,
          precio: this.state.precio != 0 ? this.state.precio : event.precio,
          estado:true
      }),
      headers:{
          'Content-Type': 'application/json'
      }
  }).then(async function(response){
    let respuesta=await response.json();
 alert(respuesta)
    // if(respuesta.estado === 200) {
    //   alert("Logged in");
    //   let val= respuesta.data;
    //   console.log(val[0]);
    //   localStorage.setItem('current', JSON.stringify(val[0]));
    //   history.push("/admin/dashboard");
    // }else{
    //   console.log(respuesta)
    //     alert("Error, credenciales invalidas");
    // } 

  });
  

}

  
  
  async fetchData(){
    let response = await fetch('http://35.226.179.134:9003/producto/obtener_productos');
    let dataProductos = await response.json();
    console.log(dataProductos.data[0])
 
    // console.log(dataProductos)

    // response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/categoria');
    // let dataCategorias = await response.json();
    // response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/detalle_producto');
    // let dataDetalleProductos = await response.json();

    // dataProductos.forEach(producto => {
    //   producto.categorias = []
    //   producto.detalleCategorias = ''
    //   dataDetalleProductos.forEach(detalle => {
    //     if(producto.id_producto === detalle.id_producto){
    //       for (let i = 0; i < dataCategorias.length; i++) {
    //         if(dataCategorias[i].id_categoria === detalle.id_categoria){
    //           producto.categorias.push(dataCategorias[i])
    //           producto.detalleCategorias += dataCategorias[i].nombre + "\n"
    //           break
    //         }
    //       }
    //     }
    //   });
    // });
    let arreglo = [];
    let usuario = JSON.parse(localStorage.getItem('current'));
    for (let i = 0; i < dataProductos.data[0].length; i++) {
      let obj = dataProductos.data[0][i]
      if (obj.producto_usuario == usuario.id) {
        arreglo.push(obj)
        console.log(obj);
      }
    }

    this.setState({productos: arreglo, /*categorias: dataCategorias*/});
  }

  componentWillMount(){
    // this.fetchData();
    let lista = [
      {
        'id': 0, 
        'carnet': 201403904, 
        'nombre': 'Samuel Rosales',
        'cursoproyecto': 'algo',
        'detalle': 'algun detalle de que es algo',
      },
      {
        'id': 1, 
        'carnet': 201403904, 
        'nombre': 'Samuel Rosales',
        'cursoproyecto': 'algo',
        'detalle': 'algun detalle de que es algo',
      },
      {
        'id': 2, 
        'carnet': 201403904, 
        'nombre': 'Samuel Rosales',
        'cursoproyecto': 'algo',
        'detalle': 'algun detalle de que es algo',
      },
      {
        'id': 3, 
        'carnet': 201403904, 
        'nombre': 'Samuel Rosales',
        'cursoproyecto': 'algo',
        'detalle': 'algun detalle de que es algo',
      },
      {
        'id': 4, 
        'carnet': 201403905, 
        'nombre': 'Samuel Rosales',
        'cursoproyecto': 'algo',
        'detalle': 'algun detalle de que es algo',
      },
      {
        'id': 5, 
        'carnet': 201403905, 
        'nombre': 'Samuel Rosales',
        'cursoproyecto': 'algo',
        'detalle': 'algun detalle de que es algo',
      },
      {
        'id': 6, 
        'carnet': 201403906, 
        'nombre': 'Samuel Rosales',
        'cursoproyecto': 'algo',
        'detalle': 'algun detalle de que es algo',
      },
    ]
    this.setState({productos: lista, /*categorias: dataCategorias*/});
  }
 
  async cancelSearch () {
    this.componentWillMount()
  }

async requestSearch (searchedVal) {

    await this.componentWillMount()
    let newList = this.state.productos.filter((row) => {
      return row.carnet.toString().includes(searchedVal);
    });

    this.setState({productos: newList, /*categorias: dataCategorias*/});
}

  async guardar(){
    let IDTxt = document.getElementById('txtID');
    let NombreTxt = document.getElementById('txtNombre');
    let PrecioTxt = document.getElementById('txtPrecio');
    let DescripcionTxt = document.getElementById('txtDescripcion');

    const status = await this.makeRequest({
        method:  IDTxt.value === '' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: NombreTxt.value,
            descripcion: DescripcionTxt.value,
            precio: PrecioTxt.value,
        })
    }, IDTxt.value === '' ? '' : '/' + IDTxt.value);

    if(status === 404) console.log("Error")
    else this.fetchData();

    IDTxt.value = '';
    NombreTxt.value = '';
    PrecioTxt.value = '';
    DescripcionTxt.value = '';
  }

  modificar(id){
    this.setState(state => {
        let IDTxt = document.getElementById('txtID');
        let NombreTxt = document.getElementById('txtNombre');
        let PrecioTxt = document.getElementById('txtPrecio');
        let DescripcionTxt = document.getElementById('txtDescripcion');


    });
  }

  // eliminar(id){
  //   console.log("eliminar " + id)
  // }

  // async makeRequest(request, param = ''){
  //   const response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/producto' + param, request);
  //   return response.status;
  // }

  render() {
    return (
      <>
    
                  <CardTitle tag="h4">Reportes</CardTitle>

      <SearchBar
        value={this.state.searched}
        onChange={(searchVal) => this.requestSearch(searchVal)}
        onCancelSearch={() => this.cancelSearch()}
      />
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Carnet</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Curso/Proyecto</TableCell>
              <TableCell>Detalle</TableCell>
              <TableCell>No se que</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          this.state.productos.map((data) => (
            <TableRow>
              <TableCell>{data.carnet}</TableCell>
              <TableCell>{data.nombre}</TableCell>
              <TableCell>{data.cursoproyecto}</TableCell>
              <TableCell>{data.detalle}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      </>
    );
  }
}

export default ModificarProducto;
