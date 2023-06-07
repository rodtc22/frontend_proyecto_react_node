```bash
npm create vite@latest

ok to proceed? yes
Project name: front_proyecto_react_node
Select a framework: React
Select a variant: JavaScript + SWC (swc es como babel, transcompilador)

Done. Now run:
  cd front_proyecto_react_node
  npm install
  npm run dev
```

## Comando para crear estructura de inmediato
1. Instalar la extension React-Native/React/Redux snippets

2. En el nuevo archivo poner: imr PARA IMPORTAR LA LIBRERIA REACT

3. En el nuevo archivo poner: slr PARA EL STATELESS COMPONNET RETURN

## Instalar React router dom
Nos va a servir para navegar entre paginas
```bash
npm i react-router-dom
```

Hay 2 routers
* HashRouter: La url seria        http://localhost:5173/#/login
* BrowserRouter: La url seria     http://localhost:5173/login

## Conectando al servidor backend
Nos va a dar error por que front esta en un puerto, back esta en otro puerto, entonces usamos `cors`, por el error de politica de cors, se llama bloqueo de cors, entonces LO INSTALAMOS EN EL BACKEND

Luego  instalamos `axios` para que podamos hacer las peticiones al backend

