//
function Calculator(){
	//
}
//
function calculator(element){
	//
	var monitor = $("<div>").addClass("result");
	var infoLabel = $("<div>").addClass("info");
	var memoryLabel = $("<div>").addClass("memory");
	var historyLabel = $("<div>").addClass("history");
	var keys = $("<div>").addClass("keys");
	var mainCalc = $("<div>").addClass("maincalc");
	var infoCalc = $("<div>").addClass("infocalc");
	var numberKeys = $("<div>").addClass("numberkeys");
	var fnKeys = $("<div>").addClass("fnkeys");
	//Добавляем экран и клавиатуру
	$(element)
	.append(mainCalc);
	//.append(infoCalc);
	//
	$(".maincalc")
	.append(monitor)
	.append(memoryLabel)
	.append(keys);
	$(".keys")
	.append(fnKeys)
	.append(numberKeys);
	//
	//$(".infocalc")
	//.append(infoLabel)
	//.append(historyLabel);
	
	//Цифровые и функциональные кнопки
	var Keys = [
		{parrent: ".numberkeys", id: "0", label: 0, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "1", label: 1, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "2", label: 2, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "3", label: 3, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "4", label: 4, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "5", label: 5, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "6", label: 6, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "7", label: 7, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "8", label: 8, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "9", label: 9, cls: "key-n", fn: press},
		{parrent: ".fnkeys", id: "add", label: "+", cls: "key-f", fn: pressFN2},
		{parrent: ".fnkeys", id: "sub", label: "-", cls: "key-f", fn: pressFN2},
		{parrent: ".fnkeys", id: "div", label: "/", cls: "key-f", fn: pressFN2},
		{parrent: ".fnkeys", id: "mul", label: "*", cls: "key-f", fn: pressFN2},
		{parrent: ".fnkeys", id: "minus", label: "+/-", cls: "key-f", fn: pressFN1},
		{parrent: ".fnkeys", id: "eqv", label: "=", cls: "key-f", fn: pressEQV},
		{parrent: ".numberkeys", id: "comma", label: ",", cls: "key-n", fn: pressComma},
		{parrent: ".fnkeys", id: "pi", label: "PI", cls: "key-f", fn: pressConst},
		{parrent: ".fnkeys", id: "clear", label: "C", cls: "key-f", fn: pressClear},
		{parrent: ".fnkeys", id: "rightParenthesis", label: ")", cls: "key-f", fn: pressRB},
		{parrent: ".fnkeys", id: "leftParenthesis", label: "(", cls: "key-f", fn: pressLB},
		{parrent: ".fnkeys", id: "memoryadd", label: "M+", cls: "key-m", fn: pressMemoryAdd},
		{parrent: ".fnkeys", id: "memorydel", label: "MR", cls: "key-m", fn: pressMemoryDel},
		{parrent: ".fnkeys", id: "memorycls", label: "MC", cls: "key-m", fn: pressMemoryCls},
	];
	//Добавляем кнопки
	Keys.forEach(function(item){button(item.parrent, item.id,item.label,item.cls, item.fn);});
	//Функция для добавления кнопки
	function button(parrent, id, label, cls, fn){
		var newbtn = $("<button>")
		.addClass(cls)
		.attr("id", id)
		.text(label)
		.on("click",{id: id}, fn);
		//.on("click",{id: id}, logger)
		//.on("click",{id: id}, logHistory);
		$(parrent).append(newbtn);
	};
	//Журнал
	//
	var historyX = " ";
	var historyLabel = " ";
	var historyCalc = [];
	//Запись журнала
	function logHistory(event){
		var id = event.data.id;
		var sumbols = {
			add: "+",
			sub: "-",
			div: "/",
			mul: "*",
			eqv: "=",
			comma: ".",
			leftParenthesis: "(",
			rightParenthesis: ")",
		};
		//
		numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		//
		if(id in sumbols){
			historyLabel +="" + historyX;
			historyX = "";
			historyLabel += " " + sumbols[id] + " ";
			setHistory();
		}
		else if(id == "minus"){
			historyX = "" + -historyX;
		}
		else if(id == "pi"){
			historyX += "&pi;";
		}
		else if (numbers.includes(+id)){
			historyX += id;
		};
		if(id == "eqv"){
			historyLabel += registr;
			setHistory();
			historyCalc.push(historyLabel);
			historyX = "";
			historyLabel = "";
			setHistoryList();
		};
	};
	//Вывод журнала
	function setHistory(){
		$(".history").html(historyLabel);
	};
	//Вывод списка операций
	function setHistoryList(){
		var res = historyCalc.map(function(item){return "<p>" + item + "<p>";}).join("");
		$(".info").html(res)
	}
	//Вывод состояния переменных в консоль
	function logger(event){
		var id = event.data.id;
		console.log(operands, operators, registr,id);
	};
	//Переменные для вычислений
	var memory = [];
	var operands = [];
	var operators = [];
	var registr = "0";
	var flags = {
		comma: false,
		fn: false,
		lb: false,
		rb: false,
	};
	//Начальные установки
	setResult(registr);
	setHistory();
	//Операции
	var operations2 = {
		add: function(x, y){return x + y;},
		mul: function(x, y){return x * y;},
		div: function(x, y){return x / y;},
		sub: function(x, y){return x - y;},
	};
	//Функции
	var operations1 = {
		minus: function(x){return -x;},
		plus: function(x){return +x;},
	};
	//Константы
	var Constants = {
		pi: Math.PI,
	};
	//Приоритеты операций
	var priority = {
		add: 2,
		mul: 3,
		div: 3,
		sub: 2,
		minus: 1,
		plus: 1,
		leftParenthesis: 0,
		rightParenthesis: 0,
	};
	//Обработка ввода запятой
	function pressComma(event){
		var id = event.data.id;
		if(!flags.comma){
			registr += ".";
			flags.comma = true;
			setResult(registr);
		};
	};
	//Обработка ввода скобок
	//Левая скобка
	function pressLB(event){
		var id = event.data.id;
		flags.fn = true;
		operators.push(id);
	};
	//Правая скобка
	function pressRB(event){
		var id = event.data.id;
		flags.fn = true;
		flags.rb = true;
		operands.push(+registr);
		while(operators[operators.length - 1] != "leftParenthesis"){
			calculate();
		};
		if(operators[operators.length - 1] == "leftParenthesis"){
			operators.pop();
		};
		setResult();
	};
	//Обработка ввода цифр
	function press(event){
		var id = event.data.id;
		//
		registr = registr == "0" ? "" : registr;
		//
		if(!flags.fn){
			registr += id;
		}
		else{
			registr = id;
			flags.fn = false;
		};
		setResult(registr);
	};
	//операторы с двумя операндами
	function pressFN2(event){
		var id = event.data.id;
		if(!flags.rb){operands.push(+registr);};
		flags.comma = false;
		flags.fn = true;
		flags.rb = false;
		//
		if(operators.length == 0){
			operators.push(id);
		}
		else{
			if(priority[id] > priority[operators[operators.length - 1]]){
				operators.push(id);
			}
			else{
				while(operators.length > 0){
					calculate();
				};
				operators.push(id);
				setResult();
			};
		};
	};
	//Операторы с одним операндом
	function pressFN1(event){
		flags.comma = true;
		flags.rb = false;
		//
		var id = event.data.id;
		if((id in operations1) && (registr != "0")){
			op = operations1[id];
			registr = op(+registr);
			setResult(registr);
		};
	};
	//Константы
	function pressConst(event){
		var id = event.data.id;
		if(id in Constants){
			registr = Constants[id];
			setResult(registr);
		};
	};
	//
	//Вычисление
	function calculate(){
		var opId = operators.pop();
		if(opId in operations2){
			var op = operations2[opId];
			var y = operands.pop();
			var x = operands.pop();
			operands.push(op(x, y));
		};
	};
	//Обработка нажатия "="
	function pressEQV(){
		flags.comma = false;
		flags.fn = true;
		if(!flags.rb){operands.push(+registr);};
		flags.rb = false;
		while(operators.length > 0){
			calculate();
		};
		setResult();
		operands.length = 0;
	};
	//Очистка регистров
	function pressClear(){
		flags.comma = false;
		$(".info").text("");
		operands.length = 0;
		operators.length = 0;
		setResult("0");
	};
	//Вывод результата на экран
	function setResult(res){
		registr = res || operands[operands.length - 1];
		$(".result").text(registr);
	};
	//Работа с памятью
	//M+
	function pressMemoryAdd(){
		var rdata = 0;
		if(memory.length > 0){
			rdata += memory.pop();
		};
		if( +registr != 0){
			rdata += +registr;
			memory.push(rdata);
			$(".memory").text("M" + "  [" + +rdata + "]");
		};
	};
	//MR
	function pressMemoryDel(){
		if(memory.length>0){
			registr = memory.pop();
			setResult(registr);
		};
	};
	//MC
	function pressMemoryCls(){
		memory.length = 0;
		$(".memory").text("");
	};
};