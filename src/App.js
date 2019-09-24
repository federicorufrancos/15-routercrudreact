import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios';

import Header from          './components/Header';
import Productos from       './components/Productos';
import AgregarProducto from './components/AgregarProducto';
import Producto from        './components/Producto';
import EditarProducto from  './components/EditarProducto';

function App() {

  const [ productos, guardarProductos ] = useState([]); 
  const [ recargarProductos, guardarRecargarProductos ] = useState(true);
    
  useEffect(() => {
    console.log('recargame? ', recargarProductos);
    if (recargarProductos) {
      const consultarApi = async () => {
        const resultado = await Axios.get('http://localhost:4000/restaurant');
        console.log(resultado.data);
        guardarProductos(resultado.data);
      }
      //after declaring the request, it must be invoked
      consultarApi();
      //Here I update the value of recargarProducto because if I don't and try to update the value, the useEffect doesn't execute
      guardarRecargarProductos(false);
    } 
  }, [recargarProductos]); //Loading the hook dependency to the useEffect method

  return (
    <Router>
      {/*the header will be available in every componente, so Everything between the router and swtich tag have this effect*/}
      <Header/>
      <main className="container mt-5">
        <Switch>
          {/*The first route that matches with the one in the browser, will enter to it, so it's important to consider the order*/}
          {/*The recomendation is to have the generic ones first and till the end of the routing, add the more specifics*/}

          {/*when I need to send data inside the component, I must us render instead of component*/}
          <Route exact path="/productos" render={ () => 
            <Productos productos={productos} guardarRecargarProductos={guardarRecargarProductos}/>
          } />
          {/* Here I'm sending the hook method to know if I have to update the product list  */}
          <Route exact path="/nuevo-producto" render={() => (
            <AgregarProducto guardarRecargarProductos={guardarRecargarProductos} />
          )} />
          <Route exact path="/productos/:id" component={Producto} />
          <Route exact path="/productos/editar/:id" render={props => {
            {/* this props.match.params.id is the reference to the :id*/}
            console.log(props.match.params.id);
            const idProducto = parseInt(props.match.params.id);
            {/* getting the right product to edit */}
            const producto = productos.filter(producto => producto.id === idProducto);
            console.log('product to edit ', producto);
            return (
              <EditarProducto producto={producto[0]} guardarRecargarProductos={guardarRecargarProductos}/> 
            )
          }} />        
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los derecho reservados</p>
    </Router>
  );
}

export default App;
