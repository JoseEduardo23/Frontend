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
import img9 from '../assets/mapa.png'
import img12 from '../assets/ubi.png'
import img13 from '../assets/fondo2.jpg'
import img14 from '../assets/fondo3.jpg'

export const LandingPage = () => {
  const [darkMode, setdarkMode] = useState(false)
  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="main-container">

        <div className="navbar">
          <h1 className='title-page'>TIENDANIMAL</h1>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>

            <li>
              <Link to="/sobre">Sobre Nosotros</Link>
            </li>

            <li>
              <Link to="/tienda">Productos</Link>
            </li>

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

        <h1 className='lan-title'>BIENESTAR ANIMAL</h1>

        <section className="landing-1">
          <div className="content1">
            <hr />
            <p>
              En la actualidad, el bienestar animal de nuestras mascotas ha adquirido una enorme importancia en nuestra sociedad. No se trata únicamente de garantizar que un animal esté libre de sufrimiento, sino también de asegurar que viva en un entorno que favorezca su desarrollo saludable, mental y social.
              <br />
              Las mascotas, al ser animales sociales y dependientes de los humanos, requieren de atención especial para asegurarse de que su entorno, sus interacciones y su día a día favorezcan su bienestar general.
            </p>
            <hr />
          </div>
          <hr className="hre" />
          <img src={img2} alt="" className="img2" />
        </section>

        <div className='navegar'>
          <a href="#importancia">A cerca del bienestar animal</a>
          <a href="#Partes">Importancia, nutricion e higiene</a>
        </div>

        <section id='importancia' className='landing-2'>
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

        <section id='Partes' className='section3'>
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

        <footer className="footer">
          <div className="footer-container">

            <div className="contact-info">
              <p className="footer-title">Contactos</p>
              <img src={img9} alt="robot" className="footer-img" />
              <div className="contact-details">
                <div className="contact-item">
                  <img src={img12} alt="address" className="footer-icon" />
                  <span>Quitus N1-77 y 9 de Agosto</span>
                </div>
              </div>

              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.5721985525656!2d-78.42485298122872!3d-0.10071660173644326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d58ee4b2cd2929%3A0x52c6346c297079e7!2s9%20de%20Agosto%20%26%20Quitus%2C%20170202%20Quito!5e1!3m2!1ses!2sec!4v1750184809208!5m2!1ses!2sec"
                className='map-position'
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>

            <div className="footer-links">
              <p className="footer-title">Enlaces</p>
              <ul className="footer-list">
                <li className="footer-list-item"><Link to="/sobre">Sobre Nosotros</Link></li>
                <li className="footer-list-item"><Link to="/tienda">Productos</Link></li>
                <li className='footer-list-item' >
                  <Link
                    to="/login"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('/login', '_blank');
                    }}
                  >
                    Iniciar Sesión
                  </Link>
                </li>

                <li className='footer-list-item'>
                  <Link
                    to="/registro"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('/registro', '_blank')
                    }}
                  >
                    Registro
                  </Link>
                </li>

              </ul>
            </div>

            <div className="social-media">
              <p className="footer-title">Visítanos en:</p>
              <div className="social-icons">
                <img src={img6} alt="github" className="social-icon" />
                <img src={img8} alt="facebook" className="social-icon" />
                <img src={img7} alt="twitter" className="social-icon" />
              </div>
            </div>

          </div>
        </footer>

      </main>
    </div>
  )
}


