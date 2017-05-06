var calculator = angular.module('calculator', []);
calculator.controller('calculator', function($scope, $http) {
	var Operand = null;
	var firstNum = "";
	var secondNum = "";
	var operator = "";
	$scope.result = "";

	$scope.reset = function() {
		Operand = null;
		firstNum = "";
		secondNum = "";
		operator = "";
		$scope.result = "";
	};

	$scope.enterNum = function(num) {
		if (operator === "") {
			if (firstNum.length < 11) {
				firstNum = firstNum + String(num);
				$scope.result = firstNum;
				FN = true;
			}
		} else {
			secondNum = String(secondNum);
			if (secondNum.length < 11) {
				secondNum = String(secondNum) + String(num);

				$scope.result = secondNum;
				secondNum = Number(secondNum);
			}
		}
	};

	$scope.enterDecimal = function() {
		console.log(typeof secondNum);
		if (operator === "" && firstNum.indexOf(".") === -1) {

			firstNum = String(firstNum) + ".";
			$scope.result = firstNum;

		} else if (operator !== "" && String(secondNum).indexOf(".") === -1) {

			secondNum = String(secondNum) + ".";
			$scope.result = secondNum;
		}
	};

	$scope.enterOperation = function(op) {
		if (secondNum!== "") {
			$scope.submit();
		}
		
		if (operator === "") {
			Operand = String(firstNum).split(op);
			firstNum = Operand[0];
			operator = op;
			$scope.result = operator;
		}
	};

	$scope.submit = function() {

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