// Rádio Pulso FM - Script Geral e Lógica do PWA

// Evento de inicialização do DOM
document.addEventListener("DOMContentLoaded", () => {
  initDinamico();
  initGeral();
  initMenuMobile();
  initScrollSuave();
  initAnimacoesScroll();
  initHeroSlider();
  initGuestbook();
  initClimaWidget();
  initPublicidade();
});

// 1. Inicializações Gerais
function initGeral() {
  // Configurar ano dinâmico no Copyright do Footer
  const spanAno = document.getElementById("ano-copyright");
  if (spanAno) {
    spanAno.textContent = new Date().getFullYear();
  }
}

// 1c. Publicidade — Atualiza os banners com os dados salvos no localStorage
function initPublicidade() {
  // Banner Lateral (Sidebar Left)
  const adSidebarLink = document.getElementById("portal-ad-sidebar-link");
  const adSidebarTitle = document.getElementById("portal-ad-sidebar-title");
  const adSidebarDesc = document.getElementById("portal-ad-sidebar-desc");
  const adSidebarBtn = document.getElementById("portal-ad-sidebar-btn");
  const adSidebarBg = document.getElementById("portal-ad-sidebar-bg");

  const savedSidebar = localStorage.getItem("PULSO_AD_SIDEBAR");
  if (savedSidebar) {
    try {
      const data = JSON.parse(savedSidebar);
      if (adSidebarTitle && data.titulo) adSidebarTitle.textContent = data.titulo;
      if (adSidebarDesc && data.descricao) adSidebarDesc.textContent = data.descricao;
      if (adSidebarBtn && data.botao) adSidebarBtn.textContent = data.botao;
      if (adSidebarLink && data.link) adSidebarLink.href = data.link;
      
      if (adSidebarBg) {
        if (data.imagem && data.imagem.trim() !== "") {
          adSidebarBg.style.background = `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${data.imagem}) no-repeat center/cover`;
        } else {
          adSidebarBg.style.background = "";
        }
      }
    } catch (e) {
      console.error("Erro ao carregar dados do banner lateral:", e);
    }
  }

  // Banner Central Horizontal (Bottom Center)
  const adBottomLink = document.getElementById("portal-ad-bottom-link");
  const adBottomTagline = document.getElementById("portal-ad-bottom-tagline");
  const adBottomTitle = document.getElementById("portal-ad-bottom-title");
  const adBottomDesc = document.getElementById("portal-ad-bottom-desc");
  const adBottomBtn = document.getElementById("portal-ad-bottom-btn");
  const adBottomBg = document.getElementById("portal-ad-bottom-bg");

  const savedBottom = localStorage.getItem("PULSO_AD_BOTTOM");
  if (savedBottom) {
    try {
      const data = JSON.parse(savedBottom);
      if (adBottomTagline && data.tagline) adBottomTagline.textContent = data.tagline;
      if (adBottomTitle && data.titulo) adBottomTitle.textContent = data.titulo;
      if (adBottomDesc && data.descricao) adBottomDesc.textContent = data.descricao;
      if (adBottomBtn && data.botao) adBottomBtn.textContent = data.botao;
      if (adBottomLink && data.link) adBottomLink.href = data.link;
      
      if (adBottomBg) {
        if (data.imagem && data.imagem.trim() !== "") {
          adBottomBg.style.background = `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${data.imagem}) no-repeat center/cover`;
        } else {
          adBottomBg.style.background = "";
        }
      }
    } catch (e) {
      console.error("Erro ao carregar dados do banner inferior:", e);
    }
  }
}

// 2. Menu Hambúrguer Responsivo
function initMenuMobile() {
  const menuBtn = document.getElementById("menu-hamburger");
  const navLinks = document.getElementById("nav-links");
  const links = document.querySelectorAll(".nav-link");

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    const expandido = menuBtn.getAttribute("aria-expanded") === "true" || false;
    menuBtn.setAttribute("aria-expanded", !expandido);
    menuBtn.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.classList.toggle("menu-open"); // Impede scroll de fundo quando menu ativo
  });

  // Fechar menu ao clicar em algum link
  links.forEach(link => {
    link.addEventListener("click", () => {
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
}

// 3. Scroll Suave e Ativação de Links Ativos (Scroll Spy)
function initScrollSuave() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80; // Altura do header fixo
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

// 4. Animações ao Scroll utilizando IntersectionObserver (Aparência Premium)
function initAnimacoesScroll() {
  const elementos = document.querySelectorAll(".reveal");
  
  if (elementos.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Executa a animação apenas uma vez
      }
    });
  }, observerOptions);

  elementos.forEach(el => {
    observer.observe(el);
  });
}

// 5. Lógica de PWA removida temporariamente.

// 6. Lógica do Carrossel Hero (Slider)
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slider-section .slide");
  const dots = document.querySelectorAll(".hero-slider-section .dot");
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 5000; // Troca de slide a cada 5 segundos

  function showSlide(index) {
    // Resetar slides ativos
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    
    // Configurar novo slide ativo
    slides[index].classList.add("active");
    if (dots[index]) dots[index].classList.add("active");
    
    currentSlide = index;
  }

  function nextSlide() {
    let index = (currentSlide + 1) % slides.length;
    showSlide(index);
  }

  function prevSlide() {
    let index = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(index);
  }

  // Inicializar auto play
  function startSlideShow() {
    stopSlideShow();
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  function stopSlideShow() {
    if (slideInterval) clearInterval(slideInterval);
  }

  // Event Listeners das setas
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startSlideShow(); // Reiniciar cronômetro
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startSlideShow(); // Reiniciar cronômetro
    });
  }

  // Event Listeners das bolinhas (dots)
  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const index = parseInt(e.target.getAttribute("data-index"));
      showSlide(index);
      startSlideShow(); // Reiniciar cronômetro
    });
  });

  // Pausar auto play quando o mouse estiver sobre o slider
  const sliderContainer = document.querySelector(".hero-slider-section");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", stopSlideShow);
    sliderContainer.addEventListener("mouseleave", startSlideShow);
  }

  // Iniciar
  startSlideShow();
}

// 7. Integração de Conteúdo Dinâmico Administrável (CRUD LocalStorage)
function initDinamico() {
  const DEFAULT_PROGRAMACAO = [
    { id: 1, titulo: "Despertar Pulso", horario: "06:00 - 09:00", locutor: "Juliana Vasconcellos", ordem: 1 },
    { id: 2, titulo: "Manhã de Sucessos", horario: "09:00 - 12:00", locutor: "Carlos Alberto", ordem: 2 },
    { id: 3, titulo: "Pulso Informa", horario: "12:00 - 14:00", locutor: "Marcos Lima (Notícias)", ordem: 3 },
    { id: 4, titulo: "Conexão Cidade", horario: "14:00 - 18:00", locutor: "Rodrigo Silveira", ordem: 4 },
    { id: 5, titulo: "Esporte na Veia", horario: "18:00 - 20:00", locutor: "Fernando Costa", ordem: 5 },
    { id: 6, titulo: "Pista Mix", horario: "20:00 - 22:00", locutor: "DJ Alok (Mixagens)", ordem: 6 }
  ];

  const DEFAULT_LOCUTORES = [
    {
      id: 1,
      nome: "Juliana Vasconcellos",
      cargo: "Locutora e Jornalista",
      bio: "Comanda as manhãs trazendo informação e muita simpatia para começar o dia no ritmo certo.",
      foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
      ordem: 1,
      instagram: "https://instagram.com",
      whatsapp: "https://wa.me/5527999879870"
    },
    {
      id: 2,
      nome: "Rodrigo Silveira",
      cargo: "Locutor de Entretenimento",
      bio: "Líder de audiência nas tardes capixabas, anima o trânsito com humor, curiosidades e pop de qualidade.",
      foto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=400",
      ordem: 2,
      instagram: "https://instagram.com",
      whatsapp: "https://wa.me/5527999879870"
    },
    {
      id: 3,
      nome: "Fernando Costa",
      cargo: "Locutor de Esportes",
      bio: "Especialista no futebol e esportes locais, traz as notícias mais quentes de forma rápida e divertida.",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
      ordem: 3,
      instagram: "https://instagram.com",
      whatsapp: "https://wa.me/5527999879870"
    }
  ];

  const DEFAULT_PATROCINADORES = [
    { id: 1, nome: "Supermercado Silva", logo: "", link: "https://wa.me/5527999879870", ordem: 1 },
    { id: 2, nome: "Farmácia Saúde", logo: "", link: "https://wa.me/5527999879870", ordem: 2 },
    { id: 3, nome: "Auto Posto Pulso", logo: "", link: "https://wa.me/5527999879870", ordem: 3 }
  ];

  let localProgramacao = JSON.parse(localStorage.getItem("PULSO_SCHEDULE"));
  let localLocutores = JSON.parse(localStorage.getItem("PULSO_HOSTS"));
  let localPatrocinadores = JSON.parse(localStorage.getItem("PULSO_SPONSORS"));

  // Semear dados se estiver vazio
  if (!localProgramacao) {
    localProgramacao = DEFAULT_PROGRAMACAO;
    localStorage.setItem("PULSO_SCHEDULE", JSON.stringify(DEFAULT_PROGRAMACAO));
    localStorage.setItem("PULSO_SCHEDULE_SEEDED", "true");
  }
  if (!localLocutores) {
    localLocutores = DEFAULT_LOCUTORES;
    localStorage.setItem("PULSO_HOSTS", JSON.stringify(DEFAULT_LOCUTORES));
    localStorage.setItem("PULSO_HOSTS_SEEDED", "true");
  }
  if (!localPatrocinadores) {
    localPatrocinadores = DEFAULT_PATROCINADORES;
    localStorage.setItem("PULSO_SPONSORS", JSON.stringify(DEFAULT_PATROCINADORES));
    localStorage.setItem("PULSO_SPONSORS_SEEDED", "true");
  }

  // Renderizar Programação Semanal
  renderProgramacao(localProgramacao);

  // Renderizar Equipe de Locutores
  renderLocutores(localLocutores);

  // Renderizar Patrocinadores
  renderPatrocinadores(localPatrocinadores);

  // Renderizar Painel Ao Vivo (Destaque Ativo + Próximo)
  renderAoVivoDestaque(localProgramacao, localLocutores);
}

function renderProgramacao(lista) {
  const container = document.getElementById("programacao-dinamica-grid");
  if (!container) return;

  container.innerHTML = "";
  
  lista.sort((a, b) => a.ordem - b.ordem);

  lista.forEach((item, index) => {
    const delay = index * 0.1;
    const div = document.createElement("div");
    
    const noAr = estaNoHorario(item.horario);
    
    div.className = `programacao-card ${noAr ? 'ativo-no-ar' : ''} reveal`;
    div.style.transitionDelay = `${delay}s`;

    let badgeHTML = "";
    if (noAr) {
      badgeHTML = `<span class="programacao-badge-no-ar">NO AR</span>`;
    }

    div.innerHTML = `
      ${badgeHTML}
      <div class="programacao-icon-wrapper" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${noAr ? `
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="22"></line>
          ` : `
            <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
            <path d="M12 6v6l4 2"/>
          `}
        </svg>
      </div>
      <span class="programacao-time">${item.horario}</span>
      <h3 class="programacao-show-name">${item.titulo}</h3>
      <p class="programacao-locutor">${item.locutor}</p>
    `;
    
    container.appendChild(div);
  });
}

function renderLocutores(lista) {
  const container = document.getElementById("locutores-dinamica-grid");
  if (!container) return;

  container.innerHTML = "";
  
  lista.sort((a, b) => a.ordem - b.ordem);

  lista.forEach((loc, index) => {
    const delay = index * 0.15;
    const div = document.createElement("div");
    div.className = "locutor-card reveal";
    div.style.transitionDelay = `${delay}s`;

    div.innerHTML = `
      <div class="locutor-img-wrapper">
        <img src="${loc.foto}" alt="${loc.nome}" class="locutor-img" loading="lazy">
        <div class="locutor-overlay-hover">
          <div class="locutor-social-links">
            <a href="${loc.instagram || 'https://instagram.com'}" class="locutor-social-btn" aria-label="Instagram de ${loc.nome}" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rx>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="${loc.whatsapp || 'https://wa.me/5527999879870'}" class="locutor-social-btn" aria-label="WhatsApp de ${loc.nome}" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="locutor-info">
        <h3 class="locutor-name">${loc.nome}</h3>
        <p class="locutor-role">${loc.cargo}</p>
        <p class="locutor-bio">${loc.bio}</p>
      </div>
    `;
    
    container.appendChild(div);
  });
}

function renderPatrocinadores(lista) {
  const container = document.getElementById("patrocinadores-dinamico-grid");
  if (!container) return;

  container.innerHTML = "";
  
  // Filtrar patrocinadores desativados
  const ativos = lista.filter(p => !p.status || p.status === "ativo");
  ativos.sort((a, b) => a.ordem - b.ordem);

  ativos.forEach((pat, index) => {
    const delay = index * 0.1;
    const div = document.createElement("div");
    div.className = "patrocinador-card reveal";
    div.style.transitionDelay = `${delay}s`;

    let logoHTML = "";
    if (pat.logo) {
      logoHTML = `<img src="${pat.logo}" alt="${pat.nome}" loading="lazy">`;
    } else {
      logoHTML = `<span class="patrocinador-placeholder-logo">${pat.nome}</span>`;
    }

    if (pat.link) {
      div.innerHTML = `
        <a href="${pat.link}" target="_blank" rel="noopener" class="patrocinador-logo-wrapper" style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; text-decoration:none;">
          ${logoHTML}
        </a>
      `;
    } else {
      div.innerHTML = `
        <div class="patrocinador-logo-wrapper">
          ${logoHTML}
        </div>
      `;
    }
    
    container.appendChild(div);
  });
}

function estaNoHorario(horarioStr) {
  try {
    const agora = new Date();
    const horaAtualMinutos = agora.getHours() * 60 + agora.getMinutes();
    
    const partes = horarioStr.split("-").map(p => p.trim());
    if (partes.length !== 2) return false;
    
    const [hInicio, mInicio] = partes[0].split(":").map(Number);
    const [hFim, mFim] = partes[1].split(":").map(Number);
    
    const totalInicio = hInicio * 60 + (mInicio || 0);
    let totalFim = hFim * 60 + (mFim || 0);
    
    if (totalFim < totalInicio) {
      return horaAtualMinutos >= totalInicio || horaAtualMinutos < totalFim;
    }
    
    return horaAtualMinutos >= totalInicio && horaAtualMinutos < totalFim;
  } catch (e) {
    return false;
  }
}

function renderAoVivoDestaque(schedules, hosts) {
  const container = document.querySelector(".aovivo-container");
  if (!container) return;

  let programaAtivo = schedules.find(p => estaNoHorario(p.horario));
  let idxAtivo = schedules.findIndex(p => estaNoHorario(p.horario));
  
  if (!programaAtivo && schedules.length > 0) {
    programaAtivo = schedules.find(p => p.ordem === 4) || schedules[0];
    idxAtivo = schedules.findIndex(p => p.id === programaAtivo.id);
  }

  if (!programaAtivo) return;

  const locutorAtivo = hosts.find(h => h.nome.toLowerCase() === programaAtivo.locutor.toLowerCase()) || {
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    nome: programaAtivo.locutor
  };

  container.innerHTML = `
    <!-- Locutor de Plantão -->
    <div class="aovivo-card-principal reveal active" style="width: 100%;">
      <!-- Coluna 1: Foto do Locutor com Badge -->
      <div class="aovivo-locutor-photo-wrapper">
        <div class="aovivo-locutor-photo">
          <img src="${locutorAtivo.foto}" alt="${programaAtivo.locutor}" loading="lazy">
        </div>
        <span class="aovivo-photo-badge">ONLINE</span>
      </div>
      
      <!-- Coluna 2: Detalhes do Programa (Centro) -->
      <div class="aovivo-details-middle">
        <div class="aovivo-status-row">
          <span class="aovivo-status-badge">No Comando</span>
        </div>
        <h3 class="aovivo-show-name">${programaAtivo.titulo}</h3>
        <div class="aovivo-locutor-row">
          <svg class="locutor-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
          </svg>
          <span class="aovivo-locutor-name">${programaAtivo.locutor}</span>
        </div>
      </div>

      <!-- Coluna 3: Horário, Waveform e Pedido Musical (Direita) -->
      <div class="aovivo-details-right">
        <div class="aovivo-time-box" aria-label="Horário: das ${programaAtivo.horario}">
          <svg class="time-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>${programaAtivo.horario}</span>
        </div>
        
        <div class="aovivo-waveform-container">
          <span class="waveform-label">ÁUDIO HD</span>
          <div class="aovivo-waveform">
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
          </div>
        </div>
        
        <a href="https://wa.me/5527999879870?text=Ol%C3%A1!%20Gostaria%20de%20pedir%20uma%20m%C3%BAsica%20na%20programacao%20da%20R%C3%A1dio%20Pulso%20FM." class="btn-aovivo-request" target="_blank" rel="noopener">
          <svg class="wpp-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 2c-5.514 0-9.99 4.478-9.99 9.99 0 2.08.637 4.022 1.737 5.642L2 22l4.533-1.305c1.614.93 3.473 1.464 5.498 1.464 5.514 0 9.99-4.478 9.99-9.99S17.545 2 12.031 2zm0 16.637c-1.895 0-3.66-.566-5.14-1.536l-.37-.22-2.58.74.76-2.505-.245-.39c-1.047-1.654-1.6-3.57-1.6-5.56 0-5.233 4.257-9.49 9.49-9.49 5.233 0 9.49 4.257 9.49 9.49-0.005 5.237-4.262 9.494-9.495 9.494zm5.22-7.14c-.287-.145-1.702-.84-1.965-.935-.263-.095-.455-.145-.647.145-.192.29-.74.935-.907 1.13-.167.19-.335.215-.62.07-2.617-1.306-3.483-2.92-3.83-3.525-.28-.485.347-.45.993-1.745.105-.215.053-.405-.025-.555-.078-.15-.647-1.56-.887-2.133-.233-.562-.47-.485-.647-.495-.167-.01-.36-.01-.55-.01s-.502.07-.765.36c-.263.29-1.006.983-1.006 2.395 0 1.41 1.03 2.775 1.17 2.97.14.195 2.025 3.093 4.908 4.34 2.883 1.246 2.883.83 3.4.783.516-.047 1.702-.695 1.942-1.37.24-.674.24-1.25.167-1.37-.072-.12-.263-.215-.55-.36z"/>
          </svg>
          Pedir Música
        </a>
      </div>
    </div>
  `;
}

// 8. Mural de Recados / Pedido Musical (Guestbook) Interativo
function initGuestbook() {
  const DEFAULT_GUESTBOOK = [
    { nome: "Carlos Souza (Itaparica, Vila Velha)", hora: "12:45", msg: "Toca Coldplay - Yellow! Um abraço para toda a equipe da Pulso FM!" },
    { nome: "Mariana Costa (Centro, Vitória)", hora: "12:30", msg: "Melhor programação do estado! Sintonizada aqui no trabalho." },
    { nome: "Felipe Silva (Glória, Vila Velha)", hora: "11:15", msg: "Quero mandar um alô para minha mãe no Ibes e pedir a nova do Jorge e Mateus!" },
    { nome: "Beatriz Santos (Laranjeiras, Serra)", hora: "10:50", msg: "O som tá sensacional! Ligada na Pulso 98.7 todos os dias." }
  ];

  let localGuestbook = JSON.parse(localStorage.getItem("PULSO_GUESTBOOK"));
  if (!localGuestbook) {
    localGuestbook = DEFAULT_GUESTBOOK;
    localStorage.setItem("PULSO_GUESTBOOK", JSON.stringify(DEFAULT_GUESTBOOK));
  }

  renderGuestbook(localGuestbook);

  // Integrar com o formulário de contato / pedido musical
  const formContato = document.getElementById("form-contato");
  if (formContato) {
    formContato.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("form-nome").value;
      const mensagem = document.getElementById("form-mensagem").value;

      if (nome && mensagem) {
        const agora = new Date();
        const horaStr = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;
        
        const novoRecado = {
          nome: nome + " (Ouvinte)",
          hora: horaStr,
          msg: mensagem
        };

        let currentGuestbook = JSON.parse(localStorage.getItem("PULSO_GUESTBOOK")) || [];
        currentGuestbook.unshift(novoRecado);
        
        if (currentGuestbook.length > 15) {
          currentGuestbook = currentGuestbook.slice(0, 15);
        }
        
        localStorage.setItem("PULSO_GUESTBOOK", JSON.stringify(currentGuestbook));
        
        renderGuestbook(currentGuestbook);

        alert(`Obrigado pelo seu recado, ${nome}! Ele foi publicado com sucesso no mural.`);
        formContato.reset();
      } else {
        alert("Por favor, preencha todos os campos do formulário.");
      }
    });
  }
}

function renderGuestbook(lista) {
  const container = document.getElementById("guestbook-messages-list");
  if (!container) return;

  container.innerHTML = "";
  lista.forEach(recado => {
    const item = document.createElement("div");
    item.className = "guestbook-item";
    item.innerHTML = `
      <div class="guestbook-meta">
        <span class="guestbook-author">${recado.nome}</span>
        <span class="guestbook-time">${recado.hora}</span>
      </div>
      <p class="guestbook-text">${recado.msg}</p>
    `;
    container.appendChild(item);
  });
}

// 9. Widget de Clima do Espírito Santo
function initClimaWidget() {
  const climaContainer = document.getElementById("clima-es-widget");
  if (!climaContainer) return;
  
  const temperaturas = [
    { cidade: "Vila Velha", temp: "26°C", cond: "Ensolarado" },
    { cidade: "Vitória", temp: "26°C", cond: "Ensolarado" },
    { cidade: "Serra", temp: "27°C", cond: "Parcialmente Nublado" },
    { cidade: "Cariacica", temp: "28°C", cond: "Ensolarado" },
    { cidade: "Guarapari", temp: "25°C", cond: "Ensolarado" }
  ];
  
  climaContainer.innerHTML = temperaturas.map(t => `
    <div class="clima-cidade-row">
      <span class="clima-cidade-nome">${t.cidade}</span>
      <span class="clima-cidade-temp">${t.temp}</span>
      <span class="clima-cidade-cond">${t.cond}</span>
    </div>
  `).join("");
}

// ==========================================================================
// CONTROLE DE VÍDEO DO ESTÚDIO (AO VIVO / PLAYLIST GRAVADA)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const btnSourcePlaylist = document.getElementById("btn-source-playlist");
  const btnSourceLive = document.getElementById("btn-source-live");
  const selectReportVideo = document.getElementById("select-report-video");
  const playlistContainer = document.getElementById("live-playlist-selector");
  const statusBadge = document.getElementById("live-status-badge");
  const liveVideoIframe = document.getElementById("live-video-iframe");
  const sourceSelector = document.querySelector(".player-source-selector");

  if (!btnSourcePlaylist || !btnSourceLive || !selectReportVideo || !liveVideoIframe) return;

  // Função para retornar o link de live stream publicado pelo administrador
  function obterLinkLive() {
    const savedUrl = localStorage.getItem("PULSO_LIVE_URL");
    if (savedUrl && savedUrl.trim() !== "") {
      return savedUrl.trim();
    }
    return null;
  }

  // Inicializar o estado do Estúdio de acordo com a existência de um link de live ativo
  function inicializarEstudio() {
    const savedUrl = localStorage.getItem("PULSO_LIVE_URL");
    const navLinkAoVivo = document.getElementById("nav-link-ao-vivo");

    if (savedUrl && savedUrl.trim() !== "") {
      // Se há live publicada pelo admin, exibe a opção de alternância e inicia no modo "Ao Vivo" automaticamente
      if (sourceSelector) sourceSelector.style.display = "flex";
      if (btnSourceLive) btnSourceLive.style.display = "";
      if (navLinkAoVivo) navLinkAoVivo.style.display = "";
      if (statusBadge) statusBadge.style.display = "";
      ativarModoAoVivo(false); // Inicia mutado por boas práticas de autoplay do navegador
    } else {
      // Se não há live ativa no admin, oculta a opção "Transmitir Ao Vivo" e inicia no modo "Playlist Gravada"
      if (sourceSelector) sourceSelector.style.display = "none";
      if (btnSourceLive) btnSourceLive.style.display = "none";
      if (navLinkAoVivo) navLinkAoVivo.style.display = "none";
      if (statusBadge) statusBadge.style.display = "none";
      ativarModoPlaylist();
    }
  }

  // Ativa o modo Ao Vivo
  function ativarModoAoVivo(autoplayMute = true) {
    btnSourcePlaylist.classList.remove("active");
    btnSourceLive.classList.add("active");
    if (playlistContainer) playlistContainer.classList.add("disabled");

    if (statusBadge) {
      statusBadge.style.display = "";
      statusBadge.classList.add("online");
      statusBadge.querySelector(".status-text").textContent = "AO VIVO NO ESTÚDIO";
    }

    const liveUrl = obterLinkLive();
    if (liveUrl) {
      const joinChar = liveUrl.includes("?") ? "&" : "?";
      liveVideoIframe.src = `${liveUrl}${joinChar}autoplay=1&mute=${autoplayMute ? 0 : 1}&rel=0`;
    }
  }

  // Ativa o modo Playlist
  function ativarModoPlaylist() {
    btnSourceLive.classList.remove("active");
    btnSourcePlaylist.classList.add("active");
    if (playlistContainer) playlistContainer.classList.remove("disabled");

    const savedUrl = localStorage.getItem("PULSO_LIVE_URL");
    if (savedUrl && savedUrl.trim() !== "") {
      if (statusBadge) {
        statusBadge.style.display = "";
        statusBadge.classList.remove("online");
        statusBadge.querySelector(".status-text").textContent = "OFFLINE (Playlist Ativa)";
      }
    } else {
      if (statusBadge) statusBadge.style.display = "none";
    }

    const selectedVideoId = selectReportVideo.value;
    liveVideoIframe.src = `https://www.youtube-nocookie.com/embed/${selectedVideoId}?autoplay=0&mute=1&rel=0`;
  }

  // Configurar ações dos botões
  btnSourcePlaylist.addEventListener("click", () => {
    ativarModoPlaylist();
  });

  btnSourceLive.addEventListener("click", () => {
    ativarModoAoVivo(true);
  });

  // Configurar mudança de vídeo na playlist
  selectReportVideo.addEventListener("change", (e) => {
    if (btnSourcePlaylist.classList.contains("active")) {
      const selectedVideoId = e.target.value;
      liveVideoIframe.src = `https://www.youtube-nocookie.com/embed/${selectedVideoId}?autoplay=1&mute=1&rel=0`;
    }
  });

  // Executar inicialização
  inicializarEstudio();

  // Escutar alterações do localStorage em tempo real (ex: vindo da aba admin)
  window.addEventListener("storage", (e) => {
    if (e.key === "PULSO_LIVE_URL") {
      inicializarEstudio();
    }
    // Sincronizar também alterações de publicidade em tempo real
    if (e.key === "PULSO_AD_SIDEBAR" || e.key === "PULSO_AD_BOTTOM") {
      initPublicidade();
    }
  });
});

