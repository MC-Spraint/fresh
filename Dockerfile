FROM node:16.15.0
RUN useradd --user-group --create-home --shell /bin/false fresh
ENV Home=/home/fresh
USER $USER
WORKDIR $Home
RUN chown -R fresh:fresh $HOME
COPY package*.json $Home
RUN npm install
COPY . $Home
EXPOSE 4000
CMD ["npm", "run", "start:dev"]