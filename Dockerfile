FROM node:14-bullseye

#Install Python3
RUN apt-get update || : && apt-get install python3 -y	#required for building

#Mongo related stuff
RUN apt-get install -y gnupg curl dirmngr wget ca-certificates
RUN wget --no-check-certificate -O - https://pgp.mongodb.com/server-6.0.asc > ~/server-6.0.key
RUN gpg --no-default-keyring --keyring ./temp-keyring.gpg --import ~/server-6.0.key
RUN gpg --no-default-keyring --keyring ./temp-keyring.gpg --export --output /etc/apt/trusted.gpg.d/mongodb-server-6.0.gpg
RUN rm temp-keyring.gpg
RUN echo "deb [ signed-by=/etc/apt/trusted.gpg.d/mongodb-server-6.0.gpg] http://repo.mongodb.org/apt/debian bullseye/mongodb-org/6.0 main" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
RUN apt-get update && apt-get install -y --allow-unauthenticated mongodb-org
EXPOSE 27017


#Setting Environment Variables
ENV ROOT_URL=http://holyquran.site
ENV NODE_ENV=production
#ENV ESHOST=https://es.openquran.io
#ENV ESHOST='http://docker.for.mac.localhost:9200'
ENV ESHOST='http://es.private.openquran.io'
#ENV ESHOST=http://172.17.0.1:9200
ENV PORT=3000
ENV HTTP_FORWARDED_COUNT=1
#ENV MONGO_URL='mongodb://172.17.0.1:27017/hqvc'
#ENV MONGO_URL='mongodb://docker.for.mac.localhost:27017/hqvc'
ENV MONGO_URL='mongodb://localhost:27017/hqvc'
#ENV MONGO_URL='mongodb://hqvcmaster:s9Yt#zbLuUj!Vg(@hqvc-meteor.cluster-cmlqrweeihqs.us-east-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false'

#Bundle app source
COPY . /bundle
RUN (cd /bundle/programs/server && npm i)

#Set User
USER node

ENV NODE_ENV=production

EXPOSE 3000

CMD nohup mongod 2>&1
CMD node /bundle/main.js