pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '25'))
  }

  environment {
    APP_NAME = 'aws-mockexamtest'
    TERRAFORM_DIR = 'infra/terraform'
    ARCHIVE_NAME = "release-${env.BUILD_NUMBER}.tgz"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Resolve Context') {
      steps {
        script {
          def branch = env.CHANGE_BRANCH ?: env.BRANCH_NAME
          def environmentMap = [
            develop: 'demo',
            staging: 'staging',
            main   : 'production'
          ]

          env.DEPLOY_ENV = environmentMap[branch] ?: ''
          env.SHOULD_DEPLOY = env.DEPLOY_ENV ? 'true' : 'false'

          if (env.DEPLOY_ENV) {
            env.AWS_CREDENTIALS_ID = "${env.APP_NAME}-${env.DEPLOY_ENV}-aws"
            env.TF_BACKEND_CREDENTIALS_ID = "${env.APP_NAME}-${env.DEPLOY_ENV}-tf-backend"
            env.APP_ENV_FILE_CREDENTIALS_ID = "${env.APP_NAME}-${env.DEPLOY_ENV}-env-file"
            env.SSH_CREDENTIALS_ID = "${env.APP_NAME}-${env.DEPLOY_ENV}-ssh"
          }

          currentBuild.displayName = "#${env.BUILD_NUMBER} ${branch}"
          echo "Branch: ${branch}"
          echo "Deploy env: ${env.DEPLOY_ENV ?: 'none'}"
        }
      }
    }

    stage('Validate Repo') {
      steps {
        sh '''
          set -euo pipefail
          test -f Dockerfile
          test -f docker-compose.yml
          test -f scripts/deploy/remote-deploy.sh
          tar -czf /tmp/${ARCHIVE_NAME} \
            --exclude=.git \
            --exclude=node_modules \
            --exclude=runtime-data \
            --exclude=data \
            --exclude=infra \
            .
          rm -f /tmp/${ARCHIVE_NAME}
        '''
      }
    }

    stage('Terraform Plan') {
      when {
        expression { env.SHOULD_DEPLOY == 'true' }
      }
      steps {
        withCredentials([
          [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: "${env.AWS_CREDENTIALS_ID}", accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'],
          file(credentialsId: "${env.TF_BACKEND_CREDENTIALS_ID}", variable: 'TF_BACKEND_FILE'),
          sshUserPrivateKey(credentialsId: "${env.SSH_CREDENTIALS_ID}", keyFileVariable: 'SSH_KEY_FILE', usernameVariable: 'SSH_USER')
        ]) {
          sh '''
            set -euo pipefail
            export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-us-east-1}"
            export TF_IN_AUTOMATION=true
            export TF_VAR_environment="${DEPLOY_ENV}"
            export TF_VAR_project_name="${APP_NAME}"
            export TF_VAR_ssh_public_key="$(ssh-keygen -y -f "$SSH_KEY_FILE")"

            cd "${TERRAFORM_DIR}"
            terraform init -backend-config="$TF_BACKEND_FILE" -reconfigure
            terraform validate
            terraform plan -out=tfplan
          '''
        }
      }
    }

    stage('Approve Production') {
      when {
        allOf {
          expression { env.SHOULD_DEPLOY == 'true' }
          branch 'main'
        }
      }
      steps {
        input message: 'Aprobar terraform apply y despliegue a production?', ok: 'Desplegar'
      }
    }

    stage('Terraform Apply') {
      when {
        expression { env.SHOULD_DEPLOY == 'true' }
      }
      steps {
        withCredentials([
          [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: "${env.AWS_CREDENTIALS_ID}", accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'],
          file(credentialsId: "${env.TF_BACKEND_CREDENTIALS_ID}", variable: 'TF_BACKEND_FILE'),
          sshUserPrivateKey(credentialsId: "${env.SSH_CREDENTIALS_ID}", keyFileVariable: 'SSH_KEY_FILE', usernameVariable: 'SSH_USER')
        ]) {
          sh '''
            set -euo pipefail
            export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-us-east-1}"
            export TF_IN_AUTOMATION=true
            export TF_VAR_environment="${DEPLOY_ENV}"
            export TF_VAR_project_name="${APP_NAME}"
            export TF_VAR_ssh_public_key="$(ssh-keygen -y -f "$SSH_KEY_FILE")"

            cd "${TERRAFORM_DIR}"
            terraform init -backend-config="$TF_BACKEND_FILE" -reconfigure
            terraform apply -auto-approve tfplan
          '''
        }
      }
    }

    stage('Deploy Application') {
      when {
        expression { env.SHOULD_DEPLOY == 'true' }
      }
      steps {
        withCredentials([
          [$class: 'AmazonWebServicesCredentialsBinding', credentialsId: "${env.AWS_CREDENTIALS_ID}", accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'],
          file(credentialsId: "${env.TF_BACKEND_CREDENTIALS_ID}", variable: 'TF_BACKEND_FILE'),
          file(credentialsId: "${env.APP_ENV_FILE_CREDENTIALS_ID}", variable: 'APP_ENV_FILE'),
          sshUserPrivateKey(credentialsId: "${env.SSH_CREDENTIALS_ID}", keyFileVariable: 'SSH_KEY_FILE', usernameVariable: 'SSH_USER')
        ]) {
          sh '''
            set -euo pipefail
            export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-us-east-1}"
            export TF_IN_AUTOMATION=true
            export TF_VAR_environment="${DEPLOY_ENV}"
            export TF_VAR_project_name="${APP_NAME}"
            export TF_VAR_ssh_public_key="$(ssh-keygen -y -f "$SSH_KEY_FILE")"

            tar -czf "${ARCHIVE_NAME}" \
              --exclude=.git \
              --exclude=node_modules \
              --exclude=runtime-data \
              --exclude=data \
              --exclude=infra \
              .

            cd "${TERRAFORM_DIR}"
            REMOTE_HOST="$(terraform output -raw instance_public_dns)"
            if [ -z "$REMOTE_HOST" ]; then
              REMOTE_HOST="$(terraform output -raw instance_public_ip)"
            fi
            cd ../..

            export REMOTE_HOST
            export DEPLOY_PATH="/opt/${APP_NAME}/${DEPLOY_ENV}"
            export RELEASE_VERSION="${BUILD_NUMBER}-${GIT_COMMIT}"
            export APP_ENV_FILE
            export SSH_KEY_FILE
            export SSH_USER
            ./scripts/deploy/remote-deploy.sh
          '''
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'infra/terraform/tfplan', allowEmptyArchive: true
      cleanWs deleteDirs: true, notFailBuild: true
    }
  }
}
