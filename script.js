// Función para cambiar el álbum en el reproductor
function loadAlbum(albumId, imageUrl) {
    const iframe = document.getElementById('bandcamp-player');
    
    // Cambiar la URL del iframe con el nuevo álbum
    iframe.src = `https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/`;
    
    // Cambiar la imagen de la portada del álbum
    const albumImage = document.querySelector('.album-image');
    albumImage.src = imageUrl;
  }
  