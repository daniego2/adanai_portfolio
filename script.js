
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
      playerContainer.style.width = "25%"; // Ajusta el ancho para Bandcamp
  } else if (type === "youtube") {
      iframe.src = `https://www.youtube.com/embed/${id}`;
      playerContainer.style.width = "50%"; // Ajusta el ancho para YouTube
  } else if (type === "spotify") {
      iframe.src = `https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0`;
      playerContainer.style.width = "25%"; // Ajusta el ancho para Spotify
  }

  // Ocultar el spinner y mostrar el reproductor cuando el contenido esté listo
  iframe.onload = () => {
      spinner.style.display = "none";
      iframe.style.display = "block";
      playerContainer.style.display = "block";
  };
}