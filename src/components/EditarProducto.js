import React, { useState, useRef } from 'react';
import Error from './Error';
import Axios from 'axios';
import Swal from 'sweetalert2';
//high order component
import { withRouter } from 'react-router-dom';

function EditarProducto({producto, guardarRecargarProductos, history}) {

    //this is a good practice to handle the form edition
    const precioPlatilloRef = useRef('');
    const nombrePlatilloRef = useRef('');

    const [ categoria, guardarCategoria ] = useState('');
    const [ error, guardarError ] = useState(false);
    
    const editarProducto = async e => {
        e.preventDefault();

        //validation
        const nuevoPrecioPlatillo = precioPlatilloRef.current.value,
              nuevoNombrePlatillo = nombrePlatilloRef.current.value;
        if (nuevoPrecioPlatillo === '' || nuevoNombrePlatillo === '' || categoria === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        //checking if the category has changed, so the hook will be loaded with a value
        //this validation is usefull for avoinding to leave an empty value in the categoria attribute
        let categoriaPlatillo = (categoria === '') ? producto.categoria : categoria;
        const editarPlatillo = {
            precioPlatillo: precioPlatilloRef.current.value,
            nombrePlatillo: nombrePlatilloRef.current.value,
            categoria: categoriaPlatillo
        }

        const url = `http://localhost:4000/restaurant/${producto.id}`;
        try {
            const resultado = await Axios.put(url, editarPlatillo);
            console.log('Resultado de edición', resultado);
            if (resultado.status === 200) {
                Swal.fire(
                    'Producto Editado',
                    'El producto se editó correctamente',
                    'success'
                );
            }
        } catch(error) {
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, vuelve a intentarlo',
            });
        }
        guardarRecargarProductos(true);
        history.push('/productos');
    }

    const leerValorRadio = e => {
        guardarCategoria(e.target.value);
    }

    return (
        <div className="col-md-8 mx-auto ">
        <h1 className="text-center">Editar Producto</h1>
        {(error) ? <Error mensaje='Todos los campos son obligatorios' /> : null }
        <form
            className="mt-5"
            onSubmit={editarProducto}
        >
            <div className="form-group">
                <label>Nombre Platillo</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="nombre" 
                    placeholder="Nombre Platillo"
                    ref={nombrePlatilloRef}
                    defaultValue={producto.nombrePlatillo}
                />
            </div>

            <div className="form-group">
                <label>Precio Platillo</label>
                <input 
                    type="number" 
                    className="form-control" 
                    name="precio"
                    placeholder="Precio Platillo"
                    ref={precioPlatilloRef}
                    defaultValue={producto.precioPlatillo}
                />
            </div>

            <legend className="text-center">Categoría:</legend>
            <div className="text-center">
            <div className="form-check form-check-inline">
                {/* defaultChecked = if the product category is postre, the check will be shown checked */}
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="categoria"
                    value="postre"
                    onChange={leerValorRadio}
                    defaultChecked={(producto.categoria === 'postre')} 
                />
                <label className="form-check-label">
                    Postre
                </label>
            </div>
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="categoria"
                    value="bebida"
                    onChange={leerValorRadio}
                    defaultChecked={(producto.categoria === 'bebida')}
                />
                <label className="form-check-label">
                    Bebida
                </label>
            </div>

            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="categoria"
                    value="cortes"
                    onChange={leerValorRadio}
                    defaultChecked={(producto.categoria === 'cortes')}
                />
                <label className="form-check-label">
                    Cortes
                </label>
            </div>

            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="categoria"
                    value="ensalada"
                    onChange={leerValorRadio}
                    defaultChecked={(producto.categoria === 'ensalada')}
                />
                <label className="form-check-label">
                    Ensalada
                </label>
            </div>
            </div>

            <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
        </form>
    </div>
    )
}

export default withRouter(EditarProducto);
