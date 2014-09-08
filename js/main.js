;(function($) {

	window.main = {
		init: function(){

			main.loaded();	
			main.accordion.init();
			main.magnificPopup();			

			$('a[href^=#].scroll-to-btn').click(function(){
				var target = $($(this).attr('href'));
				var offsetTop = (target.length != 0) ? target.offset().top : 0;
				$('html,body').animate({scrollTop: offsetTop},'slow');
				return false;
			});

			$('.flexslider').flexslider({
				animation: "slide",
				animationLoop: false,
				itemWidth: 240,
				itemMargin: 30,
				minItems: 2,
				maxItems: 4,
				controlNav: false,
				slideshow: false
			});	

			$('.mobile-navigation-btn').on('touchstart click', function() {
				var navigation = $('#navigation');
				if(navigation.is(':visible')){
					navigation.slideUp();
				} else {
					navigation.slideDown();
				}
			});	

			$('.poster').each(function(i, obj) {
				var poster = $(this),
					id = poster.attr('id'),
					url = $.jYoutube(id),
					img = $('<img>'),
					size = 'big';

				poster.append(img);

				img.on('load', function(){
					var image = $(this),
						size;

					if(image.width() < 200 ) {
						if(image.data('size') == 'big') {
							size = 'small';
						} else if (image.data('size') == 'small') {
							size = 'smaller';
						}
					} else {
						image.addClass('scaleup')
					}				

					if(size) {
						var url = $.jYoutube(image.data('id'), size);

						image.attr('src', url).data('size', size);			
					}										
									
				}).data('id', id).data('size', size).attr('src', url);
			});		    
		},


		loaded: function(){
			this.setBoxSizing();
		},

		setBoxSizing: function(){
			if( $('html').hasClass('no-boxsizing') ){
		        $('.span:visible').each(function(){
		        	var span = $(this);
		            var fullW = span.outerWidth(),
		                actualW = span.width(),
		                wDiff = fullW - actualW,
		                newW = actualW - wDiff;
		 			
		            span.css('width',newW);
		        });
		    }
		},	

		magnificPopup: function () {
	        $('.popup-video').magnificPopup({
	          disableOn: 700,
	          type: 'iframe',
	          mainClass: 'mfp-fade',
	          removalDelay: 160,
	          preloader: false,

	          fixedContentPos: false
	        });	
		},			

		accordion: {

			init: function(){

		      	main.accordion.ready();

	      	},

	      	ready: function(){
		  		var animTime = 300,
		      		clickPolice = false;	      		
			  	
			  	$(document).on('touchstart click', '.acc-btn', function(){
					if(!clickPolice){
						clickPolice = true;

						var currIndex = $(this).index('.acc-btn'),
							targetHeight = $('.acc-content-inner').eq(currIndex).outerHeight(),
							triggers = $('.acc-btn'),
							content = $('.acc-content'),
							vidPlayer = $('#player');

						 //CLOSE IF OPENED
						if ($(this).hasClass('selected')) {

							triggers.removeClass('selected');
							content.removeClass('selected');				

							var selected = $('.acc-content.selected'),
								currPoster = $('.poster', selected),
								currPlayer = $('.player', selected);				

							if(main.Player.player) {
								main.Player.player.pauseVideo();
							}				

							content.eq(currIndex).stop().animate({ height: 0 }, animTime);
			
						//OPEN if CLOSED
						} else {
							//mark actual
							triggers.removeClass('selected');
							content.removeClass('selected');						
							$(this).addClass('selected');
							content.eq(currIndex).addClass('selected');			

							var selected = $('.acc-content.selected'),
								currPoster = '',
								currPoster = $('.poster', selected),
								currPlayer = $('.player', selected);
							
							$('.player', selected).append(vidPlayer);
							
							if(main.Player.player) {
								setTimeout(function() {
									main.Player.player.pauseVideo();
								}, 1000);
							}
								
							content.stop().animate({ height: 0 }, animTime);
							content.eq(currIndex).stop().animate({ height: targetHeight }, animTime);	
						}

						setTimeout(function(){ clickPolice = false; }, animTime);				
					}				    
			  	});

				$('.play-btn').click(function(event) {
					event.preventDefault();
					var id = $(this).attr('href');

					main.Player.init(id);


					$('.acc-content.selected .poster').hide();
					$('.acc-content.selected .player').show();
				});	


				$(document).on('touchstart click', '.footer-btn', function(e){
					e.preventDefault();

					$('.acc-btn.selected').click();

				});
			}
		},




		Player: {
			element: $('#player'),

			init: function(id){
			    var element = main.Player.element,
			    	loaded = main.Player.loaded = false,
			    	completed = main.Player.completed = false,
			    	player = main.Player.player;

			    if(element.length){
			    	if(YT){
			    		if (!main.Player.player) {
						    main.Player.player = new YT.Player('player', {
								height: '100%',
								width: '100%',
								videoId: id,
								events: {
									'onReady': main.Player.onPlayerReady
								},
								playerVars: {
									autoplay: 1
								}
							});
							play = true;
						} else {
							main.Player.player.loadVideoById(id);
						}
					} else {
						element.hide();
					}
				}
			},

			destroy: function(event) {
				main.Player.player.destroy();
			},

			onPlayerReady: function (event) {
				event.target.playVideo();
				if(!main.Player.loaded){		 	
					main.Player.player.addEventListener('onStateChange', main.Player.onPlayerStateChange);
					main.Player.loaded = true;
				}
			},

			onPlayerStateChange: function (event) {
				if(event.data === 0 && !main.Player.completed) {            
					main.Player.completed = true;
				}
			}
		},

		resize: function(){
		}
	}

	$(function(){
		main.init();
	});

})(jQuery);
