FROM node
EXPOSE 3000
ADD ./ /home/node/src
RUN cp -r /home/node/src/bin /home/node/bin
RUN cp -r /home/node/src/client /home/node/client
RUN cp -r /home/node/src/config /home/node/config
RUN cp -r /home/node/src/model /home/node/model
RUN cp -r /home/node/src/public /home/node/public
RUN cp -r /home/node/src/routes /home/node/routes
RUN cp -r /home/node/src/services /home/node/services
RUN cp -r /home/node/src/app.js /home/node/app.js
RUN cp -r /home/node/src/routes /home/node/routes
RUN cp -r /home/node/src/interfaces.* /home/node/.
RUN cp -r /home/node/src/node_modules /home/node/node_modules
RUN cp -r /home/node/src/package* /home/node/.
RUN cp -r /home/node/src/tsconfig.json /home/node/.
CMD cd /home/node && npm start
