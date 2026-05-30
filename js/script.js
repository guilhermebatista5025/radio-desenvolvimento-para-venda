// Rádio Pulso FM - Script Geral e Lógica do PWA

// Evento de inicialização do DOM
document.addEventListener("DOMContentLoaded", () => {
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
