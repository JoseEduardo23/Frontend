import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Estilos/landinPage.css';
import logoDarkMode from '../assets/dark.png';
import logoFacebook from '../assets/facebook.png';
import logoGithub from '../assets/github.png';
import logoLinkedind from '../assets/linkedin.png';
import logoRocket from '../assets/rocket.webp';
import logoCode from '../assets/code.png';
import logoConsulting from '../assets/consulting.png';
import logoDesign from '../assets/design.png';
import logoWeb1 from '../assets/web1.png';
import logoWeb2 from '../assets/web2.png';
import logoWeb3 from '../assets/web3.png';
import logoWeb4 from '../assets/web4.png';
import logoWeb5 from '../assets/web5.png';
import logoWeb6 from '../assets/web6.png';

export const LandingPage = () => {
  const [darkMode, setdarkMode] = useState(false)
  return (
    <div className={darkMode ? "dark" : ""}>

      <main>
        <section>
          <nav class="barra1">
            <h1 class="title1">TiendAnimal</h1>
            <ul>
              <li>Conocenos</li>
              <li>Planes alimenticos</li>
              <li>Contactanos</li>
              <li>
                <img
                  onClick={() => setdarkMode(!darkMode)}
                  className="cursor-pointer"
                  src={logoDarkMode}
                  alt="logo"
                />
              </li>
              <li><a href="">Login</a></li>
            </ul>
          </nav>
        </section>

        <section>
          <p>Esta apgina esta dedicada a integrar un concepto de como los dueños <br/>
          deben de relacionar la salud de sus mascotas para la mejora del bienestar de <b/>
          las mismas.
          </p>
        </section>
      </main>
    </div>
  )
}
