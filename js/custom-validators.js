/*
 * Brazillian CPF number (Cadastrado de Pessoas Físicas) is the equivalent of a Brazilian tax registration number.
 * CPF numbers have 11 digits in total: 9 numbers followed by 2 check numbers that are being used for validation.
 */
$.validator.addMethod("cpfBR", function (value, element) {
	"use strict";

	if (this.optional(element)) {
		return true;
	}

	// Removing special characters from value
	value = value.replace(/([~!@#$%^&*()_+=`{}\[\]\-|\\:;'<>,.\/? ])+/g, "");

	// Checking value to have 11 digits only
	if (value.length !== 11) {
		return false;
	}

	var sum = 0,
		firstCN, secondCN, checkResult, i;

	firstCN = parseInt(value.substring(9, 10), 10);
	secondCN = parseInt(value.substring(10, 11), 10);

	checkResult = function (sum, cn) {
		var result = (sum * 10) % 11;
		if ((result === 10) || (result === 11)) {
			result = 0;
		}
		return (result === cn);
	};

	// Checking for dump data
	if (value === "" ||
		value === "00000000000" ||
		value === "11111111111" ||
		value === "22222222222" ||
		value === "33333333333" ||
		value === "44444444444" ||
		value === "55555555555" ||
		value === "66666666666" ||
		value === "77777777777" ||
		value === "88888888888" ||
		value === "99999999999"
	) {
		return false;
	}

	// Step 1 - using first Check Number:
	for (i = 1; i <= 9; i++) {
		sum = sum + parseInt(value.substring(i - 1, i), 10) * (11 - i);
	}

	// If first Check Number (CN) is valid, move to Step 2 - using second Check Number:
	if (checkResult(sum, firstCN)) {
		sum = 0;
		for (i = 1; i <= 10; i++) {
			sum = sum + parseInt(value.substring(i - 1, i), 10) * (12 - i);
		}
		return checkResult(sum, secondCN);
	}
	return false;

}, "Please specify a valid CPF number");


/*
 * Brazillian value number (Cadastrado de Pessoas Juridica).
 * value numbers have 14 digits in total: 12 numbers followed by 2 check numbers that are being used for validation.
 */
$.validator.addMethod("cnpjBR", function (value, element) {
	"use strict";

	if (this.optional(element)) {
		return true;
	}

	// Removing no number
	value = value.replace(/[^\d]+/g, "");

	// Checking value to have 14 digits only
	if (value.length !== 14) {
		return false;
	}

	// Elimina values invalidos conhecidos
	if (value === "00000000000000" ||
		value === "11111111111111" ||
		value === "22222222222222" ||
		value === "33333333333333" ||
		value === "44444444444444" ||
		value === "55555555555555" ||
		value === "66666666666666" ||
		value === "77777777777777" ||
		value === "88888888888888" ||
		value === "99999999999999") {
		return false;
	}

	// Valida DVs
	var tamanho = (value.length - 2);
	var numeros = value.substring(0, tamanho);
	var digitos = value.substring(tamanho);
	var soma = 0;
	var pos = tamanho - 7;

	for (var i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2) {
			pos = 9;
		}
	}

	var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

	if (resultado !== parseInt(digitos.charAt(0), 10)) {
		return false;
	}

	tamanho = tamanho + 1;
	numeros = value.substring(0, tamanho);
	soma = 0;
	pos = tamanho - 7;

	for (var il = tamanho; il >= 1; il--) {
		soma += numeros.charAt(tamanho - il) * pos--;
		if (pos < 2) {
			pos = 9;
		}
	}

	resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

	if (resultado !== parseInt(digitos.charAt(1), 10)) {
		return false;
	}

	return true;

}, "Please specify a CNPJ value number");

/*
* Valida CEPs do brasileiros:
*
* Formatos aceitos:
* 99999-999
* 99.999-999
* 99999999
*/
$.validator.addMethod("postalcodeBR", function (cep_value, element) {
	return this.optional(element) || /^\d{2}.\d{3}-\d{3}?$|^\d{5}-?\d{3}?$/.test(cep_value);
}, "Please specify a valid ZIPCODE number.");

// https://jqueryvalidation.org/creditcard-method/
// based on https://en.wikipedia.org/wiki/Luhn_algorithm
$.validator.addMethod("creditcard", function (value, element) {
	if (this.optional(element)) {
		return "dependency-mismatch";
	}

	// Accept only spaces, digits and dashes
	if (/[^0-9 \-]+/.test(value)) {
		return false;
	}

	var nCheck = 0,
		nDigit = 0,
		bEven = false,
		n, cDigit;

	value = value.replace(/\D/g, "");

	// Basing min and max length on
	// https://dev.ean.com/general-info/valid-card-types/
	if (value.length < 13 || value.length > 19) {
		return false;
	}

	for (n = value.length - 1; n >= 0; n--) {
		cDigit = value.charAt(n);
		nDigit = parseInt(cDigit, 10);
		if (bEven) {
			if ((nDigit *= 2) > 9) {
				nDigit -= 9;
			}
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return (nCheck % 10) === 0;
}, "Please enter a valid credit card number.");

$.validator.addMethod("lettersonly", function (value, element) {
	return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Letters only please");

$.validator.addMethod("letterswithbasicpunc", function (value, element) {
	return this.optional(element) || /^[a-z\-.,()'"\s]+$/i.test(value);
}, "Letters or punctuation only please");


/**
* Return true if the field value matches the given format RegExp
*
* @example $.validator.methods.pattern("AR1004",element,/^AR\d{4}$/)
* @result true
*
* @example $.validator.methods.pattern("BR1004",element,/^AR\d{4}$/)
* @result false
*
* @name $.validator.methods.pattern
* @type Boolean
* @cat Plugins/Validate/Methods
*/
$.validator.addMethod("pattern", function (value, element, param) {
	if (this.optional(element)) {
		return true;
	}
	if (typeof param === "string") {
		param = new RegExp("^(?:" + param + ")$");
	}
	return param.test(value);
}, "Invalid format.");
