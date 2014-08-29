;(function($) {

	window.main = {
		init: function(){

			console.log('main.js');

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
		},


		loaded: function(){
			this.setBoxSizing();
		},

		setBoxSizing: function(){
			if( $('html').hasClass('no-boxsizing') ){
		        $('.span:visible').each(function(){
		        	console.log($(this).attr('class'));
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

		accordion: function() {
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

						if(main.VideoChanger.player) {
							main.VideoChanger.player.pauseVideo();
						}				

						content.eq(currIndex).stop().animate({ height: 0 }, animTime);
		
					//OPEN if CLOSED
					} else {
						triggers.removeClass('selected');
						content.removeClass('selected');						

						$(this).addClass('selected');
						content.eq(currIndex).addClass('selected');			

						var selected = $('.acc-content.selected'),
							currPoster = $('.poster', selected),
							currPlayer = $('.player', selected);	
						
						$('.player', selected).append(vidPlayer);
						
						setTimeout(function() {
							main.VideoChanger.player.pauseVideo();
						}, 1000);

							
						content.stop().animate({ height: 0 }, animTime);
						content.eq(currIndex).stop().animate({ height: targetHeight }, animTime);	
					}

					setTimeout(function(){ clickPolice = false; }, animTime);				
				}	

				//firing Youtube Play
				$('.play-btn').click(function(event) {
					event.preventDefault();
					var id = $(this).attr('href');

					main.VideoChanger.init(id);

					currPoster.hide();
					currPlayer.show();
				});				    
		  	});



			$(document).on('touchstart click', '.footer-btn', function(e){
				e.preventDefault();

				$('.acc-btn.selected').click();

			});
		},




		VideoChanger: {

			init: function(id){
			    var element = main.VideoChanger.element = $('#player'),
			    	loaded = main.VideoChanger.loaded = false,
			    	completed = main.VideoChanger.completed = false,
			    	player = main.VideoChanger.player;

			    if(element.length){
			    	if(YT){
			    		var player;
			    		if (!main.VideoChanger.player) {
						    main.VideoChanger.player = new YT.Player('player', {
								height: '100%',
								width: '100%',
								videoId: id,
								events: {
									'onReady': main.VideoChanger.onPlayerReady
								},
								playerVars: {
									autoplay: 1
								}
							});
							play = true;
						} else {
							main.VideoChanger.player.loadVideoById(id);
						}

					} else {
						element.hide();
					}
				}
			},

			destroy: function() {
				// main.VideoChanger.player.destroy();
				console.log('destroy');
			},

			onPlayerReady: function (event) {
				event.target.playVideo();
				if(!main.VideoChanger.loaded){		 	
					main.VideoChanger.player.addEventListener('onStateChange', main.VideoChanger.onPlayerStateChange);
					main.VideoChanger.loaded = true;
				}
			},

			onPlayerStateChange: function (event) {
				if(event.data === 0 && !main.VideoChanger.completed) {            
					main.VideoChanger.completed = true;
				}
			}
		},

		resize: function(){
		}
	}

	$(function(){
		main.init();
	});

	$(window).load(function(){
		main.loaded();	
		//main.playlist.init();
		main.accordion();
		main.magnificPopup();
	});

})(jQuery);
