# build static files with yarn
FROM node:12.18.1

ARG API_PORT_ARG=8080
ENV API_PORT=$API_PORT_ARG

# copy all files to /front
WORKDIR /front
COPY . .

# install npm
#RUN apt-get update && apt-get install -y npm
#RUN npm install --global yarn

# install yarn
#RUN apt-get update && apt-get install -y gnupg
#RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
#RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt-get/sources.list.d/yarn.list
#RUN apt-get update && apt-get install -y yarn

# build static files
RUN yarn
RUN yarn dist

# -----------------------
# run dist files on nginx
RUN apt-get update && apt-get install -y nginx

#RUN mkdir -p /etc/nginx/sites-available
#RUN mkdir -p /etc/nginx/sites-enabled

COPY nginx/nginx.conf /etc/nginx/
#COPY nginx/frontend.conf /etc/nginx/sites-available/
#RUN ln -s /etc/nginx/sites-available/frontend.conf /etc/nginx/sites-enabled/

EXPOSE 80

ENTRYPOINT ["/usr/sbin/nginx", "-g", "daemon off;"]
