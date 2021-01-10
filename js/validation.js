$('#awesome-form').validate({
	debug: true,
	rules: {
		fullnameinput: {
			required: true,
			min: 3
		},
		inputBirthData: {
			required: true,
			date: true,
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
			required: true,
			digits: true
		},
		inputPrintName: {
			lettersonly: true,
			required: true
		},
		inputAddress: {
			lettersonly: true,
			required: true
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
	// messages: {
	// 	fullnameinput: {
	// 		required: "Please specify your name",
	// 	},
	// 	inputEmail: {
	// 		required: "We need your email address to contact you",
	// 		email: "Your email address must be in the format of name@domain.com"
	// 	}
	// },
	validClass: "border-success border-2",
	invalidClass: "border-danger border-2",
	submitHandler: function () { alert("Submitted!") }
});

