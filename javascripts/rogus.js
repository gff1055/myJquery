
var total=document.getElementById("total");
	//retorna o conteudo que esta dentro da tag com id=total
	alert(total.innerHTML);

//converte o valor em dinheiro(R$) em numero
function moneyTextToFloat(text){

	//retirando o R$ e a virgula
	var cleanText=text.replace("R$ ","").replace(",",".");
	return parseFloat(cleanText);
}

//converte o valor numeral em dinheiro(R$)
function floatToMoneyText(value){

	//multiplica o valor por 100 e adiciona a virgula
	var text=(value<1?"0":"")+Math.floor(value*100);
	text="R$ "+text;
	return text.substr(0,text.length-2)+","+text.substr(-2);
}

// testando se as funcoes estão retornando os tipos certos
var total=document.getElementById("total");
//var formattedText=floatToMoneyText(moneyTextToFloat(total.innerHTML));
//alert(formattedText === total.innerHTML);

//retornando o valor do carrinho
function readTotal(){

	//buscando o id total
	var total=document.getElementById("total");

	//retornando o conteudo dentro da id TOTAL(ja formatado em REAL)
	return moneyTextToFloat(total.innerHTML);
}


function writeTotal(value){

	//buscando o id total
	var total=document.getElementById("total");

	// o conteudo da div "id=total" recebe o valor
	total.innerHTML = floatToMoneyText(value);
}


//metodo para calcular os valores
function calculateTotalProducts() {

	//busca de todas as classes produto no documento
	var produtos = document.getElementsByClassName("produto");

	var totalProdutos = 0;

	for(var pos = 0; pos < produtos.length; pos++) {

		// recebe o preco do produto e armazena
		var priceElements = produtos[pos].getElementsByClassName("price");
		var priceText = priceElements[0].innerHTML;
		var price = moneyTextToFloat(priceText);

		// recebe a quantidade e armazena
		var qtyElements = produtos[pos].getElementsByClassName("quantity");
		var qtyText = qtyElements[0].value;
		var quantity = moneyTextToFloat(qtyText);

		// efetuando subtotal
		var subtotal = quantity * price;

		// efetuando soma total
		totalProdutos += subtotal;
	}

	return totalProdutos;
}

//Executa quando o usuario altera a quantidade
function quantidadeMudou(){
	writeTotal(calculateTotalProducts());
}

// funcao que monitora se os campos foram alterados
function onDocumentLoad(){
	var textEdits = document.getElementsByClassName("quantity");
	for(var i=0;i<textEdits.length;i++){
		
		textEdits[i].onchange = quantidadeMudou;
	}
}

//ser executada assim que o evento do carregamento da janela acontecer!

window.onload = onDocumentLoad;