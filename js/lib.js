var error_msg_box = null;

jQuery(document).ready(function(){

		jQuery('.widget_skills .skills_row').each(function(){
			var wd = jQuery(this).find('.progress').attr('data-process');
			if(jQuery(this).find('.progress').width() === 0) {
				jQuery(this).find('.progress').animate({'width': wd}, 700);
			}
			jQuery('.svg').addClass('vis');
		});


		jQuery('.cleared .widget_skills .skills_row').each(function(){
			var wd = jQuery(this).find('.progress').attr('data-process');
			if(jQuery(this).find('.progress').width() === 0) {
				jQuery(this).find('.progress').css({'width': wd}, 700);
			}
			jQuery('.svg').addClass('vis');
		});
	
});















