// Rádio Pulso FM - Controle de Áudio e Player Principal
// Configurações centralizadas no topo do arquivo
const STREAM_URL = "https://radio.saopaulo01.com.br/8222/stream"; // URL do Stream de Rádio Oficial do Cliente
const RADIO_NAME = "Rádio Pulso FM";

// Elementos do DOM
let audioPlayer;
let btnPlayPause;
let btnPlayPauseHero;
let btnMute;
let volumeSlider;
let equalizerBars;
let badgeNoAr;
let txtMusicaAtual;
let txtArtistaAtual;
let indicatorAoVivo;
let playerVinyl;

// Novos Elementos do Rodapé Sticky
let stickyPlayerBar;
let btnStickyPlayPause;
let btnStickyMute;
let stickyVolumeSlider;
let txtStickyMusica;
let txtStickyArtista;
let stickyVinylDisc;

// Array de músicas simuladas para simular metadados dinâmicos (RDS)
const MOCK_PLAYLIST = [
  { musica: "Training Season", artista: "Dua Lipa" },
  { musica: "Meti o Pé", artista: "Gusttavo Lima" },
  { musica: "Viva La Vida", artista: "Coldplay" },
  { musica: "Hear Me Now", artista: "Alok feat. Bruno Martini" },
  { musica: "Haverá Sinais", artista: "Jorge & Mateus & Lauana Prado" },
  { musica: "Flowers", artista: "Miley Cyrus" },
  { musica: "Erro Gostoso", artista: "Simone Mendes" },
  { musica: "Blinding Lights", artista: "The Weeknd" }
];

let playlistIndex = 0;
let metadataInterval;
let retryCount = 0;
const MAX_RETRIES = 3;
let isReconnecting = false;

// Inicialização do Player
document.addEventListener("DOMContentLoaded", () => {
  initPlayer();
});

function initPlayer() {
  // Criar elemento de áudio dinamicamente se necessário, ou pegar do HTML
  audioPlayer = document.getElementById("audio-player");
  if (!audioPlayer) {
    audioPlayer = document.createElement("audio");
    audioPlayer.id = "audio-player";
    document.body.appendChild(audioPlayer);
  }

  // Configurar a URL de stream
  audioPlayer.src = STREAM_URL;

  // Pegar referências aos elementos do DOM do Player Principal
  btnPlayPause = document.getElementById("btn-play-pause");
  btnPlayPauseHero = document.getElementById("btn-play-hero");
  btnMute = document.getElementById("btn-mute");
  volumeSlider = document.getElementById("volume-slider");
  equalizerBars = document.querySelectorAll(".equalizer-bar");
  badgeNoAr = document.getElementById("badge-no-ar");
  txtMusicaAtual = document.getElementById("musica-atual");
  txtArtistaAtual = document.getElementById("artista-atual");
  indicatorAoVivo = document.getElementById("indicator-ao-vivo");
  playerVinyl = document.querySelector(".player-vinyl");

  // Pegar referências aos elementos do Rodapé Sticky
  stickyPlayerBar = document.getElementById("sticky-player");
  btnStickyPlayPause = document.getElementById("btn-sticky-play-pause");
  btnStickyMute = document.getElementById("btn-sticky-mute");
  stickyVolumeSlider = document.getElementById("sticky-volume-slider");
  txtStickyMusica = document.getElementById("sticky-musica");
  txtStickyArtista = document.getElementById("sticky-artista");
  stickyVinylDisc = document.querySelector(".sticky-vinyl-disc");

  // Event Listeners Principal
  if (btnPlayPause) btnPlayPause.addEventListener("click", togglePlay);
  if (btnPlayPauseHero) btnPlayPauseHero.addEventListener("click", togglePlay);
  if (btnMute) btnMute.addEventListener("click", toggleMute);
  if (volumeSlider) {
    volumeSlider.addEventListener("input", handleVolumeChange);
    audioPlayer.volume = volumeSlider.value;
  }

  // Event Listeners do Rodapé Sticky
  if (btnStickyPlayPause) btnStickyPlayPause.addEventListener("click", togglePlay);
  if (btnStickyMute) btnStickyMute.addEventListener("click", toggleStickyMute);
  if (stickyVolumeSlider) {
    stickyVolumeSlider.addEventListener("input", handleStickyVolumeChange);
    stickyVolumeSlider.value = audioPlayer.volume;
  }

  // Listener para erros de áudio (reconectar stream de forma robusta)
  audioPlayer.addEventListener("error", (e) => {
    console.error("Erro detectado no player de áudio:", audioPlayer.error);
    
    // Parar animações visuais imediatamente para refletir o erro
    setPlayingState(false);
    
    if (isReconnecting) return; // Evita empilhar reconexões simultâneas

    if (retryCount < MAX_RETRIES) {
      retryCount++;
      isReconnecting = true;
      console.warn(`[Player] Conexão perdida. Tentando reconectar (${retryCount}/${MAX_RETRIES}) em 3 segundos...`);
      
      setTimeout(() => {
        isReconnecting = false;
        audioPlayer.src = STREAM_URL;
        audioPlayer.load();
        audioPlayer.play()
          .then(() => {
            console.log("[Player] Reconectado com sucesso!");
            retryCount = 0; // Reseta as tentativas ao conectar
          })
          .catch(err => console.log("[Player] Nova tentativa falhou. Aguardando próximo ciclo."));
      }, 3000);
    } else {
      console.error("[Player] Limite de tentativas atingido. Transmissão offline.");
      alert("A transmissão está temporariamente indisponível no seu navegador ou sua conexão foi interrompida. Por favor, tente novamente clicando em Play.");
      retryCount = 0; // Reseta para permitir que o usuário tente novamente manualmente
    }
  });

  // Inicializar primeira música nos metadados
  updateMetadata();
  // Rotacionar metadados a cada 20 segundos
  startMetadataSimulation();
}

function togglePlay() {
  if (audioPlayer.paused) {
    audioPlayer.play()
      .then(() => {
        setPlayingState(true);
      })
      .catch(err => {
        console.error("Erro ao reproduzir áudio: ", err);
        alert("Não foi possível carregar a transmissão no momento. Verifique sua conexão.");
      });
  } else {
    audioPlayer.pause();
    setPlayingState(false);
  }
}

// Atualizar o estado visual do player
function setPlayingState(isPlaying) {
  const playIcons = document.querySelectorAll(".play-icon-svg");
  const pauseIcons = document.querySelectorAll(".pause-icon-svg");
  
  if (isPlaying) {
    // Mostrar ícone de pause, esconder de play
    playIcons.forEach(icon => icon.style.display = "none");
    pauseIcons.forEach(icon => icon.style.display = "block");
    
    // Iniciar animação do Equalizer
    equalizerBars.forEach(bar => bar.classList.add("animating"));
    
    // Badge "NO AR" pulsante ativo
    if (badgeNoAr) badgeNoAr.classList.add("active");
    if (indicatorAoVivo) indicatorAoVivo.classList.add("active");
    if (playerVinyl) playerVinyl.classList.add("playing");
    if (stickyPlayerBar) stickyPlayerBar.classList.add("playing");
  } else {
    // Mostrar ícone de play, esconder de pause
    playIcons.forEach(icon => icon.style.display = "block");
    pauseIcons.forEach(icon => icon.style.display = "none");
    
    // Parar animação do Equalizer
    equalizerBars.forEach(bar => bar.classList.remove("animating"));
    
    // Desativar badge "NO AR" pulsante
    if (badgeNoAr) badgeNoAr.classList.remove("active");
    if (indicatorAoVivo) indicatorAoVivo.classList.remove("active");
    if (playerVinyl) playerVinyl.classList.remove("playing");
    if (stickyPlayerBar) stickyPlayerBar.classList.remove("playing");
  }
}

// Alternar Mudo (Mute) pelo Botão Principal
function toggleMute() {
  const isMuted = !audioPlayer.muted;
  audioPlayer.muted = isMuted;
  updateMuteState(isMuted);
}

// Alternar Mudo pelo Botão do Rodapé
function toggleStickyMute() {
  const isMuted = !audioPlayer.muted;
  audioPlayer.muted = isMuted;
  updateMuteState(isMuted);
}

// Centralizar atualização visual de Mute/Mudo
function updateMuteState(isMuted) {
  if (isMuted) {
    if (btnMute) btnMute.classList.add("muted");
    if (btnStickyMute) btnStickyMute.classList.add("muted");
    updateMuteIcon(true);
    if (volumeSlider) volumeSlider.value = 0;
    if (stickyVolumeSlider) stickyVolumeSlider.value = 0;
  } else {
    if (btnMute) btnMute.classList.remove("muted");
    if (btnStickyMute) btnStickyMute.classList.remove("muted");
    updateMuteIcon(false);
    if (volumeSlider) volumeSlider.value = audioPlayer.volume || 0.8;
    if (stickyVolumeSlider) stickyVolumeSlider.value = audioPlayer.volume || 0.8;
  }
}

// Atualizar ícones de volume/mudo nos dois players
function updateMuteIcon(isMuted) {
  const volumeHighIcon = document.getElementById("volume-high-svg");
  const volumeMutedIcon = document.getElementById("volume-muted-svg");
  const stickyHighIcon = document.getElementById("sticky-volume-high-svg");
  const stickyMutedIcon = document.getElementById("sticky-volume-muted-svg");
  
  if (isMuted) {
    if (volumeHighIcon) volumeHighIcon.style.display = "none";
    if (volumeMutedIcon) volumeMutedIcon.style.display = "block";
    if (stickyHighIcon) stickyHighIcon.style.display = "none";
    if (stickyMutedIcon) stickyMutedIcon.style.display = "block";
  } else {
    if (volumeHighIcon) volumeHighIcon.style.display = "block";
    if (volumeMutedIcon) volumeMutedIcon.style.display = "none";
    if (stickyHighIcon) stickyHighIcon.style.display = "block";
    if (stickyMutedIcon) stickyMutedIcon.style.display = "none";
  }
}

// Controlar Volume pelo Slider Principal
function handleVolumeChange(e) {
  const value = e.target.value;
  audioPlayer.volume = value;
  if (stickyVolumeSlider) stickyVolumeSlider.value = value;
  updateMuteState(value == 0);
}

// Controlar Volume pelo Slider do Rodapé
function handleStickyVolumeChange(e) {
  const value = e.target.value;
  audioPlayer.volume = value;
  if (volumeSlider) volumeSlider.value = value;
  updateMuteState(value == 0);
}

// Simular atualização de metadados RDS nos dois players
function updateMetadata() {
  if (!txtMusicaAtual || !txtArtistaAtual) return;
  
  const currentSong = MOCK_PLAYLIST[playlistIndex];
  
  txtMusicaAtual.style.opacity = 0;
  txtArtistaAtual.style.opacity = 0;
  if (txtStickyMusica) txtStickyMusica.style.opacity = 0;
  if (txtStickyArtista) txtStickyArtista.style.opacity = 0;
  
  setTimeout(() => {
    txtMusicaAtual.textContent = currentSong.musica;
    txtArtistaAtual.textContent = currentSong.artista;
    if (txtStickyMusica) txtStickyMusica.textContent = currentSong.musica;
    if (txtStickyArtista) txtStickyArtista.textContent = currentSong.artista;
    
    txtMusicaAtual.style.opacity = 1;
    txtArtistaAtual.style.opacity = 1;
    if (txtStickyMusica) txtStickyMusica.style.opacity = 1;
    if (txtStickyArtista) txtStickyArtista.style.opacity = 1;
  }, 300);

  playlistIndex = (playlistIndex + 1) % MOCK_PLAYLIST.length;
}

function startMetadataSimulation() {
  if (metadataInterval) clearInterval(metadataInterval);
  metadataInterval = setInterval(updateMetadata, 18000); // Muda a música a cada 18 segundos
}
