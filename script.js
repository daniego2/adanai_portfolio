// Función para mostrar el reproductor
function showPlayer() {
  const player = document.querySelector('.player');
  player.style.display = 'block';
}

// Función para cargar un álbum de Bandcamp
function loadBandcampAlbum(albumId) {
  const iframe = document.getElementById('player');
  iframe.src = `https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/`;
  iframe.style.width = '25%';  // Hardcodeado el tamaño del reproductor
  showPlayer();
}

// Función para cargar un video de YouTube
function loadYouTubeVideo(videoId) {
  const iframe = document.getElementById('player');
  iframe.style.width = '50%'; // Hardcodeado el tamaño del reproductor
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  showPlayer();
}