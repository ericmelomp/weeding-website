FROM nginx:alpine

# Instala wget para health check
RUN apk add --no-cache wget

# Remove arquivo de configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copia arquivos do site
COPY index.html /usr/share/nginx/html/
COPY rsvp.html /usr/share/nginx/html/
COPY presentes.html /usr/share/nginx/html/
COPY admin.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY presentes-data.json /usr/share/nginx/html/

# Copia assets (imagens) para o container
# Garante que o diretório existe primeiro
RUN mkdir -p /usr/share/nginx/html/assets
# Copia o diretório assets completo (inclui todos os arquivos)
COPY assets/ /usr/share/nginx/html/assets/

# Expõe porta 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
