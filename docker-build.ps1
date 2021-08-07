$name="voxeleron/dcm-mwl-testgen"
docker stop $name
docker rm $name
docker rmi $name
# Build out the images
docker build -t $name .
docker tag $name $name:latest
