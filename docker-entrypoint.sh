# docker-entrypoint.sh for node.js

echo "wait db server"
dockerize -wait tcp://db:3306 -timeout 30s

echo "start node server"
nodemon index.js