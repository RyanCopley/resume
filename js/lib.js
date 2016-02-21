/* Author: ThemeREX - ShiftCV HTML 1.1 */
/* Should you have any questions regarding the theme, please contact us via: http://themerex.net/?p=142/#tickets */

/*jQuery(document).ready(function(){
	//include Custom.JS
	 jQuery('head').append('<link rel="stylesheet" type="text/css" media="all" href="custom_tools/css/custom.css">');
	 jQuery('head').append('<link rel="stylesheet" type="text/css" media="all" href="custom_tools/css/colorpicker.css">');
	 jQuery('head').append('<script type="text/javascript" src="custom_tools/js/colorpicker.js"></script>');
	 jQuery('head').append('<script type="text/javascript" src="custom_tools/js/custom-block.js"></script>');
});*/

/*global jQuery:false */
var error_msg_box = null;
var googlemap_refreshed = false;

jQuery(window).load(function() {
	"use strict";
	if (window.location.hash==='#portfolio') {
		jQuery('#portfolio .section_header .section_title a').trigger('click');
	}
});


jQuery(document).ready(function(){
		
	jQuery(".sc_contact_form .enter").click(function (e) {
        userSubmitForm();
        e.preventDefault();
        return false;
    });

    empt = 'Name field can not be empty';
    to_lng = 'Too long name field';
    to_lng = 'Too long name field';
    empt_mail = 'Too short (or empty) email address';
    to_lng_mail = 'Too long email address';
    incor = 'Incorrect email address';
    mes_empt = 'message can not be empty';
    to_lng_mes = 'Too long message';

	// contact form Validate
	function userSubmitForm() {
		var error = formValidate(jQuery(".sc_contact_form form"), {
			error_message_show: true,
			error_message_time: 5000,
			error_message_class: "sc_infobox sc_infobox_style_error",
			error_fields_class: "error_fields_class",
			exit_after_first_error: false,
			rules: [{
				field: "username",
				min_length: {
					value: 1,
					message: empt
				},
				max_length: {
					value: 160,
					message: to_lng
				}
			}, {
				field: "email",
				min_length: {
					value: 7,
					message: empt_mail
				},
				max_length: {
					value: 60,
					message: to_lng_mail
				},
				mask: {
					value: "^([a-z0-9_\-]+\\.)*[a-z0-9_\\-]+@[a-z0-9_\-]+(\\.[a-z0-9_\-]+)*\\.[a-z]{2,6}$",
					message: incor
				}
			}, {
				field: "message",
				min_length: {
					value: 1,
					message: mes_empt
				},
				max_length: {
					value: 200,
					message: to_lng_mes
				}
			}]
		});
		if (!error) {
			var user_name = jQuery(".sc_contact_form #sc_contact_form_username").val();
			var user_email = jQuery(".sc_contact_form #sc_contact_form_email").val();
			var user_site = jQuery(".sc_contact_form #sc_contact_form_site").val();
			var user_msg = jQuery(".sc_contact_form #sc_contact_form_message").val();
			var data = {
				action: "submit_contact_form",
				nonce: "e1f9461bc9",
				user_name: user_name,
				user_email: user_email,
				user_site: user_site,
				user_msg: user_msg
			};
			jQuery.post("include/sendmail.php", data, userSubmitFormResponse, "text");
		}
	}
	
	function userSubmitFormResponse(response) {
		var rez = JSON.parse(response);
		jQuery(".sc_contact_form .result")
			.toggleClass("sc_infobox_style_error", false)
			.toggleClass("sc_infobox_style_success", false);
		if (rez.error == "") {
			jQuery(".sc_contact_form .result").addClass("sc_infobox_style_success").html("Your message sended!");
			setTimeout("jQuery('.sc_contact_form .result').fadeOut(); jQuery('.sc_contact_form form').get(0).reset();", 3000);
		} else {
			jQuery(".sc_contact_form .result").addClass("sc_infobox_style_error").html("Transmit failed! " + rez.error);
		}
		jQuery(".sc_contact_form .result").fadeIn();
	}
		// toTop link setup
		"use strict";
		jQuery(window).scroll(function() {
			if(jQuery(this).scrollTop() >= 110) {
				jQuery('#toTop').show();	
			} else {
				jQuery('#toTop').hide();	
			}
		});
		jQuery('#toTop').click(function(e) {
			jQuery('body,html').animate({scrollTop:0}, 800);
			e.preventDefault();
		});


				
		

		// Section tabs
		jQuery('#mainpage_accordion_area').tabs('section > .section_body', {
			tabs: 'section > .section_header > .section_title',
			effect : 'slide',
			slideUpSpeed: 600,
			slideDownSpeed: 600,
			onClick: function (e, tabIndex) {
				var tabs = jQuery('#mainpage_accordion_area section > .section_header > .section_title');
				var tab = tabs.eq(tabIndex);
				
				if (tab.hasClass('resume_section_title')) {					// Resume
					jQuery('.widget_skills .skills_row').each(function(){
						var wd = jQuery(this).find('.progress').attr('data-process');
						if(jQuery(this).find('.progress').width() === 0) {
							jQuery(this).find('.progress').animate({'width': wd}, 700);
						}
						jQuery('.svg').addClass('vis');
					});
					if(jQuery('#resume .section_body').css('display') === 'none'){
						jQuery('#resume .section_body').parent().removeClass('open');
					}
					else {
						jQuery('#resume .section_body').parent().addClass('open');
					}
				}
				return false;
			},
			currentClose: true,
			anotherClose: false,
			initialIndex: -1
		});

		jQuery('.cleared .widget_skills .skills_row').each(function(){
			var wd = jQuery(this).find('.progress').attr('data-process');
			if(jQuery(this).find('.progress').width() === 0) {
				jQuery(this).find('.progress').css({'width': wd}, 700);
			}
			jQuery('.svg').addClass('vis');
		});
		jQuery('#profile:not(.printable) .profile_section_header h2').click(function(){
			if (jQuery(this).find('.section_name').hasClass('show')){
				jQuery(this).find('.section_name').animate({'width':'135', 'opacity':'1'},
					550, 'easeOutCubic').removeClass('show');
			} else {
				jQuery(this).find('.section_name').animate({'width':'0', 'opacity':'0'},
					250,'easeOutCubic').slideDown().addClass('show');
			}
			jQuery(this).parent().toggleClass('opened').next('.profile_section_body').stop().slideToggle({
				duration: 450, easing: 'easeOutCubic'});
			return false;
		});
		
		jQuery('#mainpage_accordion_area h2.section_title').click(function(){
			var ofs = jQuery(this).offset().top;
			jQuery('html, body').animate({'scrollTop':ofs-50});
		});
		/* =========================== Customize site ===================================== */
		
		
		// Background theme
		jQuery('#theme_switcher').click(function(e) {
			var $body = jQuery(document).find('body').eq(0);
			var is_dark = $body.hasClass('dark');
			var theme_style = '';
			if (is_dark) {
				theme_style = 'light';
				jQuery(this).find('.switch_wrap').html('Dark version');
				$body.removeClass('dark').addClass('light');
				setStateStyleSheet('dark', false);
			} else {
				theme_style = 'dark';
				jQuery(this).find('.switch_wrap').html('Light version');
				$body.addClass('dark').removeClass('light');
				setStateStyleSheet('dark', true);
			}
			jQuery.cookie('theme_style', theme_style, {expires: 365, path: '/'});
			e.preventDefault();
			return false;
		});
		
		jQuery(window).scroll(function(){
			"use strict";
			if(jQuery('#resume').length === 0) {
				return;
			}
			var top = jQuery(document).scrollTop();
			if(jQuery('#resume').offset().top-60 < top || parseInt(jQuery('#resume_buttons').css('top'), 10) > 0) {
				var pr_h = jQuery('#resume_buttons').parent().height()-60;
				top = Math.min(pr_h, Math.max(0, top-jQuery('#resume').offset().top+50));
				jQuery('#resume_buttons').css({'top':top});
			}
		});
		
		


});



	/*global jQuery:false */
	var error_msg_box = null;

	jQuery(window).load(function() {
		"use strict";
		if (window.location.hash==='#portfolio') {
			jQuery('#portfolio .section_header .section_title a').trigger('click');
		}
	});

















