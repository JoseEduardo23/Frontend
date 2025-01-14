import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Estilos/landinPage.css';
import logoDarkMode from '../assets/dark.png';
import img2 from '../assets/fondo1.jpg'


export const LandingPage = () => {
  const [darkMode, setdarkMode] = useState(false)
  return (
    <div className={darkMode ? "dark" : ""}>

      <main>
        <section>
          <nav className="barra1">
            <h1 className="title1">TiendAnimal</h1>
            <ul>
              <li>Conocenos</li>
              <li>Planes alimenticos</li>
              <li>Contactanos</li>
              <li>
                <img
                  onClick={() => setdarkMode(!darkMode)}
                  className="img1"
                  src={logoDarkMode}
                  alt="logo"
                />
              </li>
              <li><a href="">Login</a></li>
            </ul>
          </nav>
        </section>
        <section className='section2'>
          <div className='divContainer'>
            <div className='texto1'>
              <h2>
                ¿Que es el bienestar animal? <br/> <br/>
              </h2>
              <p>
                En la actualidad el bienestar animal de nuestras mascotas, se trata de una cuestión que ha adquirido una enorme importancia en nuestra sociedad, no se trata unicamente de
                garantizar que un animal esté libre de sufrimiento, sino también de asegurar que viva en un entorno que favorezca su desarrollo saludable, mental y social. Esto no solo incluye
                el cuidado físico, como la alimentación adecuada y la atención médica, sino también aspectos emocionales y psicológicas.
                <br/>
                Las mascotas al ser animales sociales y dependientes de los humanos, requieren de atencion especial para asegurarse de que su entorno, sus interacciones y su día a día favorezcan
                su bienestar general.
                
              </p>
            </div>

            <div className='img2'>
              <img src={img2} alt="" className='img2-1' />
            </div>

          </div>
        </section>
      </main>
    </div>
  )
}
