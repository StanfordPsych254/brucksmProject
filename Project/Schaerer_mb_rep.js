// ############################## Helper functions ##############################

// Shows slides. We're using jQuery here - the **$** is the jQuery selector function, which takes as input either a DOM element or a CSS selector string.
function showSlide(id) {
  // Hide all slides
	$(".slide").hide();
	// Show just the slide we want to show
	$("#"+id).show();
}


// Show the instructions slide -- this is what we want subjects to see first.

// Get random integers.
// returns either 0 or 1
function random() {
		var cond = Math.floor(Math.random()*3);
		return cond;
}

// START
var slideNum = 1;
var cond = random();
showSlide("instructions");

var experiment = {

    // The object to be submitted.
  data: {
	 	power: [],
		control: [],
		strong: [],
		confident: [],
		first_offer: [],
		AC: [],
		cond: [],
		sex: [],
		age: [],
		nat: [],
		langu: [],
		eth: []
		},

	end: function() {
	showSlide("finished");
	setTimeout(function() {
			turk.submit(experiment.data)
	}, 1500);
		},

 	show_ins: function() {
			if (cond==0){
				$("#condMessage").html('<font>' +
				'Someone ("the buyer") just approached you and raised an interest in purchasing your CD.' +
				' The buyer asks you how much you want for the CD.' +
				'<p>&nbsp; </p>' +
				' <strong> You also know that <u>another buyer has offered you $8 for the CD</u>. Thus, if you </strong>' +
				' <strong> can\'t reach an agreement in the current negotiation, <u>you will get $8 for the CD</u>. </strong> ' +
				'<p>&nbsp; </p>' +
				'<em> You are negotiating the price for the CD. What is your first offer to the buyer? </em>' +
				'<p>&nbsp; </p>' +
				'</font>');
			 }
			if (cond==1){
				$("#condMessage").html('<font>' +
				'Someone ("the buyer") just approached you and raised an interest in purchasing your CD.' +
				' The buyer asks you how much you want for the CD.' +
				'<p>&nbsp; </p>' +
				' <strong> You also know that <u>another buyer has offered you $2 for the CD</u>. Thus, if you </strong>' +
				' <strong> can\'t reach an agreement in the current negotiation, <u>you will get $2 for the CD</u>. </strong> ' +
				'<p>&nbsp; </p>' +
				'<em> You are negotiating the price for the CD. What is your first offer to the buyer? </em>' +
				'<p>&nbsp; </p>' +
				'</style>');
			}
			if (cond==2){
				$("#condMessage").html('<font>' +
				'Someone ("the buyer") just approached you and raised an interest in purchasing your CD.' +
				' The buyer asks you how much you want for the CD.' +
				'<p>&nbsp; </p>' +
				' <strong> You also know that <u>nobody else has offered you any money for the CD</u>. Thus, if you </strong>' +
				' <strong> can\'t reach an agreement in the current negotiation, <u>you won\'t get any money for the CD</u>. </strong> ' +
				'<p>&nbsp; </p>' +
				'<em> You are negotiating the price for the CD. What is your first offer to the buyer? </em>' +
				'<p>&nbsp; </p>' +
				'</font>');
			}
		},

		next: function() {
			if (window.self == window.top | turk.workerId.length > 0) {
				// Allow experiment to start if it's a turk worker OR if it's a test run
				//if (window.self == window.top | turk.workerId.length > 0)
				slideNum = slideNum + 1;
				if (slideNum == 2) {
					showSlide("intro");
					experiment.show_ins();
				}
				if (slideNum == 3) {
					showSlide("first_offer");
					experiment.show_ins();
				}
					if (slideNum == 4) {
						showSlide("AC");
				}
			}
		},

		submit_comments: function() {
    	var x = document.forms["myForm"]["fname"].value;
    	if (x != "" && x != null) {
				experiment.data.first_offer.push(x);
				showSlide("scales");
				$("#testMessage").html('');
    	} else{
				console.log("in else")
				console.log($("#testMessage2"))
				$("#testMessage1").html('<font color="red">' +
					 'Please make a numeric response!' +
					 '</font>');
			}
		},
		submit_comments2: function() {
			var x = document.getElementById("age").value;
			var x2 = document.getElementsByName("sex");
			var x3 = document.getElementsByName("eth");
			var x4 = document.getElementsByName("lang");
			var x5 = document.getElementsByName("US");

			var submit1 = false;
			var submit2 = false;
			var submit3 = false;
			var submit4 = false;
			var submit5 = false;

      if (x != null && x != "") {
					 submit1 = true;
			}
			for (i = 0; i < x2.length; i++) {
					if (x2[i].checked) {
						submit2 =true;
						value5 = x2[i].value;
					}
				}
			for (i = 0; i < x3.length; i++) {
				if (x3[i].checked) {
					value6 = x3[i].value;
					submit3 = true;
					}
				}
			for (i = 0; i < x4.length; i++) {
				if (x4[i].checked) {
					value7 = x4[i].value;
					submit4 = true;
					}
			}
			for (i = 0; i < x5.length; i++) {
				if (x5[i].checked) {
					value8 = x5[i].value;
					submit5 = true;
				}
			}
			if(submit1 && submit2 && submit3 && submit4){
				experiment.end();
				experiment.data.age.push(x);
				experiment.data.sex.push(value5);
				experiment.data.eth.push(value6);
				experiment.data.langu.push(value7);
				experiment.data.nat.push(value8);
					if (cond ==0) {
						experiment.data.cond.push("high");
					}
					if (cond ==1) {
						experiment.data.cond.push("low");
					}
					if (cond ==2) {
						experiment.data.cond.push("none");
					}
			}
			else{
				$("#testMessage3").html('<font color="red">' +
					 'Please make a response!' +
					 '</font>');
			}
		},
	// LOG RESPONSE
		log_response2: function() {

			// Loop through radio buttons
			var text5 = document.getElementById("text5");
			var text14= document.getElementById("text14");
			var text6 = document.getElementById("text6");

			if(text5.checked && text6.checked && text14.checked){
			var go = true;
			}
			if(text1.checked || text2.checked || text3.checked || text4.checked || text7.checked || text8.checked ||text9.checked || text10.checked || text11.checked || text12.checked || text13.checked){
			var go = false;
			}

			if (go) {
				experiment.data.AC.push("pass");
			}
			else{
				experiment.data.AC.push("fail");
			}
			showSlide("demos");
		},

		log_response: function() {
			var response_logged = false;
			var response_logged1 = false;
			var response_logged2 = false;
			var response_logged3 = false;

			//Array of radio buttons
			var radio1 = document.getElementsByName("power");
			var radio2 = document.getElementsByName("power1");
			var radio3 = document.getElementsByName("power2");
			var radio4 = document.getElementsByName("power3");

			// Loop through radio buttons
			for (i = 0; i < radio1.length; i++) {
				if (radio1[i].checked) {
				value1 = radio1[i].value;
				response_logged = true;
			}
		}
			for (i = 0; i < radio2.length; i++) {
				if (radio2[i].checked) {
					value2 = radio2[i].value;
					response_logged1 = true;
				}
			}
			for (i = 0; i < radio3.length; i++) {
				if (radio3[i].checked) {
					value3 = radio3[i].value;
					response_logged2 = true;
				}
			}
			for (i = 0; i < radio4.length; i++) {
				if (radio4[i].checked) {
					value4 = radio4[i].value;
					response_logged3 = true;
				}
			}
			if (response_logged && response_logged1 && response_logged2 && response_logged3) {
				experiment.data.confident.push(value4);
				experiment.data.strong.push(value3);
				experiment.data.control.push(value2);
				experiment.data.power.push(value1);
				experiment.next();
			}
			else{
				$("#testMessage2").html('<font color="red">' +
					 'Please make a response!' +
					 '</font>');
			}
		},
}
