pipeline {
  agent {
    label 'tester'
  }

  stages {
    stage('Clone a applicaiton') {
      steps {
        git branch: 'main', url: 'https://github.com/tKarnigt/simple_node_api.git'
        sh 'cd simple_node_api'
      }
    }
    stage('Install packages & Run unittest') {
      steps {
        sh 'npm install'
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
            sh 'cd ..'
            git branch: 'main', url: 'https://github.com/tKarnigt/simple_test_api.git'
            sh 'cd simple_test_api'
            sh 'robot simple-test.api.robot'
        }
    }
    stage('Building images') {
      steps {
        sh 'docker compose build'
      }
    }
    stage('Push images to docker hub') {
      steps {
        sh 'docker push tkarnigt/simple-nodejs-api:lastest'
        sh 'docker push tkarnigt/simple-nginx:lastest'
      }
    }
    stage('Clean Workspace') {
      steps {
        sh 'docker compose -f ./docker-compose.dev.yaml down'
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