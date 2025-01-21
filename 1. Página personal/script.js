/* Smooth Scroll para navegar */

const enlace = document.querySelectorAll('nav a')

enlace.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = e.target.getAttribute('href').slice(1);
    document.getElementById(targetId).scrollIntoView({behavior: 'smooth'});
  });
});

/* Dinamismo "Ver más" */

const moreProjects = [
  {
    title: 'New Project 1',
    img: './img/placeholder-image.jpg',
    github: 'https://github.com/user/project1',
    live: 'https://user.github.io/project1/',
  },
  {
    title: 'New Project 2',
    img: './img/placeholder-image.jpg',
    github: 'https://github.com/user/project2',
    live: 'https://user.github.io/project2/',
  },
  {
    title: 'New Project 2',
    img: './img/placeholder-image.jpg',
    github: 'https://github.com/user/project2',
    live: 'https://user.github.io/project2/',
  },
]

const verMasBtn = document.querySelector('.ver-mas');

const proyectosContainer = document.querySelector('.proyectos');

verMasBtn.addEventListener('click', () => {
  moreProjects.forEach(proyecto => {
    const article = document.createElement('article');
    article.innerHTML =
    `
    <img class="proyecto-imagen" src="${proyecto.img}" alt="${proyecto.title}">
      <div>
        <p>${proyecto.title}</p>
        <a href="${proyecto.github}" target="_blank"><img class="logos" src="img/github.png" alt="Logo GitHub"></a>
        <a href="${proyecto.live}" target="_blank"><img class="logos" src="img/web.webp" alt="Logo web"></a>
    </div>
    `;

    proyectosContainer.appendChild(article);
  })

  // verMasBtn.computedStyleMap.display = 'none';
})



/* Clear Mode pagina */

const toggleThemeBtn = document.getElementById('toggle-theme');

toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('clear-mode');
  
  // Cambia el `src` de la imagen
  if (document.body.classList.contains('clear-mode')) {
    toggleThemeBtn.src = 'img/night-mode.png'; // Cambia al modo claro
  } else {
    toggleThemeBtn.src = 'img/darkmode.png'; // Cambia al modo oscuro
  }
});




// 4. Animaciones con Intersection Observer
// Puedes animar las secciones cuando entren en el viewport.

// CSS:

// css
// Copiar
// Editar
// section {
//   opacity: 0;
//   transform: translateY(20px);
//   transition: all 0.5s ease-in-out;
// }

// section.visible {
//   opacity: 1;
//   transform: translateY(0);
// }
// Código JS:

// javascript
// Copiar
// Editar
// const sections = document.querySelectorAll('section');

// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('visible');
//     }
//   });
// });

// sections.forEach(section => observer.observe(section));
// 5. Formulario de Contacto con Validación
// Si decides agregar un formulario en la sección de contacto, puedes validar los campos con JavaScript antes de enviarlos.

// HTML:

// html
// Copiar
// Editar
// <form id="contact-form">
//   <input type="text" id="name" placeholder="Tu nombre" required>
//   <input type="email" id="email" placeholder="Tu correo" required>
//   <textarea id="message" placeholder="Tu mensaje" required></textarea>
//   <button type="submit">Enviar</button>
// </form>
// Código JS:

// javascript
// Copiar
// Editar
// document.getElementById('contact-form').addEventListener('submit', (e) => {
//   e.preventDefault();

//   const name = document.getElementById('name').value.trim();
//   const email = document.getElementById('email').value.trim();
//   const message = document.getElementById('message').value.trim();

//   if (!name || !email || !message) {
//     alert('Por favor, rellena todos los campos.');
//     return;
//   }

//   alert('Formulario enviado con éxito.');
// });
// 6. Tooltip para Iconos de Redes Sociales
// Muestra un pequeño texto al pasar el mouse sobre los iconos de redes sociales.

// CSS:

// css
// Copiar
// Editar
// .tooltip {
//   position: relative;
// }

// .tooltip:hover::after {
//   content: attr(data-tooltip);
//   position: absolute;
//   top: -25px;
//   left: 50%;
//   transform: translateX(-50%);
//   background-color: #333;
//   color: #fff;
//   padding: 5px;
//   border-radius: 5px;
//   font-size: 12px;
//   white-space: nowrap;
// }
// HTML:

// html
// Copiar
// Editar
// <a href="https://www.linkedin.com/in/xavi-serrano/" class="tooltip" data-tooltip="LinkedIn">
//   <img src="img/linkedin.png" alt="LinkedIn">
// </a>