FROM ubuntu:14.04

# Install Node.js
RUN apt-get update && apt-get install -y apt-transport-https
RUN apt-get install curl -y
RUN apt-get update && apt-get install -y apt-transport-https
RUN curl --silent --location https://deb.nodesource.com/setup_4.x | sudo bash -
RUN apt-get update && apt-get install -y apt-transport-https
RUN apt-get install --yes nodejs
RUN apt-get update && apt-get install -y apt-transport-https
RUN apt-get install --yes build-essential
RUN apt-get install -y net-tools


# Bundle app source
# Trouble with COPY http://stackoverflow.com/a/30405787/2926832
COPY . /src

# Install app dependencies
RUN cd /src; npm install

# Binds to port 3000
EXPOSE  3000

#  Defines your runtime(define default command)
# These commands unlike RUN (they are carried out in the construction of the container) are run when the container
CMD ["node", "/src/index.js"]

