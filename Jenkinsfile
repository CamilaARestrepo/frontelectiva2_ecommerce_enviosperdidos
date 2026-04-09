properties([
  pipelineTriggers([
    githubPush()
  ])
])

pipeline {
    agent any

    environment {
        IMAGE_NAME = "mi-fronted-vite-app"
        CONTAINER_NAME = "react-vite-container"
        PORT = "5171"
    }

    stages {

        stage('Clonar repositorio') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %IMAGE_NAME% ."
            }
        }

        stage('Eliminar contenedor anterior') {
            steps {
                bat """
                docker stop %CONTAINER_NAME% || exit 0
                docker rm %CONTAINER_NAME% || exit 0
                """
            }
        }

        stage('Levantar contenedor') {
            steps {
                bat """
                docker run -d -p %PORT%:80 --name %CONTAINER_NAME% %IMAGE_NAME%
                """
            }
        }
    }
}