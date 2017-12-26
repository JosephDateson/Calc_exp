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