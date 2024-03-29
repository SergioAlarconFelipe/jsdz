( function( element ) {
	if( window.jsdz === undefined ) {
		throw new Error( '\njsdz no se ha detectado.\nPara mas informacion visita: https://github.com/SergioAlarconFelipe/jsdz' );
	}
	
	function configLoader() {
		var loader = document.querySelector( 'div[ data-role = "loader" ]' );
		
		loader.visibility = false;
		loader.style.opacity = 0;
		loader.style.display = 'none';
		
		loader.hide = function( opt ) {
			opt = opt || {};
			opt.time = opt.time || 0;
			opt.fade = opt.fade || loader.classList.contains( 'fade-effect' );

			setTimeout( function() {
				loader.dispatchEvent( window.jsdz.customEvent( 'beforeHide' ) );
				loader.visibility = false;
				// loader.classList.remove( 'visible' );
				loader.style.opacity = 0;
				if( opt.fade ) {
					setTimeout( function() {
						loader.style.display = 'none';
						loader.dispatchEvent( window.jsdz.customEvent( 'afterHide' ) );
					}, 250 );
				}
				else {
					loader.style.display = 'none';
					loader.dispatchEvent( window.jsdz.customEvent( 'afterHide' ) );
				}
			}, opt.time );
		}
		loader.show = function( opt ) {
			opt = opt || {};
			opt.time = opt.time || 0;
			opt.fade = opt.fade !== undefined ? opt.fade : loader.classList.contains( 'fade-effect' );
			
			setTimeout( function() {
				loader.dispatchEvent( window.jsdz.customEvent( 'beforeShow' ) );
				loader.style.display = 'block';
				if( opt.fade ) {
					setTimeout( function() {
						// loader.classList.add( 'visible' );
						loader.style.opacity = 1;
						loader.visibility = true;
						loader.dispatchEvent( window.jsdz.customEvent( 'afterShow' ) );
					}, 250 );
				}
				else {
					// loader.classList.add( 'visible' );
					loader.style.opacity = 1;
					loader.visibility = true;
					loader.dispatchEvent( window.jsdz.customEvent( 'afterShow' ) );
				}
			}, opt.time );
		}
		loader.toggle = function( fade ) {
			if( fade === undefined ) {
				fade = loader.classList.contains( 'fade-effect' );
			}

			if( loader.visible() ) {
				loader.hide( fade );
			}
			else {
				loader.show( fade );
			}
		}
		loader.visible = function() {
			// return loader.classList.contains( 'visible' );
			return loader.visibility;
		}
		
		window.jsdz.loader = loader;
		
		if( loader.dataset.autohide !== undefined ) {
			var time = parseInt( loader.dataset.autohide );
			loader.removeAttribute( 'data-autohide' );
			if( isNaN( time ) ) {
				time = 2500;
			}
			if( time < 250 ) {
				time = 250;
			}
			
			loader.show( { fade: false } );
			if( time ) {
				time -= 250;
				loader.hide( { time: time, } );
			}
		}
	}
	
	if( document.readyState !== 'loading' ) {
		configLoader();
	}
	else {
		document.addEventListener( 'DOMContentLoaded', function() {	
			configLoader();
		} );
	}
} )();
