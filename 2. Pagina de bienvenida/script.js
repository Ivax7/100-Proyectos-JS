// Selección de elementos
const cuaderno = document.querySelector('.cuaderno');
const modal = document.getElementById('cuadernoModal');
const closeModal = document.querySelector('.modal-content .close');

// Abrir el modal al hacer clic en el cuaderno
cuaderno.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Cerrar el modal al hacer clic en la "X"
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});


// Data DarkSouls YT channels
const darkSoulsChannels = [
  {
    title: 'PowerbazingaYT',
    img: './img/elements/antiguos-cazadores/powerbazinga.jpg',
    youtube: 'https://www.youtube.com/@powerbazinga',
    suscriptores: '150,000',
  },
  {
    title: 'VaatiVidya',
    img: './img/elements/antiguos-cazadores/vaatividya.jpg',
    youtube: 'https://www.youtube.com/user/VaatiVidya',
    suscriptores: '2,300,000',
  },
  {
    title: 'Cole Train',
    img: './img/elements/antiguos-cazadores/coletrain.jpg',
    youtube: 'https://www.youtube.com/channel/UC28M9Z0nADjnJrRc4zza1SA',
    suscriptores: '85,000',
  },
  {
    title: 'ArielxD',
    img: './img/elements/antiguos-cazadores/arielxd.jpg',
    youtube: 'https://www.youtube.com/channel/UCFxXts-1dwEXDAdpU62mPsQ',
    suscriptores: '45,000',
  },
  {
    title: 'Knekro',
    img: './img/elements/antiguos-cazadores/knekro.jpg',
    youtube: 'https://www.youtube.com/watch?v=3KeZfkDDUrQ',
    suscriptores: '700,000',
  },
  {
    title: 'Acre',
    img: './img/elements/antiguos-cazadores/acre.jpg',
    youtube: 'https://www.youtube.com/@AcreVersion',
    suscriptores: '120,000',
  },
  {
    title: 'The Happy Hob',
    img: './img/elements/antiguos-cazadores/happyhob.jpg',
    youtube: 'https://www.youtube.com/@TheHappyHob',
    suscriptores: '530,000',
  },
];




const ytChannels = document.querySelector('.ytchannels')

darkSoulsChannels.forEach(channel => {
  const listElement = document.createElement('li');
  listElement.innerHTML =
  `
  <a href="${channel.youtube}"><img src="${channel.img}" alt="${channel.title}"></a>
  <p>${channel.title}</p>
  <p>${channel.suscriptores} subs</p>
  `;
  ytChannels.appendChild(listElement);
})



// Top 7 Bosses

const bloodborneBosses = [
  {
    name: 'Orphan of Kos',
    img: './img/elements/bosses/kos.jpg',
    top: '1', 
    guide: 'https://www.eliteguias.com/guias/b/bb/bloodborne_boss-dlc-p10.php',
  },
  {
    name: 'Ludwig, The Accursed/The Holy Blade',
    img: './img/elements/bosses/ludwig.webp',
    top: '2', 
    guide: 'https://www.eliteguias.com/guias/b/bb/bloodborne_boss-dlc-p2.php',
  },
  {
    name: 'Laurence, The First Vicar',
    img: './img/elements/bosses/laurence.jpg',
    top: '3', 
    guide: 'https://www.eliteguias.com/guias/b/bb/bloodborne_boss-dlc-p8.php',
  },
  {
    name: 'Ebrietas, Daughter of the Cosmos',
    img: './img/elements/bosses/ebrietas.jpg',
    top: '4', 
    guide: 'https://www.eliteguias.com/guias/b/bb/bloodborne_boss-p12.php',
  },
  {
    name: 'Martyr Logarius',
    img: './img/elements/bosses/logarius.webp',
    top: '5', 
    guide: 'https://www.eliteguias.com/guias/b/bb/bloodborne_boss-p10.php',
  },
  {
    name: 'Lady Maria of the Astral Clocktower',
    img: './img/elements/bosses/lady-maria.webp',
    top: '6', 
    guide: 'https://www.eliteguias.com/guias/b/bb/bloodborne_boss-dlc-p6.php',
  },
  {
    name: 'Gehrman, The First Hunter',
    img: './img/elements/bosses/gehrman.webp',
    top: '7', 
    guide: 'https://www.eliteguias.com/guias/b/bb/bloodborne_boss-p17.php',
  },
];


const bloodborne_bosses = document.querySelector('.bloodborne-bosses')

bloodborneBosses.forEach(boss => {
  const listElement = document.createElement('li');
  listElement.innerHTML =
  `
  <a href="${boss.guide}"><img src="${boss.img}" alt="${boss.name}"></a>
  <p>${boss.name}</p>
  <p>Top ${boss.top}</p>
  `;

  bloodborne_bosses.appendChild(listElement);
})