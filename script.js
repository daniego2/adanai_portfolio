// Función para mostrar el reproductor
function showPlayer() {
  const player = document.querySelector('.music-player');
  player.style.display = 'block';
}

// Función para cargar un álbum de Bandcamp
function loadBandcampAlbum(albumId) {
  const iframe = document.getElementById('bandcamp-player');
  iframe.src = `https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/`;
  showPlayer();
}

// Función para cargar un video de YouTube
function loadYouTubeVideo(videoId) {
  const iframe = document.getElementById('bandcamp-player');
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  showPlayer();
}