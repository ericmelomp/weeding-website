# Usar uma imagem nginx leve
FROM nginx:alpine

# Copiar arquivos do site para o diretório do nginx
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

# Expor a porta 80
EXPOSE 80

# O nginx já inicia automaticamente, mas podemos garantir com este comando
CMD ["nginx", "-g", "daemon off;"]