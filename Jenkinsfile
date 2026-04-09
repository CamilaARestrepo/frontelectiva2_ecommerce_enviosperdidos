properties([
  pipelineTriggers([
    githubPush()
  ])
])

pipeline {
    agent any

    stages {
        stage('Instalar dependencias') {
            steps {
                bat 'yarn install'
            }
        }

        stage('Build') {
            steps {
                bat 'yarn build'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t mi-fronted-vite-app .'
            }
        }

        stage('Run Container') {
            steps {
                bat '''
                docker stop react-vite-container || exit 0
                docker rm react-vite-container || exit 0
                docker run -d -p 5171:80 --name react-vite-container mi-fronted-vite-app
                '''
            }
        }
    }
}