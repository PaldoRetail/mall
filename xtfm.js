/**-----------------------------------------------------------
* @file 			xtfm.js
* @author 		hadamai <hadamai@naver.com>
* @brief 		xtfm Library
* @version		0.1 <2009-08-18>
-------------------------------------------------------------*/
var xtfm =
{
	version:'0.1b',
	isDev:true,
	debugMode:'alert',
	userAgent:null,
	userBrowser:null
};

xtfm.userAgent = navigator.userAgent;
xtfm.userBrowser = getUserAgent();

function getUserAgent()
{
	var retAgent="UW";

	if( /Firefox[\/\s](\d+\.\d+)/.test( navigator.userAgent ) )
	{
		var ffversion=new Number( RegExp.$1 )
		if( ffversion >= 3 ) retAgent = "FF03";
		else if( ffversion >=2 ) retAgent = "FF02";
		else if( ffversion >=1 ) retAgent = "FF01";
		else retAgent = "FF00";
	}
	else if( /MSIE (\d+\.\d+);/.test( navigator.userAgent ) )
	{
		var ieversion=new Number( RegExp.$1 )
		if( ieversion >= 8 ) retAgent = "IE08";
		else if( ieversion >= 7 ) retAgent = "IE07";
		else if( ieversion >= 6 ) retAgent = "IE06";
		else if( ieversion >= 5 ) retAgent = "IE04";
		else retAgent = "IE00";
	}
	else if( /Opera[\/\s](\d+\.\d+)/.test( navigator.userAgent ) )
	{
		var oprversion=new Number( RegExp.$1 )
		if( oprversion >= 10 ) retAgent = "OP10";
		else if( oprversion >= 9 ) retAgent = "OP09";
		else if( oprversion >= 8 ) retAgent = "OP08";
		else if( oprversion >= 7) retAgent = "OP07";
		else retAgent = "OP00";
	}
	else if( /Webkit/.test( navigator.userAgent ) )
	{
		retAgent = "SF00";
	}

	return retAgent;
}


function xtfmPopUpCC( _pageURL, _popWidth, _popHeight, _popScrollbar, _popResizable, _isFocus )
{
	var popWindowName = null;
	if( window.screenLeft )
	{
		var popXPos = window.screenLeft;
		var popYPos = window.screenTop;
	}
	else
	{
		var popXPos = window.screenX;
		var popYPos = window.screenY;
	}
	var popLeftPos = popXPos + ( ( document.body.offsetWidth - _popWidth ) / 2 );
	var popTopPos = popYPos + ( ( document.body.offsetHeight - _popHeight ) / 2 );
	var popSettings = '';

	popSettings = 'width=' + _popWidth + 'px,';
	popSettings += 'height=' + _popHeight + 'px,';
	popSettings += 'top=' + popTopPos + 'px,';
	popSettings += 'left=' + popLeftPos + 'px,';
	popSettings += 'scrollbars=' + _popScrollbar + ',';
	popSettings += 'resizable=' + _popResizable + ',';
	popSettings += 'status=0';

	//trace( _popWidth, _popHeight, popXPos, popYPos, document.body.offsetWidth, document.body.offsetHeight, popSettings );

	var popWindow = window.open( _pageURL,popWindowName, popSettings );
	if( _isFocus ) popWindow.focus();
}






/*-----------------------------------------------------------
 * Extend XTFM Function
-----------------------------------------------------------*/
(function()
{
	/*-----------------------------------------------------------
	 * @function	- _
	 * @brief		- 선택자 / 언더스코어를 사용하여 간단히 elements를 선택한다.
						- 파라미터로 문자열을 받고, id는 #을 클래스는 .을 디폴드는 네임값으로
						- 미완성
	-----------------------------------------------------------*/
	function _( str )
	{
		var obj = null;

		switch ( str.charAt( 0 ) )
		{
			case '#': obj = document.getElementById( str.removeAt( 0 ) ); break;
			case '.':
			{
				var resultArray = xtfm.tools.getElementByClass( str.removeAt( 0 ) );
				( resultArray.length > 1 ) ? alert( '동일한 클래스명을 가진 객체가 하나 이상입니다.' ):obj = resultArray[ 0 ];
				break;
			}
			default : obj = document.getElementsByName( str ); break;
		}

		if( !obj ) alert( '일치하는 객체가 없습니다.' );
		return obj;
	}
	/*-----------------------------------------------------------
	 * @function	- trace
	 * @brief		- 플래시의 트레이스와 같이 파라미터를 콤마로 구분하여 알러트로 출력
	-----------------------------------------------------------*/
	function trace()
	{
		var msg = '';
		for( var loopIndex = 0, loopLen = arguments.length; loopIndex < loopLen; loopIndex++ )
		{
			msg += '- [' + loopIndex + '] ( type - ' + typeof( arguments[ loopIndex ] ) + ' ) : ' + arguments[ loopIndex ];
			msg +=  ( loopIndex != loopLen - 1 ) ? '\n':'';
		}
		alert( msg );
	}
	/*-----------------------------------------------------------
	 * @function - xtfm.debug
	-----------------------------------------------------------*/
	function debug()
	{
		if( xtfm.isDev == false || xtfm.isDev == null || xtfm.isDev == undefined ) return;
		var commander = arguments.callee.caller;
		var msg = 'xtfm Debuger Caller Name : ' + commander.getName() + '\n';
		msg += commander.getArgsInfo() + '\n';

		msg += "-------------------------------------------------------------------------\n";

		var loopLen = arguments.length;

		if( loopLen != 0 )
		{
			for( var loopIndex = 0; loopIndex < loopLen; loopIndex++ )
			{
				if( typeof( arguments[ loopIndex ] ) == 'object' ) msg += 'Object : ' + arguments[ loopIndex ].toString();
				else if( typeof( arguments[ loopIndex ] ) == 'function' ) msg += 'Function : ' + arguments[ loopIndex ].getName();
				else msg += arguments[ loopIndex ];

				msg +=  ( loopIndex != loopLen - 1 ) ? '\n':'';
			}
		}

		if( xtfm.debugMode == 'alert' ) alert( msg );
	}
	/*-----------------------------------------------------------
	 * @function - xtfm._debug
	-----------------------------------------------------------*/
	function createClass()
	{
		//debug();
		if( !arguments ) { trace( 'can not create class - no args' ); return; }
		else { var properties = xtfm.tools.toArray( arguments );}
		var p = xtfm.tools.isFunction( properties[ 0 ] ) ? properties[ 0 ]:null;

		function clazz() { this.init.apply( this, arguments ) };
		extendObject( clazz, { addMethods:addMethods } );
		clazz.parent = p;
		clazz.children = [];

		if( p )
		{
			var classInstance = function(){ classInstance.prototype = p.prototype; };
			clazz.prototype = new classInstance;
			p.children.push( clazz );
		}

		for( var loopIndex = 0, loopLen = properties.length; loopIndex < loopLen; loopIndex++ ) clazz.addMethods( properties[ loopIndex ] );

		if( !clazz.prototype.init ) clazz.prototype.init = function(){};
		clazz.prototype.constructor = clazz;
		return clazz;
	}
	/*-----------------------------------------------------------
	 * @function - xtfm.addMethods
	-----------------------------------------------------------*/
	function addMethods( source )
	{
		var ancestor = this.parent && this.parent.prototype;
		var properties = getKeys( source );

		if( !getKeys( { toString: true } ).length )
		{
			if( source.toString != Object.prototype.toString ) properties.push( 'toString' );
			if( source.valueOf != Object.prototype.valueOf ) properties.push( 'valueOf' );
		}

		for( var loopIndex = 0, loopLen = properties.length; loopIndex < loopLen; loopIndex++)
		{
			var p = properties[ loopIndex ], value = source[ p ];
			if( ancestor && isFunction( value ) && value.getArgsName().getFirst() == "$super")
			{
				var method = value;
				value = ( function( m ){ return function(){ return ancestor[ m ].apply( this, arguments ); }; })( p ).wrap( method );
				value.valueOf = method.valueOf.bind( method );
				value.toString = method.toString.bind( method );
			}
			this.prototype[ p ] = value;
		}

		return this;
	}

	/*-----------------------------------------------------------
	 * @function - xtfm.extendObject
	-----------------------------------------------------------*/
	function extendObject( obj, s )
	{
		for( var p in s )
		{
			obj[ p ] = s[ p ];
		}
		return obj;
	}
	/*-----------------------------------------------------------
	 * @function -
	-----------------------------------------------------------*/
	function getKeys( obj )
	{
		var result = [];
		for( var p in obj ) result.push( p );
		return result;
	}
	/*-----------------------------------------------------------
	 * @function -
	-----------------------------------------------------------*/
	function getValues( obj )
	{
		var result = [];
		for( var p in obj ) result.push( obj[ p ] );
		return result;
	}
	/*-----------------------------------------------------------
	 * @function -
	-----------------------------------------------------------*/
	function getType( obj )	{ return Object.prototype.toString.call( obj ).match(/^\[object\s(.*)\]$/)[ 1 ]; }
	/*-----------------------------------------------------------
	 * @function -
	-----------------------------------------------------------*/
	function duplicate( obj ){ return extendObject( {}, obj ); }
	/*-----------------------------------------------------------
	 * @function -
	-----------------------------------------------------------*/
	function isElement( obj ){ return !!( obj && obj.nodeType == 1 ); }
	/*-----------------------------------------------------------
	 * @function -
	-----------------------------------------------------------*/
	function isArray( obj ){ return getType( obj ) === "Array"; }
	/*-----------------------------------------------------------
	 * @function -
	-----------------------------------------------------------*/
	function isFunction( obj ){ return typeof( obj ) === "function"; }
	/*-----------------------------------------------------------
	 * @function -
	-----------------------------------------------------------*/
	function isString( obj ){ return getType( obj ) === "String"; }
	/*-----------------------------------------------------------
	 * @function -
	-----------------------------------------------------------*/
	function isNumber( obj ){ return getType( obj ) === "Number"; }
	/*-----------------------------------------------------------
	 * @function -
	-----------------------------------------------------------*/
	function isUndefined( obj ){ return typeof( obj ) === "undefined"; }
	/*-----------------------------------------------------------
	 * @function -
	-----------------------------------------------------------*/
	function isEmptyValue( _obj )
	{
		if( _obj === null || _obj === undefined )
		{
			trace( '알 수 없는 객체입니다.' );
			return true;
		}

		var str = _obj.value;
		var strFind = " ", strChange = "", position, strOri_Length;

		position = str.indexOf( " " );

		while ( position != -1 ) { str = str.replace( " ", "" ); position = str.indexOf( " " ); 	}

		if( str.length == 0 ) return true;

		return false;
	}

	function isEmpty( str ){ return ( str === null || str === undefined || str === false || str == '' ) ? true: false; }

	/*-------------------------------------------------------------------------------------
	 * isValidLoaded ( Type Boolean ) - 로드 검사를 했는지 여부 / validLoaded 함수에서 true로 변경
	 * isLoaded ( Type Boolean ) - 로드되었는지 여부 / onLoadInit 함수에서 true로 변경
	 * loadedActions ( Type Array ) - 온로드시 실행할 액션들 / onLoaded에서 추가 / onLoadinit 에서 실행
	-------------------------------------------------------------------------------------*/
	var isValidLoaded = false;
	var isLoaded = false;
	var loadedActions = [];

	/*-------------------------------------------------------------------------------------
	* onload 타이밍 액션을 실행 혹은 담기 위한 함수
	*
	* - validLoaded() -> 로드가 완료 되었는지 체크하여 이벤트 할당
	* - isLoaded( xtfm.isLoaded ) 값을 체크 / false ->loaded Actions 에 담아둔다. / true -> 바로 실행한다.
	*
	* @param ( Type Function ) : _action - 이름없는 함수 타입으로 실행해야할 명령을 인자로 받는다.
	* @return ( Type Function ) :
	*
	* @todo : -
	-------------------------------------------------------------------------------------*/
	function	onLoaded( _action )
	{
		validLoaded();

		if( xtfm.isLoaded == true )
		{
			_action.call( document, xtfm );
		}
		else
		{
			xtfm.loadedActions.push( _action );
		}
		return this;
	}

	/*-------------------------------------------------------------------------------------
	* onload 시 실행 함수
	*
	* - isLoaded( xtfm.isLoaded )를 체크하여 false이면 isLoaded를 true로 변경후 loadedActions에 담긴 액션을 실행한다.
	*
	* @todo : -
	-------------------------------------------------------------------------------------*/
	function onLoadInit()
	{
		if( !xtfm.isLoaded )
		{
			if( !document.body )
			{
				return setTimeout( xtfm.onLoadInit, 13 );
			}

			xtfm.isLoaded = true;
			if( xtfm.loadedActions )
			{
				excuteEach( xtfm.loadedActions, function(){ this.call( document, xtfm ); });
				xtfm.loadedActions = null;
			}
		}
	}

	/*-------------------------------------------------------------------------------------
	* 로드가 되었는지 확인 / onload 이벤트 대체 / 브라우저별 대응
	*
	* - onLoaded함수에서 호출
	* -
	*
	* @return ( Type Function ) :
	*
	* @todo : -
	-------------------------------------------------------------------------------------*/
	function validLoaded()
	{
		if( xtfm.isValidLoaded ) return;

		xtfm.isValidLoaded = true;
		var removeHandler = null;

		//브라우저 이벤트가 이미 발생하고 난 뒤에 호출 될 경우
		if( document.readyState === "complete" )
		{
			return xtfm.onLoadInit();
		}

		//IE를 제외한 나머지 브라우저 대응
		if( document.addEventListener )
		{
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			window.addEventListener( "load", xtfm.onLoadInit, false );
		}
		else if( document.attachEvent )
		{
			document.attachEvent( "onreadystatechange", DOMContentLoaded );
			window.attachEvent( "onload", xtfm.onLoadInit );

			var toplevel = false;
			try{ toplevel = window.frameElement == null;} catch( e ){}

			if( document.documentElement.doScroll && toplevel )
			{
				(function()
				{
					if( xtfm.isLoaded ) return;
					try { document.documentElement.doScroll("left"); }
					catch( e ){ setTimeout( arguments.callee, 1 ); return; }
					xtfm.onLoadInit();
				})();
			}
		}
	}

	/*-------------------------------------------------------------------------------------
	* 로드가 되었는지 확인 / onload 이벤트 대체 / 브라우저별 대응
	*
	* - onLoaded함수에서 호출
	* -
	*
	* @return ( Type Function ) :
	*
	* @todo : -
	-------------------------------------------------------------------------------------*/
	if( document.addEventListener )
	{
		DOMContentLoaded = function()
		{
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			xtfm.onLoadInit();
		};

	}
	else if( document.attachEvent )
	{
		DOMContentLoaded = function()
		{
			if( document.readyState === "complete" )
			{
				document.detachEvent( "onreadystatechange", DOMContentLoaded );
				xtfm.onLoadInit();
			}
		};
	}

	/*-------------------------------------------------------------------------------------
	*
	*
	* - 배열에 담겨진 액션을 실행
	* -
	* @param
	* @return ( Type Function ) :
	*
	* @todo : -
	-------------------------------------------------------------------------------------*/
	function excuteEach( obj, fn, args )
	{
		var property, loopIndex = 0, loopLen = obj.length;

		if( args )
		{
			if( loopLen === undefined )
			{
				for( property in obj )
				{
					if( fn.apply( obj[ property ], args ) === false ) break;
				}
			}
			else
			{
				for( var loopIndex = 0; loopIndex < loopLen; loopIndex++ )
				{
					if(  fn.apply( obj[ loopIndex++ ], args ) === false ) break;
				}
			}
		}
		else
		{
			if( loopLen === undefined )
			{
				for( property in obj )
				{
					if( fn.call( obj[ property ], property, obj[ property ] ) === false ) break;
				}
			}
			else
			{
				for( var value = obj[ 0 ]; loopIndex < loopLen && fn.call( value, loopIndex, value ) !== false; value = obj[ ++loopIndex ] )
				{

				}
			}
		}

		return obj;
	}


	function getParent( obj ){ return obj.parentNode;}
	function getChildren( obj ){ return getSibling( obj.firstChld ); }
	function getSibling( obj, elem )
	{
		var result = [];
		for( ; obj; obj = obj.nextSibling )
		{
			if( obj.nodeType == 1 && obj != elem ) result.push( obj );
		}

		return result;
	}

	function trim( text ){ return ( text || "" ).replace( /^\s+|\s+$/g, "" ); }

	function stripHTML( input )
	{
		var regexp = new RegExp(/\<[^\<]+\>/g);
		var output = input.replace( regexp, "" );
		output = xtfm.trim( output.toLowerCase().replace(/\n/, '').replace(/\s{2,}/, ' ') );
		return output;
	}

	function getAttribute( obj, attribute )
	{
		//trace( obj );
		//trace( 'getAttribute', obj, attribute, xtfm.userBrowser, obj.getAttributeNode( attribute ) );
		if( xtfm.userBrowser == 'IE08' || xtfm.userBrowser == 'IE07' || xtfm.userBrowser == 'IE06' )
		{
			return obj.getAttributeNode( attribute ).value;
		}
		else
		{
			return obj.getAttribute( attribute ).value
		}

	}

	function setAttribute( obj, attribute, value )
	{
		//if( xtfm.userBrowser == 'IE07' || xtfm.userBrowser == 'IE06' )
		//{
			//obj.setAttributeNode( attribute, value );
		//}
		//else
		//{
			obj.setAttribute( attribute,  value );
		//}
	}

	function setCookie( _values )
	{
		if( isEmpty( _values ) )
		{
			alert( '인자가 전달되지 않았거나 비어있습니다.' );
			return;
		}

		if( typeof( _values ) != 'string' && typeof( _values ) != 'array' )
		{
			alert( '인자가 문자열이거나 배열이어야 합니다.' );
			return;
		}

		var valueConfig = new Array();
		valueConfig[ 'name' ] = null;
		valueConfig[ 'value' ] = null;
		valueConfig[ 'expires' ] = '';
		valueConfig[ 'path' ] = '; path=/';
		valueConfig[ 'domain' ] = '';
		valueConfig[ 'secure' ] = '';

		if( typeof( _values ) == 'string' )
		{
			var valueArray = _values.split( ',' );

			for( var loopIndex = 0, loopLen = valueArray.length; loopIndex < loopLen; loopIndex++ )
			{
				valueArray[ loopIndex ] = xtfm.trim( valueArray[ loopIndex ] );
				itemArray = valueArray[ loopIndex ].split( ':');
				itemArray[ 1 ] = xtfm.trim( itemArray[ 1 ] );
				itemArray[ 0 ] = xtfm.trim( itemArray[ 0 ].toLowerCase() );

				if( itemArray[ 0 ] == 'name' )
				{
					valueConfig[ 'name' ] = itemArray[ 1 ];
				}
				else if( itemArray[ 0 ] == 'value' )
				{
					valueConfig[ 'value' ] = itemArray[ 1 ];
				}
				else if( itemArray[ 0 ] == 'expires' )
				{
					var expiresDate = new Date();
					expiresDate.setDate( expiresDate.getDate() + itemArray[ 1 ] );
					valueConfig[ 'expires' ] = '; expires=' + expiresDate.toGMTString();
				}
				else if( itemArray[ 0 ] == 'path' )
				{
					valueConfig[ 'path' ] = '; path=' + itemArray[ 1 ];
				}
				else if( itemArray[ 0 ] == 'domain' )
				{
					valueConfig[ 'domain' ] = '; domain=' + itemArray[ 1 ];
				}
				else if( itemArray[ 0 ] == 'secure' )
				{
					if( itemArray[ 1 ] == '1' || itemArray[ 1 ] == 'true' )
					{
						valueConfig[ 'secure' ] = '; secure';
					}
					else
					{
						valueConfig[ 'secure' ] = '';
					}
				}
			}
		}
		else if( typeof( _values ) == 'array' )
		{

		}

		var cookieString = valueConfig[ 'name' ] + '=' + escape( valueConfig[ 'value' ] );
		cookieString += valueConfig[ 'expires' ];
		cookieString += valueConfig[ 'path' ];
		cookieString += valueConfig[ 'domain' ];
		cookieString += valueConfig[ 'secure' ];

		document.cookie = cookieString;
	}

	function getCookie( _name )
	{
		var arg = _name + '=';
		var argumentsLen = arg.length;
		var loopLen = document.cookie.length;
		var loopIndex = 0;
		var endPos = 0;

		while( loopIndex < loopLen )
		{
			endPos = loopIndex + argumentsLen;
			if( document.cookie.substring( loopIndex, endPos ) == arg )
			{
				var endstr = document.cookie.indexOf( ";", endPos );
				if( endstr == -1 )
				{
					endstr = document.cookie.length;
				}
				return unescape( document.cookie.substring( endPos, endstr ) );
				//return Cookies.getCookieVal(j);
			}

			loopIndex = document.cookie.indexOf( " ", loopIndex ) + 1;
			if( loopIndex == 0 ) break;
		}
		return null;
	}

	function clearCookie( _name )
	{
		if( xtfm.getCookie( _name ) )
		{
			xtfm.setCookie( 'name:' + _name + ', value:, expires:0' );
		}
	}


	function sprintf()
	{
		if( typeof( arguments ) == "undefined" ) { return null; }
		if( arguments.length < 1 ) { return null; }
		if( typeof( arguments[ 0 ] ) != "string") { return null; }
		if( typeof( RegExp ) == "undefined") { return null; }

		var string = arguments[ 0 ];
		var exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
		var matches = new Array();
		var strings = new Array();
		var convCount = 0;
		var stringPosStart = 0;
		var stringPosEnd = 0;
		var matchPosEnd = 0;
		var newString = '';
		var match = null;

		while( match = exp.exec( string ) )
		{
			if( match[9] )
			{
				convCount += 1;
			}

			stringPosStart = matchPosEnd;
			stringPosEnd = exp.lastIndex - match[ 0 ].length;
			strings[ strings.length ] = string.substring(stringPosStart, stringPosEnd);

			matchPosEnd = exp.lastIndex;
			matches[matches.length] =
			{
				match: match[ 0 ],
				left: match[3] ? true : false,
				sign: match[4] || '',
				pad: match[5] || ' ',
				min: match[6] || 0,
				precision: match[8],
				code: match[9] || '%',
				negative: parseInt(arguments[convCount]) < 0 ? true : false,
				argument: String(arguments[convCount])
			};
		}
		strings[strings.length] = string.substring(matchPosEnd);

		if( matches.length == 0) { return string; }
		if( (arguments.length - 1) < convCount) { return null; }

		var code = null;
		var match = null;
		var loopIndex = 0;
		for( loopIndex = 0, loopLen = matches.length; loopIndex < loopLen; loopIndex++ )
		{

			if( matches[ loopIndex ].code == '%')
			{
				substitution = '%';
			}
			else if( matches[ loopIndex ].code == 'b')
			{
				matches[ loopIndex ].argument = String( Math.abs( parseInt( matches[ loopIndex ].argument ) ).toString( 2 ) );
				substitution = xtfm.sprintfConvert( matches[ loopIndex ], true );
			}
			else if( matches[ loopIndex ].code == 'c')
			{
				matches[ loopIndex ].argument = String( String.fromCharCode( parseInt( Math.abs(parseInt(matches[ loopIndex ].argument ) ) ) ) );
				substitution = xtfm.sprintfConvert( matches[ loopIndex ], true );
			}
			else if( matches[ loopIndex ].code == 'd')
			{
				matches[ loopIndex ].argument = String( Math.abs( parseInt(matches[ loopIndex ].argument)));
				substitution = xtfm.sprintfConvert( matches[ loopIndex ]);
			}
			else if( matches[ loopIndex ].code == 'f')
			{
				matches[ loopIndex ].argument = String( Math.abs( parseFloat(matches[ loopIndex ].argument)).toFixed(matches[ loopIndex ].precision ? matches[ loopIndex ].precision : 6));
				substitution = xtfm.sprintfConvert( matches[ loopIndex ]);
			}
			else if( matches[ loopIndex ].code == 'o')
			{
				matches[ loopIndex ].argument = String( Math.abs( parseInt(matches[ loopIndex ].argument)).toString(8));
				substitution = xtfm.sprintfConvert( matches[ loopIndex ]);
			}
			else if( matches[ loopIndex ].code == 's')
			{
				matches[ loopIndex ].argument = matches[ loopIndex ].argument.substring(0, matches[ loopIndex ].precision ? matches[ loopIndex ].precision : matches[ loopIndex ].argument.length)
				substitution = xtfm.sprintfConvert( matches[ loopIndex ], true);
			}
			else if( matches[ loopIndex ].code == 'x')
			{
				matches[ loopIndex ].argument = String( Math.abs( parseInt(matches[ loopIndex ].argument)).toString(16));
				substitution = xtfm.sprintfConvert( matches[ loopIndex ]);
			}
			else if( matches[ loopIndex ].code == 'X')
			{
				matches[ loopIndex ].argument = String( Math.abs( parseInt(matches[ loopIndex ].argument)).toString(16));
				substitution = xtfm.sprintfConvert( matches[ loopIndex ]).toUpperCase();
			}
			else
			{
				substitution = matches[ loopIndex ].match;
			}

			newString += strings[ loopIndex ];
			newString += substitution;

		}
		newString += strings[ loopIndex ];

		return newString;
	}

	function sprintfConvert( match, nosign )
	{
		match.sign = ( nosign ) ? '' : ( ( match.negative ) ? '-' : match.sign );

		var l = match.min - match.argument.length + 1 - match.sign.length;
		var pad = new Array( l < 0 ? 0 : l ).join( match.pad );

		if( !match.left )
		{
			if( match.pad == "0" || nosign )
			{
				return match.sign + pad + match.argument;
			}
			else
			{
				return pad + match.sign + match.argument;
			}
		}
		else
		{
			if (match.pad == "0" || nosign)
			{
				return match.sign + match.argument + pad.replace(/0/g, ' ');
			}
			else
			{
				return match.sign + match.argument + pad;
			}
		}
	}

	function getAbsPosition( obj )
	{
		var pos = new Object();
		pos.x = 0;
		pos.y = 0;

		if( obj )
		{
			pos.x = obj.offsetLeft;
			pos.y = obj.offsetTop;

			if( obj.offsetParent )
			{
				var parentPos = getAbsPosition( obj.offsetParent );
				pos.x += parentPos.x;
				pos.y += parentPos.y;
			}
		}
		return pos;
	}

	function numberFormat( _string )
	{
		var str = String( _string );
		var re = /,/g;
		str = str.replace( re,"" );

		var loopLen = str.length;
		var s1 = "", s2 = "";

		if( loopLen <= 3 ) return str;
		else
		{
			for( loopIndex = loopLen - 1; loopIndex >= 0; loopIndex-- )
			{
				s1 += str.charAt( loopIndex );
			}

			for( loopIndex = loopLen - 1; loopIndex >= 0; loopIndex-- )
			{
				s2 += s1.charAt( loopIndex );
				if( loopIndex % 3 == 0 && loopIndex != 0 ) s2 += ",";
			}
			return s2;
		}
	}

	extendObject( xtfm, {		isValidLoaded:isValidLoaded,
										isLoaded:isLoaded,
										loadedActions:loadedActions,
										_:_,
										trace:trace,
										debug:debug,
										createClass:createClass,
										addMethods:addMethods,
										extendObject:extendObject,
										getKeys:getKeys,
										getValues:getValues,
										duplicate:duplicate,
										isElement:isElement,
										isArray:isArray,
										isFunction:isFunction,
										isString:isString,
										isNumber:isNumber,
										isUndefined:isUndefined,
										onLoaded:onLoaded,
										onLoadInit:onLoadInit,
										validLoaded:validLoaded,
										excuteEach:excuteEach,
										isEmptyValue:isEmptyValue,
										isEmpty:isEmpty,
										getParent:getParent,
										getChildren:getChildren,
										getSibling:getSibling,
										trim:trim,
										stripHTML:stripHTML,
										getAttribute:getAttribute,
										setAttribute:setAttribute,
										setCookie:setCookie,
										getCookie:getCookie,
										clearCookie:clearCookie,
										sprintf:sprintf,
										sprintfConvert:sprintfConvert,
										getAbsPosition:getAbsPosition,
										numberFormat:numberFormat
										});
})();


/*-----------------------------------------------------------
 * @class - xtfm.delegate

 * @version 0.1
 * @date 2009-08-18
------------------------------------------------------------*/
xtfm.delegate = {};
xtfm.delegate.set = function( dInstance, method )
{
	return function(){ return method.apply( dInstance, arguments ); }
};

_ = xtfm.delegate.set( this, xtfm._ );
trace = xtfm.delegate.set( this, xtfm.trace );
debug = xtfm.delegate.set( this, xtfm.debug );
createClass = xtfm.delegate.set( this, xtfm.createClass );
extendObject = xtfm.delegate.set( this, xtfm.extendObject );
onLoaded = xtfm.delegate.set( this, xtfm.onLoaded );
empty = xtfm.delegate.set( this, xtfm.isEmptyValue );

/*-----------------------------------------------------------
 * Extend Function Prototype
-----------------------------------------------------------*/
(function()
{
	var slice = Array.prototype.slice;
	function getArgsInfo()
	{
		var getArgsInfo = { params:[], toString:function(){ return ( this.params.length > 0 ) ? this.params.join( "\n" ):"";} };
		var loopLen = this.arguments.length;
		if( this.arguments )
		{
			var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[ 1 ].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '').replace(/\s+/g, '').split(',');
			for( var loopIndex = 0; loopIndex < loopLen; loopIndex++)
			{
				getArgsInfo.params.push( '- [' + loopIndex + '] ' + names[ loopIndex ] + ' ( type - ' + typeof( this.arguments[ loopIndex ] ) + ' ) : ' + this.arguments[ loopIndex ] );
			}
		}
		else { getArgsInfo.params.push( '- no args' ); }
		return getArgsInfo;
	}

	function getArgsName()
	{
		var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[ 1 ].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '').replace(/\s+/g, '').split(',');
		return names.length == 1 && !names[ 0 ] ? [] : names;
	}

	function update( array, args )
	{
		var arrayLen = array.length, loopLen = args.length;
		while( loopLen-- ) array[ arrayLen + loopLen ] = args[ loopLen ];
		return array;
	}

	function merge( array, args )
	{
		array = slice.call( array, 0 );
		return update( array, args );
	}

	function bind( context )
	{
		if( arguments.length < 2 && isUndefined( arguments[ 0 ] ) ) return this;
		var __method = this, args = slice.call( arguments, 1 );
		return function()
		{
			var a = merge( args, arguments );
			return __method.apply( context, a );
		}
	}

	function wrap( wrapper )
	{
		var __method = this;
		return function()
		{
			var a = update( [__method.bind( this ) ], arguments );
			return wrapper.apply( this, a );
		}
	}

	function getName() { return this.name || this.toString().match( /function\s*([\w\$]*)\s*\(/ )[ 1 ] || "anonymous"; }

	extendObject( Function.prototype, { getArgsInfo:getArgsInfo, getArgsName:getArgsName, getName:getName });
})();


/*-----------------------------------------------------------
 * Extend String Prototype
-----------------------------------------------------------*/
(function()
{
	function isExist( str )		{ return this.lastIndexOf( str ) == -1 ? false:true; }
	function removeAt( idx )	{ return ( ( idx ) ? this.substr( 0, idx ):'' ) + ( ( idx ) ? this.substr( ( idx + 1 ), this.length ):this.substr( 1, this.length ) ); };

	extendObject( String.prototype, { isExist:isExist, removeAt:removeAt });
})();


/*-----------------------------------------------------------
 * Extend Number Prototype
-----------------------------------------------------------*/
/*
(function()
{
	function getArgsName()
	{
		var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[ 1 ].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '').replace(/\s+/g, '').split(',');
		return names.length == 1 && !names[ 0 ] ? [] : names;
	}

	extendObject( Number.prototype, { getArgsName:getArgsName});
})();
//*/
/*-----------------------------------------------------------
 * Extend Array Prototype
-----------------------------------------------------------*/
(function()
{
	function getFirst() { return this[ 0 ]; }
	function getLast() { return this[ this.length -1]; }
	function getIndex( str )
	{
		for( var loopIndex = 0, loopLen = this.length; loopIndex < loopLen; loopIndex++ )
		{
			if( this[ loopIndex ] == str )
			{
				idx = loopIndex;
				break;
			}
		}
		return idx || -1;
	}

	extendObject( Array.prototype, { getFirst:getFirst, getLast:getLast, getIndex:getIndex});
})();

/*-----------------------------------------------------------
 * Extend RegExp Prototype
-----------------------------------------------------------*/
RegExp.prototype.match = RegExp.prototype.test;
RegExp.escape = function(str) { return String( str ).replace( /([.*+?^=!:${}()|[\]\/\\])/g, '\\$1' ); };

/*-----------------------------------------------------------
 * @function - About CSS
-----------------------------------------------------------*/
xtfm.setCss = function( target, val ) { target.style.cssText = val; };
xtfm.getCss = function( target, element ) { return ( element ) ? target.style[ element ]:target.style.cssText; };
xtfm.addCss = function( target, element, val ) { target.style[ element ] = val; };
xtfm.removeCss = function( target, elemenet, val ) { target.style[ element ] = ''; };
setStyle = xtfm.delegate.set( this, xtfm.setCss );
getStyle = xtfm.delegate.set( this, xtfm.getCss );
addStyle = xtfm.delegate.set( this, xtfm.addCss );
removeStyle = xtfm.delegate.set( this, xtfm.removeCss );

/*-----------------------------------------------------------
 * @class xtfm.pop

 * @version 0.1
 * @date 2010-05-11
------------------------------------------------------------*/
xtfm.pop = {};
xtfm.pop.defaultSet =
{
	id:null,
	name:'',
	url:null,
	width:500,
	height:400,
	positionX:0,
	positionY:0,
	isScrollBar:'no',
	isToolBar:'no',
	isLocationBar:'no',
	isStatusBar:'no',
	isMenuBar:'no',
	isResizable:'no',
	vAlign:'T',
	hAlign:'L',
	isCookie:false,
	cookieName:null,
	cookieValue:null,
	cookieLimit:null,
	validCookieFunction:null,
	validUnloadFunction:null
};

( function()
{
	function open( _openInfo )
	{
		if( typeof( _openInfo ) == 'string' ) _openInfo = xtfm.tools.stringToObject( _openInfo );
		var params = xtfm.duplicate( xtfm.pop.defaultSet );

		for( var property in _openInfo )
		{
			switch( property.toLowerCase() )
			{
				case 'id' : params.id= _openInfo[ property ];break;
				case 'name': params.name= _openInfo[ property ];break;
				case 'url': params.url= _openInfo[ property ];break;
				case 'width': params.width= _openInfo[ property ];break;
				case 'height': params.height= _openInfo[ property ];break;
				case 'positionx': params.positionY = _openInfo[ property ];break;
				case 'positionx': params.positionX= _openInfo[ property ];break;
				case 'isscrollbar': params.isScrollBar= _openInfo[ property ];break;
				case 'istoolbar': params.isToolBar= _openInfo[ property ];break;
				case 'islocationbar': params.isLocationBar= _openInfo[ property ];break;
				case 'isstatusbar': params.isStatusBar= _openInfo[ property ];break;
				case 'ismenubar': params.isMenuBar= _openInfo[ property ];break;
				case 'isresizable': params.isResizable= _openInfo[ property ];break;
				case 'valign': params.vAlign= _openInfo[ property ];break;
				case 'halign': params.hAlign= _openInfo[ property ];break;
				case 'iscookie': params.isCookie= _openInfo[ property ];break;
				case 'cookiename': params.cookieName= _openInfo[ property ];break;
				case 'cookievalue': params.cookieValue= _openInfo[ property ];break;
				case 'cookielimit': params.cookieLimit= _openInfo[ property ];break;
				case 'validcookiefunction': params.validCookieFunction= _openInfo[ property ];break;
				case 'validunloadfunction': params.validUnloadFunction = _openInfo[ property ];break;
				default:break;
			}
		}

		if( !params.url )
		{
			trace( 'DEBUG - xtfm.pop.open->팝업 URL 이 없습니다.' );
			return;
		}
		params.name = ( params.name ) ? params.name : 'newPop';
		var id = ( params.id == null || params.id == '' ) ? params.name : params.id;
		xtfm.pop[ id ] = params;

		if( params.isScrollBar != 'no' || params.isScrollBar != false ) params.width = parseInt( params.width ) + 18;

		var posX = 0;
		var posY = 0;

		if( params.vAlign.toLowerCase() == 'm' ) posY = ( screen.height - params.height ) / 2;
		else if( params.vAlign.toLowerCase() == 'b' ) posY = screen.height - params.height;

		if( params.vAlign.toLowerCase() == 'c' ) posX = ( screen.width - params.width ) / 2;
		else if( params.vAlign.toLowerCase() == 'r' ) posX = screen.width - params.width;

		var popOptionString = 'left='+ posX;
		popOptionString += ', top=' + posY;
		popOptionString += ', width=' + params.width;
		popOptionString += ', height=' + params.height;
		popOptionString += ', toolbar=' + params.isToolBar;
		popOptionString += ', location=' + params.isLocationBar;
		popOptionString += ', menubar=' + params.isMenuBar;
		popOptionString += ', scrollbars=' + params.isScrollBar;
		popOptionString += ', resizable=' + params.isResizable;

		try
		{
			window.open( params.url, params.name, popOptionString );
			return true;
		}
		catch( e )
		{
			return false;
		}
	}


	extendObject( xtfm.pop,
	{
		open:open
	});
} )();





//xtfm.pop.openPop
/*-----------------------------------------------------------
 * @class xtfm.ajax

 * @version 0.1
 * @date 2009-08-18
------------------------------------------------------------*/
xtfm.ajax = {};
xtfm.ajax.list = {};
xtfm.ajax.count = 0;
xtfm.ajax.defaultSet = {		callbackFunction:null,
										method:'GET',
										url:'',
										user:null,
										password:null,
										async:true,
										cache:true,
										callbackOnBeforeSetHeader:null,
										spliter:[ '||||', '|//|' ] };
/*-----------------------------------------------------------
 * @function - xtfm.ajax.validAjaxBrowser
 *
 * @return boolean : possible Browser true / false
-----------------------------------------------------------*/
xtfm.ajax.validAjaxBrowser = function()
{
	var bType = xtfm.tools.getBrowserType();
	var bVersion = xtfm.tools.getBrowserVersion();

	switch ( bType )
	{
		case 'msie'		: return ( !!window.ActiveXObject ) ? ( !!xtfm.ajax.createHttpRequest() ):false;
		case 'mozilla'	: return ( bVersion >= 20011128 );
		case 'opera'		: return ( !!window.opera ) && ( ( typeof( XMLHttpRequest ) ) == 'function' );
		case 'safari'		: return ( bVersion >= 124 );
		case 'konq'		: return ( bVersion >= 3.3 );
	}
};

/*-----------------------------------------------------------
 * @function - xtfm.ajax.createHttpRequest
 *
 * @return httpRequest Object
-----------------------------------------------------------*/
xtfm.ajax.createHttpRequest = function()
{
	if( window.XMLHttpRequest ) { return new XMLHttpRequest(); }
	else if( window.ActiveXObject )
	{
		try{ return new ActiveXObject( "Msxml2.XMLHTTP" ); }
		catch( e )
		{
			try { return new ActiveXObject( "Microsoft.XMLHTTP" );}
			catch( e2 ) { return null; }
		}
	}
	else return null;
};



/*-----------------------------------------------------------
 * @function - xtfm.ajax.create
 *
 * @return inctanceId
-----------------------------------------------------------*/
xtfm.ajax.create = function( instanceObj, instanceId )
{
	if( !instanceObj || typeof( instanceObj ) != 'object' )
	{
		_alert( '파라미터가 없거나 형식이 올바르지 않습니다.', instanceObj );
		return;
	}

	var ajaxInstance = xtfm.duplicate( xtfm.ajax.defaultSet );

	ajaxInstance.httpObj = xtfm.ajax.createHttpRequest();
	if( ajaxInstance.httpObj == null )
	{
		_alert( 'HttpRequest를 생성할 수 없습니다.', instanceObj );
		return;
	}

	for( var property in instanceObj )
	{
		switch( property.toLowerCase() )
		{
			case 'callbackfunction'	:
			{
				ajaxInstance.callbackFunction = instanceObj[ property ];
				ajaxInstance.callbackOnBeforeSetHeader = null;

				if( typeof( instanceObj[ property ] ) == 'object' )
				{
					ajaxInstance.callbackFunction = instanceObj[ property ].onload;
					ajaxInstance.callbackOnBeforeSetHeader = instanceObj[ property ].onbeforsetheader;
				}

				var bType = xtfm.tools.getBrowserType();
				if( bType == 'opera' || bType == 'safari' || bType == 'mozilla' )
				{
					ajaxInstance.httpObj.onload = function()
					{
						ajaxInstance.callbackFunction( ajaxInstance.httpObj );
					}
				}
				else
				{
					ajaxInstance.httpObj.onreadystatechange = function()
					{
						if( ajaxInstance.httpObj.readyState == 4 ) ajaxInstance.callbackFunction( ajaxInstance.httpObj );
					}
				}

				break;
			}
			case 'method'				: ajaxInstance.method				= instanceObj[ property ].toUpperCase();break;
			case 'url'						: ajaxInstance.url						= instanceObj[ property ];break;
			case 'user'					: ajaxInstance.user					= instanceObj[ property ];break;
			case 'password'			: ajaxInstance.password			= instanceObj[ property ];break;
			case 'async'					: ajaxInstance.async					= instanceObj[ property ];break;
			case 'cache'					: ajaxInstance.cache					= instanceObj[ property ];break;
			case 'spliter'				: ajaxInstance.spliter					= instanceObj[ property ];break;
			default:break;
		}
	}

	ajaxInstance.url += ( ajaxInstance.method == 'GET' || ajaxInstance.cache ) ? '?':'';

	if( !instanceId ) instanceId = 'ajax'+xtfm.ajax.count;
	xtfm.ajax.count++;
	xtfm.ajax.list[ instanceId ] = ajaxInstance;
	return instanceId;
};

/*-----------------------------------------------------------
 * @function - xtfm.ajax.send
 *
 * @return httpRequest Object
-----------------------------------------------------------*/
xtfm.ajax.send = function( ajaxId, vars )
{
	var ajaxInstance = xtfm.ajax.list[ ajaxId ];
	var obj = ajaxInstance.httpObj;
	obj.onreadystatechange = function() { 	if( obj.readyState == 4 ) ajaxInstance.callbackFunction( obj ); }

	vars += '&ajaxSpliter=' + ajaxInstance.spliter.join( '::AJAX_SPLITER::' );
	vars = xtfm.ajax.encodeURI( vars );

	var url = ajaxInstance.url + ( ( ajaxInstance.cache ) ? 'cache=' + ( new Date() ).getTime():'');
	url += ( ajaxInstance.method == 'GET' ) ? vars:'';

	obj.open( ajaxInstance.method, url, ajaxInstance.async, ajaxInstance.user, ajaxInstance.password );
	if( !!ajaxInstance.callbackOnBeforeSetHeader ) ajaxInstance.callbackOnBeforeSetHeader( obj );
	obj = xtfm.ajax.setHeader( obj );
	obj.send( vars );
};

/*-----------------------------------------------------------
 * @function - xtfm.ajax.setHeader
 *
 * @param ajaxObj
 * @return httpRequest Object
-----------------------------------------------------------*/
xtfm.ajax.setHeader = function( obj )
{
	var contentTypeUrlenc = 'application/x-www-form-urlencoded; charset=UTF-8';
	if( !window.opera ) obj.setRequestHeader( 'Content-Type', contentTypeUrlenc );
	else
	{
		if( ( typeof( obj.setRequestHeader ) ) == 'function' ) obj.setRequestHeader( 'Content-Type',contentTypeUrlenc);
	};
	return obj
}

/*-----------------------------------------------------------
 * @function - xtfm.ajax.encodeURI
 *
 * @param encodeData - String or Object
 * @return string - endcoded URI
-----------------------------------------------------------*/
xtfm.ajax.encodeURI = function( encodeData )
{
	var resultData = '';
	var dataType = typeof( encodeData );

	if( dataType == 'object' )
	{
		for( var property in encodeData )
		{
			resultData += '&' + encodeURIComponent( property ) + '=' + encodeURIComponent( encodeData[ property ] );
		}
	}
	else if( dataType == 'string' && encodeData != '' )
	{
		var splitData = encodeData.split( '&' );

		for( var loopIndex = 1, loopLen = splitData.length; loopIndex < loopLen; loopIndex++ )
		{
			var dataq = splitData[ loopIndex ].split( '=' );
			resultData += '&' + encodeURIComponent( dataq[ 0 ] ) + '=' + encodeURIComponent( dataq[ 1 ] );
		}
	};

	return resultData;
}





/*-----------------------------------------------------------
 * @class xtfm.event

 * @version 0.1
 * @date 2009-08-18
------------------------------------------------------------*/
xtfm.event = {};
xtfm.event.getEventTarget = function( e )
{
	e = e || window.event;
	return e.target || e.srcElement;
};

xtfm.event.addEvent = function( _targetObject, _event ,_listener, _useCapture )
{
    if( _targetObject.addEventListener )
	{
		if( _event == 'unload' ) _targetObject.addEventListener( _event, _listener, false );
		else _targetObject.addEventListener( _event, _listener, false );
    }
	else if( _targetObject.attachEvent )
	{
        if( _event == 'unload' ) window.attachEvent( 'on' + _event, _listener );
        else _targetObject.attachEvent( 'on' + _event, _listener );
    }
};

xtfm.event.removeEvent = function( _targetObject, _event ,_listener, _useCapture )
{
    if( _targetObject.addEventListener )
	{
		if( _event == 'unload' ) window.removeEventListener( _event, _listener, false );
		else _targetObject.removeEventListener( _event, _listener, false );
    }
	else if( _targetObject.attachEvent )
	{
		if( _event == 'unload' ) window.detachEvent( 'on' + _event, _listener );
		else _targetObject.detachEvent( 'on' + _event, _listener );
    }
};

/*-----------------------------------------------------------
 * @class xtfm.tools

 * @version 0.1
 * @date 2009-08-18
------------------------------------------------------------*/
xtfm.tools = {};

/*-----------------------------------------------------------
 * @function - xtfm.tools.stringToObject : String Convert to Object
 *
 * @param str - string
 * @return obj - converted Object
-----------------------------------------------------------*/
xtfm.tools.stringToObject = function( str )
{
	str = str.replace( '://', '|//' );
	var arr1 = str.split( ',' );
	str = '';
	for( var loopIndex = 0, loopLen = arr1.length; loopIndex < loopLen; loopIndex++ )
	{
		var arr2 = arr1[ loopIndex ].split( ':' );
		str += arr2[ 0 ].replace( '|//', '://') +":'"+arr2[ 1 ].replace( '|//', '://')+"'";
		if( loopIndex != ( loopLen - 1 ) ) str += ', ';
	}

	eval( 'var obj = {'+str+'};' );
	return obj;
};


xtfm.tools.toArray = function( iterable )
{
	if( !iterable ) return [];
	var loopLen = iterable.length || 0, results = new Array( loopLen );
	while( loopLen-- ) results[ loopLen ] = iterable[ loopLen ];
	return results;
};

xtfm.tools.isFunction = function( obj )
{
	return typeof( object ) == 'function';
};

/*-----------------------------------------------------------
 * @function - xtfm.tools.stringToObject : String Convert to Object
 *
 * @param str - string
 * @return obj - converted Object
-----------------------------------------------------------*/
xtfm.tools.getElementByClass = function( str, targetNode, targetTag )
{
	var objArray = new Array();
	var objList = ( targetNode || document ).getElementsByTagName( targetTag || '*' );
	var pattern = new RegExp("(^|\\s)" + str + "(\\s|$)");

	for( var loopIndex = 0, loopLen = objList.length; loopIndex < loopLen; loopIndex++ )
	{
		if( pattern.test( objList[ loopIndex ].className ) )
		{
			objArray.push( objList[ loopIndex ]);
		}
	}
	return objArray;
};

/*-----------------------------------------------------------
 * @function - xtfm.tools.getBrowserType :
 *
 * @return string - Browser Type Name
-----------------------------------------------------------*/
xtfm.tools.getBrowserType = function()
{
	var ua = navigator.userAgent.toLowerCase();;
	var bType = null;

	if( /msie/.test( ua ) && !/opera/.test( ua ) )									bType =  'msie';
	else if( /mozilla/.test( ua ) && !/(compatible|webkit)/.test( ua ) )	bType =  'mozilla';
	else if( /opera/.test( ua ) )															bType =  'opera';
	else if( /webkit/.test( ua ) )															bType =  'safari';
	else																							bType =  'unknown';

	return bType;
};

/*-----------------------------------------------------------
 * @function - xtfm.tools.getBrowserVersion
 *
 * @return string : browser version
-----------------------------------------------------------*/
xtfm.tools.getBrowserVersion = function()
{
	return ( navigator.userAgent.toLowerCase().match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'] )[ 1 ];
};

/*-----------------------------------------------------------
 * @class - xtfm.flash

 * @version 0.1
 * @date 2009-08-18
------------------------------------------------------------*/
xtfm.flash =
{
	defaultParams:{	classId : 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000',
								codeBase : 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab',
								plugInsPage : 'http://www.adobe.com/go/getflashplayer',
								type : 'application/x-shockwave-flash',
								quality : 'high',
								allowScriptAccess : 'always',
								showLiveConnect : 'true',
								wmode : 'window',
								bgColor : '#FFFFFF',
								align : 'middle',
								src : '',
								id : '',
								width : '100%',
								height : '100%',
								menu:'false'
							},
		list:{}
};

(function()
{

	/*-----------------------------------------------------------
	 * @function - xtfm.flash.ins : insert Flash in Doc
	 *
	 * @param paramObj - string || object / flash Parameters
	 * @param targetObjName - object string tag output target / none ? inline output
	-----------------------------------------------------------*/
	function ins( paramObj, targetObjName )
	{
		if( typeof( paramObj ) == 'string' ) paramObj = xtfm.tools.stringToObject( paramObj );

		var flashTagString = '';
		var flashParams = xtfm.duplicate( xtfm.flash.defaultParams );

		for( var property in paramObj )
		{
			switch( property.toLowerCase() )
			{
				case 'classid'					: flashParams.classId				= paramObj[ property ];break;
				case 'codebase'				: flashParams.codeBase				= paramObj[ property ];break;
				case 'pluginspage'			: flashParams.plugInsPage		= paramObj[ property ];break;
				case 'type'						: flashParams.type						= paramObj[ property ];break;
				case 'quality'					: flashParams.quality					= paramObj[ property ];break;
				case 'allowscriptaccess'	: flashParams.allowScriptAccess	= paramObj[ property ];break;
				case 'showliveconnect'		: flashParams.showLiveConnect	= paramObj[ property ];break;
				case 'wmode'					: flashParams.wmode					= paramObj[ property ];break;
				case 'bgcolor'					: flashParams.bgColor				= paramObj[ property ];break;
				case 'align'						: flashParams.align					= paramObj[ property ];break;
				case 'src'							: flashParams.src						= paramObj[ property ];break;
				case 'id'							: flashParams.id						= paramObj[ property ];break;
				case 'width'						: flashParams.width					= paramObj[ property ];break;
				case 'height'						: flashParams.height					= paramObj[ property ];break;
				case 'menu'						: flashParams.menu					= paramObj[ property ];break;
				default:break;
			}
		}

		if( !flashParams.id ) flashParams.id = flashParams.src.split( '/' ).getLast().split( '.' )[ 0 ];

		flashTagString = "<object classid=\""+flashParams.classId+"\" codebase=\""+flashParams.codeBase+"\" width=\""+flashParams.width+"\" height=\""+flashParams.height+"\" align=\""+flashParams.align+"\" id=\""+flashParams.id+"\">\n<param name=\"movie\" value=\""+flashParams.src+"\">\n<param name=\"quality\" value=\""+flashParams.quality+"\">\n<param name=\"wmode\" value=\""+flashParams.wmode+"\">\n<param name=\"allowScriptAccess\" value=\""+flashParams.allowScriptAccess+"\">\n<param name=\"showLiveConnect\" value=\""+flashParams.showLiveConnect+"\">\n<param name=\"bgcolor\" value=\""+flashParams.bgColor+"\">\n<embed quality=\""+flashParams.quality+"\" pluginspage=\""+flashParams.plugInsPage+"\" type=\""+flashParams.type+"\" src=\""+flashParams.src+"\" width=\""+flashParams.width+"\" height=\""+flashParams.height+"\" wmode=\""+flashParams.wmode+"\" allowScriptAccess=\""+flashParams.allowScriptAccess+"\" bgcolor=\""+flashParams.bgColor+"\" align=\""+flashParams.align+"\" menu=\""+flashParams.menu+"\" showLiveConnect=\""+flashParams.showLiveConnect+"\" name=\""+flashParams.id+"\" />\n</object>";

		if(	targetObjName ) document.getElementById( targetObjName ).innerHTML = flashTagString;
		else document.write( flashTagString );

		if( xtfm.userBrowser.substr( 0, 2 ) == 'IE' )
		{
			window[ flashParams.id ] = document.getElementById( flashParams.id );
		}
		else
		{
			document[ flashParams.id ] = document.getElementById( flashParams.id );
		}
		xtfm.flash.list[ flashParams.id ] = flashParams;
	}
	/*-----------------------------------------------------------
	 * @function - xtfm.flash.getFlashObject : Get Flash Object
	 *
	 * @param name - Flash Movie Name
	 * @return - Flash Movie Object
	-----------------------------------------------------------*/
	function getFlashObject( str )
	{
		var id = null;

		if( str.isExist( '.swf' ) )
		{
			var arrFlash = xtfm.flash.list.toArray();
			for( var loopIndex = 0, loopLen = arrFlash.length; loopIndex < loopLen; loopIndex++ )
			{
				if( arrFlash[ loopIndex ].src == str )
				{
					id = arrFlash[ loopIndex ].id; break;
				}
			}
		}

		id = str;

		if( document.embeds[ id ] ) return document.embeds[ id ];
		if( window.document[ id ] ) return window.document[ id ];
		if( window[ id ] ) return window[ id ];
		if( document[ id ] ) return document[ id ];
		if( document.getElementById( id ) ) return document.getElementById( id );

		return null;
		//return document.getElementById( id ) || ( ( navigator.appName.indexOf( 'Microsoft' ) != -1 ) ? window[ id ]:document[ id ] );
	}

	/*-----------------------------------------------------------
	 * @function - xtfm.flash.setFlashCallback :
	 *
	 * @param name - call back function name
	-----------------------------------------------------------*/
	//function setFlashCallback( _movie, _fn )
	//{
	//var obj = xtfm.flash.getFlashObject( _movie );
	//
	//}

	extendObject( xtfm.flash, { ins:ins, getFlashObject:getFlashObject } );
})();




/*-----------------------------------------------------------
 * @class - xtfm.floating

 * @version 0.1
 * @date 2009-08-18
------------------------------------------------------------*/
xtfm.floating = {};

(function()
{

	/*-----------------------------------------------------------
	 * @function - xtfm.floating.add : Add Floating
	 *
	 * @param paramObj - string || object / flash Parameters
	 * @param targetObjName - object string tag output target / none ? inline output
	-----------------------------------------------------------*/
	function add( _floatingType, _targetObj, _objMarginX, _objMarginY, _slidingSpeed, _slidingSmooth, _objPositionMode )
	{
		_floatingType = _floatingType.toLowerCase();
		if( _floatingType == 'vertical' )
		{
			new verticalFloating( _targetObj, _objMarginX, _objMarginY, _slidingSpeed, _slidingSmooth, _objPositionMode );
		}
		else
		{
			alert( 'not suppoert' );
		}
	}

	extendObject( xtfm.floating, { add:add } );
})();

function verticalFloating( _vFloatingObj, _marginX, _marginY, _percentage, _setTime, _positionMode )
{
	this.vFloatingObj = _vFloatingObj;
	this.marginX = ( _marginX ) ? _marginX : 900;
	this.marginY = ( _marginY ) ? _marginY : 0;
	this.percentage = ( _percentage ) ? _percentage : 20;
	this.setTime = ( _setTime ) ? _setTime : 10;
	this.vFloatingObj.style.position = ( _positionMode ) ? _positionMode : "absolute";
	this.body = null;
	this.setTimeOut = null;
	this.Run();
}

verticalFloating.prototype.Run = function()
{
	this.body = document.body;
	if( ( document.documentElement.scrollLeft + document.documentElement.scrollTop ) > ( this.body.scrollLeft + this.body.scrollTop ) ) this.body = document.documentElement;

	var This = this;
	var vFloatingObjTop = ( this.vFloatingObj.style.top ) ? parseInt( this.vFloatingObj.style.top, 10 ) : this.vFloatingObj.offsetTop;

	if( this.body.scrollTop < this.marginY ) var docTop = this.marginY;
	else var docTop = this.body.scrollTop + this.marginY - this.marginY;

	var moveY = Math.abs( vFloatingObjTop - docTop );
	moveY = Math.ceil( moveY / this.percentage );

	if( vFloatingObjTop < docTop ) this.vFloatingObj.style.top = vFloatingObjTop + moveY + "px";
	else this.vFloatingObj.style.top = vFloatingObjTop - moveY + "px";

	window.clearTimeout( this.setTimeOut );
	this.setTimeOut = window.setTimeout( function() { This.Run(); },this.setTime );
}