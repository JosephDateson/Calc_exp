function curly_brackets_generation(num_of_rows,element_name) {
	var canvas = document.getElementById(element_name);
	var context = canvas.getContext('2d');

	var height = canvas.height;
	var space  = 1;
	var radius = 10;

	var linelength = height / num_of_rows;

	context.lineWidth = 2;
	context.beginPath();
	context.moveTo(20+radius, space);
	context.arcTo(20, space, 20, space+radius, radius);

	context.lineTo(20, linelength - radius);
	context.arcTo(20, linelength, 20 - radius, linelength, radius);
	context.arcTo(20, linelength, 20, linelength + radius, radius);
	context.lineTo(20, height - space - radius);
	context.arcTo(20, height - space, 20 + radius, height - space, radius);

	context.stroke();
}

function update_curly_brackets(add,brackets_name,element_num)
{
	var objTo_2 = document.getElementById(brackets_name)
	var curHeigt = objTo_2.getAttribute("height");
	cutrcurHeigt = Number(curHeigt);
	cutrcurHeigt += add ? 50 : -50;
	objTo_2.setAttribute("height", cutrcurHeigt);
	curly_brackets_generation(element_num+1+0.1*element_num,brackets_name);
}