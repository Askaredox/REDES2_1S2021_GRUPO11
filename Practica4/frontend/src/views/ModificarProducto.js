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
  Label,
} from "reactstrap";

import Usuario from "./Usuario"

import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchBar from "material-ui-search-bar";

import { FormControl, ControlLabel } from "react-bootstrap";
import { EventAvailableSharp } from "@material-ui/icons";

class ModificarProducto extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      reportes: [],
      atendido: '',
      nombre: '',
      descripcion: '',
      precio: 0,
      searched: '',
      index: -1,
      reporte: {}
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
    this.handleReporte = this.handleReporte.bind(this);
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

  
  async handleReporte(id) {

    let response = await fetch(`http://172.35.71.2:80/get_reporte?reporte=${id}`);
    let dataReportes = await response.json();
 
    console.log(response)
    console.log(dataReportes)
    console.log(id)
    this.state.index = id


    this.setState({reporte: dataReportes.data, atendido: dataReportes.atendido});

    this.forceUpdate();

    

  }
  
  async fetchData(){
    let response = await fetch('http://172.35.71.2:80/get_lista_reporte');
    let dataReportes = await response.json();

    console.log(dataReportes)

    this.setState({reportes: dataReportes.data, atendido: dataReportes.atendido});
  }

  componentWillMount(){
    this.fetchData();
    // let lista = [
      
    // ]

    // this.setState({reportes: lista, /*categorias: dataCategorias*/});
  }
 
  async cancelSearch () {
    this.componentWillMount()
  }

async requestSearch (searchedVal) {

    let response = await fetch('http://172.35.71.2:80/get_lista_reporte');
    let dataReportes = await response.json();
    this.setState({reportes: dataReportes.data, atendido: dataReportes.atendido});

    let newList = this.state.reportes.filter((row) => {
      return row.carnet.toString().includes(searchedVal);
    });

    this.setState({reportes: newList, /*categorias: dataCategorias*/});
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


  render() {
    if(this.state.index === -1){
      return (
        <>
          

          <CardTitle tag="h4"> Atendido por: {this.state.atendido}</CardTitle>

          <SearchBar
            value={this.state.searched}
            onChange={(searchVal) => this.requestSearch(searchVal)}
            onCancelSearch={() => this.cancelSearch()}
          />

          <TableContainer component={Paper}>
            <Table dark aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell><Label>Carnet</Label></TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Curso/Proyecto</TableCell>
                    <TableCell>Detalle</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Servidor</TableCell>
                    <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                this.state.reportes.map((data) => (
                  <TableRow>
                    <TableCell>{data.carnet}</TableCell>
                    <TableCell>{data.nombre}</TableCell>
                    <TableCell>{data.curso}</TableCell>
                    <TableCell>{data.mensaje}</TableCell>
                    <TableCell>{data.fecha}</TableCell>
                    <TableCell>{data.procesado}</TableCell>
                    <TableCell>
                      <Button className="btn-fill" value={data.ID_reporte} color="primary" type="submit" onClick={(ev) => { ev.preventDefault(); this.handleReporte(ev.target.value)}}>
                        Mostrar
                      </Button></TableCell>
                      
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
          </TableContainer>
        </>
      );
    }

    return (
      <div>
        <Button className="btn-fill" color="primary" type="submit" onClick={()=>{this.state.index = -1; this.forceUpdate(); }}>
          Cerrar
        </Button>

          <CardTitle tag="h4"> Atendido por: {this.state.atendido}</CardTitle>
            
                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 3 }}>
                      <label>Carnet</label>
                      <FormGroup>

                        <FormControl
                          // autoFocus
                          type="text"
                           defaultValue={this.state.reporte.carnet}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 3 }}>
                      <label>Nombre</label>
                      <FormGroup>

                        <FormControl
                          // autoFocus
                          type="text"
                          defaultValue={this.state.reporte.nombre}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 3 }}>
                      <label>Curso/Proyecto</label>
                      <FormGroup>

                        <FormControl
                          // autoFocus
                          type="text"
                          defaultValue={this.state.reporte.curso}
                        />
                        
                      </FormGroup>
                    </Col>


                  </Row>

                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 3 }}>
                      <label>Procesado</label>
                      <FormGroup>

                        <FormControl
                          // autoFocus
                          type="text"
                          defaultValue={this.state.reporte.procesado}
                        />
                        
                      </FormGroup>
                    </Col>


                  </Row>

                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 3 }}>
                      <label>Fecha</label>
                      <FormGroup>

                        <FormControl
                          // autoFocus
                          type="text"
                          defaultValue={this.state.reporte.fecha}
                        />
                        
                      </FormGroup>
                    </Col>


                  </Row>

                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 3 }}>
                      <label>Detalle del Reporte</label>
                      {/* <FormGroup>

                        <FormControl
                          // autoFocus
                          type="textarea"
                          // defaultValue={this.state.usuario['direccion']}
                          
                        />
                      </FormGroup > */}

                        <FormGroup>
                          {/* <Label for="exampleText">Text Area</Label> */}
                          <Input 
                            type="textarea" 
                            name="text" 
                            defaultValue={this.state.reporte.mensaje}

                          />
                        </FormGroup>
      
                    </Col>
                  </Row>
      </div>
    );
    
  }
}

export default ModificarProducto;
