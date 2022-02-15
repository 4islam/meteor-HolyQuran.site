FROM node:14.18.2

#Install Python3
RUN apt-get update || : && apt-get install python3 -y	#required for building

#Mongo related stuff
RUN echo "deb http://repo.mongodb.org/apt/debian stretch/mongodb-org/5.0 main" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list
RUN apt-get update && apt-get install -y --allow-unauthenticated mongodb-org
RUN mkdir -p /data/db
#EXPOSE 27017


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


# Create app directory
WORKDIR /app


# Bundle app source
COPY . .

# Install app dependencies
WORKDIR /app/bundle/programs/server
RUN npm install --production
RUN npm i -g npm

# Run the application
WORKDIR /app

EXPOSE 3000
#CMD [ "node", "bundle/main.js" ]
CMD [ "./DockerRun.sh" ]


# Run me like:
#v docker run -it -p 3000:3000 -e ESHOST=docker.for.mac.host.internal hqvc.n.v17
#v docker run -it -p 3000:3000 -e ESHOST=docker.for.mac.localhost hqvc.n.v17
#x docker run -it -p 3000:3000 -e ESHOST=host.docker.internal hqvc.n.v17
