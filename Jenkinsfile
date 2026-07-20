pipeline {
  agent any

  environment {
    ACR_LOGIN_SERVER = 'devopslab01acr.azurecr.io'
    APP_NAME         = 'shell-app'
    DEPLOYMENT_NAME  = 'shell-app'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Test') {
      steps {
        sh 'npm ci'
        // este repo no tiene script "test" en package.json todavía (solo
        // dev/build/start/lint) — se saltea en vez de romper el pipeline
        // por un "missing script: test"
        sh '''
          if npm run | grep -q "^  test$"; then
            npm test
          else
            echo "AVISO: no hay script \\"test\\" en package.json, se saltea este stage"
          fi
        '''
      }
    }

    stage('Build imagen') {
      steps {
        // Module Federation hornea CONSULTAS_URL/REPORTES_URL en el bundle
        // en el momento del build (el navegador baja remoteEntry.js directo
        // desde esas URLs), así que tienen que ser la IP pública del
        // Ingress, nunca nombres internos de Service de k8s. Se resuelve en
        // vivo por si el LoadBalancer cambió de IP.
        withKubeConfig([credentialsId: 'kubeconfig-aks']) {
          script {
            env.PUBLIC_URL = 'http://' + sh(
              script: "kubectl get svc -n ingress-nginx ingress-nginx-controller -o jsonpath='{.status.loadBalancer.ingress[0].ip}'",
              returnStdout: true
            ).trim()
          }
        }
        sh """
          docker build --platform linux/amd64 \
            --build-arg CONSULTAS_URL=${PUBLIC_URL}/consultas \
            --build-arg REPORTES_URL=${PUBLIC_URL}/reportes \
            -t ${ACR_LOGIN_SERVER}/${APP_NAME}:${BUILD_NUMBER} \
            -t ${ACR_LOGIN_SERVER}/${APP_NAME}:latest \
            .
        """
      }
    }

    stage('Push a ACR') {
      when { branch 'dev' }
      steps {
        withCredentials([usernamePassword(credentialsId: 'acr-creds', usernameVariable: 'ACR_USER', passwordVariable: 'ACR_PASS')]) {
          sh 'echo "$ACR_PASS" | docker login "$ACR_LOGIN_SERVER" -u "$ACR_USER" --password-stdin'
          sh "docker push ${ACR_LOGIN_SERVER}/${APP_NAME}:${BUILD_NUMBER}"
          sh "docker push ${ACR_LOGIN_SERVER}/${APP_NAME}:latest"
        }
      }
    }

    stage('Deploy a AKS') {
      when { branch 'dev' }
      steps {
        withKubeConfig([credentialsId: 'kubeconfig-aks']) {
          sh "kubectl set image deployment/${DEPLOYMENT_NAME} ${DEPLOYMENT_NAME}=${ACR_LOGIN_SERVER}/${APP_NAME}:${BUILD_NUMBER}"
          sh "kubectl rollout status deployment/${DEPLOYMENT_NAME} --timeout=180s"
        }
      }
    }
  }

  post {
    always {
      sh "docker rmi ${ACR_LOGIN_SERVER}/${APP_NAME}:${BUILD_NUMBER} ${ACR_LOGIN_SERVER}/${APP_NAME}:latest || true"
    }
    success {
      echo "OK: ${APP_NAME} build #${BUILD_NUMBER} desplegado en AKS (deployment/${DEPLOYMENT_NAME})"
    }
    failure {
      echo "FALLÓ: ${APP_NAME} build #${BUILD_NUMBER} — revisar el stage que cortó arriba en el log"
    }
  }
}
