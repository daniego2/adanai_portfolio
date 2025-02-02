
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
            <a href="#" onclick="loadMedia('${album.id}', '${album.type}', '${album.title}', '${album.description}')">
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
function loadMedia(id, type, title, description) {
  const iframe = document.getElementById("player");
  const descriptionContainer = document.getElementById("description-container");
  const albumTitle = document.getElementById("album-title");
  const albumDescription = document.getElementById("album-description");



  iframe.style.display = "block";
  descriptionContainer.style.display = "block"; // Make the container visible
  albumTitle.textContent = title;
  albumDescription.textContent = description;



  if (type === "bandcamp") {
    iframe.src = `https://bandcamp.com/EmbeddedPlayer/album=${id}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/`;
    iframe.style.width = "25%";
  } else if (type === "youtube") {
    iframe.src = `https://www.youtube.com/embed/${id}`;
    iframe.style.width = "50%";
  } else if (type === "spotify") {
    iframe.src = `https://open.spotify.com/embed/album/${id}?utm_source=generator&theme=0`;
    iframe.style.width = "25%";
  }
}