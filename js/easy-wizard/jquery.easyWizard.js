/* ========================================================
 * easyWizard v1
 * http://st3ph.github.com/jquery.easyWizard
 * ========================================================
 * Copyright 2012 Stéphane Litou
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 * ======================================================== */
(function( $ ) {
	var arrSettings = new Array();
	var easyWizardMethods = {
		init : function(options) {
			var settings = $.extend( {
				'stepClassName' : 'step',
				'showSteps' : true,
				'stepsText' : '{n}. {t}',
				'showButtons' : true,
				'buttonsClass' : '',
				'prevButton' : '< Anterior',
				'nextButton' : 'Siguiente >',
				'debug' : false,
				'submitButton': true,
				'submitButtonText': 'Guardar',
				'submitButtonClass': '',
				before: function(wizardObj, currentStepObj, nextStepObj) {},
				after: function(wizardObj, prevStepObj, currentStepObj) {},
				beforeSubmit: function(wizardObj) {
					wizardObj.find('input, textarea').each(function() {
						if(!this.checkValidity()) {
							this.focus();
							step = $(this).parents('.'+thisSettings.stepClassName).attr('data-step');
							easyWizardMethods.goToStep.call(wizardObj, step);

							return false;
						}
					});
				}
			}, options);

			arrSettings[this.index()] = settings;

			return this.each(function() {
				thisSettings = settings;

				$this = $(this); // Wizard Obj
				$this.addClass('easyWizardElement');
				$steps = $this.find('.'+thisSettings.stepClassName);
				thisSettings.steps = $steps.length;
				thisSettings.width = $(this).width();

				if(thisSettings.steps > 1) {
					// Create UI
					$this.wrapInner('<div class="easyWizardWrapper" />');
					$this.find('.easyWizardWrapper').width(thisSettings.width * thisSettings.steps);
					$this.css({
						'position': 'relative',
						'overflow': 'hidden'
					}).addClass('easyPager');

					$stepsHtml = $('<ul class="easyWizardSteps">');

					$steps.each(function(index) {
						step = index + 1;
						$(this).css({
							'float': 'left',
							'width': thisSettings.width,
							'height': '1px'
						}).attr('data-step', step);

						if(!index) {
							$(this).addClass('active').css('height', '');
						}

						stepText = thisSettings.stepsText.replace('{n}', '<span>'+step+'</span>');
						stepText = stepText.replace('{t}', $(this).attr('data-step-title'));
						$stepsHtml.append('<li'+(!index?' class="current"':'')+' data-step="'+step+'">'+stepText+'</li>');
					});

					if(thisSettings.showSteps) {
						$this.prepend($stepsHtml);
					}

					if(thisSettings.showButtons) {
						paginationHtml = '<div class="easyWizardButtons">';
							paginationHtml += '<button class="prev '+thisSettings.buttonsClass+'">'+thisSettings.prevButton+'</button>';
							paginationHtml += '<button class="next '+thisSettings.buttonsClass+'">'+thisSettings.nextButton+'</button>';
							paginationHtml += thisSettings.submitButton?'<button type="submit" class="submit '+thisSettings.submitButtonClass+'">'+thisSettings.submitButtonText+'</button>':'';
						paginationHtml	+= '</div>';
						$paginationBloc = $(paginationHtml);
						$paginationBloc.css('clear', 'both');
						$paginationBloc.find('.prev, .submit').hide();
						$paginationBloc.find('.prev').bind('click.easyWizard', function(e) {
							e.preventDefault();

							$wizard = $(this).parents('.easyWizardElement');
							easyWizardMethods.prevStep.apply($wizard);
						});

						$paginationBloc.find('.next').bind('click.easyWizard', function(e) {
							e.preventDefault();

							$wizard = $(this).parents('.easyWizardElement');
							easyWizardMethods.nextStep.apply($wizard);
						});
						$this.append($paginationBloc);
					}

					$formObj = $this.is('form')?$this:$(this).find('form');

					// beforeSubmit Callback
					$this.find('[type="submit"]').bind('click.easyWizard', function(e) {
						$wizard = $(this).parents('.easyWizardElement');
						thisSettings.beforeSubmit($wizard);
						return true;
					});
				}else if(thisSettings.debug) {
					console.log('Can\'t make a wizard with only one step oO');
				}
			});
		},
		prevStep : function( ) {
			thisSettings = arrSettings[this.index()];
			$activeStep = this.find('.active');
			if($activeStep.prev('.'+thisSettings.stepClassName).length) {
				prevStep = parseInt($activeStep.attr('data-step')) - 1;
				easyWizardMethods.goToStep.call(this, prevStep);
			}
		},
		
		nextStep : function( ) {
			
			thisSettings = arrSettings[this.index()];
			$activeStep = this.find('.active');
			var pasoactivo=$activeStep.attr('data-step')
			var puedeseguir=false;
			//alert("this="+pasoactivo);
			if(pasoactivo==1){
				if ($("input[name='generoEncuestado']:checked").val() == "" || $("input[name='generoEncuestado']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 1', "", 'Validación', 'OK');
					$('#generoEncuestado1').focus();
				} else if ($('#edadEncuestado').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 2', "", 'Validación', 'OK');
					$('#edadEncuestado').focus();
				} else if ($("input[name='estudiosencuestado']:checked").val() == "" || $("input[name='estudiosencuestado']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 3', "", 'Validación', 'OK');
					$('#estudiosencuestado1').focus();
				} else if ($("input[name='origenencuestado']:checked").val() == "" || $("input[name='origenencuestado']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 4', "", 'Validación', 'OK');
					$('#origenencuestado1').focus();
				} else if ($("input[name='hijosEncuestado']:checked").val() == "" || $("input[name='hijosEncuestado']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 5', "", 'Validación', 'OK');
					$('#hijosEncuestado1').focus();
				} else if ($("input[name='estadocivilEncuestado']:checked").val() == "" || $("input[name='estadocivilEncuestado']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 6', "", 'Validación', 'OK');
					$('#estadocivilEncuestado1').focus();
				}else{
					puedeseguir=true;
				}
			}else if(pasoactivo==2){
				if ($('#calificacionalcalde').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta A', "", 'Validación', 'OK');
					$('#calificacionalcalde').focus();
				} else if ($('#calificaciongobernador').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta B', "", 'Validación', 'OK');
					$('#calificaciongobernador').focus();
				} else if ($('#calificacionpresidente').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta C', "", 'Validación', 'OK');
					$('#calificacionpresidente').focus();
					
				}else{
					puedeseguir=true;
				}
			
			}else if(pasoactivo==3){
				if ($("input[name='opinionalcalde']:checked").val() == "" || $("input[name='opinionalcalde']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 7', "", 'Validación', 'OK');
					$('#opinionalcalde1').focus();
				}else{
					puedeseguir=true;
				}
			}else if(pasoactivo==4){
				if ($('#problemas1').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 8', "", 'Validación', 'OK');
					$('#problemas1').focus();
				} else if ($('#problemas2').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 8', "", 'Validación', 'OK');
					$('#problemas2').focus();
				} else if ($('#problemas3').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 8', "", 'Validación', 'OK');
					$('#problemas3').focus();
				}else{
					puedeseguir=true;
				}
			}else if(pasoactivo==5){	
					
				if ($('#segurovoto').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 9', "", 'Validación', 'OK');
					$('#segurovoto').focus();
				} else if ($("input[name='votopresidente']:checked").val() == "" || $("input[name='votopresidente']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 10', "", 'Validación', 'OK');
					$('#votopresidente1').focus();
				} else if ($("input[name='votogobernador']:checked").val() == "" || $("input[name='votogobernador']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 11', "", 'Validación', 'OK');
					$('#votogobernador1').focus();
				} else if ($("input[name='votosenadores']:checked").val() == "" || $("input[name='votosenadores']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 12', "", 'Validación', 'OK');
					$('#votosenadores1').focus();
				} else if ($("input[name='votosenado']:checked").val() == "" || $("input[name='votosenado']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 13', "", 'Validación', 'OK');
					$('#votosenado').focus();
				} else if ($("input[name='votodiputadofederal']:checked").val() == "" || $("input[name='votodiputadofederal']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 14', "", 'Validación', 'OK');
					$('#votodiputadofederal1').focus();
				} else if ($("input[name='votodiputadolocal']:checked").val() == "" || $("input[name='votodiputadolocal']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 15', "", 'Validación', 'OK');
					$('#votodiputadolocal1').focus();
				} else if ($("input[name='conoceRobertoCordova']:checked").val() == "" || $("input[name='conoceRobertoCordova']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.1', "", 'Validación', 'OK');
					$('#conoceRobertoCordova1').focus();
				} else if ($('#partidoRobertoCordova').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 16.1', "", 'Validación', 'OK');
					$('#partidoRobertoCordova1').focus();
				} else if ($("input[name='opinionRobertoCordova']:checked").val() == "" || $("input[name='opinionRobertoCordova']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.1', "", 'Validación', 'OK');
					$('#opinionRobertoCordova1').focus();
			
				} else if ($("input[name='conoceAraceliGarduno']:checked").val() == "" || $("input[name='conoceAraceliGarduno']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.2', "", 'Validación', 'OK');
					$('#conoceAraceliGarduno1').focus();
				} else if ($('#partidoAraceliGarduno').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 16.2', "", 'Validación', 'OK');
					$('#partidoAraceliGarduno1').focus();
				
				} else if ($("input[name='opinionAraceliGarduno']:checked").val() == "" || $("input[name='opinionAraceliGarduno']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.2', "", 'Validación', 'OK');
					$('#opinionAraceliGarduno1').focus();
				} else if ($("input[name='conoceFranciscoEspin']:checked").val() == "" || $("input[name='conoceFranciscoEspin']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.3', "", 'Validación', 'OK');
					$('#conoceFranciscoEspin1').focus();
				} else if ($('#partidoFranciscoEspin').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 16.3', "", 'Validación', 'OK');
					$('#partidoFranciscoEspin1').focus();
				
				} else if ($("input[name='opinionFranciscoEspin']:checked").val() == "" || $("input[name='opinionFranciscoEspin']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.3', "", 'Validación', 'OK');
					$('#opinionFranciscoEspin1').focus();
				} else if ($("input[name='conoceGerardoSanchez']:checked").val() == "" || $("input[name='conoceGerardoSanchez']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.4', "", 'Validación', 'OK');
					$('#conoceGerardoSanchez1').focus();
				} else if ($('#partidoGerardoSanchez').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 16.4', "", 'Validación', 'OK');
					$('#partidoGerardoSanchez1').focus();
				
				} else if ($("input[name='opinionGerardoSanchez']:checked").val() == "" || $("input[name='opinionGerardoSanchez']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.4', "", 'Validación', 'OK');
					$('#opinionGerardoSanchez1').focus();
				} else if ($("input[name='conoceJuanAngel']:checked").val() == "" || $("input[name='conoceJuanAngel']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.5', "", 'Validación', 'OK');
					$('#conoceJuanAngel1').focus();
				} else if ($('#partidoJuanAngel').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 16.5', "", 'Validación', 'OK');
					$('#partidoJuanAngel1').focus();
				
				} else if ($("input[name='opinionJuanAngel']:checked").val() == "" || $("input[name='opinionJuanAngel']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.5', "", 'Validación', 'OK');
					$('#opinionJuanAngel1').focus();
				} else if ($("input[name='conoceEzequielCastrejon']:checked").val() == "" || $("input[name='conoceEzequielCastrejon']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.6', "", 'Validación', 'OK');
					$('#conoceEzequielCastrejon1').focus();
				} else if ($('#partidoEzequielCastrejon').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 16.6', "", 'Validación', 'OK');
					$('#partidoEzequielCastrejon1').focus();
				
				} else if ($("input[name='opinionEzequielCastrejon']:checked").val() == "" || $("input[name='opinionEzequielCastrejon']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.6', "", 'Validación', 'OK');
					$('#opinionEzequielCastrejon1').focus();
				} else if ($("input[name='conoceConcepcionAguilar']:checked").val() == "" || $("input[name='conoceConcepcionAguilar']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.7', "", 'Validación', 'OK');
					$('#conoceConcepcionAguilar1').focus();
				} else if ($('#partidoConcepcionAguilar').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 16.7', "", 'Validación', 'OK');
					$('#partidoConcepcionAguilar1').focus();
				
				} else if ($("input[name='opinionConcepcionAguilar']:checked").val() == "" || $("input[name='opinionConcepcionAguilar']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.7', "", 'Validación', 'OK');
					$('#opinionConcepcionAguilar1').focus();
				} else if ($("input[name='conoceCarlosNavarro']:checked").val() == "" || $("input[name='conoceCarlosNavarro']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.8', "", 'Validación', 'OK');
					$('#conoceCarlosNavarro1').focus();
				} else if ($('#partidoCarlosNavarro').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 16.8', "", 'Validación', 'OK');
					$('#partidoCarlosNavarro1').focus();
				
				} else if ($("input[name='opinionCarlosNavarro']:checked").val() == "" || $("input[name='opinionCarlosNavarro']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.8', "", 'Validación', 'OK');
					$('#opinionCarlosNavarro1').focus();
				} else if ($("input[name='conoceCarlosBrito']:checked").val() == "" || $("input[name='conoceCarlosBrito']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.9', "", 'Validación', 'OK');
					$('#conoceCarlosBrito1').focus();
				} else if ($('#partidoCarlosBrito').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 16.9', "", 'Validación', 'OK');
					$('#partidoCarlosBrito1').focus();
				
				} else if ($("input[name='opinionCarlosBrito']:checked").val() == "" || $("input[name='opinionCarlosBrito']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 16.9', "", 'Validación', 'OK');
					$('#opinionCarlosBrito1').focus();
				} else if ($("input[name='partidoalcalde']:checked").val() == "" || $("input[name='partidoalcalde']:checked").val() == undefined) {
						//alert("q1");
						navigator.notification.alert('Debe responder la pregunta 17', "", 'Validación', 'OK');
						$('#partidoalcalde1').focus();
				} else if ($("input[name='votoalcalde']:checked").val() == "" || $("input[name='votoalcalde']:checked").val() == undefined) {
						//alert("q1");
						navigator.notification.alert('Debe responder la pregunta 18', "", 'Validación', 'OK');
						$('#votoalcalde1').focus();
				} else if ($("input[name='votootroalcalde']:checked").val() == "" || $("input[name='votootroalcalde']:checked").val() == undefined) {
						//alert("q1");
						navigator.notification.alert('Debe responder la pregunta 19', "", 'Validación', 'OK');
						$('#votootroalcalde1').focus();
				} else if ($('#repartirvotoJuanAngel').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 20.1', "", 'Validación', 'OK');
					$('#repartirvotoJuanAngel1').focus();
				} else if ($('#repartirvotoEzequielCastrejon').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 20.2', "", 'Validación', 'OK');
					$('#repartirvotoEzequielCastrejon1').focus();
				} else if ($('#repartirvotoCarlosBrito').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 20.3', "", 'Validación', 'OK');
					$('#repartirvotoCarlosBrito1').focus();
				} else if ($('#repartirvotoGerardoSanchez').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 20.4', "", 'Validación', 'OK');
					$('#repartirvotoGerardoSanchez').focus();
				} else if ($('#repartirvotoRobertoCordova').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 20.5', "", 'Validación', 'OK');
					$('#repartirvotoRobertoCordova1').focus();
				} else if ($('#repartirvotoFranciscoEspin').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 20.6', "", 'Validación', 'OK');
					$('#repartirvotoFranciscoEspin1').focus();
				} else if ($('#repartirvotoConcepcionAguilar').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 20.7', "", 'Validación', 'OK');
					$('#repartirvotoConcepcionAguilar').focus();
				} else if ($('#repartirvotoCarlosNavarro').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 20.8', "", 'Validación', 'OK');
					$('#repartirvotoCarlosNavarro').focus();
				} else if ($('#repartirvotoNulo').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 20.9', "", 'Validación', 'OK');
					$('#repartirvotoNulo').focus();
				} else if ($('#repartirvotoBlanco').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 20.10', "", 'Validación', 'OK');
					$('#repartirvotoBlanco').focus();
				} else if ($("input[name='ganaralcalde']:checked").val() == "" || $("input[name='ganaralcalde']:checked").val() == undefined) {
						//alert("q1");
						navigator.notification.alert('Debe responder la pregunta 21', "", 'Validación', 'OK');
						$('#ganaralcalde1').focus();
				} else if ($("input[name='mejorciudad']:checked").val() == "" || $("input[name='mejorciudad']:checked").val() == undefined) {
						//alert("q1");
						navigator.notification.alert('Debe responder la pregunta 22', "", 'Validación', 'OK');
						$('#mejorciudad1').focus();
				} else if ($("input[name='partidocapaz']:checked").val() == "" || $("input[name='partidocapaz']:checked").val() == undefined) {
						//alert("q1");
						navigator.notification.alert('Debe responder la pregunta 23', "", 'Validación', 'OK');
						$('#partidocapaz1').focus();
				
				}else{
					puedeseguir=true;
				}
			
			}else if(pasoactivo==6){
				if ($("input[name='propuesta1']:checked").val() == "" || $("input[name='propuesta1']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.1', "", 'Validación', 'OK');
					$('#propuesta11').focus();
				}else if ($("input[name='propuestaImportante1']:checked").val() == "" || $("input[name='propuestaImportante1']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.1', "", 'Validación', 'OK');
					$('#propuestaImportante11').focus();
				}else if ($("input[name='propuesta2']:checked").val() == "" || $("input[name='propuesta2']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.2', "", 'Validación', 'OK');
					$('#propuesta21').focus();
				}else if ($("input[name='propuestaImportante2']:checked").val() == "" || $("input[name='propuestaImportante2']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.2', "", 'Validación', 'OK');
					$('#propuestaImportante2').focus();
				}else if ($("input[name='propuesta3']:checked").val() == "" || $("input[name='propuesta3']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.3', "", 'Validación', 'OK');
					$('#propuesta31').focus();
				}else if ($("input[name='propuestaImportante3']:checked").val() == "" || $("input[name='propuestaImportante3']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.3', "", 'Validación', 'OK');
					$('#propuestaImportante31').focus();
				}else if ($("input[name='propuesta4']:checked").val() == "" || $("input[name='propuesta4']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.4', "", 'Validación', 'OK');
					$('#propuesta41').focus();
				}else if ($("input[name='propuestaImportante4']:checked").val() == "" || $("input[name='propuestaImportante4']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.4', "", 'Validación', 'OK');
					$('#propuestaImportante41').focus();
				}else if ($("input[name='propuesta5']:checked").val() == "" || $("input[name='propuesta5']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.5', "", 'Validación', 'OK');
					$('#propuesta51').focus();
				}else if ($("input[name='propuestaImportante5']:checked").val() == "" || $("input[name='propuestaImportante5']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.5', "", 'Validación', 'OK');
					$('#propuestaImportante51').focus();
				}else if ($("input[name='propuesta6']:checked").val() == "" || $("input[name='propuesta6']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.6', "", 'Validación', 'OK');
					$('#propuesta61').focus();
				}else if ($("input[name='propuestaImportante6']:checked").val() == "" || $("input[name='propuestaImportante6']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.6', "", 'Validación', 'OK');
					$('#propuestaImportante61').focus();
				}else if ($("input[name='propuesta7']:checked").val() == "" || $("input[name='propuesta7']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.7', "", 'Validación', 'OK');
					$('#propuesta71').focus();
				}else if ($("input[name='propuestaImportante7']:checked").val() == "" || $("input[name='propuestaImportante7']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.7', "", 'Validación', 'OK');
					$('#propuestaImportante71').focus();
				}else if ($("input[name='propuesta8']:checked").val() == "" || $("input[name='propuesta8']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.8', "", 'Validación', 'OK');
					$('#propuesta81').focus();
				}else if ($("input[name='propuestaImportante8']:checked").val() == "" || $("input[name='propuestaImportante8']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.8', "", 'Validación', 'OK');
					$('#propuestaImportante8').focus();
				}else if ($("input[name='propuesta9']:checked").val() == "" || $("input[name='propuesta9']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.9', "", 'Validación', 'OK');
					$('#propuesta91').focus();
				}else if ($("input[name='propuestaImportante9']:checked").val() == "" || $("input[name='propuestaImportante9']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.9', "", 'Validación', 'OK');
					$('#propuestaImportante91').focus();
				}else if ($("input[name='propuesta10']:checked").val() == "" || $("input[name='propuesta10']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.10', "", 'Validación', 'OK');
					$('#propuesta101').focus();
				}else if ($("input[name='propuestaImportante10']:checked").val() == "" || $("input[name='propuestaImportante10']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.10', "", 'Validación', 'OK');
					$('#propuestaImportante101').focus();
				}else if ($("input[name='propuesta11']:checked").val() == "" || $("input[name='propuesta11']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.11', "", 'Validación', 'OK');
					$('#propuesta111').focus();
				}else if ($("input[name='propuestaImportante11']:checked").val() == "" || $("input[name='propuestaImportante11']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.11', "", 'Validación', 'OK');
					$('#propuestaImportante111').focus();
				}else if ($("input[name='propuesta12']:checked").val() == "" || $("input[name='propuesta12']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.12', "", 'Validación', 'OK');
					$('#propuesta121').focus();
				}else if ($("input[name='propuestaImportante12']:checked").val() == "" || $("input[name='propuestaImportante12']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 24.12', "", 'Validación', 'OK');
					$('#propuestaImportante121').focus();
				}else if ($("input[name='cumpliralcalde']:checked").val() == "" || $("input[name='cumpliralcalde']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 25', "", 'Validación', 'OK');
					$('#cumpliralcalde1').focus();
				}else if ($("input[name='impresionroberto']:checked").val() == "" || $("input[name='impresionroberto']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 26', "", 'Validación', 'OK');
					$('#impresionroberto1').focus();
				}else if ($("input[name='impresionalfonso']:checked").val() == "" || $("input[name='impresionalfonso']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 27', "", 'Validación', 'OK');
					$('#impresionalfonso1').focus();
				}else if ($("input[name='terremoto']:checked").val() == "" || $("input[name='terremoto']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder la pregunta 28', "", 'Validación', 'OK');
					$('#terremoto1').focus();
				} else if ($('#mismopartido').val()=="") {
                    navigator.notification.alert('Debe responder la pregunta 29', "", 'Validación', 'OK');
					$('#mismopartido').focus();
				
				}else{
					puedeseguir=true;
				}
			
			}
			
			
			if(puedeseguir){
				if($activeStep.next('.'+thisSettings.stepClassName).length) {
						nextStep = parseInt($activeStep.attr('data-step')) + 1;
						easyWizardMethods.goToStep.call(this, nextStep);
						var body = $("html, body");
						body.stop().animate({scrollTop:0}, 900, 'swing', function() { 
						   //alert("Finished animating");
						});
					}
			}
		},
		/*
		nextStep : function( ) {
			thisSettings = arrSettings[this.index()];
			$activeStep = this.find('.active');
			if($activeStep.next('.'+thisSettings.stepClassName).length) {
				nextStep = parseInt($activeStep.attr('data-step')) + 1;
				easyWizardMethods.goToStep.call(this, nextStep);
				var body = $("html, body");
				body.stop().animate({scrollTop:0}, 900, 'swing', function() { 
				   //alert("Finished animating");
				});
			}
		},
		*/
		goToStep : function(step) {
			thisSettings = arrSettings[this.index()];

			$activeStep = this.find('.active');
			$nextStep = this.find('.'+thisSettings.stepClassName+'[data-step="'+step+'"]');
			currentStep = $activeStep.attr('data-step');

			// Before callBack
			thisSettings.before(this, $activeStep, $nextStep);

			// Define direction for sliding
			if(currentStep < step) { // forward
				leftValue = thisSettings.width * -1;
			}else { // backward
				leftValue = thisSettings.width;
			}

			// Slide !
			$activeStep.animate({
				height: '1px'
			}).removeClass('active');

			$nextStep.css('height', '').addClass('active');

			this.find('.easyWizardWrapper').animate({
				'margin-left': thisSettings.width * (step - 1) * -1
			});

			// Defines steps
			this.find('.easyWizardSteps .current').removeClass('current');
			this.find('.easyWizardSteps li[data-step="'+step+'"]').addClass('current');

			// Define buttons
			$paginationBloc = this.find('.easyWizardButtons');
			if($paginationBloc.length) {
				if(step == 1) {
					$paginationBloc.find('.prev, .submit').hide();
					$paginationBloc.find('.next').show();
				}else if(step < thisSettings.steps) {
					$paginationBloc.find('.submit').hide();
					$paginationBloc.find('.prev, .next').show();
				}else {
					$paginationBloc.find('.next').hide();
					$paginationBloc.find('.submit').show();
				}
			}

			// After callBack
			thisSettings.after(this, $activeStep, $nextStep);
		}
	};

	$.fn.easyWizard = function(method) {
		if ( easyWizardMethods[method] ) {
			return easyWizardMethods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return easyWizardMethods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.easyWizard' );
		}
	};
})(jQuery);
