$('#awesome-form').validate({
	debug: true,
	rules: {
		fullnameinput: {
			required: true
		},
		inputBirthData: {
			required: true,
			date: true,
		},
		inputPhoneNumber: {
			required: true,
			pattern: /\(\d{2,}\) \d{4,}\-\d{4}/
		},
		inputCPF: {
			cpfBR: true,
			required: true,
		},
		inputCNPJ: {
			cnpjBR: true
		},
		inputEmail: {
			email: true,
			required: true
		},
		inputConfirmEmail: {
			equalTo: "#inputEmail",
			required: true
		},
		inputZip: {
			postalcodeBR: true
		},
		inputCardNumber: {
			creditcard: true,
			required: true
		},
		inputPrintName: {
			lettersonly: true,
			required: true
		},
		inputAddress: {
			letterswithbasicpunc: true,
			required: true,
		},
		inputCity: {
			lettersonly: true,
			required: true
		},
		inputPassword: {
			required: true,
			pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
		}
	},
	validClass: "border-success border-2",
	errorClass: "border-danger border-2",
	success: function (label) {
		label.addClass("valid").text("Ok!")
	},

	submitHandler: function () { alert("Submitted!") }
});
