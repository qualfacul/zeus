app.controller('RegisterCtrl', function ($scope, $http, $location, ENV, messagesContainer, Facebook, User) {
	$scope.user = {};

	$scope.register = function() {
	    $http.post(ENV.API.REGISTER, $scope.user).then(function(response) {
	    	User.loggedIn(response.data.token);
            messagesContainer.addSuccess("Bem-vindo ao QualFacul!");
            $location.path('/');
	    }, function(response) {
	    	if(response.data) {
	    		$scope.error = {};

	    		if(response.data.fieldErrors) {
		    		response.data.fieldErrors.forEach(function(fieldError){
		    			$scope.error[fieldError.field] = fieldError.message;
		    		});
		    	}

		    	if(response.data.message) {
		    	 	$scope.error.generic = response.data.message;
		    	}
	    	}
	    });
	};

	$scope.loginFacebook = function () {
        Facebook.loginFacebook();
    };
});
