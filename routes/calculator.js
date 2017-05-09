var ejs = require('ejs');
var result = 0;
function calculator(req, res) {

	ejs.renderFile('./views/calculator.ejs', function(err, result) {
		if (!err) {
			res.end(result);
		} else {
			console.log(err);
			res.end('An error occured');
		}
	});
}

function addition(req, res) {

	var firstNum = Number(req.param("firstNum"));
	var secondNum = Number(req.param("secondNum"));
	var json_responses;

	if (isNaN(firstNum) === false && isNaN(secondNum) === false) {
		result = firstNum + secondNum;
		json_responses = {
			"result" : result
		};
		res.send(json_responses);
	} else {
		json_responses = {
			"result" : 0
		};
	}
}

function substraction(req, res) {

	var firstNum = Number(req.param("firstNum"));
	var secondNum = Number(req.param("secondNum"));
	var json_responses;

	if (isNaN(firstNum) === false && isNaN(secondNum) === false) {
		result = firstNum - secondNum;
		json_responses = {
			"result" : result
		};
		res.send(json_responses);
	} else {
		json_responses = {
			"result" : 0
		};
	}
}

function multiplication(req, res) {

	var firstNum = Number(req.param("firstNum"));
	var secondNum = Number(req.param("secondNum"));
	var json_responses;

	if (isNaN(firstNum) === false && isNaN(secondNum) === false) {
		if(secondNum==="")
			{
				secondNum = "1";
			}
		result = firstNum * secondNum;
		json_responses = {
			"result" : result
		};
		res.send(json_responses);
	} else {
		json_responses = {
			"result" : firstNum
		};
	}
}

function division(req, res) {
	var firstNum = Number(req.param("firstNum"));
	var secondNum = Number(req.param("secondNum"));
	var json_responses;

	if (isNaN(firstNum) === false && isNaN(secondNum) === false) {
		if(secondNum==="")
		{
			secondNum = "1";
		}
		result = firstNum / secondNum;
		json_responses = {
			"result" : result
		};
		res.send(json_responses);
	} else {
		json_responses = {
			"result" : 0
		};
	}
}

exports.calculator = calculator;
exports.addition = addition;
exports.substraction = substraction;
exports.multiplication = multiplication;
exports.division = division;