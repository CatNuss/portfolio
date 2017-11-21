$(window).on('load', function() { // makes sure the whole site is loaded 
  $('#status').delay(1000).fadeOut('slow'); // will first fade out the loading animation 
  $('#preloader').delay(1350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
  $('body').delay(1500).css({'overflow':'visible'}).fadeIn('slow');
})
//contact animate

$(document).ready(function(){
    animateDiv('.contact');
});

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(myclass){
    var newq = makeNewPosition();
    $(myclass).animate({ top: newq[0], left: newq[1] }, 20000,   function(){
      animateDiv(myclass);        
    });
    
};

$(document).ready(function(){
    //video gallery
    
      $(".modal-box-base").hide();
    
        $(".contact").click(function(){
            $(".modal-contact").slideDown("slow", "linear");
        });
        
        $(".backbutt_contact").click(function(){
            $(".modal-contact").slideUp("slow", "linear");
        });
    
//contact modal show/hide
    
        $("#film").click(function(){
            $(".modal-film").slideDown("slow", "linear");
        });
        
        $(".backbutt_film").click(function(){
            $(".modal-film").slideUp("slow", "linear");
        });
//film modal show/hide
    
        $("#web").click(function(){
            $(".modal-web").slideDown("slow", "linear");
        });
        
        $(".backbutt_web").click(function(){
            $(".modal-web").slideUp("slow", "linear");
        });
//web modal show/hide
    
        $("#about").click(function(){
            $(".modal-about").slideDown("slow", "linear");
        });
        
        $(".backbutt_about").click(function(){
            $(".modal-about").slideUp("slow", "linear");
        });
//about modal show/hide
    
    //about page contact butt
        $(".mycontact").click(function(){
            $(".modal-about").slideUp("slow", "linear");
            $(".modal-contact").delay(800).slideDown("slow", "linear");
        });

    
    

    loop();
//COMMET ANIMATE
    function loop() {
            $("#commet").css({"right":"300px", "top":"-200px"});
            $("#commet").delay(10000).animate({right: '2000', top: '2000'},6000, "linear", function(){ loop() });
    };
    
    
    loop1();
//COMMET ANIMATE
    function loop1() {
            $("#commet2").css({"right":"700px", "top":"-200px"});
            $("#commet2").delay(15000).animate({right: '2000', top: '2000'},6000, "linear", function(){ loop1() });
    };
    

    
    loop2();
//COMMET ANIMATE
    function loop2() {
            $("#commet3").css({"right":"40px", "top":"-200px"});
            $("#commet3").delay(20000).animate({right: '2000', top: '2000'},6000, "linear", function(){ loop2() });
    };
    
    
//GALLERY 
    
    var duration = ( $('.no-csstransitions').length > 0 ) ? 0 : 300;
	//define a svgClippedSlider object
	function svgClippedSlider(element) {
		this.element = element;
		this.slidesGallery = this.element.find('.gallery').children('li');
		this.slidesCaption = this.element.find('.caption').children('li');
		this.slidesNumber = this.slidesGallery.length;
		this.selectedSlide = this.slidesGallery.filter('.selected').index();
		this.arrowNext = this.element.find('.navigation').find('.next');
		this.arrowPrev = this.element.find('.navigation').find('.prev');

		this.visibleSlidePath = this.element.data('selected');
		this.lateralSlidePath = this.element.data('lateral');

		this.bindEvents();
	}

	svgClippedSlider.prototype.bindEvents = function() {
		var self = this;
		//detect click on one of the slides
		this.slidesGallery.on('click', function(event){
			if( !$(this).hasClass('selected') ) {
				//determine new slide index and show it
				var newSlideIndex = ( $(this).hasClass('left') )
					? self.showPrevSlide(self.selectedSlide - 1)
					: self.showNextSlide(self.selectedSlide + 1);
			}
		});
	}

	svgClippedSlider.prototype.showPrevSlide = function(index) {
		var self = this;
		this.selectedSlide = index;
		this.slidesGallery.eq(index + 1).add(this.slidesCaption.eq(index + 1)).removeClass('selected').addClass('right');
		this.slidesGallery.eq(index).add(this.slidesCaption.eq(index)).removeClass('left').addClass('selected');

		//morph the svg cliph path to reveal a different region of the image
		Snap("#cd-morphing-path-"+(index+1)).animate({'d': self.visibleSlidePath}, duration, mina.easeinout);
		Snap("#cd-morphing-path-"+(index+2)).animate({'d': self.lateralSlidePath}, duration, mina.easeinout);

		if( index - 1 >= 0  ) this.slidesGallery.eq(index - 1).add(this.slidesCaption.eq(index - 1)).removeClass('left-hide').addClass('left');
		if( index + 2 < this.slidesNumber ) this.slidesGallery.eq(index + 2).add(this.slidesCaption.eq(index + 2)).removeClass('right');
	
		( index <= 0 ) && this.element.addClass('prev-hidden');
		this.element.removeClass('next-hidden');

		//animate prev arrow on click
		this.arrowPrev.addClass('active').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			self.arrowPrev.removeClass('active');
		});
	}

	svgClippedSlider.prototype.showNextSlide = function(index) {
		var self = this;
		this.selectedSlide = index;
		this.slidesGallery.eq(index - 1).add(this.slidesCaption.eq(index - 1)).removeClass('selected').addClass('left');
		this.slidesGallery.eq(index).add(this.slidesCaption.eq(index)).removeClass('right').addClass('selected');

		//morph the svg cliph path to reveal a different region of the image
		Snap("#cd-morphing-path-"+(index+1)).animate({'d': self.visibleSlidePath}, duration, mina.easeinout);
		Snap("#cd-morphing-path-"+(index)).animate({'d': self.lateralSlidePath}, duration, mina.easeinout);

		if( index - 2 >= 0  ) this.slidesGallery.eq(index - 2).add(this.slidesCaption.eq(index - 2)).removeClass('left').addClass('left-hide');
		if( index + 1 < this.slidesNumber ) this.slidesGallery.eq(index + 1).add(this.slidesCaption.eq(index + 1)).addClass('right');
		
		( index + 1 >= this.slidesNumber ) && this.element.addClass('next-hidden');
		this.element.removeClass('prev-hidden');

		//animate next arrow on click
		this.arrowNext.addClass('active').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			self.arrowNext.removeClass('active');
		});
	}

	$('.cd-svg-clipped-slider').each(function(){
		//create a svgClippedSlider object for each .cd-svg-clipped-slider
		new svgClippedSlider($(this));
	});
    
    

    
//ABOUT
    $(".future").hide();
    $(".history").hide();
    
        $(".myfuture").click(function(){
            $(".history").slideUp("slow", "linear").hide;
            $(".future").delay(800).slideDown("slow", "linear").show;
        });
    
        $(".mystory").click(function(){
            $(".future").slideUp("slow", "linear").hide;
            $(".history").delay(800).slideDown("slow", "linear").show;
        });
    
        $(".mystoryhome").click(function(){
            $(".abthome").slideUp("slow", "linear").hide;
            $(".history").delay(800).slideDown("slow", "linear").show;
        });
    
        $(".myskills").click(function(){
            $(".history").slideUp("slow", "linear").hide;
            $(".abthome").delay(800).slideDown("slow", "linear").show;
        });
    
    
//film
    
     $('.nextvid').click(function() {
        $('.currentvid').removeClass('currentvid').hide()
            .next("#video").show().addClass('currentvid');
        if ($('.currentvid').hasClass('last')) {
            $('.nextvid').attr('disabled', true);
        }
        $('.prevvid').attr('disabled', null);
    });

    $('.prevvid').click(function() {
        $('.currentvid').removeClass('currentvid').hide()
            .prev("#video").show().addClass('currentvid');
        if ($('.currentvid').hasClass('first')) {
            $('.prevvid').attr('disabled', true);
        }
        $('.nextvid').attr('disabled', null);
    });
    
    $('.nextvid').click(function(){
       $('.currentvid').fadeOut("slow", "linear"); 
    });
    
    $('.prevvid').click(function(){
       $('.currentvid').fadeIn("slow", "linear"); 
    });
    
});
