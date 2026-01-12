FROM nginx:alpine

# Remove arquivo de configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copia arquivos do site
COPY index.html /usr/share/nginx/html/
COPY rsvp.html /usr/share/nginx/html/
COPY presentes.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Cria diretório para assets (o conteúdo será montado via volume no docker-compose)
RUN mkdir -p /usr/share/nginx/html/assets

# Expõe porta 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
