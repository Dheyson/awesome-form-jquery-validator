function clearForm() {
	// Limpa valores do formulário de cep.
	$("#inputAddress").val("");
	$("#inputNeight").val("");
	$("#inputCity").val("");
	$("#inputState").val("");
}

//Quando o campo cep perde o foco.
$("#inputZip").blur(function () {

	//Nova variável "cep" somente com dígitos.
	var zipcode = $(this).val().replace(/\D/g, '');

	//Verifica se campo zipcode possui valor informado.
	if (zipcode != "") {

		//Expressão regular para validar o CEP.
		var validate_zipcode = /\(\d{2,}\) \d{4,}\-\d{4}/;

		//Valida o formato do CEP.
		if (validate_zipcode) {
			//Preenche os campos com "..." enquanto consulta webservice.
			$("#inputAddress").val("...");
			$("#inputNeight").val("...");

			//Consulta o webservice viacep.com.br/
			$.getJSON("https://viacep.com.br/ws/" + zipcode + "/json/?callback=?", function (data) {

				if (!("erro" in data)) {
					//Atualiza os campos com os valores da consulta.
					$("#inputAddress").val(data.logradouro);
					$("#inputNeight").val(data.bairro);
					$("#inputState").val(data.uf);
					$("#inputCity").val(data.localidade);
				} //end if.
				else {
					//CEP pesquisado não foi encontrado.
					clearForm();
					alert("ZIPCODE not found!.");
				}
			});
		}

	}
});

$.getJSON('../json/states-data.json', function (data) {

	var items = [];
	var options = '<option value="">Choose a state</option>';

	$.each(data, function (key, value) {
		options += '<option id="city' + key + '" value="' + value.flag + '">' + value.name + '</option>';
	});
	$("#inputState").html(options);

	$("#inputState").change(function () {

		$('#inputCity').prop("disabled", false);

		// var options_cities = '';
		// var string_value = "";

		// $("#inputState option:selected").each(function () {
		// 	string_value += $(this).text();
		// });

		// $.each(data, function (key, val) {
		// 	if (val.flag == string_value) {
		// 		$.each(val.cities, function (key_city, val_city) {
		// 			options_cities += '<option id="city' + key_city + '" value="' + val_city + '">' + val_city + '</option>';
		// 		});
		// 	}
		// });

		// $("#inputCity").html(options_cities);

	}).change();

});
