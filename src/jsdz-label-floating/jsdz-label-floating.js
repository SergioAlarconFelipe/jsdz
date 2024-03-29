( function( element ) {
	if( window.jsdz === undefined ) {
		throw new Error( '\njsdz no se ha detectado.\nPara más información visita: https://github.com/SergioAlarconFelipe/jsdz' );
	}
	
	function configNodes() {
		function updateFloatingCallback( e ) {
			if( e.type === 'blur' && this.value === '' ) {
				this.value = '';
			}
			
			const label = this.parentElement.querySelector( 'label' );
			if( label ) {
				if( this.value === '' || this.value === null || this.value.length === 0 ) {
					if( label.classList.contains( 'floating' ) ) {
						label.classList.remove( 'floating' );
					}
				}
				else {
					if( !label.classList.contains( 'floating' ) ) {
						label.classList.add( 'floating' );
					}
				}
			}
		}
		
		// Configurar elementos generales
		document.querySelectorAll( '\
			.form-label-floating input:not([ type = "date" ]):not([ type = "time" ]):not([ type = "datetime-local" ]):not([ type = "month" ]):not([ type = "week" ]):not([ type = "color" ]):not([ type = "file" ]):not([ type = "range" ]), \
			.form-label-floating textarea, \
			.form-label-floating select\
		' )
		.forEach( function( node ) {
			node.addEventListener( 'keyup', updateFloatingCallback );
			node.addEventListener( 'keydown', updateFloatingCallback );
			node.addEventListener( 'change', updateFloatingCallback );
			node.addEventListener( 'blur', updateFloatingCallback );

			node.dispatchEvent( new Event( 'change' ) );
			
			node.updateFloating = function() {
				this.dispatchEvent( new Event( 'change' ) );
			}

			if( node.type === 'textarea' && node.classList.contains( 'form-auto-grow' ) ) {
				// let offset = node.offsetHeight - node.clientHeight;
				const paddings = 20 + 8 + 1; // top: 20, bottom: 8, extra: 1

				function setHeight( node ) {
					const lines = node.value.split( /\r|\r\n|\n/ ).length;
					const offset = 18 * lines;
					node.style.height = 'auto';
					// event.target.style.height = event.target.scrollHeight + offset + 'px';
					node.style.height = paddings + offset + 'px';
				}

				setHeight( node );
				node.addEventListener( 'input', function( event ) {
					setHeight( node );
				} );
			}
		} );
		
		// Confugurar custom file upload
		document.querySelectorAll(' \
			.form-label-floating \
			input[ type = "file" ]\
		')
		.forEach( function( node ) {
			const span = document.createElement( 'span' );
			span.classList.add( 'custom-file' );
			node.parentNode.insertBefore( span, node.nextSibling );
			
			span.addEventListener( 'click', function() {
				this.previousSibling.click();
			} );
			
			node.addEventListener( 'change', function( e ) {
				const fileName = this.value.split( '\\' );
				if( fileName.length >= 2 ) {
					this.nextSibling.innerHTML = fileName[ fileName.length - 1 ];
				}
				else {
					this.nextSibling.innerHTML = '';
				}
				updateFloatingCallback.call( this, [ e ] );
			} );
		} );
		
		document.querySelectorAll(' \
			.form-label-floating \
			input[ type = "range" ],\
			.form-label-floating.input-group \
			.btn ~ input,\
			.form-label-floating.input-group \
			.input-group-text ~ input\
		')
		.forEach( function( node ) {
			const label = node.parentElement.querySelector( 'label' );
			const parent = node.parentNode;
			const container = document.createElement( 'div' );
			parent.replaceChild( container, node );
			container.appendChild( node );
			container.appendChild( label );
		} );
	}

	window.jsdz.initFloatingComponents = function() {
		configNodes();
	}
	
	if( document.readyState !== 'loading' ) {
		window.jsdz.initFloatingComponents();
	}
	else {
		document.addEventListener( 'DOMContentLoaded', function() {	
			window.jsdz.initFloatingComponents();
		} );
	}
} )();
