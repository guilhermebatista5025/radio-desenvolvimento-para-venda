// Rádio Pulso FM - Módulo de Notícias e Renderização Dinâmica
// Array de notícias mockadas de alta qualidade e relevância local/nacional

const NOTICIAS_MOCK = [
  {
    id: 1,
    titulo: "Show do Coldplay em Vila Velha agita mais de 50 mil pessoas na Praia da Costa",
    resumo: "A icônica banda britânica realizou uma apresentação histórica à beira-mar com luzes, efeitos especiais e sucessos mundiais.",
    textoCompleto: "A Praia da Costa, em Vila Velha, foi palco de um dos maiores eventos musicais da história do Espírito Santo. A renomada banda Coldplay atraiu uma multidão estimada em mais de 50 mil pessoas para um show histórico na noite de ontem. Com um palco flutuante na areia e as tradicionais pulseiras de LED iluminando toda a orla, a apresentação contou com grandes sucessos da carreira do grupo, incluindo 'Yellow', 'Fix You' e 'Viva La Vida'. O vocalista Chris Martin arriscou palavras em português e elogiou o calor e a energia do público capixaba. A prefeitura montou um forte esquema de segurança e transporte público especial, garantindo que o evento transcorresse sem grandes incidentes.",
    categoria: "Entretenimento",
    imagem: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=600",
    data: "30 de Maio de 2026"
  },
  {
    id: 2,
    titulo: "Novo parque linear na orla de Itaparica terá ciclovias e áreas de lazer modernas",
    resumo: "Projeto avaliado em R$ 15 milhões promete transformar a infraestrutura de lazer, integrando esportes e convivência comunitária.",
    textoCompleto: "Foi anunciado na manhã de hoje o início das obras do novo Parque Linear de Itaparica. O projeto, orçado em 15 milhões de reais pela Prefeitura de Vila Velha, prevê a revitalização completa de 2 km da orla marítima. O novo espaço contará com ciclovias exclusivas bidirecionais, pista de cooper com piso emborrachado, três quadras poliesportivas modernas, playgrounds com brinquedos acessíveis, além de uma ampla praça de alimentação ao ar livre. Segundo o secretário de Obras, a previsão de entrega é de 10 meses e o objetivo principal é promover a saúde, o esporte e o turismo na região, transformando o espaço em uma referência de convivência e lazer no estado.",
    categoria: "Local",
    imagem: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600",
    data: "29 de Maio de 2026"
  },
  {
    id: 3,
    titulo: "Seleção Brasileira de Beach Soccer treina na Praia de Itaparica visando Copa do Mundo",
    resumo: "Atletas realizam preparação física e tática nas areias capixabas, recebendo o carinho dos torcedores de Vila Velha.",
    textoCompleto: "A areia fina e as excelentes condições climáticas de Vila Velha atraíram a Seleção Brasileira de Beach Soccer. O elenco está concentrado na Praia de Itaparica para uma semana intensa de treinamentos físicos e táticos. Sob o comando da comissão técnica, os atletas se preparam para a disputa da Copa do Mundo de Futebol de Areia, que ocorrerá no próximo semestre. Treinos abertos ao público atraíram centenas de torcedores e crianças das escolinhas de futebol locais, que puderam ver de perto os astros da seleção. O capitão da equipe destacou que o acolhimento do povo capixaba serve como um combustível extra para buscar o título mundial.",
    categoria: "Esporte",
    imagem: "https://images.unsplash.com/photo-1519766304817-4f37bda74a27?auto=format&fit=crop&q=80&w=600",
    data: "28 de Maio de 2026"
  },
  {
    id: 4,
    titulo: "Inflação oficial cai pelo terceiro mês consecutivo e impulsiona varejo local",
    resumo: "Dados do IBGE mostram desaceleração nos preços de alimentos e transportes, gerando otimismo nos lojistas de Vila Velha.",
    textoCompleto: "O Índice de Preços ao Consumidor Amplo (IPCA), considerado a inflação oficial do país, registrou uma queda consecutiva pelo terceiro mês. A desaceleração foi puxada principalmente pela queda nos preços de combustíveis e alimentos da cesta básica. Essa notícia gerou grande otimismo no comércio varejista da Grande Vitória, especialmente no Polo de Confecções da Glória. Lojistas esperam um crescimento de até 12% nas vendas no próximo trimestre, impulsionado pelo aumento do poder de compra das famílias. Economistas apontam que a estabilidade de preços favorece o planejamento de longo prazo e estimula novas contratações no setor de serviços.",
    categoria: "Nacional",
    imagem: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=600",
    data: "27 de Maio de 2026"
  },
  {
    id: 5,
    titulo: "Festival Gastronômico de Vila Velha reúne chefs renomados e culinária capixaba",
    resumo: "O evento traz pratos autorais, releituras da famosa Torta Capixaba e shows de MPB na Praça do Farol de Santa Luzia.",
    textoCompleto: "Vila Velha sedia a partir desta quinta-feira a 8ª edição do seu aguardado Festival Gastronômico. O evento, montado na histórica Praça do Farol de Santa Luzia, reúne 15 restaurantes locais que prepararam cardápios exclusivos a preços promocionais. O grande destaque são as releituras da tradicional Torta Capixaba e da Moqueca, além de cervejas artesanais produzidas na região metropolitana. Além dos pratos deliciosos, o público poderá acompanhar workshops culinários gratuitos com chefs de renome nacional e curtir apresentações diárias de artistas locais tocando MPB e Jazz. O festival segue até o final do fim de semana com entrada franca.",
    categoria: "Local",
    imagem: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600",
    data: "26 de Maio de 2026"
  },
  {
    id: 6,
    titulo: "Rádio Pulso FM anuncia transmissão HD e novas promoções com prêmios exclusivos",
    resumo: "Emissora investe em tecnologia digital de ponta para transmissão online e prepara sorteio de ingressos para grandes shows.",
    textoCompleto: "A Rádio Pulso FM continua inovando e expandindo suas fronteiras digitais. Foi anunciado hoje o lançamento do novo sistema de transmissão HD Online, que garante som com fidelidade de estúdio e latência ultra-baixa, consumindo até 40% menos dados móveis no celular dos ouvintes. Para comemorar, a emissora está lançando a campanha 'O Pulso te Leva', que sorteará dezenas de convites VIPs para os principais festivais de música do país, além de prêmios em dinheiro e smartphones. Os ouvintes podem se cadastrar pelo formulário de contato do site, enviando uma mensagem criativa dizendo por que a Pulso FM é o pulso da cidade.",
    categoria: "Entretenimento",
    imagem: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600",
    data: "25 de Maio de 2026"
  },
  {
    id: 7,
    titulo: "Corrida da Penha bate recorde histórico com mais de 6 mil atletas confirmados",
    resumo: "Competição tradicional do Espírito Santo terá percurso cênico ligando Vitória a Vila Velha pela Terceira Ponte.",
    textoCompleto: "A tradicional Corrida da Penha, maior circuito esportivo de rua do estado, superou todas as expectativas para a edição de 2026. A organização confirmou a inscrição de mais de 6 mil corredores profissionais e amadores de todas as regiões do Brasil. Com largada na capital capixaba e chegada na Prainha de Vila Velha, o percurso conta com a emocionante travessia da Terceira Ponte, oferecendo uma vista deslumbrante aos participantes. O evento movimentará a rede hoteleira e a economia local. Haverá interdições parciais de trânsito programadas no domingo pela manhã para assegurar a integridade dos corredores, com desvios devidamente sinalizados.",
    categoria: "Esporte",
    imagem: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=600",
    data: "24 de Maio de 2026"
  },
  {
    id: 8,
    titulo: "Investimentos em infraestrutura de saneamento são aprovados para Vila Velha",
    resumo: "Parceria público-privada destinará R$ 40 milhões para expandir redes de esgoto e reduzir impactos de chuvas fortes.",
    textoCompleto: "A qualidade de vida dos moradores de Vila Velha receberá um reforço histórico. Foi aprovada uma verba de 40 milhões de reais decorrentes de um plano conjunto de investimento em saneamento básico. As obras têm como objetivo estender a rede de coleta e tratamento de esgoto para bairros da periferia do município e ampliar o sistema de drenagem pluvial nas áreas propensas a alagamentos em períodos de fortes chuvas. A concessionária de água informou que os serviços se iniciarão no início do próximo mês e trarão melhorias diretas na saúde pública e na despoluição de canais e praias da cidade.",
    categoria: "Nacional",
    imagem: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
    data: "23 de Maio de 2026"
  }
];

// Configurações de paginação para noticias.html
const ITENS_POR_PAGINA = 6;
let paginaAtual = 1;
let categoriaFiltrada = "Todas";
let buscaTexto = "";

// Array ativo de notícias que opera na renderização e paginação
let NOTICIAS_ATUAIS = [];

// Função auxiliar para mapear categorias de notícias do IBGE
function mapearCategoriaIBGE(editorias, id) {
  if (!editorias) return "Nacional";
  const edit = editorias.toLowerCase();
  
  if (edit.includes("esporte")) return "Esporte";
  if (edit.includes("social") || edit.includes("demogra") || edit.includes("censo")) return "Local";
  if (edit.includes("cultura") || edit.includes("lazer") || edit.includes("entrete") || edit.includes("cinema") || edit.includes("show")) return "Entretenimento";
  
  // Se não encontrar nenhuma correspondência óbvia, distribui com base no ID
  const resto = id % 4;
  if (resto === 0) return "Local";
  if (resto === 1) return "Nacional";
  if (resto === 2) return "Esporte";
  return "Entretenimento";
}

// Função auxiliar para formatar a data de publicação no estilo PT-BR
function formatarDataIBGE(dataStr) {
  if (!dataStr) return "Recente";
  
  try {
    // dataStr no IBGE é "dd/mm/aaaa hh:mm:ss"
    const partes = dataStr.split(" ");
    if (partes.length > 0) {
      const dataPartes = partes[0].split("/");
      if (dataPartes.length === 3) {
        const dia = dataPartes[0];
        const mesNum = parseInt(dataPartes[1], 10);
        const ano = dataPartes[2];
        
        const meses = [
          "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
          "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];
        
        if (mesNum >= 1 && mesNum <= 12) {
          return `${dia} de ${meses[mesNum - 1]} de ${ano}`;
        }
      }
    }
  } catch (e) {
    console.error("Erro ao formatar data:", e);
  }
  return dataStr; // Retorna original em caso de falha
}

// Renderiza a estrutura de skeleton loaders animada
function renderizarSkeletons(container, quantidade = 6) {
  container.innerHTML = "";
  for (let i = 0; i < quantidade; i++) {
    const card = document.createElement("div");
    card.className = "skeleton-card";
    card.innerHTML = `
      <div class="skeleton-img"></div>
      <div class="skeleton-info">
        <div class="skeleton-text s-date"></div>
        <div class="skeleton-text s-title"></div>
        <div class="skeleton-text s-title-2"></div>
        <div class="skeleton-text s-desc"></div>
        <div class="skeleton-text s-desc-2"></div>
        <div class="skeleton-text s-desc-3"></div>
        <div class="skeleton-text s-btn"></div>
      </div>
    `;
    container.appendChild(card);
  }
}

// Busca notícias dinamicamente a partir da API oficial do IBGE
async function carregarNoticiasAPI() {
  const API_URL = "https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=30";
  
  // Timeout de 4 segundos usando Promise.race
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout na conexão")), 4000)
  );
  
  try {
    const fetchPromise = fetch(API_URL);
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    
    if (!response.ok) throw new Error(`HTTP erro! Status: ${response.status}`);
    
    const dados = await response.json();
    
    if (!dados || !dados.items || dados.items.length === 0) {
      throw new Error("Resposta da API vazia ou incorreta.");
    }
    
    // Mapear notícias da API para a nossa estrutura
    NOTICIAS_ATUAIS = dados.items.map((item) => {
      // Tratar a imagem principal
      let imageUrl = "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=600"; // Fallback premium
      if (item.imagens) {
        try {
          const imgObj = typeof item.imagens === 'string' ? JSON.parse(item.imagens) : item.imagens;
          if (imgObj && imgObj.image_intro) {
            imageUrl = "https://agenciadenoticias.ibge.gov.br/" + imgObj.image_intro;
          } else if (imgObj && imgObj.image_fulltext) {
            imageUrl = "https://agenciadenoticias.ibge.gov.br/" + imgObj.image_fulltext;
          }
        } catch (e) {
          console.warn(`Não foi possível carregar a imagem para notícia ID ${item.id}, usando padrão.`, e);
        }
      }
      
      const categoriaMapeada = mapearCategoriaIBGE(item.editorias, item.id);
      const dataFormatada = formatarDataIBGE(item.data_publicacao);
      
      // Estilizar o corpo do modal com uma estrutura rica e botão externo
      const textoModal = `
        <p class="resumo-completo">${item.introducao}</p>
        <div class="link-completo">
          <p>Esta notícia de relevância nacional foi fornecida em tempo real pela <strong>Agência de Notícias IBGE</strong>.</p>
          <p>Para conferir a matéria completa contendo tabelas estatísticas, infográficos adicionais e relatórios técnicos do órgão oficial, acesse o link de leitura abaixo:</p>
        </div>
        <a href="${item.link}" target="_blank" class="noticia-link-externo" aria-label="Acessar matéria original no site do IBGE">
          Ler Matéria Completa no IBGE
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      `;
      
      return {
        id: item.id,
        titulo: item.titulo,
        resumo: item.introducao,
        textoCompleto: textoModal,
        categoria: categoriaMapeada,
        imagem: imageUrl,
        data: dataFormatada
      };
    });
    
    console.log(`Sucesso: ${NOTICIAS_ATUAIS.length} notícias reais carregadas da API do IBGE.`);
    
  } catch (erro) {
    console.warn("Falha ao buscar notícias online. Ativando fallback de alta confiabilidade:", erro);
    // Ativa fallback com as notícias mockadas estruturadas
    NOTICIAS_ATUAIS = [...NOTICIAS_MOCK];
  }
}

// Inicialização da exibição de notícias
document.addEventListener("DOMContentLoaded", () => {
  initNoticias();
});

async function initNoticias() {
  const containerHome = document.getElementById("noticias-home-grid");
  const containerCompleto = document.getElementById("noticias-page-grid");
  
  // Renderizar Skeletons inicialmente para um visual extremamente premium
  if (containerHome) {
    renderizarSkeletons(containerHome, 6);
  }
  
  if (containerCompleto) {
    renderizarSkeletons(containerCompleto, 6);
  }
  
  // Buscar notícias reais
  await carregarNoticiasAPI();
  
  if (containerHome) {
    // Renderizar apenas as 6 primeiras notícias na Home com um pequeno atraso para efeito visual suave
    setTimeout(() => {
      renderizarNoticias(NOTICIAS_ATUAIS.slice(0, 6), containerHome);
    }, 400);
  }
  
  if (containerCompleto) {
    // Renderizar na página de notícias completa com filtros
    setTimeout(() => {
      configurarFiltrosNoticias();
      atualizarNoticiasPagina();
    }, 400);
  }

  // Inicializar listeners do Modal global de notícias
  configurarModalNoticia();
}


// Renderiza a lista de notícias fornecida no container especificado
function renderizarNoticias(lista, container) {
  container.innerHTML = "";
  
  if (lista.length === 0) {
    container.innerHTML = `
      <div class="sem-noticias">
        <p>Nenhuma notícia encontrada com os filtros selecionados.</p>
      </div>
    `;
    return;
  }
  
  lista.forEach((noticia) => {
    const card = document.createElement("article");
    card.className = "noticia-card";
    card.setAttribute("data-id", noticia.id);
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Notícia: ${noticia.titulo}. Categoria: ${noticia.categoria}`);
    
    // Mapear cores para as categorias
    const classeBadge = obterClasseBadge(noticia.categoria);
    
    card.innerHTML = `
      <div class="noticia-img-wrapper">
        <img src="${noticia.imagem}" alt="${noticia.titulo}" class="noticia-img" loading="lazy">
        <span class="noticia-badge ${classeBadge}">${noticia.categoria}</span>
      </div>
      <div class="noticia-info">
        <span class="noticia-data">${noticia.data}</span>
        <h3 class="noticia-titulo">${noticia.titulo}</h3>
        <p class="noticia-resumo">${noticia.resumo}</p>
        <button class="noticia-btn-ler" aria-label="Ler mais sobre: ${noticia.titulo}">
          Ler Notícia
          <svg class="icon-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    `;
    
    // Clique para expandir a notícia (Modal)
    card.addEventListener("click", () => abrirModalNoticia(noticia));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        abrirModalNoticia(noticia);
      }
    });
    
    container.appendChild(card);
  });
}

// Retorna uma classe de badge correspondente à categoria
function obterClasseBadge(categoria) {
  switch (categoria.toLowerCase()) {
    case "local": return "badge-local";
    case "nacional": return "badge-nacional";
    case "esporte": return "badge-esporte";
    case "entretenimento": return "badge-entretenimento";
    default: return "badge-padrao";
  }
}

// Configura os botões de filtro e busca na página noticias.html
function configurarFiltrosNoticias() {
  const botoesFiltro = document.querySelectorAll(".filtro-btn");
  const inputBusca = document.getElementById("busca-noticia");
  
  if (botoesFiltro) {
    botoesFiltro.forEach(botao => {
      botao.addEventListener("click", (e) => {
        botoesFiltro.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        
        categoriaFiltrada = e.target.getAttribute("data-categoria");
        paginaAtual = 1; // Reseta para a primeira página
        atualizarNoticiasPagina();
      });
    });
  }
  
  if (inputBusca) {
    inputBusca.addEventListener("input", (e) => {
      buscaTexto = e.target.value.toLowerCase();
      paginaAtual = 1; // Reseta para a primeira página
      atualizarNoticiasPagina();
    });
  }
}

// Filtra, pagina e renderiza as notícias de noticias.html
function atualizarNoticiasPagina() {
  const container = document.getElementById("noticias-page-grid");
  if (!container) return;
  
  // 1. Filtrar por categoria e busca
  const noticiasFiltradas = NOTICIAS_ATUAIS.filter(noticia => {
    const atendeCategoria = (categoriaFiltrada === "Todas" || noticia.categoria.toLowerCase() === categoriaFiltrada.toLowerCase());
    const atendeBusca = (noticia.titulo.toLowerCase().includes(buscaTexto) || noticia.resumo.toLowerCase().includes(buscaTexto));
    return atendeCategoria && atendeBusca;
  });
  
  // 2. Calcular paginação
  const totalItens = noticiasFiltradas.length;
  const totalPaginas = Math.ceil(totalItens / ITENS_POR_PAGINA) || 1;
  
  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const fim = inicio + ITENS_POR_PAGINA;
  const noticiasExibidas = noticiasFiltradas.slice(inicio, fim);
  
  // 3. Renderizar
  renderizarNoticias(noticiasExibidas, container);
  
  // 4. Renderizar Paginação
  renderizarPaginacao(totalPaginas);
}

// Renderiza a barra de paginação estilizada
function renderizarPaginacao(totalPaginas) {
  const containerPaginacao = document.getElementById("paginacao-container");
  if (!containerPaginacao) return;
  
  containerPaginacao.innerHTML = "";
  
  if (totalPaginas <= 1) return;
  
  // Botão Anterior
  const btnAnterior = document.createElement("button");
  btnAnterior.className = `pag-btn btn-prev ${paginaAtual === 1 ? 'disabled' : ''}`;
  btnAnterior.innerHTML = "&laquo; Anterior";
  btnAnterior.setAttribute("aria-label", "Página anterior");
  if (paginaAtual > 1) {
    btnAnterior.addEventListener("click", () => {
      paginaAtual--;
      atualizarNoticiasPagina();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    });
  }
  containerPaginacao.appendChild(btnAnterior);
  
  // Números de páginas
  for (let i = 1; i <= totalPaginas; i++) {
    const btnNum = document.createElement("button");
    btnNum.className = `pag-btn btn-num ${paginaAtual === i ? 'active' : ''}`;
    btnNum.textContent = i;
    btnNum.setAttribute("aria-label", `Ir para página ${i}`);
    btnNum.addEventListener("click", () => {
      paginaAtual = i;
      atualizarNoticiasPagina();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    });
    containerPaginacao.appendChild(btnNum);
  }
  
  // Botão Próximo
  const btnProximo = document.createElement("button");
  btnProximo.className = `pag-btn btn-next ${paginaAtual === totalPaginas ? 'disabled' : ''}`;
  btnProximo.innerHTML = "Próxima &raquo;";
  btnProximo.setAttribute("aria-label", "Próxima página");
  if (paginaAtual < totalPaginas) {
    btnProximo.addEventListener("click", () => {
      paginaAtual++;
      atualizarNoticiasPagina();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    });
  }
  containerPaginacao.appendChild(btnProximo);
}

// Inicializa o modal de notícias
let modalFocoAnterior = null;

function configurarModalNoticia() {
  const modal = document.getElementById("noticia-modal");
  const btnFechar = document.getElementById("modal-fechar");
  
  if (!modal || !btnFechar) return;
  
  // Fechar no clique do X
  btnFechar.addEventListener("click", fecharModalNoticia);
  
  // Fechar ao clicar fora do conteúdo
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      fecharModalNoticia();
    }
  });
  
  // Fechar com a tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      fecharModalNoticia();
    }
  });
}

// Abre o modal com os dados da notícia correspondente
function abrirModalNoticia(noticia) {
  const modal = document.getElementById("noticia-modal");
  if (!modal) return;
  
  // Guardar elemento focado para restabelecer acessibilidade
  modalFocoAnterior = document.activeElement;
  
  document.getElementById("modal-img").src = noticia.imagem;
  document.getElementById("modal-img").alt = noticia.titulo;
  
  const badge = document.getElementById("modal-badge");
  badge.textContent = noticia.categoria;
  badge.className = `modal-badge ${obterClasseBadge(noticia.categoria)}`;
  
  document.getElementById("modal-data").textContent = noticia.data;
  document.getElementById("modal-titulo").textContent = noticia.titulo;
  document.getElementById("modal-corpo").innerHTML = noticia.textoCompleto;
  
  // Abrir com animação
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Travar scroll de fundo
  
  // Focar no botão fechar para acessibilidade
  setTimeout(() => {
    document.getElementById("modal-fechar").focus();
  }, 100);
}

// Fecha o modal
function fecharModalNoticia() {
  const modal = document.getElementById("noticia-modal");
  if (!modal) return;
  
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Liberar scroll
  
  // Devolver foco para o card de origem
  if (modalFocoAnterior) {
    modalFocoAnterior.focus();
  }
}
