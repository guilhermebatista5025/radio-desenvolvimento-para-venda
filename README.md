# radio-desenvolvimento-para-venda

Crie um projeto completo de uma rádio FM online moderna como PWA (Progressive Web App) real e funcional, utilizando apenas HTML, CSS e JavaScript puro, com arquivos separados e estrutura organizada para produção profissional.
Identidade da rádio:

Nome: Rádio Pulso FM
Frequência: 98.7 FM
Cidade: Vila Velha – ES
Segmento: Pop, Sertanejo e Notícias
Slogan: "O pulso da sua cidade"

Estrutura de arquivos obrigatória:
/index.html
/noticias.html
/manifest.json
/service-worker.js
/css/style.css
/css/noticias.css
/js/script.js
/js/player.js
/js/noticias.js
/assets/images/
/assets/icons/ (ícones PWA: 192x192 e 512x512)
PWA completo:

manifest.json com name, short_name, icons, theme_color, background_color, display standalone
service-worker.js com cache de assets estáticos para uso offline
Botão "Instalar Aplicativo" funcional com evento beforeinstallprompt
Meta tags PWA no <head> (apple-mobile-web-app, theme-color)

SEO e performance:

<meta name="description"> descritiva
Open Graph tags (og:title, og:description, og:image)
Twitter Card tags
Favicon .ico
HTML semântico: <header>, <main>, <nav>, <article>, <section>, <footer>
Variáveis CSS em :root para cores, fontes e espaçamentos

Acessibilidade:

aria-label em todos os botões e ícones
alt descritivo em todas as imagens
Foco visível para navegação por teclado
Contraste de cores seguindo WCAG AA

Seções do index.html:

Header fixo

Logo SVG inline da rádio
Menu de navegação com âncoras suaves
Badge "NO AR" pulsante em vermelho quando player ativo
Botão "Ouvir Agora" com destaque dourado
Menu hambúrguer funcional no mobile


Hero Section

Nome e frequência em destaque
Slogan animado com efeito typewriter
Fundo com gradiente escuro + efeito de ondas sonoras animadas em CSS
Mini player flutuante com botão play


Player principal

Tag <audio> real com URL de stream configurável via variável JS
Botão play/pause com ícone SVG animado
Indicador "AO VIVO" pulsante
Exibição de música atual e artista (atualizável via JS)
Controle de volume com slider estilizado
Equalizer animado em CSS (barras verticais)
Botão mudo (mute)


Ao Vivo Agora

Card mostrando programa atual
Nome do locutor de plantão
Horário do programa
Foto do locutor
Próximo programa em destaque


Notícias (seção no index + página dedicada)

6 cards de notícias em grid responsivo
Categorias com badges coloridos: Local, Nacional, Esporte, Entretenimento
Imagem, título, resumo, data e categoria em cada card
Botão "Ver todas as notícias" → noticias.html
Estrutura pronta para integrar API REST futuramente (fetch comentado no JS)


Programação

Grade semanal ou cards por horário
Destaque visual para o programa atual
Nome do locutor, horário de início e fim
Ícone temático de cada programa


Locutores

Cards com avatar (placeholder SVG estilizado)
Nome, função e bio curta
Links para redes sociais (Instagram, WhatsApp) com ícones SVG
Efeito hover com overlay dourado


Instalar App (PWA)

Seção visual motivando instalação
Botão "Instalar no seu celular" funcional
Instruções visuais para iOS (que não suporta beforeinstallprompt)
Mockup de celular com o app em CSS puro


Contato

Link direto para WhatsApp com número configurável
Link para Instagram
Email clicável (mailto:)
Endereço com link para Google Maps
Formulário simples: nome, e-mail, mensagem (front-end apenas)


Footer

Logo menor
Links rápidos
Redes sociais com ícones SVG
Aviso LGPD / Política de Privacidade (link)
Copyright com ano dinâmico via JS



noticias.html:

Grid de notícias com filtro por categoria (JS puro)
Campo de busca por título
Paginação visual (front-end)
Card expandido ao clicar (modal ou página)

JavaScript organizado:

script.js: inicialização geral, menu mobile, scroll suave, ano dinâmico, animações
player.js: controle do <audio>, play/pause, volume, mute, atualização de metadados, URL de stream como constante configurável no topo do arquivo
noticias.js: array de notícias mockadas, renderização dinâmica, filtro por categoria, busca

Estilo visual:

Paleta: #0a0a0a (preto), #1a1008 (marrom escuro), #c9a84c (dourado), #2a2a2a (grafite), #ffffff (texto)
Fonte principal: Inter ou Poppins via Google Fonts
Fonte de destaque: Playfair Display para títulos
Efeitos: glassmorphism nos cards, sombras douradas no hover, gradientes escuros
Animações: apenas CSS (sem bibliotecas), transições suaves de 0.3s
Mobile-first: breakpoints em 768px e 1024px

Configurações centralizadas no topo de cada JS:
js// player.js
const STREAM_URL = "https://sua-url-icecast.com/stream";
const RADIO_NAME = "Rádio Pulso FM";
Importante:

Zero frameworks, zero bibliotecas externas pesadas
Google Fonts é permitido via <link>
Ícones exclusivamente SVG inline ou em /assets/icons
Código comentado em português
Resultado deve parecer site real pronto para produção