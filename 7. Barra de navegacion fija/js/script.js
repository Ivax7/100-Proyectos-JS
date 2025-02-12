/* DYNAMIC HTML CREATION */
import {generateSagas} from './html-js/aside.js';

document.addEventListener("DOMContentLoaded", () => {
  generateSagas();
});


/* FUNCIONABILITY */

/* Horizontal scroll and random disposition */
import { horizontalScroll, loadBooks } from "./parts/horizontalScroll.js";
document.addEventListener("DOMContentLoaded", () => {
  loadBooks();
  horizontalScroll();
});

/* Interactive map with interactive circles in each book */
import { timeline } from "./parts/timeline.js";
timeline();


/* View all the books from Brandon Sanderson */
import { allBooks } from "./parts/allBooks.js";
document.addEventListener('DOMContentLoaded', () => {
  allBooks();  // Asegura que se ejecute después de que el DOM esté completamente cargado
});




/* Click any saga/book to view the details */
import { searchSaga, searchBook } from "./parts/sagasBooks.js";

document.addEventListener('DOMContentLoaded', () => {
  searchBook();
  searchSaga();
});


/* Click on circles to open personalized Modals */

import { circlesModals } from "./parts/circlesModals.js";
circlesModals();