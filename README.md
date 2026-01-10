# Website de Casamento - Suzana & Eric

Website minimalista e elegante para o casamento de Suzana e Eric.

## 🎨 Características

- Design minimalista e elegante
- Cores neutras (branco, preto, cinza) com detalhes em dourado
- Timer de contagem regressiva até 10/04/2027
- Animações suaves e efeitos visuais
- Totalmente responsivo
- Otimizado para performance

## 🚀 Como Executar com Docker

### Pré-requisitos
- Docker instalado
- Docker Compose instalado

### Execução

1. **Usando Docker Compose (recomendado):**
```bash
docker-compose up -d
```

2. **Usando Docker diretamente:**
```bash
docker build -t wedding-website .
docker run -d -p 8080:80 --name wedding-website wedding-website
```

O site estará disponível em: `http://localhost:8080`

### Parar o container

```bash
docker-compose down
```

ou

```bash
docker stop wedding-website
docker rm wedding-website
```

## 📁 Estrutura do Projeto

```
wedding/
├── index.html          # Estrutura HTML
├── styles.css          # Estilos CSS
├── script.js           # JavaScript (timer e animações)
├── Dockerfile          # Configuração do Docker
├── docker-compose.yml  # Orquestração Docker
└── README.md           # Este arquivo
```

## 🎯 Funcionalidades

- **Hero Section**: Apresentação com nomes e data
- **Countdown Timer**: Contagem regressiva em tempo real
- **Seção "Nossa História"**: Mensagem personalizada
- **Animações**: Efeitos de entrada e transições suaves
- **Design Responsivo**: Adaptável a diferentes tamanhos de tela

## 🔧 Personalização

Para personalizar o site, edite:
- `index.html`: Conteúdo e estrutura
- `styles.css`: Cores e estilos
- `script.js`: Data do casamento (linha 2)

## 📝 Notas

- O timer atualiza automaticamente a cada segundo
- As animações são suaves e não intrusivas
- O site é otimizado para carregamento rápido