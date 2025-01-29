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
    title: 'New Project 3',
    img: './img/placeholder-image.jpg',
    github: 'https://github.com/user/project3',
    live: 'https://user.github.io/project3/',
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
    toggleThemeBtn.src = 'img/lightmode.png'; // Cambia al modo claro
  } else {
    toggleThemeBtn.src = 'img/darkmode.png'; // Cambia al modo oscuro
  }
});




/*Animación con intersection observer */

const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

sections.forEach(section => observer.observe(section));



// Formulario de Contacto con Validación //


document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Por favor, rellena todos los campos.');
    return;
  }

  alert('Formulario enviado con éxito.');
});


