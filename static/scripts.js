/*************************************************************************************************************************************************************/
/*************************************************************************************************************************************************************/
/*************************************************************************************************************************************************************/
/*************************************************************************************************************************************************************/
/*************************************************************************************************************************************************************/
/*Add and remove fields*/
var elements_types = ["if_fields","if_fields_payment","if_fields_dimension_rows_names","if_fields_dimension_columns_names"];
var brackets_names = ["","myCanvas","myCanvas2","myCanvas3"];
var elements_num = {
	"if_fields":1,
	"if_fields_payment":1,
	"if_fields_dimension_rows_names":1,
	"if_fields_dimension_columns_names":1
};

var func_names = {
	"if_fields":"remove_constraint",
	"if_fields_payment":"remove_class",
	"if_fields_dimension_rows_names":"remove_class_row",
	"if_fields_dimension_columns_names":"remove_class_column"
};

var fields_content = {
	"if_fields": [' <div class="col-sm-9 nopadding"><div class="form-group"><input type="text" class="form-control" name="strategies_constraint_','" value="" placeholder="Constraint"></div></div><div class="col-sm-1 nopadding"><div class="form-group"><div class="input-group"><div class="input-group-btn"><button class="btn btn-danger" type="button" onclick="remove_field(\'if_fields\',',');"> <span class="glyphicon glyphicon-minus" aria-hidden="true"></span> </button>            </div>        </div>    </div></div><div class="clear"></div>'],
	"if_fields_payment": ['<div class="col-sm-3 nopadding">	<div class="form-group"><input type="text" class="form-control" id="if_res" name="payment_if_res_','" value="" placeholder="payment"></div>		</div><div class="col-sm-5 nopadding"><div class="form-group"><input type="text" class="form-control" id="if_cond" name="payment_if_cond_','" value="" placeholder="condition"></div></div><div class="col-sm-1 nopadding">    <div class="form-group">   <div class="input-group">            <div class="input-group-btn">                <button class="btn btn-danger" type="button" onclick="remove_field(\'if_fields_payment\',',',brackets_name=\'myCanvas\');"> <span class="glyphicon glyphicon-minus" aria-hidden="true"></span> </button>            </div>        </div>    </div></div>'],
	"if_fields_dimension_rows_names":['<div class="col-sm-3 nopadding">   <div class="form-group"><input type="text" class="form-control" id="if_res" name="dimensions_row_category_name_','" value="" placeholder="Name"></div></div><div class="col-sm-5 nopadding"><div class="form-group"><input type="text" class="form-control" id="if_cond" name="dimensions_row_if_cond_','" value="" placeholder="condition"></div></div><div class="col-sm-1 nopadding"><div class="form-group"><div class="input-group"><div class="input-group-btn"><button class="btn btn-danger" type="button" onclick="remove_field(\'if_fields_dimension_rows_names\',',',brackets_name=\'myCanvas2\');"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span> </button> </div> </div></div></div>'],
	"if_fields_dimension_columns_names":['<div class="col-sm-3 nopadding">   <div class="form-group"><input type="text" class="form-control" id="if_res" name="dimensions_column_category_name_','" value="" placeholder="Name"></div></div><div class="col-sm-5 nopadding"><div class="form-group"><input type="text" class="form-control" id="if_cond" name="dimensions_column_if_cond_','" value="" placeholder="condition"></div></div><div class="col-sm-1 nopadding"><div class="form-group"><div class="input-group"><div class="input-group-btn"><button class="btn btn-danger" type="button" onclick="remove_field(\'if_fields_dimension_columns_names\',',',brackets_name=\'myCanvas3\');"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span> </button> </div> </div></div></div>'],
};

var field_block_name = {
	"if_fields":"if_fields",
	"if_fields_payment":'all_ifs',
	"if_fields_dimension_rows_names":"all_ifs_categories_rows",
	"if_fields_dimension_columns_names":"all_ifs_categories_columns"
};
function add_field(func_name,brackets_name="")
{
	elements_num[func_name]++;
	var objTo = document.getElementById(field_block_name[func_name]);
	var divtest = document.createElement("div");
	divtest.setAttribute("class", "form-group "+func_names[func_name]+elements_num[func_name]);
	divtest.setAttribute("id", "remove_all_fields");
	//Edit brackets if they exist
	if (brackets_name!=""){
		if (elements_num[func_name] > 1){
			update_curly_brackets(add=true,brackets_name,elements_num[func_name]);
		}
	}
	
	var field_content = "";
	for (var i = 0; i < fields_content[func_name].length-1; i++) { 
		field_content += fields_content[func_name][i] + elements_num[func_name];
	}
	divtest.innerHTML = field_content+fields_content[func_name][fields_content[func_name].length-1];
	objTo.appendChild(divtest);
}

function update_fields_num(func_name)
{
	if (elements_num[func_name] > 0){
		
	
		var class_prefix = "form-group "+func_names[func_name];
		var j = 1;
		for (var i = 1; i < elements_num[func_name]+2; i++) { 
			var field_to_update = document.getElementsByClassName(class_prefix+i);
			if (field_to_update.length != 0){
				field_to_update[0].setAttribute("class", class_prefix+j);
				j++;
			}
		}
	}
}

function remove_field(func_name,rid,brackets_name="",update=true)
{
   $('.'+func_names[func_name]+rid).remove();
   elements_num[func_name]--;
   if (brackets_name!=""){
		if (elements_num[func_name] > 0){
			update_curly_brackets(add=false,brackets_name,elements_num[func_name]);
		}
   }
   if (update){ 
	update_fields_num(func_name);
   }
}


function remove_all_fields()
{
	for (type_index in elements_types) {
		var len = elements_num[elements_types[type_index]]+1;
		for (k = 1; k < len; k++)
		{
			remove_field(elements_types[type_index],k,brackets_names[type_index],update=false);
		}
	}
}
/*************************************************************************************************************************************************************/
/*************************************************************************************************************************************************************/
/*************************************************************************************************************************************************************/
/*************************************************************************************************************************************************************/
/*************************************************************************************************************************************************************/
/*load and save files*/
var load_data = {
	'Settlements':{strategies_vector_single:'1,2,3,4,5,(1,2),(2,3),(3,4),(4,5)',strategies_vector_length:'',strategies_full_set:'',strategies_lower_bound:'',strategies_upper_bound:'',strategies_constraint_1:'',payment_if_res_1:'0',payment_if_cond_1:'exists(i,j,si=rj)',payment_if_res_2:'3',payment_if_cond_2:'AND(NOT(exists(i,j,si=rj)),LEN(s)=2)',payment_if_res_3:'2',payment_if_cond_3:'AND(NOT(exists(i,j,si=rj)),LEN(s)=1)',dimensions_row_category_name_1:'center',dimensions_row_if_cond_1:'exists(i,si=3)',dimensions_row_category_name_2:'not center',dimensions_row_if_cond_2:'else',dimensions_column_category_name_1:'one',dimensions_column_if_cond_1:'else',dimensions_column_category_name_2:'two',dimensions_column_if_cond_2:'len(s)>1',},
	'Blotto_loc':{strategies_vector_single:'',strategies_vector_length:'3',strategies_full_set:'0,1,2,3,4,5,6,7',strategies_lower_bound:'',strategies_upper_bound:'',strategies_constraint_1:'SUM(s)=7',payment_if_res_1:'0.5',payment_if_cond_1:'percell(i,si=ri)',payment_if_res_2:'1',payment_if_cond_2:'percell(i,si>ri)',dimensions_row_category_name_1:'L',dimensions_row_if_cond_1:'foreach(i,si<=s1)',dimensions_row_category_name_2:'S',dimensions_row_if_cond_2:'foreach(i,si>=s1)',dimensions_row_category_name_3:'M',dimensions_row_if_cond_3:'else',dimensions_column_category_name_1:'1',dimensions_column_if_cond_1:'countcells(0)=2',dimensions_column_category_name_2:'2',dimensions_column_if_cond_2:'countcells(0)=1',dimensions_column_category_name_3:'3',dimensions_column_if_cond_3:'else',},
	'Blotto_center':{strategies_vector_single:'',strategies_vector_length:'3',strategies_full_set:'0,1,2,3,4,5,6',strategies_lower_bound:'',strategies_upper_bound:'',strategies_constraint_1:'SUM(s)=6',payment_if_res_1:'0.5',payment_if_cond_1:'percell(i,si=ri)',payment_if_res_2:'1',payment_if_cond_2:'percell(i,si>ri)',dimensions_row_category_name_1:'decreasing',dimensions_row_if_cond_1:'decreasing()',dimensions_row_category_name_2:'increasing',dimensions_row_if_cond_2:'increasing()',dimensions_row_category_name_3:'other',dimensions_row_if_cond_3:'else',dimensions_column_category_name_1:'1',dimensions_column_if_cond_1:'countcells(0)+countcells(1)=2',dimensions_column_category_name_2:'2',dimensions_column_if_cond_2:'countcells(0)+countcells(1)=1',dimensions_column_category_name_3:'3',dimensions_column_if_cond_3:'else',},
	'Tennis':{strategies_vector_single:'',strategies_vector_length:'3',strategies_full_set:'0,1,2',strategies_lower_bound:'',strategies_upper_bound:'',strategies_constraint_1:'',payment_if_res_1:'1',payment_if_cond_1:'percell(i,si>ri)',payment_if_res_2:'0.5',payment_if_cond_2:'percell(i,si=ri)',payment_if_res_3:'percellcost(i,-si*0.33)',payment_if_cond_3:'TRUE',dimensions_row_category_name_1:'Strong',dimensions_row_if_cond_1:'MAX(s)=cell(s1)',dimensions_row_category_name_2:'not Strong',dimensions_row_if_cond_2:'else',dimensions_column_category_name_1:'0',dimensions_column_if_cond_1:'SUM(s)=0',dimensions_column_category_name_2:'1',dimensions_column_if_cond_2:'SUM(s)=1',dimensions_column_category_name_3:'2',dimensions_column_if_cond_3:'SUM(s)=2',dimensions_column_category_name_4:'3',dimensions_column_if_cond_4:'SUM(s)=3',dimensions_column_category_name_5:'4',dimensions_column_if_cond_5:'SUM(s)=4',dimensions_column_category_name_6:'5',dimensions_column_if_cond_6:'SUM(s)=5',dimensions_column_category_name_7:'6',dimensions_column_if_cond_7:'SUM(s)=6'},
};

function form_to_json()
{
	var all_input_elements = document.forms["main"].getElementsByTagName("input");
	var json = "{";
	for (i=0; i<all_input_elements.length; i++)
	{
		//Don't handle id="file-input" and id="save_name"
		if (all_input_elements[i].name!="" )
		{
			json+=all_input_elements[i].name+":'";
			json+=all_input_elements[i].value+"',";
		}
	}
	json += "}";
	return json;
}
function save(filename, html) {

	//Obtain data from the form
	var json = form_to_json();
	var save_name = document.getElementById("save_name").value!='' ? document.getElementById("save_name").value : "edited_eq_setup";

	//Download
	var temp_save_element = document.createElement('a');
	temp_save_element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(json));
	temp_save_element.setAttribute('download', save_name+".json");
	temp_save_element.style.display = 'none';
	document.body.appendChild(temp_save_element);
	temp_save_element.click();
	document.body.removeChild(temp_save_element);
}


function add_loaded_field(full_field_name) {
	
	//Parse field type
    var patt_text = new RegExp("[qazwsxedcrfvtgbyhnujmikolp_]+");
	var patt_num = new RegExp("[0-9]+");
    var field_name = patt_text.exec(full_field_name);
    var field_num = patt_num.exec(full_field_name);
	
	//Add field
	switch (String(field_name))
	{
	   case "strategies_constraint_": add_field('if_fields'); break;
	   case "dimensions_row_category_name_": add_field('if_fields_dimension_rows_names',brackets_name='myCanvas2'); break;
	   case "dimensions_row_if_cond_": break;
	   case "dimensions_column_category_name_":  add_field('if_fields_dimension_columns_names',brackets_name='myCanvas3'); break;
	   case "dimensions_column_if_cond_": break;
	   case "payment_if_res_":  add_field('if_fields_payment',brackets_name='myCanvas'); break;
	   case "payment_if_cond_": break;
	   default: break;
	}
}

function load(jsonData){
	remove_all_fields();
	
	var jsonDataKeys = Object.keys(jsonData);
	for(var i=0; i<jsonDataKeys.length; i++){
		add_loaded_field(jsonDataKeys[i]);
		document.getElementsByName(jsonDataKeys[i])[0].value = jsonData[jsonDataKeys[i]];
	}
}

function change_collapse(has_strategies_vector_single)
{
	
	if (has_strategies_vector_single)
	{
		var new_collapse_mode = "panel-collapse collapse in";
		var new_style_collapse_mode = "";
		var comp_new_style_collapse_mode = "height: 0px;";
		var comp_new_collapse_mode = "panel-collapse collapse";
		var new_acc_mode = "accordion-toggle";
		var comp_new_acc_mode = "accordion-toggle collapsed";
	}
	else
	{
		var new_collapse_mode = "panel-collapse collapse";
		var new_style_collapse_mode = "height: 0px;";
		var comp_new_style_collapse_mode = "";
		var comp_new_collapse_mode = "panel-collapse collapse in";
		var new_acc_mode = "accordion-toggle collapsed";
		var comp_new_acc_mode = "accordion-toggle";
	}
	var collapse_manual = document.getElementById("collapse1");
	var collapse_gen 	= document.getElementById("collapse2");
	var acc_collapse_manual = document.getElementById("accordion_collapse1");
	var acc_collapse_gen 	= document.getElementById("accordion_collapse2");
	collapse_manual.setAttribute("class",new_collapse_mode);
	collapse_manual.setAttribute("aria-expanded",has_strategies_vector_single);
	collapse_manual.setAttribute("style",new_style_collapse_mode);
	collapse_gen.setAttribute("class",comp_new_collapse_mode);
	collapse_gen.setAttribute("aria-expanded",!has_strategies_vector_single);
	collapse_gen.setAttribute("style",comp_new_style_collapse_mode);
	acc_collapse_manual.setAttribute("class",new_acc_mode);
	acc_collapse_manual.setAttribute("aria-expanded",has_strategies_vector_single);
	acc_collapse_gen.setAttribute("class",comp_new_acc_mode);
	acc_collapse_gen.setAttribute("aria-expanded",!has_strategies_vector_single);
}
function load_example(example_name)
{
	var jsonData = load_data[example_name];
	var has_strategies_vector_single = load_data[example_name]['strategies_vector_single']!='' ? true : false;
	change_collapse(has_strategies_vector_single);
	load(jsonData);
}


var uploaded_data;
function load_file(e) 
{
	var file = e.target.files[0];
	//Verify right format
	if (!file) 
	{
		alert('Wrong file format');
		return;
	}

	//Read file
	var reader = new FileReader();
	reader.onload = function(e) {
		uploaded_data = JSON.parse(JSON.stringify(eval("(" + e.target.result + ")")));
	};
	
	//Activate the load btn
	document.getElementById('load_btn').setAttribute("class", "btn btn-danger active");
	document.getElementById('load_btn').setAttribute("onClick", "load(uploaded_data)");
	reader.readAsText(file);
}


/*************************************************************************************************************************************************************/
/*************************************************************************************************************************************************************/
/*************************************************************************************************************************************************************/
/*************************************************************************************************************************************************************/
/*************************************************************************************************************************************************************/
/*Set and update curly brackets*/
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
/*************************************************************************************************************************************************************/
/*************************************************************************************************************************************************************/
/*************************************************************************************************************************************************************/
/*************************************************************************************************************************************************************/
/*************************************************************************************************************************************************************/
/*Aux funcs*/
function block_box_content(active_name,deactivate_name1,deactivate_name2){
	readonly = false;
	if (document.getElementById(active_name).value!=''){
		readonly = true
	}
	document.getElementById(deactivate_name1).readOnly = readonly;
	document.getElementById(deactivate_name2).readOnly = readonly;
}