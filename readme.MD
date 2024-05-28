## create production docker image
docker build -f Dockerfile.prod -t treeo:prod .

## run production image
docker run -it --rm -p 9005:80 treeo:prod

## run production image in detached mode
docker run -itd --rm -p 9005:80 treeo:prod