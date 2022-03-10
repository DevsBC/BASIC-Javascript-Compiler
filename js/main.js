// main.js include some basic functions like: 
// Run() to proceed the input code
// Clear() to make input and output empty
// addError() to generate error message
// is**() to check the type of a given string

// output consist of two parts, computation result and error message
var GlobalResult = "";
var GlobalError = "";

 
function Clear() {
	document.getElementById("output").value = '';
	document.getElementById("input").value = '';
	GlobalResult = "";	
}

function Run() {
	var content = document.getElementById("input").value;
	GlobalError = "";
	GlobalResult = "";
	var c = read(content);
	var myTree = new Tree();
	myTree.eat(c);	
	document.getElementById("output").value = GlobalError;
	myTree.go();
	document.getElementById("output").value = GlobalError + GlobalResult;
	console.log(GlobalError);
}

function addError(line, posi, message) {
	GlobalError += "line " + line + "." + (posi+1) + ": " + message + " \n";
}

function isString(s) {
	return s.charAt(0)==='"' && s.charAt(s.length-1)==='"' && s.length>=2;
}

// however, a number like 5.4.3 may pass this test, but will be dealt with in runtime
function isNum(s) {
	if(s.charAt(0)==="-") {
		s = s.slice(1);
	}
	var patt = /[^0-9.]+/g;
    return !patt.test(s) && s.length>0;
}

function isComparison(s) {
	var t = s.toUpperCase();
	switch (t) {
		case ">":
		case "<":
		case "=":
		case ">=":
		case "<=":
		case "<>":
			return true;
		default:
			return false
	}
}

function isOperator(s) {
	var t = s.toUpperCase();
	switch (t) {
		case "+":
		case "-":
		case "*":
		case "/":
		case "(":
		case ")":
		case isComparison(s):
			return true;
		default: 
			return false;
	}
}

function isKeyword(s) {
	var t = s.toUpperCase();
	switch (t) {
		case "NUMBER":
		case "TEXT":
		case "LET":
		case "CLEAR":
		case "PRINT":
		case "IF":
		case "THEN":
		case "ELSE":
		case "ENDIF":
		case "AND":    //-- not keywords, because they
		case "OR":    //-- don't end expressions
		case "INPUT":
		case "NOECHO":
		case "FOR":
		case "TO":
		case "STEP":
		case "ENDFOR":
		case "REPEAT":
		case "ENDREPEAT":
		case "BREAK":
		case "FUNCTION":
		case "ENDFUNCTION":
		case "RETURN":
			return true;
		default:
			return false;	
	}
	
}