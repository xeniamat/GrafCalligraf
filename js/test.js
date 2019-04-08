		
		var questions = [
			{ques: "Что такое \"каллиграфия\"?",
			answers: ["Ровный почерк","Заглавные буквы в сказках","Искусство красивого письма"],
			add: ["Неверный ответ","Неверный ответ","Правильный ответ!"],
			right: 2	
			},
			{ques: "Когда зародилась каллиграфия?",
			answers: ["1 тыс.л. до н.э.","3 тыс.л. до н.э.","3 век н.э."],
			add: ["Неверный ответ","Ты молодец! Это правильный ответ","Неверный ответ"],
			right: 1 	
			},
			{ques: "Как зовут знаменитого белорусского каллиграфа?",
			answers: ["Павел Афанасьевич Семченко", "Богдеско Илья Трофимович","Чобитько Петр Петрович"],
			add: ["Да вы знаток! Это правильный ответ","Неверный ответ","Неверный ответ"],
			right: 0 	
			}
			
		]
		var mark = [
		"Рекомендуем познакомиться с искусством каллиграфии чуть лучше",
		"Неплохо. <br>Вы близки к победе!",
		"Великолепно! <br> Вы многое знаете о каллигрфии"
		]
		var count = 0;
		var result = 0;
		
		
		function bilding (obj)
		{	var str = "<h3>"+obj.ques+"</h3>";
		
			for (var i = 0; i < obj.answers.length; i++)
			{
				str += "<input type='radio' name='ans' data-add='" + obj.add[i] + "' data-right="+ obj.right +" data-i= "+i+"  >";
				str += "<span>"+obj.answers[i] +"</span><br>";
			}
			
			var container = document.getElementById("container");
			container.innerHTML = str;
			
			var inputs = container.getElementsByTagName("input");
			for (var i = 0; i< inputs.length; i++)
			{
				inputs[i].addEventListener("click",handler,false);
			}
		}
		
		window.onload = function(){
			bilding(questions[0]);
		}
		
		function handler(){
			//1. меняем цвет у соседнего следующего элемента: зеленый или красный
			//2. размещаете дополнительные сообщение из dataset.add
			//3. зеленым выделяем правильный ответ
			//4. добавить кнопку Далее
			console.log(this.nextSibling);
			
			if (this.dataset.right == this.dataset.i)
			{
				//добавить 1 в правильные ответы
				result++;
				this.nextSibling.style.color = "green";
			}
			else
			{
				this.nextSibling.style.color = "red";
			}
			
			var item = "<p>" +this.dataset.add+"</p>";
			this.nextSibling.insertAdjacentHTML('afterend', item);
			//отключаем обработчик
			var inputs = container.getElementsByTagName("input");
			for (var i = 0; i< inputs.length; i++)
			{
				inputs[i].removeEventListener("click",handler,false);
			}
			//правильный ответ зеленый
			inputs[this.dataset.right].nextSibling.style.color = "green";
			var btn = document.createElement("button");
			btn.innerHTML = "Далее";
			btn.onclick = function(){
					console.log(count + " " + questions.length);
			
				if (++count < questions.length)
				{
					bilding(questions[count]);
				}
				else
				{
					getResult();
				}
			}
			this.parentNode.appendChild(btn);
		}
		
		function getResult(){ 
			document.getElementById("container").innerHTML = result + " " + mark[result]
			}
		
	