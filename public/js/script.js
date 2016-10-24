function generate_script(){
	//window.alert("called")
	//window.alert(document.getElementById('type').checked)
	//Form validation
	var type = (document.getElementById('type').checked) ? "true" : "false";
	console.log(type)
	var width = 300;
	var height = 400;

	var script = $.post("http://infinitekural.net/")

}