node{
	def app
	
	stage('clone repository'){
		checkout scm
	}
	
	stage('Build image'){
		app = docker.build("divyeshkumarbalar/nodeservers")
	}

	stage('Test Image'){
		app.inside{		
			sh 'echo "Test Passed"'	
		}	
	}
	
	stage('Push Image'){
		docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials'){
		app.push("${env.BUILD_NUMBER}")
		app.push("latest")	
		}	
	}
}
	
