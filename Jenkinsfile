pipeline {
  agent {
    label 'tester'
  }

  stages {
    stage('Clone a applicaiton') {
      steps {
        dir('./simple_node_api'){
          git branch: 'main', url: 'https://github.com/tKarnigt/simple_node_api.git'
          env.PATH = "/home/ubuntu/.nvm/versions/node/v20.13.1/bin:${env.PATH}"
          sh 'npm install'
        }
      }
    }
    stage('Install packages & Run unittest') {
      steps {
        dir('./simple_node_api'){
          sh 'npm test'
        }
      }
    }
    stage('Run simple api container') {
      steps {
        dir('./simple_node_api'){
          sh 'docker compose up -d --build'
        }
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
        dir('./simple_node_api'){
          sh 'docker compose build'
        }
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