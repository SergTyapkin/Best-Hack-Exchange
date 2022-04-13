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
You need to serve static files from directory ./dist and proxy requests to api to Backend docker process.
<details>
 <summary>Nginx config template:</summary>

```
server {
  server_name best-hack-exchange;

  location / {
    root /home/liokordeployer/LioKorEdu_Frontend/dist;
    try_files $uri /index.html;
  }

  location /api/v1 {
    proxy_redirect off;
    proxy_cache off;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Host $server_name;
    proxy_pass_header X-CSRF-TOKEN;
    proxy_pass http://127.0.0.1:__Docker_backend_port__;
  }

  listen 80;
}
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
