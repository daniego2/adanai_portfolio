document.addEventListener("DOMContentLoaded", () => {
  fetch("albums.json")
    .then(response => response.json())
    .then(albums => {
      const categories = {
        "videogames": document.querySelector(".album-videogames .album-list"),
        "audiovisual": document.querySelector(".album-audiovisual .album-list"),
        "collabs": document.querySelector(".album-collabs .album-list")
      };

      albums.forEach(album => {
        if (categories[album.category]) {
          const albumElement = document.createElement("li");
          // Crear copias escapadas del título y la descripción
          const escapedTitle = album.title.replace(/'/g, "\\'");
          const escapedDescription = album.description.replace(/'/g, "\\'");
          
          // Crear el elemento usando createElement y addEventListener en lugar de innerHTML con onclick
          const link = document.createElement("a");
          link.href = "#";
          link.addEventListener("click", function(e) {
            e.preventDefault();
            loadMedia(e, album.id, album.type, album.title, album.description);
          });
          
          const img = document.createElement("img");
          img.src = album.image;
          img.alt = album.title;
          
          link.appendChild(img);
          albumElement.appendChild(link);
          categories[album.category].appendChild(albumElement);
        }
      });
    })
    .catch(error => console.error("Error cargando los álbumes:", error));
});

// Función genérica para cargar álbumes o videos en el reproductor
function loadMedia(event, id, type, title, description) {
  event.preventDefault(); // Prevent the default anchor behavior

  const iframe = document.getElementById("player");
  const playerContainer = document.getElementById("player-container");
  const spinner = document.getElementById("spinner");
  const descriptionContainer = document.getElementById("description-container");
  const albumTitle = document.getElementById("album-title");
  const albumDescription = document.getElementById("album-description");

  // Mostrar el spinner y ocultar el reproductor
  spinner.style.display = "block";


  // Mostrar la descripción del álbum
  descriptionContainer.style.display = "block";
  albumTitle.textContent = title;
  albumDescription.innerHTML = description;
  // Cargar el contenido en el iframe según el tipo
    if (type === "bandcamp") {
        iframe.src = `https://bandcamp.com/EmbeddedPlayer/album=${id}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/`;
    } else if (type === "youtube") {
        iframe.src = `https://www.youtube.com/embed/${id}`;
    } else if (type === "spotify") {
        iframe.src = `https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0`;
    }

  iframe.onload = () => {
      spinner.style.display = "none";
      iframe.style.display = "block";
      playerContainer.style.display = "block";
  };

}


document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".imagerow img");
  let currentIndex = 0;
  let isTransitioning = false; // Previene clicks rápidos

  function updateImage(newIndex) {
      if (isTransitioning || newIndex === currentIndex) return;
      isTransitioning = true;

      const currentImage = images[currentIndex];
      const nextImage = images[newIndex];

      // Animación de salida
      currentImage.style.opacity = "0";

      setTimeout(() => {
          currentImage.style.display = "none"; // Oculta la imagen actual
          nextImage.style.display = "block"; // Muestra la nueva imagen
          nextImage.style.opacity = "0"; // Asegura que empiece invisible

          requestAnimationFrame(() => {
              setTimeout(() => {
                  nextImage.style.opacity = "1"; // Desvanece la nueva imagen
                  currentIndex = newIndex; // Actualiza el índice
                  isTransitioning = false; // Libera el bloqueo
              }, 50); // Pequeño delay para transición suave
          });
      }, 300); // Tiempo de la animación de salida
  }



  // Inicializar la vista con la primera imagen visible
  images.forEach((img, index) => {
      img.style.display = index === 0 ? "block" : "none";
      img.style.opacity = index === 0 ? "1" : "0";
  });
});


const urlParams = new URLSearchParams(window.location.search);
const status = urlParams.get('status');
const messageElement = document.getElementById('message');
const messageText = document.getElementById('message-text');

if (status) {
    if (status === 'success') {
        messageElement.style.backgroundColor = '#4CAF50'; // Verde
        messageText.textContent = 'Email sent successfully!';
    } else if (status === 'error') {
        messageElement.style.backgroundColor = '#f44336'; // Rojo
        const errorMessage = urlParams.get('message');
        messageText.textContent = `Error: Unable to send email: ${errorMessage}`;
    }

    messageElement.style.display = 'block'; // Mostrar el mensaje
    setTimeout(function() {
      messageElement.style.display = 'none';
  }, 5000);
}