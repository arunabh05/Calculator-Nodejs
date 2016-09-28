var calculator = angular.module('calculator', []);
calculator.controller('calculator', function($scope, $http) {
	var Operand = null;
	var firstNum = "";
	var secondNum = "";
	var operator = "";
	var result = "";
	$scope.result = "";

	$scope.reset = function() {
		Operand = null;
		firstNum = "";
		secondNum = "";
		operator = "";
		result = "";
		$scope.result = "";
		console.clear();
		console.log("After reset:");
		console.log("First:" + firstNum);
		console.log("Second:" + secondNum);
	};

	$scope.enterNum = function(num) {
		if (operator === "") {
			if (firstNum.length < 11) {
				firstNum = firstNum + String(num);
				$scope.result = firstNum;
			}
		} else {
			// console.log(typeof secondNum);
			secondNum = String(secondNum);
			if (secondNum.length < 11) {
				secondNum = secondNum + String(num);

				$scope.result = secondNum;
				secondNum = Number(secondNum);
			}
		}
	};

	$scope.enterDecimal = function() {
		console.log(typeof secondNum);
		if (operator === "" && firstNum.indexOf(".")===-1) {
			console.log("here");
			firstNum = String(firstNum) + ".";
			console.log(typeof firstNum);
			console.log(firstNum);
			$scope.result = firstNum;
		} else if (operator !== "" && String(secondNum).indexOf(".")===-1) {
			secondNum = String(secondNum) +".";
			$scope.result = secondNum;
		}
	};

	$scope.enterOperation = function(op) {
		 $scope.submit();

		if (operator === "") {
			Operand = String(firstNum).split(op);
			firstNum = Operand[0];
			operator = op;

			$scope.result = operator;
		}
	};

	$scope.submit = function() {

		console.log("Before Submit");
		console.log("First:" + firstNum);
		console.log("Second:" + secondNum);

		if (operator === "+") {
			$http({

				method : "POST",
				url : "/calculator/addition",
				data : {
					"firstNum" : firstNum,
					"secondNum" : secondNum
				}

			}).success(function(data) {
				if (data.statusCode == 401) {
					firstNum = data.result;
					$scope.result = data.result;
				} else {
					firstNum = data.result;
					$scope.result = firstNum;
				}
			}).error(function(error) {
				console.log(error);
				$scope.result = error;
			});

			secondNum = "";
			operator = "";

		} else if (operator === "-") {
			$http({

				method : "POST",
				url : "/calculator/substraction",
				data : {
					"firstNum" : firstNum,
					"secondNum" : secondNum
				}

			}).success(function(data) {
				if (data.statusCode == 401) {
					firstNum = data.result;
					$scope.result = data.result;
				} else {
					firstNum = data.result;
					$scope.result = firstNum;
				}
			}).error(function(error) {
				console.log(error);
				$scope.result = error;
			});

			secondNum = "";
			operator = "";

		} else if (operator === "*") {
			$http({

				method : "POST",
				url : "/calculator/multiplication",
				data : {
					"firstNum" : firstNum,
					"secondNum" : secondNum
				}

			}).success(function(data) {
				if (data.statusCode === 401) {
					firstNum = data.result;
					$scope.result = data.result;
				} else {
					firstNum = data.result;
					$scope.result = firstNum;
				}
			}).error(function(error) {
				console.log(error);
				$scope.result = error;
			});

			secondNum = "";
			operator = "";

		}
		if (operator === "/") {
			$http({

				method : "POST",
				url : "/calculator/division",
				data : {
					"firstNum" : firstNum,
					"secondNum" : secondNum
				}

			}).success(function(data) {
				if (data.statusCode == 401) {
					firstNum = data.result;
					$scope.result = data.result;
				} else {

					firstNum = data.result;
					$scope.result = firstNum;
				}
			}).error(function(error) {
				console.log(error);
				$scope.result = error;
			});
			secondNum = "";
			operator = "";
		}
	};
});