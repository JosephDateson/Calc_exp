var load_data = {
	'Settlements':{strategies_vector_single:'1,2,3,4,5,(1,2),(2,3),(3,4),(4,5)',strategies_vector_length:'',strategies_full_set:'',strategies_lower_bound:'',strategies_upper_bound:'',strategies_constraint_1:'',payment_if_res_1:'0',payment_if_cond_1:'exists(i,j,si=rj)',payment_if_res_2:'3',payment_if_cond_2:'AND(NOT(exists(i,j,si=rj)),LEN(s)=2)',payment_if_res_3:'2',payment_if_cond_3:'AND(NOT(exists(i,j,si=rj)),NOT(LEN(s)=2))',dimensions_row_category_name_1:'center',dimensions_row_if_cond_1:'exists(i,si=3)',dimensions_row_category_name_2:'not center',dimensions_row_if_cond_2:'else',dimensions_column_category_name_1:'one',dimensions_column_if_cond_1:'else',dimensions_column_category_name_2:'two',dimensions_column_if_cond_2:'len(s)>1',},
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
	var collapse = document.getElementById("collapse1");
	var new_mode = has_strategies_vector_single ? "panel-collapse" : "panel-collapse collapse";
	collapse.setAttribute("class",new_mode);
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
