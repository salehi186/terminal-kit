#!/usr/bin/env node
/*
	The Cedric's Swiss Knife (CSK) - CSK terminal toolbox test suite
	
	Copyright (c) 2009 - 2014 Cédric Ronvel 
	
	The MIT License (MIT)
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

/* jshint unused:false */



require( '../lib/terminal.js' ).getDetectedTerminal( function( error , term ) {


	function terminate()
	{
		term.brightBlack( 'About to exit...\n' ) ;
		term.grabInput( false ) ;
		term.applicationKeypad( false ) ;
		term.beep() ;
		term.fullscreen( false ) ;
		
		// Add a 100ms delay, so the terminal will be ready when the process effectively exit, preventing bad escape sequences drop
		setTimeout( function() { process.exit() } , 100 ) ;
	} 



	term.fullscreen() ;
	term.bold.cyan( 'Key test, hit anything on the keyboard to see how it is detected...\n' ) ;
	term.green( 'Hit CTRL-C to quit.\n\n' ) ;

	// Set Application Keypad mode, but it does not works on every box (sometime numlock should be off for this to work)
	term.applicationKeypad() ;

	//term.keyboardModifier() ;

	term.grabInput( { mouse: 'button' , focus: true } ) ;
	//term.grabInput( { mouse: 'motion' , focus: true } ) ;

	term.on( 'key' , function( name , matches , data ) {
		
		console.log( "'key' event:" , name , matches , Buffer.isBuffer( data.code ) ? data.code : data.code.toString( 16 ) , data.codepoint ? data.codepoint.toString( 16 ) : '' ) ;
		
		if ( matches.indexOf( 'CTRL_C' ) >= 0 )
		{
			term.green( 'CTRL-C received...\n' ) ;
			terminate() ;
		}
		
		if ( matches.indexOf( 'CTRL_R' ) >= 0 )
		{
			term.green( 'CTRL-R received... asking terminal some information...\n' ) ;
			term.requestCursorLocation() ;
			term.requestScreenSize() ;
		}
	} ) ;

	term.on( 'terminal' , function( name , data ) {
		console.log( "'terminal' event:" , name , data ) ;
	} ) ;

	term.on( 'mouse' , function( name , data ) {
		console.log( "'mouse' event:" , name , data ) ;
	} ) ;

	term.on( 'unknown' , function( buffer ) {
		console.log( "'unknown' event, buffer:" , buffer ) ;
	} ) ;

} ) ;

