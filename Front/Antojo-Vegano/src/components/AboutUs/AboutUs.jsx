import React from "react";
import BtnBack from "../BtnBack/BtnBack";
import "./AboutUs.css";
import logo from '../../assets/LogoAntojo.jpg';

const AboutUs = () =>{

    return(<>

        <div className="page-content">
        <BtnBack/>

        {/* Contenedor del la informacion personal */}
        <div className="container container-data">
            <img src={ logo ||"/placeholder.jpg"} alt="Imagen sobre la marca"/>
        <section>
            <h3>Sobre Nosotros</h3>
            <p>Hola, somos Antojo Vegano, una panadería artesanal que nació con el propósito de endulzarte la vida sin crueldad. Creemos que disfrutar de algo rico no tiene por qué ir en contra del respeto por los animales, la salud o el planeta. Cada producto que elaboramos está hecho con ingredientes 100 % vegetales, seleccionados con amor y compromiso.</p>
            <p>Desde el primer día quisimos romper con la idea de que lo vegano es aburrido o limitado. En nuestro taller se combinan sabor, textura y creatividad para ofrecer budines húmedos, medialunas hojaldradas, galletas, muffins y muchas otras delicias caseras. Todo lo hacemos en pequeñas cantidades, de manera artesanal, para garantizar frescura y ese sabor auténtico que te hace volver.</p>
            <p>Más que una panadería, somos un proyecto con valores. Apostamos a una forma de cocinar consciente, ética y sostenible, donde cada elección cuenta. Nos apasiona compartir lo que hacemos, escuchar a quienes nos eligen y seguir creciendo junto a una comunidad que busca disfrutar cuidando el mundo que habitamos.
            Porque en Antojo Vegano, creemos que el cambio empieza en lo que elegís cada día…
            Y si es con algo rico, hecho con amor y respeto, ¡mucho mejor! 🌱💛</p>
        </section>

        </div>

        </div>
    </>)
}

export default AboutUs;