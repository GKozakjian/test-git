# Docker image lab

## Inttroduciton

In this lab, we will learn how to
  
- Build a docker image from scratch using a simple `Node.js` web application.
- Run the docker image that we built locally.
- Push this docker image to GCR.
- Deploy this image on a GKE cluster as a single Pod, then as a Deployment.

The lab files includes

- A simple `Node.js` web application's source  called `server.js`.
- A simple `Dockerfile` which is a set instructions that the docker daemon uses to build a docker image
- The dependencies of the `Node.js` web application in `package.json`
- Kubernetes Pod and Deployment manifests.

## Lab steps

First, clone this repository on your local machine

```shell
git clone https://github.com/GKozakjian/Kubernetes-Practice.git
```

We need to build the docker image using the Dockerfile

```shell
docker build -t test-sample-nodejs-app .
```

To list all images on your machine, you can use

```shell
docker images
```

Next, you can run this image locally to test it

```shell
docker run -d -p 8080:8080 test-sample-nodejs-app
```


To list all running docker containers, you can use

```shell
docker ps
```

to stop and delete the test container, you can use

```shell
docker rm -f CONTAINER_ID
```

you can get CONTAINER_ID from the `docker ps` command.

Next, to push the image to GCR, you need to first tag it with the format [`gcr.io/PROJECT-ID/IMAGE:TAG`](https://cloud.google.com/container-registry/docs/overview#registries)

```shell
docker tag test-sample-nodejs-app gcr.io/PROJECT-ID/test-sample-nodejs-app:v1
```

Next, you can push the image to GCR by running

```shell
docker push gcr.io/PROJECT-ID/test-sample-nodejs-app:v1
```

To pull the image, you can use

```shell
docker pull gcr.io/PROJECT-ID/test-sample-nodejs-app:v1
```

Next, specify the image name in the pod and deployment manifests called  `test-sample-app-deployment.yaml` and `test-sample-app-pod.yaml`.

To deploy the application on a GKE cluster, you can setup a simple cluster in the `us-central` region by running the following command in your `cloudshell`

```shell
gcloud container clusters create test-cluster --region us-central1
```

After the cluster is created, you need to get your cluster credentials to be able to run `kubectl` commands.

```shell
gcloud container clusters get-credentials test-cluster --region us-central1
```

To create the Pod and Deployment on this cluster, you can apply the Kubernetes manifests/yaml files

```shell
kubectl apply -f test-sample-app-pod.yaml
kubectl apply -f test-sample-app-deployment.yaml
```

To get the status of the created pods, you can use

```shell
kubectl get pods 
```

To expose your pods externally, you can create a Kubernetes `Service` of type `LoadBalancer`, and GKE will provision an L4 external load balancer for them

```shell
kubectl apply -f test-sample-app-service.yaml
```

Once GKE finishes deploying the GCP L4 load balancer for this `Service`, you can find its external IP by running the following command. The `Service` should be called `test-app`

```shell
kubectl get services
```
