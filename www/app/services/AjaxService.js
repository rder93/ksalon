app.service('ajaxService', ['$state', function($state){
	debug = $('body').attr('debug');

	if ($('.ajax_true')) {
		form = $('.ajax_true');

		if (debug == 'true') {
			console.log(form.length);
		}

		form.submit(function(event) {
			
			loaderAnimation(true);
			sform = $(this);
			
			$.ajax({
				url: server_uri+sform.attr('action'),				
				type: sform.attr('method'),
				dataType: sform.attr('type'),
				data: sform.serialize(),
			})
			.done(function(e) {
				if (debug=='true') {
					console.log('Response (success): ');
					console.log(e);
					console.log('Data send: ');
					console.log(sform.serialize());
				}
 				
 				if (e.status && e.message) {
 					  Materialize.toast(e.message, 4000);
 					  if (sform.attr('redirect')!=null) {
 					  	$state.go(sform.attr('redirect'));
 					  }
 				}

 				if (e.auth_user) {
 					$.sessionStorage.set('user', e.auth_user);
 				}

				loaderAnimation(false);
			})
			.fail(function(e) {
				if (debug=='true') {
					console.log('Response (fail): ');
					console.log(e);
					console.log('Data send: ');
					console.log(sform.serialize());
				}

				loaderAnimation(false);
			});


			return false;
		});
		
	}
}])