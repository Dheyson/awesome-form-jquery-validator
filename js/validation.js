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
			letterswithbasicpunc: true,
			required: true
		},
		inputAddress: {
			required: true,
		},
		inputCity: {
			required: true
		},
		inputPassword: {
			required: true,
			pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
		},
		inputNeight: {
			required: true
		},
		inputMonthCard: {
			required: true,
			pattern: /^(0?[1-9]|1[012])$/,
			min: 01,
			max: 12,
			digits: true
		},
		inputYearCard: {
			required: true,
			min: 18,
			max: 28,
		},
		inputCVV: {
			required: true,
			pattern: /^[0-9]{3,4}$/
		}
	},
	validClass: "border-success border-2",
	errorClass: "border-danger border-2",
	success: function (label) {
		label.addClass("valid").text("Everything Ok! 🎉")
	},

	submitHandler: function (data) {
		console.log(data);
		alert("Submitted!", data);
		form.submit();
	}
});
