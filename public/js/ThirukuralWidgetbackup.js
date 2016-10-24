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
			
			//adding the mini widget css
			var css_link = $("<link>",{
				rel:"stylesheet",
				href:"http://infinitekural.net/stylesheets/widget.css"
			});
			css_link.appendTo("head");

		
		//adding the materialize javascript cdn
					
			var jsonp_url = "http://infinitekural.net/jsonp?callback=?";
			
			var html = "<div id='card1' ontouchstart='this.classList.toggle(&quot;hover&quot;);' class='flip-container'>\
						 <div class='flipper'>\
						    <div style='white-space:nowrap;' class='front'>\
						      <table>\
						        <tr>\
						          <td>\
						            <u id='title'>இன்றைய குறள்</u>\
						          </td>\
						          <td>\
						            <p class='full-circle'></p>\
						          </td>\
						        </tr>\
						      </table>\
						      <p id='kural_body'>கரப்பிடும்பை யில்லாரைக் காணின் நிரப்பிடும்பை<br/><span id='kural_line2'>யெல்லா மொருங்கு கெடும்</span></p>\
						    </div>\
						    <div style='' class='back'>\
						      <table>\
						        <tr>\
						          <td>\
						            <u id='urai_title'>உரை</u>\
						          </td>\
						          <td>\
						            <p class='full-circle'></p>\
						          </td>\
						        </tr>\
						      </table>\
						      <p id='kural_urai'>\
						        கண்ணோட்டதிற்க்கு உரிய கண்ணோடுப் பொருந்தி இருந்தும் கண்ணோட்டம் இல்லாதவர் (கண் இருந்தும் காணாத ) மரத்தினைப் போன்றவர்.\
						        மு. வரதராசன்\
						      </p>\
						    </div>\
						  </div>\
						</div>"

			//document.getElementById('data_area').innerHTML = html;	
			//var id_name = $(this).parent().attr('id');
			//if(1)
				document.getElementById('ThirukkuralWidget').innerHTML = html;
			//	window.alert(id_name)
			//else
			//	window.alert(id_name)
			$.getJSON(jsonp_url, function(data){
				console.log(data.toString());
				document.getElementById('title').innerHTML = data['title'];	
				document.getElementById('kural_body').innerHTML=(data['todaysKural']);
				document.getElementById('kural_urai').innerHTML=(data['explanation']);
				
				document.getElementById('urai_title').innerHTML = data['title_explanation'];	
				//document.getElementById('copyright').innerHTML = data['copyright'];	
				//document.getElementById('copyright1').innerHTML = data['copyright'];	
			})	
		})
	}	

})();//annoymous function