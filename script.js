
document.addEventListener("DOMContentLoaded", () => {
  fetch("albums.json")
    .then(response => response.json())
    .then(albums => {
      const categories = {
        "videogames": document.querySelector(".album-videogames .album-list"),
        "audiovisual": document.querySelector(".album-cinema .album-list"),
        "gamejams": document.querySelector(".album-gamejams .album-list")
      };

      albums.forEach(album => {
        if (categories[album.category]) {
          const albumElement = document.createElement("li");
          album.title = album.title.replace(/'/g, "\\'"); // Escapar las comillas simples y que no de problemas en el onclick
          albumElement.innerHTML = `
            <a href="#" onclick="loadMedia(event, '${album.id}', '${album.type}', '${album.title}', '${album.description}')">
              <img src="${album.image}" alt="${album.title}" />
            </a>
          `;
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
  albumDescription.textContent = description;

  // Cargar el contenido en el iframe según el tipo
  if (type === "bandcamp") {
      iframe.src = `https://bandcamp.com/EmbeddedPlayer/album=${id}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/`;
      playerContainer.style.width = "30%"; // Ajusta el ancho para Bandcamp
  } else if (type === "youtube") {
      iframe.src = `https://www.youtube.com/embed/${id}`;
      playerContainer.style.width = "50%"; // Ajusta el ancho para YouTube
  } else if (type === "spotify") {
      iframe.src = `https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0`;
      playerContainer.style.width = "30%"; // Ajusta el ancho para Spotify
  }

  // Ocultar el spinner y mostrar el reproductor cuando el contenido esté listo
  iframe.onload = () => {
      spinner.style.display = "none";
      iframe.style.display = "block";
      playerContainer.style.display = "block";
  };
}


document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".imagerow img");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
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

  nextBtn.addEventListener("click", function () {
      let newIndex = (currentIndex + 1) % images.length;
      updateImage(newIndex);
  });

  prevBtn.addEventListener("click", function () {
      let newIndex = (currentIndex - 1 + images.length) % images.length;
      updateImage(newIndex);
  });

  // Inicializar la vista con la primera imagen visible
  images.forEach((img, index) => {
      img.style.display = index === 0 ? "block" : "none";
      img.style.opacity = index === 0 ? "1" : "0";
  });
});
