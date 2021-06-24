FROM mcr.microsoft.com/playwright:focal
WORKDIR /app
COPY package.json /app
RUN cd /app && ls -a && npm install
COPY . /app
CMD ["npm", "test"]