(function(){
	var jquery;
	/******** Load jQuery if not present *********/
	if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
	    var script_tag = document.createElement('script');
	    script_tag.setAttribute("type","text/javascript");
	    script_tag.setAttribute("src",
	        "http://code.jquery.com/jquery-latest.min.js");
	    if (script_tag.readyState) {
	      script_tag.onreadystatechange = function () { // For old versions of IE
	          if (this.readyState == 'complete' || this.readyState == 'loaded') {
	              scriptLoadHandler();
	          }
	      };
	    } else {
	      script_tag.onload = scriptLoadHandler;
	    }
	    // Try to find the head, otherwise default to the documentElement
	    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
	} else {
	    // The jQuery version on the window is the one we want to use
	    jQuery = window.jQuery;
	    main();
	}

	/******** Called once jQuery has loaded ******/
	function scriptLoadHandler() {
	    // Restore $ and window.jQuery to their previous values and store the
	    // new jQuery in our local jQuery variable
	    jQuery = window.jQuery.noConflict(true);
	    // Call our main function
	    main(); 
	}


	function main(){
		jQuery(document).ready(function($){
		//adding the materialize css link 
			var css_link = $("<link>",{
				rel:"stylesheet",
				href:"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css"
			});
			css_link.appendTo("head");
		//adding the materialize css icons fonts
			css_link = $("<link>",{
				rel:"stylesheet",
				href:"https://fonts.googleapis.com/icon?family=Material+Icons"
			});
			css_link.appendTo("head");
		//adding the materialize javascript cdn
			var script = document.createElement("script");
		    script.type = "text/javascript";
		   script.src = "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js";
		    $("head").append(script);			
			var jsonp_url = "http://infinitekural.net/jsonp?callback=?";
			
			var html = "<div class='card medium' style='width:300px;height:350px'>\
					    <div class='card-image waves-effect waves-block waves-light'>\
					      <img class='activator responsive-img' src='http://infinitekural.net/images/thiruvalluvar2.jpg' style='width:inherit;height:inherit;' >\
					    </div>\
					    <div class='card-content' style='overflow:hidden'>\
					      <span class='card-title activator grey-text text-darken-2'><div id='title'></div></span>\
					      <blockquote>\
					      	<p style='font-size:0.85em;white-space:nowrap;' id='kural_body'></p>\
					      </blockquote>\
					    <a href='http://infinitekural.net' class='valign center' id='copyright1'></a>\
					    </div>\
					    <div class='card-reveal'>\
					      <span class='card-title grey-text text-darken-2'><div id='urai_title'></div></span>\
					      <p id='kural_urai' >Here is some more information about this product that is only revealed once clicked on.</p>\
					    \
		  				<span class='card-title '>Explanation</span>\
		      			<p id='kural_english'>Here is some more information about this product that is only revealed once clicked on.</p>\
					    \
					    <a href='http://infinitekural.net' id='copyright'></a>\
					    </div>				    \
  					</div>"

			//document.getElementById('data_area').innerHTML = html;	
			//var id_name = $(this).parent().attr('id');
			//if(1)
				document.getElementById('ThirukkuralWidget').parentNode.innerHTML = html;
			//	window.alert(id_name)
			//else
			//	window.alert(id_name)
			$.getJSON(jsonp_url, function(data){
				console.log(data.toString());
				document.getElementById('title').innerHTML = data['title']+"&nbsp<i class='material-icons right'>info</i>";	
				document.getElementById('kural_body').innerHTML=(data['todaysKural']);
				document.getElementById('kural_urai').innerHTML=(data['explanation']);
				document.getElementById('kural_english').innerHTML=(data['explanation_english']);
				document.getElementById('urai_title').innerHTML = data['title_explanation']+"&nbsp<i class='material-icons right'>close</i>";	
				document.getElementById('copyright').innerHTML = data['copyright'];	
				document.getElementById('copyright1').innerHTML = data['copyright'];	
			})	
		})
	}	

})();//annoymous function