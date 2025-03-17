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
import img13 from '../assets/fondo2.jpg'
import img14 from '../assets/fondo3.jpg'




export const LandingPage = () => {
  const [darkMode, setdarkMode] = useState(false)
  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="main-container">

        <div className="navbar">
          <h1>TIENDANIMAL</h1>
          <ul>
            <li>Inicio</li>
            <li>Acerca</li>
            <li>Productos</li>
            <li>Contactos</li>
            <li>
              <img
              className='btn-dark'
                onClick={() => setdarkMode(!darkMode)}
                src={logoDarkMode}
                alt="darkmode"
              />
            </li>
            <li>
              <Link
                to="/login"
                className='btn-login'
                onClick={(e) => {
                  e.preventDefault();
                  window.open('/login', '_blank');
                }}
              >
                Iniciar Sesión
              </Link>
            </li>
          </ul>
        </div>

        <section className='landing-1'>
          <div className="content1">
            <p>
              Las mascotas al ser animales sociales y dependientes de los humanos, requieren de atencion especial para asegurarse de que su entorno, sus interacciones y su día a día favorezcan
              su bienestar general.
            </p>
            <div>
              <img src={img2} alt="" className='img2' />
            </div>
          </div>
        </section>

        <section className='landing-2'>
          <div className="info2">
            <p>
              El cuidado y bienestar de las mascotas proviene de un buen cuidado
              no solo previene de enfermedadees físicas, sino que también tiene un
              impacto directio en la salud mental y emocional del animal.
              Las mascotas especialmente los perros y gatos, son animales
              sociales que necesitan interacciones y vinculos afectivos con
              sus dueños. Esto les ayuda a mantenerse equilibrados y a evitar
              problemas de comportamiento.
            </p>
          </div>
          <img src={img13} alt="" className='img13' />
        </section>

        <section className='landing-3'>
          <div className='info3'>
            <p>
              Las vacunas son fundamentales para proteger su salud y prevenir enfermedades graves, una de las
              más importantes es la vacuna contra el parvovirus, que combate una enfermedad viral severa y deshidratación
              y puede ser fatal si no se trata a tiempo. Otra vacuna esencial es la del moquillo canino, una enfermedad
              viral que ataca los sistemas respiratorio. La vacuna contra la rabia es también crucial, no solo porque protege
              al perro, sino porque es una enfermedad zoonótica que puede transmitirse a los humanos.
            </p>
          </div>
          <img src={img14} alt="" className='img14' />
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

        <footer class="footer">
          <div class="footer-container">
            <div class="contact-info">
              <p class="footer-title">Contactos</p>
              <img src={img9} alt="robot" class="footer-img" />
              <div class="contact-details">
                <div class="contact-item">
                  <img src={img10} alt="phone" class="footer-icon" />
                  <span>09837991163</span>
                </div>
                <div class="contact-item">
                  <img src={img11} alt="email" class="footer-icon" />
                  <span>je20042316@gmail.com</span>
                </div>
                <div class="contact-item">
                  <img src={img12} alt="address" class="footer-icon" />
                  <span>Av-lorem</span>
                </div>
              </div>
            </div>

            <div class="footer-links">
              <p class="footer-title">Enlaces</p>
              <ul class="footer-list">
                <li class="footer-list-item">Conócenos</li>
                <li class="footer-list-item">Planes alimenticios</li>
                <li class="footer-list-item">Contactos</li>
              </ul>
            </div>

            <div class="social-media">
              <p class="footer-title">Visítanos en:</p>
              <div class="social-icons">
                <img src={img6} alt="github" class="social-icon" />
                <img src={img8} alt="facebook" class="social-icon" />
                <img src={img7} alt="twitter" class="social-icon" />
              </div>
            </div>

            <div class="newsletter">
              <p class="footer-title">Envíanos un comentario:</p>
              <textarea name="" id="" className='footer-input' placeholder='Comentario'></textarea>
              <input type="email" required class="footer-input" placeholder="Correo electrónico" />
              <button class="footer-btn">Enviar</button>
            </div>
          </div>
        </footer>

      </main>
    </div>
  )
}


