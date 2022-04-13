# Build manual

(yarn is used instead of npm)
to install [yarn](https://yarnpkg.com/):
```
npm install yarn
```

---
# For production
### 1. Install project dependencies 
```
yarn
```

### 2. Build static files for production
```
yarn dist
```

### 3. Serve static files with any web-server (nginx / gunicorn / e.t.c.)
<details>
 <summary>Nginx config template:</summary>

 ```
    TODO: Config template
 ```
</details>

---
# For development
### Compiles and hot-reloads for development
```
yarn dev
```
### Run your unit tests
*not done*

### Lints and fixes files
```
yarn lint --fix
```
