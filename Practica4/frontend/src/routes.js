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
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import CrearPedido from "views/CrearPedido";
import Sedes from "views/Sedes.js";
import CrearProductos from "views/CrearProductos.js"
import Inventarios from "views/Inventario.js"
import Clientes from "views/Clientes.js"
import Usuarios from "views/Usuario.js";
import ActualizarInventario from "views/ActualizarInventario.js";
import CrearTransferencia from "views/CrearTransferencia.js";
import CrearVenta from "views/CrearVenta.js";
import Rol from 'views/Rol.js'
import EliminarProductos from 'views/EliminarProducto'

import ModificarProducto from 'views/ModificarProducto'

import VerPedidoRestaurante from 'views/VerPedidoRestaurante'
import VerPedidoUsuario from 'views/VerPedidoUsuario'


var routes = [
  {
    path: "/dashboard",
    name: "Pagina Principal",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
    access: 'admin',
  },
  
  {
    path: "/ver-pedido",
    name: "Ver Pedidos",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-cart",
    component: VerPedidoUsuario,
    layout: "/admin"
  },
  
  {
    path: "/usuarios",
    name: "Modificar Usuario",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-single-02",
    component: Usuarios,
    layout: "/admin",
    access: 'user',
  },
  {
    path: "/crear-pedido",
    name: "Crear Pedido",
    icon: "tim-icons icon-app",
    component: CrearPedido,
    layout: "/admin",
    access: 'user',
  },
  
  {
    path: "/modificarproducto",
    name: "Modificar Producto",
    icon: "tim-icons icon-delivery-fast",
    component: ModificarProducto,
    layout: "/admin",
    access: 'admin',
  },
  {
    path: "/crear-productos",
    name: "Crear Productos",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-app",
    component: CrearProductos,
    layout: "/admin",
    access: 'admin',
  },
  {
    path: "/eliminar-productos",
    name: "Eliminar Productos",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-scissors",
    component: EliminarProductos,
    layout: "/admin",
    access: 'admin',
  },

 
  
  /*{
    path: "/productos",
    name: "Productos",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-money-coins",
    component: Productos,
    path: "/actualizar-inventario",
    name: "Actualizar Inventario",
    icon: "tim-icons icon-cloud-upload-94",
    component: ActualizarInventario,
    layout: "/admin"
  },*/
];
export default routes;
