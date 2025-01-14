import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Estilos/landinPage.css';
import logoDarkMode from '../assets/dark.png';
import img2 from '../assets/fondo1.jpg'
import img3 from '../assets/game.png'
import img4 from '../assets/food.png'
import img5 from '../assets/thing.png'
import img6 from '../assets/github.png'
import img7 from '../assets/facebook.png'
import img8 from '../assets/twitter.png'
import img9 from '../assets/robot.png'
import img10 from '../assets/phone.png'
import img11 from '../assets/mail.png'
import img12 from '../assets/ubi.png'







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
                ¿Que es el bienestar animal? <br /> <br />
              </h2>
              <p>
                En la actualidad el bienestar animal de nuestras mascotas, se trata de una cuestión que ha adquirido una enorme importancia en nuestra sociedad, no se trata unicamente de
                garantizar que un animal esté libre de sufrimiento, sino también de asegurar que viva en un entorno que favorezca su desarrollo saludable, mental y social. Esto no solo incluye
                el cuidado físico, como la alimentación adecuada y la atención médica, sino también aspectos emocionales y psicológicas.
                <br />
                Las mascotas al ser animales sociales y dependientes de los humanos, requieren de atencion especial para asegurarse de que su entorno, sus interacciones y su día a día favorezcan
                su bienestar general.

              </p>
            </div>

            <div className='img2'>
              <img src={img2} alt="" className='img2-1' />
            </div>

          </div>
        </section>

        <section className='section3'>
          <div className='texto2'>
            <img src={img3} alt="" className='img3' />
            <p className='title3'>Importancia del cuidado de las mascotas domésticas</p>
            <p className='parr2'>El cuidado y bienestar de las mascotas proviene de un buen cuidado
              no solo previene de enfermedadees físicas, sino que también tiene un
              impacto directio en la salud mental y emocional del animal.
              Las mascotas especialmente los perros y gatos, son animales
              sociales que necesitan interacciones y vinculos afectivos con
              sus dueños. Esto les ayuda a mantenerse equilibrados y a evitar
              problemas de comportamiento.
            </p>
          </div>
          <div className='texto3'>
            <img src={img4} alt="" className='img4' />
            <p className='title3'>Nutrición adecuada</p>
            <p className='parr2'>
              La alimentación es uno de los pilares del bienestar de las mascotas,
              cada especie y raza tienen diferentes necesidades nutricionales, por
              lo que es importante elegir una dieta balanceada y adecuada a su edad,
              tamaño y actividad, en este punto el ejercicio no solo mantiene en
              forma a la mascota, sino que también promueve un bienestar emocional
              Los paseos, juegos y actividades permite a las macotas explorar su
              entorno el cual contribuye a su desarrollo y felicidad de tal manera que
              previene problemas de comportamiento derivados del aburrimiento
            </p>
          </div>

          <div className='texto4'>
            <img src={img5} alt="" className='img5' />
            <p className='title3'>Higiene y vinculo emocional con los dueños</p>
            <p className='parr2'>
              La higiene adecuada es vital, esto incluye bañar a las mascotas cuando sea
              necesario, cepillar su pelaje para evitar enredados y mantenerlo limpio y
              cuidar de sus uñas y dientes, las masctoas también necesitan un espacion
              cómodo y limpio donde descansar. Las mascotas no solo son animales de
              compañia, sino que se convierten en parte de la familia, brindarles amor y
              atencion, así como respetar sus limites, es clave para fortalecer el vínculo
              entre la masctoa y su dueño, lo cual también les proporciona una sesación
              de seguridad y confianza.
            </p>
          </div>
        </section>

        <footer className='footer'>
          
          <div>
            <p className='parr3'>Contactos:</p>
            <img src={img9} alt="robot" className='img9' />
            <div className='contact'>
              <img src={img10} alt="" className='img10'/>
              <spam>09837991163</spam>

              <img src={img11} alt="" className='img11' />
              <spam>je20042316@gmail.com</spam>
              
              <img src={img12} alt="" className='img12' />
              <spam>Av-lorem</spam>
            </div>
          </div>

          <div className='enlaces'>
            <p className='parr3'>Enlaces:</p>
            <ul className='dat'>
              <li className='d1'>Conocenos</li>
              <li className='d1'>Planes alimenticios</li>
              <li className='d1'>Contactos</li>
            </ul>
          </div>

          <div className='paginas'>
            <p className='parr3'>Visitanos en:</p><br />
            <img src={img6} alt="github" className='img6' />
            <img src={img8} alt="facebook" className='img8' />
            <img src={img7} alt="twitter" className='img7' />
          </div>

          <div className='comments'>
            <p className='parr3'>Suscribete:</p>
            <input type="text" /><br />
            <input type="email" /><br />
            <button>Submit</button>
          </div>
        </footer>
      </main>
    </div>
  )
}
