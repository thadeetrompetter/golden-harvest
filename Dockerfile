FROM thadee/alpinode
WORKDIR /
COPY ./index.js /
COPY ./package.json /
RUN npm install
EXPOSE 3000
