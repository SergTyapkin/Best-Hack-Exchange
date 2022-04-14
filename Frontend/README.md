# Build manual

(yarn is used instead of npm)
to install [yarn](https://yarnpkg.com/):
```bash
npm install yarn
```

---
# For production
### 1. Install project dependencies 
```bash
yarn
```

### 2. Build static files for production
```bash
yarn dist
```

### 3. Serve static files with any web-server (nginx / gunicorn / e.t.c.)
You need to serve static files from directory ./dist and proxy requests to api to Backend docker process.

[Nginx server config template](nginx/frontend.conf)


---
# For development
### Compiles and hot-reloads for development
```bash
yarn dev
```
### Run your unit tests
*not done*

### Lints and fixes files
```bash
yarn lint --fix
```
