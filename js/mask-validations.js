$('#inputCPF').mask('000.000.000-00');

$('#inputCNPJ').mask('000.000.000-00');

$('#inputCardNumber').mask('0000 0000 0000 0000');

var SPMaskBehavior = function (val) {
	return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
	spOptions = {
		onKeyPress: function (val, e, field, options) {
			field.mask(SPMaskBehavior.apply({}, arguments), options);
		}
	};

$('#inputPhoneNumber').mask(SPMaskBehavior, spOptions);

var options = {
	onComplete: function (cep) {
		alert('CEP Completed!:' + cep);
	},
	onKeyPress: function (cep, event, currentField, options) {
		console.log('A key was pressed!:', cep, ' event: ', event,
			'currentField: ', currentField, ' options: ', options);
	},
	onChange: function (cep) {
		console.log('cep changed! ', cep);
	},
	onInvalid: function (val, e, f, invalid, options) {
		var error = invalid[0];
		console.log("Digit: ", error.v, " is invalid for the position: ", error.p, ". We expect something like: ", error.e);
	}
};

$('#inputZip').mask('00000-000', options);
