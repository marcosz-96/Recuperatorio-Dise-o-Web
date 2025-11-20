# Recuperatorio-Dise-o-Web
Recuperatorio de la materia Diseño Web. Gomez Marco

# Galería de Fotos

Aplicación web desarrollada en Angular para gestionar una galería de fotos utilizando la API de JSONPlaceholder.

## Descripción

Esta aplicación permite visualizar, agregar, editar y eliminar fotos. Los datos se obtienen de la API pública de JSONPlaceholder y se gestionan mediante una interfaz de usuario intuitiva con tabla y formularios.

## Características

- Visualización de lista de fotos en tabla
- Agregar nuevas fotos desde el pie de tabla (tfoot)
- Editar fotos existentes mediante modal
- Eliminar fotos con confirmación
- Campos: ID, Título, Album ID, Ruta de Imagen, Ruta de Miniatura

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Angular CLI

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

## Uso

1. Iniciar el servidor de desarrollo:
```bash
ng serve
```

2. Abrir el navegador en:
```
http://localhost:4200
```

3. La aplicación cargará automáticamente las fotos desde la API

## Funcionalidades

- **Ver lista**: Las fotos se cargan automáticamente al iniciar
- **Agregar foto**: Completar el formulario en el pie de la tabla y hacer clic en "Guardar"
- **Editar foto**: Hacer clic en el botón "Editar" de cualquier fila, modificar los datos en el modal y hacer clic en "Actualizar"
- **Eliminar foto**: Hacer clic en el botón "Eliminar" y confirmar la acción

## Nota

Esta aplicación utiliza JSONPlaceholder, una API de prueba que no persiste cambios. Las modificaciones se reflejan localmente en la aplicación pero no se guardan permanentemente en el servidor.

## Build

Para generar una versión de producción:
```bash
ng build
```

Los archivos compilados se guardarán en la carpeta `dist/`.

