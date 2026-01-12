# Site do Casamento - Suzana & Eric

Website minimalista e elegante para o casamento de Suzana & Eric, comemorado em 10 de abril de 2027.

## 🎨 Características

- Design minimalista e elegante
- Paleta de cores neutra com detalhes dourados
- Totalmente responsivo (mobile-first)
- Animações suaves e microinterações
- Contagem regressiva em tempo real
- Formulário de confirmação de presença (RSVP)
- Lista de presentes
- FAQ interativo
- Integração com Google Maps
- Download de evento para calendário (.ics)

## 🚀 Como executar

### Usando Docker (Recomendado)

#### Construir e executar

```bash
# Construir a imagem
docker-compose build

# Executar o container
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar o container
docker-compose down
```

O site estará disponível em: `http://localhost:8080`

### Sem Docker

Você pode simplesmente abrir o arquivo `index.html` no navegador, mas algumas funcionalidades podem não funcionar corretamente devido a restrições de CORS.

Para desenvolvimento local, você pode usar um servidor HTTP simples:

#### Python 3

```bash
python -m http.server 8000
```

#### Node.js (http-server)

```bash
npx http-server -p 8000
```

## 📁 Estrutura do Projeto

```
wedding/
├── assets/              # Imagens e assets
│   ├── logobrasao.png  # Logo do brasão (adicionar)
│   └── noivos_preto_branco.png  # Foto dos noivos (adicionar)
├── index.html          # Página principal
├── rsvp.html           # Página de confirmação de presença
├── presentes.html      # Página de lista de presentes
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
├── Dockerfile          # Configuração Docker
├── docker-compose.yml  # Orquestração Docker
├── nginx.conf          # Configuração Nginx
└── README.md           # Este arquivo
```

## 🎨 Personalização

### Cores

As cores podem ser personalizadas no arquivo `styles.css` através das variáveis CSS:

```css
:root {
    --color-bg: #F7F4EF;        /* Fundo off-white */
    --color-text: #1F1F1F;      /* Texto grafite */
    --color-text-light: #6B6B6B; /* Texto cinza */
    --color-gold: #C8A45D;      /* Dourado champagne */
}
```

### Conteúdo

- **Data do casamento**: Atualize no `script.js` (linha do countdown) e nos arquivos HTML
- **Horário e local**: Atualize na seção "O grande dia" no `index.html`
- **Coordenadas do mapa**: Atualize no `script.js` (função `initMapsIntegration`)
- **História do casal**: Edite a seção "Nossa história" no `index.html`
- **Informações de hospedagem**: Edite a seção "Hospedagem" no `index.html`

### Imagens

Adicione as imagens na pasta `assets/`:

- `logobrasao.png` - Logo do brasão "SE"
- `noivos_preto_branco.png` - Foto dos noivos para a seção "Nossa história"

### Formulário RSVP

O formulário RSVP está configurado para enviar emails através do EmailJS. Para configurar:

1. Crie uma conta no [EmailJS](https://www.emailjs.com/) (gratuito até 200 emails/mês)
2. Configure um serviço de email (Gmail, Outlook, etc.)
3. Crie um template de email
4. Atualize as configurações no `script.js`:
   - Substitua `YOUR_PUBLIC_KEY` pela sua Public Key
   - Substitua `YOUR_SERVICE_ID` pelo seu Service ID
   - Substitua `YOUR_TEMPLATE_ID` pelo seu Template ID

**Instruções detalhadas:** Veja o arquivo `EMAILJS_SETUP.md`

Os emails serão enviados para: **ericmelomp@gmail.com**

## 🌐 Deploy

### Deploy em servidor VPS

1. Clone o repositório no servidor
2. Execute `docker-compose up -d`
3. Configure um proxy reverso (Nginx) se necessário
4. Configure SSL com Let's Encrypt

### Deploy em plataformas cloud

#### Netlify / Vercel

Faça upload dos arquivos HTML, CSS e JS. Estas plataformas servirão os arquivos estáticos automaticamente.

#### AWS S3 + CloudFront

1. Faça upload dos arquivos para um bucket S3
2. Configure o CloudFront para servir os arquivos
3. Configure certificado SSL

#### Google Cloud Run

O Dockerfile pode ser usado diretamente no Cloud Run:

```bash
gcloud run deploy wedding-website --source .
```

## 📱 Funcionalidades

- ✅ Design responsivo
- ✅ Contagem regressiva
- ✅ Menu de navegação fixo
- ✅ Formulário RSVP multi-step
- ✅ FAQ com accordion
- ✅ Integração Google Maps
- ✅ Download de evento .ics
- ✅ Animações suaves
- ✅ Microinterações
- ✅ Menu mobile (hambúrguer)

## 🔧 Tecnologias

- HTML5
- CSS3 (Variáveis CSS, Grid, Flexbox)
- JavaScript (Vanilla)
- Nginx (servidor web)
- Docker (containerização)

## 📝 Licença

Este projeto é privado e personalizado para o casamento de Suzana & Eric.

## 📧 Contato

Para dúvidas ou suporte, entre em contato através do formulário de confirmação de presença no site.

---

**Desenvolvido com ❤️ para Suzana & Eric**

*10 de abril de 2027*
