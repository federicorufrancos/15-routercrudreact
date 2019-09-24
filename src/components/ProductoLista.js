import React from 'react';
import { Link } from 'react-router-dom';
import Error from './Error';
import Axios from 'axios';
import Swal from 'sweetalert2';

function ProductoLista({producto, guardarRecargarProductos}) {

    const eliminarProducto = id => {
        console.log('elimina el producto: ', id);

        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Un platillo eliminado no se puede recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar '
          }).then(async (result) => {
            if (result.value) {
                try {
                    const url = `http://localhost:4000/restaurant/${id}`;
                    const resultado = await Axios.delete(url);

                    console.log('Resultado de eliminación', resultado);  
                    if (resultado.status === 200) {
                         Swal.fire(
                            'Eliminado!',
                            'El producto se ha eliminado.',
                            'success'
                        )
                        guardarRecargarProductos(true);
                    }   
                } catch (error) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: 'Hubo un error, vuelve a intentarlo',
                    });
                }
            }
          })
          
    }

    { /* this data--somethign is used to filter element */ }
    return(
        <li data-categoria={producto.categoria} className="list-group-item d-flex justify-content-between align-items-center">
            <p>
               {producto.nombrePlatillo} {' '}
               <span className="font-weight-bold">${producto.precioPlatillo}</span>
            </p>
            <div>
                <Link to={`productos/editar/${producto.id}`} className="btn btn-success mr-2">Editar</Link>
                <button type="button"
                className="btn btn-danger"
                onClick={() => eliminarProducto(producto.id)}>Eliminar &times;</button>
            </div>
        </li>
    )
}
export default ProductoLista;