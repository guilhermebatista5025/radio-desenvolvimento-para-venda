// Rádio Pulso FM - Script Geral e Lógica do PWA

// Evento de inicialização do DOM
document.addEventListener("DOMContentLoaded", () => {
  initDinamico();
  initGeral();
  initMenuMobile();
  initScrollSuave();
  initAnimacoesScroll();
  initHeroSlider();
});

// 1. Inicializações Gerais
function initGeral() {
  // Configurar ano dinâmico no Copyright do Footer
  const spanAno = document.getElementById("ano-copyright");
  if (spanAno) {
    spanAno.textContent = new Date().getFullYear();
  }

  // Formulário de Contato - Envio Fictício
  const formContato = document.getElementById("form-contato");
  if (formContato) {
    formContato.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("form-nome").value;
      const email = document.getElementById("form-email").value;
      const mensagem = document.getElementById("form-mensagem").value;

      if (nome && email && mensagem) {
        alert(`Obrigado pelo seu contato, ${nome}! Sua mensagem foi enviada com sucesso para a equipe da Rádio Pulso FM.`);
        formContato.reset();
      } else {
        alert("Por favor, preencha todos os campos do formulário.");
      }
    });
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
  
  lista.sort((a, b) => a.ordem - b.ordem);

  lista.forEach((pat, index) => {
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

  const nextIdx = (idxAtivo + 1) % schedules.length;
  const proximoPrograma = schedules[nextIdx] || schedules[0];
  let proximoHorario = proximoPrograma ? proximoPrograma.horario.split("-")[0].trim() : "";

  container.innerHTML = `
    <!-- Locutor de Plantão -->
    <div class="aovivo-card-principal reveal active">
      <div class="aovivo-locutor-photo">
        <img src="${locutorAtivo.foto}" alt="${programaAtivo.locutor}" loading="lazy">
      </div>
      <div class="aovivo-details">
        <span class="aovivo-status-badge">No Comando</span>
        <h3 class="aovivo-show-name">${programaAtivo.titulo}</h3>
        <p class="aovivo-locutor-name">${programaAtivo.locutor}</p>
        <p class="aovivo-time" aria-label="Horário: das ${programaAtivo.horario}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          ${programaAtivo.horario}
        </p>
      </div>
    </div>

    <!-- Próximo Programa -->
    <div class="proximo-card reveal active" style="transition-delay: 0.15s;">
      <span class="proximo-title">Próxima Atração</span>
      <h3 class="proximo-show-name">${proximoPrograma.titulo}</h3>
      <p class="proximo-locutor">por ${proximoPrograma.locutor}</p>
      <span class="proximo-time">A partir das ${proximoHorario}</span>
    </div>
  `;
}
