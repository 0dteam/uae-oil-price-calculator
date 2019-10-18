// Get all the keys from document
var keys = document.querySelectorAll('#calculator span');

// language
var lang = true; // true = Arabic, false = English
var newPriceIs = 'السعر الجديد هو ';

/* oil type:
	1 = E plus
	2 = Special
	3 = Super
	4 = Diesel
*/
var type = 0;

// New Rates (August/2015)
var plusPrice = 2.07;
var specialPrice = 2.14;
var superPrice = 2.25;
var dieselPrice = 2.05;

// Old Rates (2011 until July/2015)
var oldPlusPrice = 1.61;
var oldSpecialPrice = 1.72;
var oldSuperPrice = 1.83;
var oldDieselPrice = 2.9;

// Add onclick event to all the keys and perform operations
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {
		// Get the input and button values
		var input = document.getElementById("price");
		var finalPrice = document.querySelector('.screen');
		var inputVal = input.value;
		var btnVal = this.innerHTML;
		
		// Language
		if(btnVal == 'English') {
			lang = false;
			type = 0;
			
			finalPrice.innerHTML = '';
			document.querySelector('.description').innerHTML = 'Enter the old price to fill your car with the type';
			document.querySelector('.language').innerHTML = 'عربي';
			
			document.querySelector('.eval').innerHTML = 'Calculate the new price';
			newPriceIs = 'New price is ';
		}
		else if(btnVal == 'عربي') {
			lang = true;
			type = 0;
			
			finalPrice.innerHTML = '';
			document.querySelector('.description').innerHTML = 'أدخل سعر تعبئة سيارتك قديمًا ثم نوع الوقود المستخدم';
			document.querySelector('.language').innerHTML = 'English';
			
			document.querySelector('.eval').innerHTML = 'احسب السعر الجديد';
			newPriceIs = 'السعر الجديد هو ';
		}
		
		/*
			Oil Types
		*/
		else if(btnVal == 'E Plus 91<br>اي بلس')
		{
			type = 1;
		}
		else if(btnVal == 'Special 95<br>خصوصي')
		{
			type = 2;
		}
		else if(btnVal == 'Super 98<br>سوبر')
		{
			type = 3;
		}
		else if(btnVal == 'Diesel<br>ديزل')
		{
			type = 4;
		}
		
		// Calculate new price
		else if(btnVal == 'احسب السعر الجديد' || btnVal == 'Calculate the new price') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];
			
			// Cancel . "dot" at the end of entered number
			if(lastChar == '.')
				equation = equation.replace(/.$/, '');
			
			if(equation)
			{
				if(type == 0)
				{
					if(lang)
					finalPrice.innerHTML = 'خطأ: اختر نوع الوقود';
					else
					finalPrice.innerHTML = 'Error: choose the type';
				}
				else
				{
					if(type == 1)
						finalPrice.innerHTML = newPriceIs + eval((equation/oldPlusPrice) * plusPrice).toFixed(2);
					else if(type == 2)
						finalPrice.innerHTML = newPriceIs + eval((equation/oldSpecialPrice) * specialPrice).toFixed(2);
					else if(type == 3)
						finalPrice.innerHTML = newPriceIs + eval((equation/oldSuperPrice) * superPrice).toFixed(2);
					else if(type == 4)
						finalPrice.innerHTML = newPriceIs + eval((equation/oldDieselPrice) * dieselPrice).toFixed(2);
					
					// add the currency
					if(!lang)
						finalPrice.innerHTML += ' Dhms';
					else
						finalPrice.innerHTML += ' درهم';
				}
			}
			else
			{
				if(lang)
					finalPrice.innerHTML = 'خطأ: اكتب السعر بالأرقام';
				else
					finalPrice.innerHTML = 'Error: type the price in numbers';
			}
		}
		
		// Oil types
		else {
			if(btnVal == 'بلس' || btnVal =='E Plust')
				type = 1;
			else if(btnVal == 'خصوصي' || btnVal =='Special')
				type = 2;
			else if(btnVal == 'سوبر' || btnVal =='Super')
				type = 3;
			else if(btnVal == 'ديزل' || btnVal =='Diesel')
				type = 4;
		}
		
		// prevent page jumps
		e.preventDefault();
	} 
}