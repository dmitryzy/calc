//
function Calculator(){
	//
}
//
function calculator(element){
	//
	var monitor = $("<div>").addClass("result");
	var keys = $("<div>").addClass("keys");
	//Добавляем экран и клавиатуру
	$(element)
	.append(monitor)
	.append(keys);
	//Цифровые и функциональные клавиши
	var Keys = [
		{parrent: ".keys", id: "0", label: 0, cls: "key", fn: press},
		{parrent: ".keys", id: "1", label: 1, cls: "key", fn: press},
		{parrent: ".keys", id: "2", label: 2, cls: "key", fn: press},
		{parrent: ".keys", id: "3", label: 3, cls: "key", fn: press},
		{parrent: ".keys", id: "4", label: 4, cls: "key", fn: press},
		{parrent: ".keys", id: "5", label: 5, cls: "key", fn: press},
		{parrent: ".keys", id: "6", label: 6, cls: "key", fn: press},
		{parrent: ".keys", id: "7", label: 7, cls: "key", fn: press},
		{parrent: ".keys", id: "8", label: 8, cls: "key", fn: press},
		{parrent: ".keys", id: "9", label: 9, cls: "key", fn: press},
		{parrent: ".keys", id: "add", label: "+", cls: "key", fn: pressFN2},
		{parrent: ".keys", id: "sub", label: "-", cls: "key", fn: pressFN2},
		{parrent: ".keys", id: "div", label: "/", cls: "key", fn: pressFN2},
		{parrent: ".keys", id: "mul", label: "*", cls: "key", fn: pressFN2},
		{parrent: ".keys", id: "minus", label: "+/-", cls: "key", fn: pressFN1},
		{parrent: ".keys", id: "eqv", label: "=", cls: "key", fn: pressEQV},
		{parrent: ".keys", id: "comma", label: ",", cls: "key", fn: press},
		{parrent: ".keys", id: "pi", label: "PI", cls: "key", fn: pressFN1},
		{parrent: ".keys", id: "clear", label: "C", cls: "key", fn: pressClear}
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
		$(parrent).append(newbtn);
	};
	//
	//Переменные для вычислений
	var stak = [];
	var stakVar = [];
	var registr = "0";
	flagComma = false;
	flagFN = false;
	var operation;
	//
	setResult();
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
		pi: function(){return Math.PI;},
	};
	//
	var priority = {
		add: 1,
		mul: 2,
		div: 2,
		sub: 1,
		minus: 0,
		plus: 0,
	};
	//
	//Обработка ввода
	function press(event){
		var id = event.data.id;
		if((id == "comma") && !flagComma){
			id = ".";
			flagComma = true;
		}
		else if((id == "comma") && flagComma){
			id = "";
		};
		//
		registr = registr == "0" ? "" : registr;
		//
		if(!flagFN){
			registr += id;
		}
		else{
			registr = id;
			flagFN = false;
		};
		setResult(registr);
	};
	function pressFN2(event){
		var id = event.data.id;
		flagComma = false;
		flagFN = true;
		//
		if(stakVar.length == 0){
			stakVar.push(id);
			stak.push(+registr);
		}
		else if(priority[id] <= priority[stakVar[stakVar.length - 1]]){
			var x = stak.pop();
			var y = +registr;
			var id1 = stakVar.pop();
			stakVar.push(id);
			var op = operations2[id1];
			registr = op(x, y);
			stak.push(registr);
			setResult(registr);
		}
		else if(priority[id] > priority[stakVar[stakVar.length - 1]]){
			stakVar.push(id);
			stak.push(+registr);
		};
		//
		/*
		if(priority[id] <= priority[stakVar[stakVar.length - 1]]){
			var x = stak.pop();
			var y = +registr;
			var id1 = stakVar.pop();
			stakVar.push(id);
			var op = operations2[id1];
			registr = op(x, y);
			stak.push(registr);
			setResult(registr); 
		};
		if(priority[id] > priority[stakVar[stakVar.length - 1]]){
			//
			stakVar.push(id);
			stak.push(+registr);
		};
		*/
	};
	function pressFN1(event){
		flagFN = true;
		var id = event.data.id;
		var op = operations1[id];
		registr = op(registr);
		setResult(registr);
		//
	};
	function pressEQV(){
		flagComma = false;
		flagFN = true;

		/*
		var id = stakVar.pop();
		var op = operations2[id];
		var x = stak.pop();
		var y = +registr;
		registr = op(x, y);
		setResult(registr);
		*/
		//
		/*
		var y = +bufer;
		var x = stak.pop();
		var op = stak.pop();
		var result = op(x,y);
		flagFN = true;
		setResult(result);
		bufer = result;
		//bufer = "0";
		*/
	};
	function pressClear(){
		flagComma = false;
		registr = 0;
		stak.length = 0;
		stakVar.length = 0;
		setResult("0");
	};
	//Результат
	function setResult(res){
		res = res || registr;
		$(".result").text(res);
	};
};