import React,{useState, useEffect} from 'react';
import './Cart.css';

const Cart = () => {

    return(<>
        <div className='container-cart'>
            <h3>Productos del carrito:</h3>



        <section className='container-buttons'>
            <button>Ver Carrito</button>
            <button>Finalizar Compra</button>
        </section>
        </div>
    </>)
}

export default Cart;