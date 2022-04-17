# docker-entrypoint.sh for node.js

echo "wait db server"
dockerize -wait tcp://db:3306

echo "start node server"
nodemon index.js