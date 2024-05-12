pipeline {
  agent {
    label 'tester'
  }
  tools {
    nodejs 'node-20.13.1'
  }

  stages {
    stage('Install packages') {
      steps {
        sh 'npm install'
      }
    }
    stage('Run unittest') {
      steps {
        sh 'npm test'
      }
    }
    stage('Run simple api container') {
      steps {
        sh 'docker compose up -d --build'
      }
    }
    stage('Clone robot test & Run test api'){
      steps {
        dir('./simple_test_api'){
          git branch: 'main', url: 'https://github.com/tKarnigt/simple_test_api.git'
          sh 'robot simple-test.api.robot'
        }
      }
    }
    stage('Building images') {
      steps {
        sh 'docker compose build'
      }
    }
    stage('Push images to docker hub') {
      steps {
        sh 'docker push tkarnigt/simple-nodejs-api:latest'
        sh 'docker push tkarnigt/simple-nginx:latest'
      }
    }
    stage('Clean Workspace') {
      steps {
        sh 'docker compose down'
        sh 'docker system prune -a -f'
      }
    }
    // stage('Running Preprod') {
    //   agent {
    //     label 'vm3'
    //   }
    //   steps {
    //     sh 'docker compose down && docker system prune -a -f && docker compose up -d --build'
    //   }
    // }
  }
}