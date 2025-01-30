const enlace = document.querySelector('a');
const errorMessage = document.querySelector('.error-message');

enlace.addEventListener("click", async function(event) {
  event.preventDefault();

  const url = event.target.href;

  try {
    const response = await fetch(url, { method: "HEAD" });
    
    if(response.ok) {
      window.location.href = url;
    } else {
      throw new Error("Página no encontrada");
    }
  } catch (error) {
    errorMessage.style.display = 'block';
    enlace.style.display = 'none';
  }
});