FROM node:alpine    
EXPOSE 3000
COPY infra/json-server/data/db.json /opt/db.json
RUN yarn global add json-server
CMD ["json-server", "-H", "0.0.0.0", "/opt/db.json"]