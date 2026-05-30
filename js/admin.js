// Rádio Pulso FM - Módulo de Lógica do Painel Administrativo (admin.js)
// Arquitetura 100% Client-Side sem banco de dados (puro front-end local)

// 1. Dados Iniciais de Semente (Seed Data)
const DEFAULT_NOTICIAS = [
  {
    id: 1,
    titulo: "Show do Coldplay em Vila Velha agita mais de 50 mil pessoas na Praia da Costa",
    resumo: "A icônica banda britânica realizou uma apresentação histórica à beira-mar com luzes, efeitos especiais e sucessos mundiais.",
    textoCompleto: "<p class=\"resumo-completo\">A Praia da Costa, em Vila Velha, foi palco de um dos maiores eventos musicais da história do Espírito Santo...</p>",
    categoria: "Entretenimento",
    imagem: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=600",
    data: "30 de Maio de 2026"
  },
  {
    id: 2,
    titulo: "Novo parque linear na orla de Itaparica terá ciclovias e áreas de lazer modernas",
    resumo: "Projeto avaliado em R$ 15 milhões promete transformar a infraestrutura de lazer, integrando esportes e convivência comunitária.",
    textoCompleto: "<p>Foi anunciado na manhã de hoje o início das obras do novo Parque Linear de Itaparica...</p>",
    categoria: "Local",
    imagem: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600",
    data: "29 de Maio de 2026"
  }
];

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

// 2. Inicialização dos Estados locais (LocalStorage)
let noticias = JSON.parse(localStorage.getItem("PULSO_NEWS")) || [];
let programacao = JSON.parse(localStorage.getItem("PULSO_SCHEDULE")) || [];
let locutores = JSON.parse(localStorage.getItem("PULSO_HOSTS")) || [];
let patrocinadores = JSON.parse(localStorage.getItem("PULSO_SPONSORS")) || [];

// Semear os dados padrão se estiver rodando pela primeira vez (garante que comece preenchido!)
if (noticias.length === 0 && !localStorage.getItem("PULSO_NEWS_SEEDED")) {
  noticias = [...DEFAULT_NOTICIAS];
  localStorage.setItem("PULSO_NEWS", JSON.stringify(noticias));
  localStorage.setItem("PULSO_NEWS_SEEDED", "true");
}
if (programacao.length === 0 && !localStorage.getItem("PULSO_SCHEDULE_SEEDED")) {
  programacao = [...DEFAULT_PROGRAMACAO];
  localStorage.setItem("PULSO_SCHEDULE", JSON.stringify(programacao));
  localStorage.setItem("PULSO_SCHEDULE_SEEDED", "true");
}
if (locutores.length === 0 && !localStorage.getItem("PULSO_HOSTS_SEEDED")) {
  locutores = [...DEFAULT_LOCUTORES];
  localStorage.setItem("PULSO_HOSTS", JSON.stringify(locutores));
  localStorage.setItem("PULSO_HOSTS_SEEDED", "true");
}
if (patrocinadores.length === 0 && !localStorage.getItem("PULSO_SPONSORS_SEEDED")) {
  patrocinadores = [...DEFAULT_PATROCINADORES];
  localStorage.setItem("PULSO_SPONSORS", JSON.stringify(patrocinadores));
  localStorage.setItem("PULSO_SPONSORS_SEEDED", "true");
}

// 3. Inicialização Geral e Gate de Login
document.addEventListener("DOMContentLoaded", () => {
  verificarSessao();
  configurarEventosGerais();
});

// Verifica se há sessão ativa no sessionStorage (fecha se não autenticado)
function verificarSessao() {
  const loginOverlay = document.getElementById("login-overlay");
  const adminLayout = document.getElementById("admin-layout");
  
  if (sessionStorage.getItem("admin_authenticated") === "true") {
    loginOverlay.style.display = "none";
    adminLayout.style.display = "flex";
    carregarListagemAtiva();
  } else {
    loginOverlay.style.display = "flex";
    adminLayout.style.display = "none";
  }
}

// Configurar ouvintes de cliques e logins
function configurarEventosGerais() {
  // Login
  const formLogin = document.getElementById("form-login");
  const loginErrorMsg = document.getElementById("login-error-msg");
  
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    
    // Credenciais administrativas fixas locais (conforme plano técnico aprovado)
    if (user === "admin" && pass === "pulso987") {
      sessionStorage.setItem("admin_authenticated", "true");
      loginErrorMsg.style.display = "none";
      verificarSessao();
    } else {
      loginErrorMsg.style.display = "block";
    }
  });

  // Logout
  const btnLogout = document.getElementById("btn-logout");
  btnLogout.addEventListener("click", () => {
    sessionStorage.removeItem("admin_authenticated");
    verificarSessao();
  });

  // Toggles de Abas (Sidebar Menu)
  const menuItems = document.querySelectorAll(".menu-item");
  const adminSections = document.querySelectorAll(".admin-section");
  
  menuItems.forEach(item => {
    item.addEventListener("click", (e) => {
      menuItems.forEach(m => m.classList.remove("active"));
      adminSections.forEach(s => s.classList.remove("active"));
      
      const targetSectionId = item.getAttribute("data-tab");
      item.classList.add("active");
      document.getElementById(targetSectionId).classList.add("active");
      
      // Fecha qualquer formulário aberto ao trocar de aba para evitar poluição
      fecharTodosFormularios();
      carregarListagemAtiva();
    });
  });

  // Eventos de Abertura de Formulários (Add buttons)
  document.getElementById("btn-nova-noticia").addEventListener("click", () => abrirFormulario("noticia"));
  document.getElementById("btn-novo-programa").addEventListener("click", () => abrirFormulario("programa"));
  document.getElementById("btn-novo-locutor").addEventListener("click", () => abrirFormulario("locutor"));
  document.getElementById("btn-novo-patrocinador").addEventListener("click", () => abrirFormulario("patrocinador"));

  // Eventos de Cancelamento
  document.getElementById("btn-cancela-noticia").addEventListener("click", () => fecharFormulario("noticia"));
  document.getElementById("btn-cancela-programa").addEventListener("click", () => fecharFormulario("programa"));
  document.getElementById("btn-cancela-locutor").addEventListener("click", () => fecharFormulario("locutor"));
  document.getElementById("btn-cancela-patrocinador").addEventListener("click", () => fecharFormulario("patrocinador"));

  // Submissão de Formulários CRUD
  document.getElementById("form-noticia").addEventListener("submit", salvarNoticia);
  document.getElementById("form-programa").addEventListener("submit", salvarPrograma);
  document.getElementById("form-locutor").addEventListener("submit", salvarLocutor);
  document.getElementById("form-patrocinador").addEventListener("submit", salvarPatrocinador);
}

// 4. Lógicas Globais de Formulário
function abrirFormulario(tipo) {
  document.getElementById(`form-${tipo}-wrapper`).style.display = "block";
  document.getElementById(`form-${tipo}`).reset();
  document.getElementById(`${tipo}-edit-id`).value = "";
  document.getElementById(`form-${tipo}-titulo`).textContent = `Cadastrar ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
}

function fecharFormulario(tipo) {
  document.getElementById(`form-${tipo}-wrapper`).style.display = "none";
}

function fecharTodosFormularios() {
  fecharFormulario("noticia");
  fecharFormulario("programa");
  fecharFormulario("locutor");
  fecharFormulario("patrocinador");
}

function carregarListagemAtiva() {
  const activeTabId = document.querySelector(".menu-item.active").getAttribute("data-tab");
  
  if (activeTabId === "tab-noticias") renderizarListaNoticias();
  if (activeTabId === "tab-programacao") renderizarListaProgramacao();
  if (activeTabId === "tab-locutores") renderizarListaLocutores();
  if (activeTabId === "tab-patrocinadores") renderizarListaPatrocinadores();
}

// ==========================================
// A. NOTÍCIAS CRUD
// ==========================================
function renderizarListaNoticias() {
  const corpo = document.getElementById("lista-noticias-corpo");
  corpo.innerHTML = "";
  
  if (noticias.length === 0) {
    corpo.innerHTML = `<tr><td colspan="5" class="tbl-empty-msg">Nenhuma notícia cadastrada localmente no painel admin.</td></tr>`;
    return;
  }
  
  noticias.forEach(item => {
    const tr = document.createElement("tr");
    const thumb = item.imagem || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=150";
    
    tr.innerHTML = `
      <td><img src="${thumb}" class="tbl-thumb" alt="Thumb"></td>
      <td><strong>${item.titulo}</strong></td>
      <td><span class="header-badge">${item.categoria}</span></td>
      <td>${item.data}</td>
      <td class="actions-cell">
        <button class="btn-tbl-edit" onclick="editarNoticia(${item.id})">Editar</button>
        <button class="btn-tbl-delete" onclick="deletarNoticia(${item.id})">Excluir</button>
      </td>
    `;
    corpo.appendChild(tr);
  });
}

function salvarNoticia(e) {
  e.preventDefault();
  
  const idEdit = document.getElementById("noticia-edit-id").value;
  const tituloVal = document.getElementById("n-titulo").value.trim();
  const categoriaVal = document.getElementById("n-categoria").value;
  const imagemVal = document.getElementById("n-imagem").value.trim() || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600";
  const dataVal = document.getElementById("n-data").value.trim();
  const resumoVal = document.getElementById("n-resumo").value.trim();
  const textoVal = document.getElementById("n-texto").value.trim();
  
  if (idEdit) {
    // Editar
    const idx = noticias.findIndex(n => n.id === parseInt(idEdit, 10));
    if (idx !== -1) {
      noticias[idx] = { id: parseInt(idEdit, 10), titulo: tituloVal, categoria: categoriaVal, imagem: imagemVal, data: dataVal, resumo: resumoVal, textoCompleto: textoVal };
    }
  } else {
    // Adicionar novo
    const novoId = noticias.length > 0 ? Math.max(...noticias.map(n => n.id)) + 1 : 1;
    noticias.push({ id: novoId, titulo: tituloVal, categoria: categoriaVal, imagem: imagemVal, data: dataVal, resumo: resumoVal, textoCompleto: textoVal });
  }
  
  localStorage.setItem("PULSO_NEWS", JSON.stringify(noticias));
  fecharFormulario("noticia");
  renderizarListaNoticias();
}

window.editarNoticia = function(id) {
  const item = noticias.find(n => n.id === id);
  if (!item) return;
  
  abrirFormulario("noticia");
  document.getElementById("form-noticia-titulo").textContent = "Editar Notícia";
  
  document.getElementById("noticia-edit-id").value = item.id;
  document.getElementById("n-titulo").value = item.titulo;
  document.getElementById("n-categoria").value = item.categoria;
  document.getElementById("n-imagem").value = item.imagem === "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600" ? "" : item.imagem;
  document.getElementById("n-data").value = item.data;
  document.getElementById("n-resumo").value = item.resumo;
  document.getElementById("n-texto").value = item.textoCompleto;
};

window.deletarNoticia = function(id) {
  if (confirm("Deseja realmente excluir esta notícia?")) {
    noticias = noticias.filter(n => n.id !== id);
    localStorage.setItem("PULSO_NEWS", JSON.stringify(noticias));
    renderizarListaNoticias();
  }
};

// ==========================================
// B. PROGRAMAÇÃO CRUD
// ==========================================
function renderizarListaProgramacao() {
  const corpo = document.getElementById("lista-programacao-corpo");
  corpo.innerHTML = "";
  
  if (programacao.length === 0) {
    corpo.innerHTML = `<tr><td colspan="5" class="tbl-empty-msg">Nenhum programa cadastrado localmente.</td></tr>`;
    return;
  }
  
  // Ordena por ordem de exibição na grade
  programacao.sort((a, b) => a.ordem - b.ordem);
  
  programacao.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${item.ordem}º</strong></td>
      <td><span class="header-badge">${item.horario}</span></td>
      <td><strong>${item.titulo}</strong></td>
      <td>${item.locutor}</td>
      <td class="actions-cell">
        <button class="btn-tbl-edit" onclick="editarPrograma(${item.id})">Editar</button>
        <button class="btn-tbl-delete" onclick="deletarPrograma(${item.id})">Excluir</button>
      </td>
    `;
    corpo.appendChild(tr);
  });
}

function salvarPrograma(e) {
  e.preventDefault();
  
  const idEdit = document.getElementById("programa-edit-id").value;
  const tituloVal = document.getElementById("p-titulo").value.trim();
  const horarioVal = document.getElementById("p-horario").value.trim();
  const locutorVal = document.getElementById("p-locutor").value.trim();
  const ordemVal = parseInt(document.getElementById("p-ordem").value, 10);
  
  if (idEdit) {
    const idx = programacao.findIndex(p => p.id === parseInt(idEdit, 10));
    if (idx !== -1) {
      programacao[idx] = { id: parseInt(idEdit, 10), titulo: tituloVal, horario: horarioVal, locutor: locutorVal, ordem: ordemVal };
    }
  } else {
    const novoId = programacao.length > 0 ? Math.max(...programacao.map(p => p.id)) + 1 : 1;
    programacao.push({ id: novoId, titulo: tituloVal, horario: horarioVal, locutor: locutorVal, ordem: ordemVal });
  }
  
  localStorage.setItem("PULSO_SCHEDULE", JSON.stringify(programacao));
  fecharFormulario("programa");
  renderizarListaProgramacao();
}

window.editarPrograma = function(id) {
  const item = programacao.find(p => p.id === id);
  if (!item) return;
  
  abrirFormulario("programa");
  document.getElementById("form-programa-titulo").textContent = "Editar Programa";
  
  document.getElementById("programa-edit-id").value = item.id;
  document.getElementById("p-titulo").value = item.titulo;
  document.getElementById("p-horario").value = item.horario;
  document.getElementById("p-locutor").value = item.locutor;
  document.getElementById("p-ordem").value = item.ordem;
};

window.deletarPrograma = function(id) {
  if (confirm("Excluir este horário da grade?")) {
    programacao = programacao.filter(p => p.id !== id);
    localStorage.setItem("PULSO_SCHEDULE", JSON.stringify(programacao));
    renderizarListaProgramacao();
  }
};

// ==========================================
// C. LOCUTORES CRUD
// ==========================================
function renderizarListaLocutores() {
  const corpo = document.getElementById("lista-locutores-corpo");
  corpo.innerHTML = "";
  
  if (locutores.length === 0) {
    corpo.innerHTML = `<tr><td colspan="5" class="tbl-empty-msg">Nenhum locutor cadastrado localmente.</td></tr>`;
    return;
  }
  
  locutores.sort((a, b) => a.ordem - b.ordem);
  
  locutores.forEach(item => {
    const tr = document.createElement("tr");
    const thumb = item.foto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150";
    
    tr.innerHTML = `
      <td><img src="${thumb}" class="tbl-thumb-circle" alt="Foto"></td>
      <td><strong>${item.nome}</strong></td>
      <td>${item.cargo}</td>
      <td>${item.ordem}º</td>
      <td class="actions-cell">
        <button class="btn-tbl-edit" onclick="editarLocutor(${item.id})">Editar</button>
        <button class="btn-tbl-delete" onclick="deletarLocutor(${item.id})">Excluir</button>
      </td>
    `;
    corpo.appendChild(tr);
  });
}

function salvarLocutor(e) {
  e.preventDefault();
  
  const idEdit = document.getElementById("locutor-edit-id").value;
  const nomeVal = document.getElementById("l-nome").value.trim();
  const cargoVal = document.getElementById("l-cargo").value.trim();
  const fotoVal = document.getElementById("l-foto").value.trim() || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400";
  const ordemVal = parseInt(document.getElementById("l-ordem").value, 10);
  const instagramVal = document.getElementById("l-instagram").value.trim() || "https://instagram.com";
  const whatsappVal = document.getElementById("l-whatsapp").value.trim() || "https://wa.me/5527999879870";
  const bioVal = document.getElementById("l-bio").value.trim();
  
  if (idEdit) {
    const idx = locutores.findIndex(l => l.id === parseInt(idEdit, 10));
    if (idx !== -1) {
      locutores[idx] = { id: parseInt(idEdit, 10), nome: nomeVal, cargo: cargoVal, foto: fotoVal, ordem: ordemVal, instagram: instagramVal, whatsapp: whatsappVal, bio: bioVal };
    }
  } else {
    const novoId = locutores.length > 0 ? Math.max(...locutores.map(l => l.id)) + 1 : 1;
    locutores.push({ id: novoId, nome: nomeVal, cargo: cargoVal, foto: fotoVal, ordem: ordemVal, instagram: instagramVal, whatsapp: whatsappVal, bio: bioVal });
  }
  
  localStorage.setItem("PULSO_HOSTS", JSON.stringify(locutores));
  fecharFormulario("locutor");
  renderizarListaLocutores();
}

window.editarLocutor = function(id) {
  const item = locutores.find(l => l.id === id);
  if (!item) return;
  
  abrirFormulario("locutor");
  document.getElementById("form-locutor-titulo").textContent = "Editar Locutor";
  
  document.getElementById("locutor-edit-id").value = item.id;
  document.getElementById("l-nome").value = item.nome;
  document.getElementById("l-cargo").value = item.cargo;
  document.getElementById("l-foto").value = (item.foto.includes("photo-1534528741775")) ? "" : item.foto;
  document.getElementById("l-ordem").value = item.ordem;
  document.getElementById("l-instagram").value = item.instagram === "https://instagram.com" ? "" : item.instagram;
  document.getElementById("l-whatsapp").value = item.whatsapp === "https://wa.me/5527999879870" ? "" : item.whatsapp;
  document.getElementById("l-bio").value = item.bio;
};

window.deletarLocutor = function(id) {
  if (confirm("Remover este locutor da equipe?")) {
    locutores = locutores.filter(l => l.id !== id);
    localStorage.setItem("PULSO_HOSTS", JSON.stringify(locutores));
    renderizarListaLocutores();
  }
};

// ==========================================
// D. PATROCINADORES CRUD
// ==========================================
function renderizarListaPatrocinadores() {
  const corpo = document.getElementById("lista-patrocinadores-corpo");
  corpo.innerHTML = "";
  
  if (patrocinadores.length === 0) {
    corpo.innerHTML = `<tr><td colspan="5" class="tbl-empty-msg">Nenhum parceiro ou patrocinador cadastrado.</td></tr>`;
    return;
  }
  
  patrocinadores.sort((a, b) => a.ordem - b.ordem);
  
  patrocinadores.forEach(item => {
    const tr = document.createElement("tr");
    const logoImg = item.logo || "./assets/icons/icon-192x192.png"; // Fallback para ícone genérico se não tiver logo customizado
    
    tr.innerHTML = `
      <td><img src="${logoImg}" class="tbl-thumb" alt="Logo" style="background-color:#eee; padding:5px;"></td>
      <td><strong>${item.nome}</strong></td>
      <td><a href="${item.link}" target="_blank" style="color:var(--color-gold); font-weight:500;">Link ↗</a></td>
      <td>${item.ordem}º</td>
      <td class="actions-cell">
        <button class="btn-tbl-edit" onclick="editarPatrocinador(${item.id})">Editar</button>
        <button class="btn-tbl-delete" onclick="deletarPatrocinador(${item.id})">Excluir</button>
      </td>
    `;
    corpo.appendChild(tr);
  });
}

function salvarPatrocinador(e) {
  e.preventDefault();
  
  const idEdit = document.getElementById("patrocinador-edit-id").value;
  const nomeVal = document.getElementById("pat-nome").value.trim();
  const logoVal = document.getElementById("pat-logo").value.trim();
  const linkVal = document.getElementById("pat-link").value.trim() || "https://wa.me/5527999879870";
  const ordemVal = parseInt(document.getElementById("pat-ordem").value, 10);
  
  if (idEdit) {
    const idx = patrocinadores.findIndex(p => p.id === parseInt(idEdit, 10));
    if (idx !== -1) {
      patrocinadores[idx] = { id: parseInt(idEdit, 10), nome: nomeVal, logo: logoVal, link: linkVal, ordem: ordemVal };
    }
  } else {
    const novoId = patrocinadores.length > 0 ? Math.max(...patrocinadores.map(p => p.id)) + 1 : 1;
    patrocinadores.push({ id: novoId, nome: nomeVal, logo: logoVal, link: linkVal, ordem: ordemVal });
  }
  
  localStorage.setItem("PULSO_SPONSORS", JSON.stringify(patrocinadores));
  fecharFormulario("patrocinador");
  renderizarListaPatrocinadores();
}

window.editarPatrocinador = function(id) {
  const item = patrocinadores.find(p => p.id === id);
  if (!item) return;
  
  abrirFormulario("patrocinador");
  document.getElementById("form-patrocinador-titulo").textContent = "Editar Patrocinador";
  
  document.getElementById("patrocinador-edit-id").value = item.id;
  document.getElementById("pat-nome").value = item.nome;
  document.getElementById("pat-logo").value = item.logo;
  document.getElementById("pat-link").value = item.link === "https://wa.me/5527999879870" ? "" : item.link;
  document.getElementById("pat-ordem").value = item.ordem;
};

window.deletarPatrocinador = function(id) {
  if (confirm("Remover este patrocinador?")) {
    patrocinadores = patrocinadores.filter(p => p.id !== id);
    localStorage.setItem("PULSO_SPONSORS", JSON.stringify(patrocinadores));
    renderizarListaPatrocinadores();
  }
};
