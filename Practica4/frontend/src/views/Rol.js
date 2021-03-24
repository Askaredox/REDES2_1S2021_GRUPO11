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

class Roles extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      usuarios: [],
      roles: [],
      usuarios_roles: []
    };
    this.guardar = this.guardar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  async fetchData(){
    let response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/usuario');
    let dataUsuarios = await response.json();
    response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/rol');
    let dataRoles = await response.json();
    response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/usuario_rol');
    let dataUsuariosRoles = await response.json();

    dataUsuariosRoles.forEach(usuario => {
        for (let i = 0; i < dataUsuarios.length; i++) {
            if(usuario.id_usuario === dataUsuarios[i].id_usuario){
                usuario.usuario = dataUsuarios[i];
                break;
            }
        }

        for (let i = 0; i < dataRoles.length; i++) {
            if(usuario.id_rol === dataRoles[i].id_rol){
                usuario.rol = dataRoles[i];
                break;
            }
        }
    });

    dataUsuariosRoles.sort( (a, b) => {
        if(a.usuario.nombre > b.usuario.nombre){
          return 1;
        }else if(a.usuario.nombre < b.usuario.nombre){
          return -1;
        }
        return 0;
      });

    this.setState({usuarios: dataUsuarios, roles: dataRoles, usuarios_roles: dataUsuariosRoles});
  }

  componentWillMount(){
    this.fetchData();
  }

  async guardar(){
    let rolSelect = document.getElementById('selectRol');
    let usuarioSelect = document.getElementById('selectUsuario');

    //let obj=localStorage.getItem('current');


    const status = await this.makeRequest({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_rol: rolSelect.options[rolSelect.selectedIndex].value,
            id_usuario: usuarioSelect.options[usuarioSelect.selectedIndex].value
        })
    });

    if(status === 404) console.log("Error")
    else this.fetchData();

    rolSelect.selectedIndex = 0;
    usuarioSelect.selectedIndex = 0;
  }

  eliminar(id){
    console.log("eliminar " + id)
  }

  async makeRequest(request, param = ''){
    const response = await fetch('https://cors-anywhere.herokuapp.com/http://node-express-env.eba-6nhykbdv.us-east-2.elasticbeanstalk.com/usuario_rol' + param, request);
    console.log(response)
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
                  <h5 className="title">Crear Rol Usuario</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <label>Usuario</label>
                                <Input type="select" name="select" id="selectUsuario">
                                    {
                                        this.state.usuarios.map(usuario => {
                                            return (
                                                <option key = {usuario.id_usuario} value={usuario.id_usuario}>{usuario.nombre}</option>
                                            );
                                        })
                                    }
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label>Rol</label>
                                <Input type="select" name="select" id="selectRol">
                                    {
                                        this.state.roles.map(rol => {
                                            return (
                                                <option key = {rol.id_rol} value={rol.id_rol}>{rol.nombre}</option>
                                            );
                                        })
                                    }
                                </Input>
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
                  <CardTitle tag="h4">Roles</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Usuario</th>
                        <th>Rol</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.usuarios_roles.map((usuario_rol, i) => {
                          return (
                            <tr key = {i}>
                              <td>{usuario_rol.usuario.nombre}</td>
                              <td>{usuario_rol.rol.nombre}</td>
                              <td>
                                <Button className="btn-fill" color="warning" type="submit" onClick={e => this.eliminar(i)}>
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

export default Roles;
