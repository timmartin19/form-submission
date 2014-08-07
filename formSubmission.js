// js module for submitting forms via ajax
// depends on jquery, jquery form plugin
var FormSubmission = {
	formErrorClass: 'form-error',
	appendFormErrors: function(data, form){
		for(var key in data){
			var error = $(document.createElement('span')).attr('class', FormSubmission.formErrorClass).text(data[key]);
			form.find("input[name='" + key + "']").before(error);
		}
	},
	closeModal: function(form){
		form.closest('.modal').modal('hide');
	},
	postFormSubmission: function(form, isModal, data){
		FormSubmission.removeFormErrors(form);
		if(data['success'] == true)
			FormSubmission.resetForm(form, isModal);
		else
			FormSubmission.appendFormErrors(data['errors'], form);
	},
	removeFormErrors: function(form){
		form.find('.' + FormSubmission.formErrorClass).remove();
	},
	resetForm: function(form){
		FormSubmission.resetForm(form, false);
	},
	resetForm: function(form, isModal){
		FormSubmission.removeFormErrors(form);
		form[0].reset();
		if(isModal == true){
			FormSubmission.closeModal(form);
		}
	},
	submitForm: function(form){
		FormSubmission.submitForm(form, false);
	},
	// Expects data to be returned in the format {'success': bool, 'errors': {field_name: message, field2_name: message2}}
	submitForm: function(form, isModal){
		var url = form.attr('action');
		$.ajax({
			method: "POST",
			url: url, 
			data: form.serialize(),
			myForm: form,
			isModal: isModal;
			success: function(data){
				FormSubmission.postFormSubmission($(this).myForm, $(this).isModal, data);
			}
		});
	},
	submitFormWithFiles: function(form, isModal){
		var url = form.attr('action');
		form.ajaxSubmit({
			method: 'POST',
			url: url,
			myForm: form,
			isModal: isModal,
			success: function(data){
				FormSubmission.postFormSubmission($(this).myForm, $(this).isModal, data);
			}
		})
	}
}