# Usar una imagen de Node.js versión 18 como base
FROM node:18.19.0

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json (si existe) al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm ci

# Copiar los archivos del proyecto al contenedor
COPY . .

# Compilar los archivos TypeScript a JavaScript
RUN npm run build

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Definir el comando para ejecutar la aplicación
CMD ["npm", "start"]
