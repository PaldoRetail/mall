

/*-------------------------------------------------------------------------------------
var topSearch;
var topSearchSettings;
var topSearchEffect;
var isPGJSExist = false;
var pgInitFunction = null;
*
*
* -
* -
*
* @param ( Type  ) :  -
*
* @todo : -
-------------------------------------------------------------------------------------*/
onLoaded( function()
{
	//set Sliding Floating
	//xtfm.floating.add( 'vertical', _( '#scrollBanner' ), 910, 0, 5, 0, 'absolute' );
	//new verticalFloating( document.getElementById( "scrollBanner" ), 0, 262, 1, 1);
	//new Floating( document.getElementById( "scrollBanner" ), 900, 262, 50, 10 );
	//new Floating(적용할개체 , X축여백 , Y축여백 , 미끄러지는속도:작을수록빠름..기본20 , 빠르기:작을수록부드러움..기본10);

	//Top Search
	//tsTypingTarget = _( '#topSearchText' );
	tsTypingTarget = document.getElementById( 'topSearchText' );
	if( tsTypingTarget && tsTypingTarget.value == '' )
	{
		xtfm.event.addEvent( tsTypingTarget, 'focus', topSearchFocus );
		xtfm.event.addEvent( tsTypingTarget, 'blur', topSearchFocus );
		topSearchBlurEffect( 'on' );
	}
	//validPopup( 'Notice240207', 'http://www.8doink.com/shop/data/8do_skin/pop20240207.html', 'width=706, height=707, top=0, left=0, scrollbar=no' );
	//validPopup( 'Notice230927', 'http://www.8doink.com/shop/data/8do_skin/pop20230927.html', 'width=810, height=812, top=0, left=0, scrollbar=no' );
});


function validPopupCookie( name )
{
	var Found = false
	var start, end
	var i = 0

	while( i <= document.cookie.length )
	{
		start = i;
		end = start + name.length;
		// name과 동일한 문자가 있다면
		if(document.cookie.substring(start, end) == name)
		{
			Found = true;
			break;
		}

		i++;
	}

	if( Found == true )
	{
		start = end + 1;
		end = document.cookie.indexOf(";", start);
		// 마지막 부분이라 는 것을 의미(마지막에는 ";"가 없다)
		if( end < start ) end = document.cookie.length;
		return document.cookie.substring( start, end );
	}

	return '';
}

function validPopup( _name, _url, _options )
{
	var eventCookie = validPopupCookie( _name );
	if( eventCookie != "no" )
	{
		window.open( _url, _name, _options );
	}
}

















//eval( validIsInclude( '/_inc/js/xtfmJSUtils.js', true ) );
//if( isDev ) xtfmDebugAlert( 'onload - pageInit' );
/*-------------------------------------------------------------------------------------
*
*
* -
* -
*
* @param ( Type  ) :  -
*
* @todo : -
-------------------------------------------------------------------------------------*/
function includeJSFile( path, isReload )
{
	if( path == '' || path == null ) return;
	if( obj = ( window.XMLHttpRequest ) ? new XMLHttpRequest():new ActiveXObject( "Microsoft.XMLHTTP" ) )
	{
		obj.open( 'get', "http://" + location.host + path, false );
		obj.send( null );
		return obj.responseText;
	}
	return '';
}



/*-------------------------------------------------------------------------------------
*
*
* -
* -
*
* @param ( Type  ) :  -
*
* @todo : -
-------------------------------------------------------------------------------------*/
function validIsInclude( path, isReload )
{
	var jsArray = document.incJSList;
	var isIncluded = false;

	if( typeof ( jsArray ) == 'undefined' ) document.incJSList = jsArray = new Array();

	for( var i = 0, len = jsArray.length; i < len; i++ )
	{
        if( jsArray[i] == path )
		{
            isIncluded = true;
            break;
        }
    }

    if( !isIncluded )
	{
		jsArray.push( path );
        return includeJSFile( path + ( isReload ? "?cash=" + Math.random():'' ), validIsInclude );
    }
	else return '';
}

/*-------------------------------------------------------------------------------------
*
*
* -
* -
*
* @param ( Type  ) :  -
*
* @todo : -
-------------------------------------------------------------------------------------*/
function validLogin()
{
	var isLogin = document.getElementById( 'islogin' ).value;

	if( isLogin == 'no' )
	{
		document.getElementById( 'loginArea' ).style.display = 'block';
	}
}


/*-------------------------------------------------------------------------------------
*
*
* -
* -
*
* @param ( Type  ) :  -
*
* @todo : -
-------------------------------------------------------------------------------------*/
function movePageByFlash( _string )
{
	trace( _string );
}






function suggestCloseButtonHandler( e )
{
	e = e || window.event;
	var obj = xtfm.event.getEventTarget( e );
	var evtType = e.type;

	switch( evtType )
	{
		case 'mouseup':
		{
			setFocusSuggestTopSearch( 'in' );
			break;
		}
		case 'mousedown':
		{
			break;
		}
		case 'mouseover':
		{
			setStyle( obj, 'cursor:hand;' );
			break;
		}
		case 'mouseout':
		{
			setStyle( obj, 'cursor:pointer;' );
			break;
		}
	}
}


/*-------------------------------------------------------------------------------------
*
*
* -
* -
*
* @param ( Type  ) :  -
*
* @todo : -
-------------------------------------------------------------------------------------*/
function setFocusSuggestTopSearch( _mode )
{
	var suggestSearchButtonStyle = ( _mode == 'in' ) ? 'background:#f93f1b;':'background:#000;';
	var suggestInputTextStyle = ( _mode == 'in' ) ? 'border:solid 2px #f93f1b;':'border:solid 2px #b9b9b9;';

	if( _mode == 'in' )
	{
		setStyle( _( '#suggestInputText' ), 'border:solid 2px #f93f1b; background:#ffffff;' );
		document.getElementById( 'suggestInputText' ).focus();
	}
	else
	{
		var suggestInputObj = _( '#suggestInputText' );

		/*input의 value가 비어있을 경우*/
		if( empty( suggestInputObj ) ) //_showText == '' || _showText == null || _showText == undefined )
		{
			setStyle( _( '#suggestInputText' ), 'background:#transparent;border:solid 2px #b9b9b9;' );
			//xtfm.flash.getFlashObject( 'menuTop' ).setSearchAreaFromJavascript();
		}
		else
		{
			setStyle( _( '#suggestInputText' ), 'background:#ffffff;border:solid 2px #b9b9b9;' );
		}
	}
}

/*-------------------------------------------------------------------------------------
*
*
* -
* -
*
* @param ( Type  ) :  -
*
* @todo : -
-------------------------------------------------------------------------------------*/
function naviOFF()
{
	var subNaviArea = document.getElementById( 'flashSubNavigation' );
	subNaviArea.style.width = '710px';
}

/*-------------------------------------------------------------------------------------
*
*
* -
* -
*
* @param ( Type  ) :  -
*
* @todo : -
-------------------------------------------------------------------------------------*/
function naviON()
{
	var qs = document.getElementById( 'qsInput' );

	var subNaviArea = document.getElementById( 'flashSubNavigation' );
	subNaviArea.style.width = '210px';
}


/*-------------------------------------------------------------------------------------
*
*
* -
* -
*
* @param ( Type  ) :  -
*
* @todo : -
-------------------------------------------------------------------------------------*/
function verticalFloating( verticalFloatingObj,MarginX,MarginY,Percentage,setTime )
{
	this.verticalFloatingObj = verticalFloatingObj;
	this.MarginX = ( MarginX ) ? MarginX : 900;
	this.MarginY = ( MarginY ) ? MarginY : 0;
	this.Percentage = ( Percentage ) ? Percentage : 20;
	this.setTime = ( setTime ) ? setTime : 10;
	this.verticalFloatingObj.style.position = "absolute";
	this.Body = null;
	this.setTimeOut = null;
	this.Run();
}

verticalFloating.prototype.Run = function()
{
	if( ( document.documentElement.scrollLeft + document.documentElement.scrollTop ) > ( document.body.scrollLeft + document.body.scrollTop ) )
	{
		this.Body = document.documentElement;
	}
	else
	{
		this.Body = document.body;
	}

	var This = this;
	var verticalFloatingObjTop = ( this.verticalFloatingObj.style.top ) ? parseInt( this.verticalFloatingObj.style.top,10 ) : this.verticalFloatingObj.offsetTop;
	var DocTop = ( this.Body.scrollTop < this.MarginY ) ? this.MarginY : this.Body.scrollTop ;
	var MoveY = Math.abs( verticalFloatingObjTop - DocTop );

	MoveY = Math.ceil( MoveY / this.Percentage );

	if( verticalFloatingObjTop < DocTop ) this.verticalFloatingObj.style.top = verticalFloatingObjTop + MoveY + "px";
	else this.verticalFloatingObj.style.top = verticalFloatingObjTop - MoveY + "px";

	window.clearTimeout( this.setTimeOut );
	this.setTimeOut = window.setTimeout( function() { This.Run(); },this.setTime );
}



//----------------------------------------------
//Floating v1.1 Source By Bermann
//dobermann75@gmail.com
//----------------------------------------------

//new Floating(적용할개체 , X축여백 , Y축여백 , 미끄러지는속도:작을수록빠름..기본20 , 빠르기:작을수록부드러움..기본10);

function Floating(FloatingObj,MarginX,MarginY,Percentage,setTime) {
	this.FloatingObj = FloatingObj;
	this.MarginX = (MarginX) ? MarginX : 0;
	this.MarginY = (MarginY) ? MarginY : 0;
	this.Percentage = (Percentage) ? Percentage : 20;
	this.setTime = (setTime) ? setTime : 10;
	this.FloatingObj.style.position = "absolute";
	this.Body = null;
	this.setTimeOut = null;
	this.Run();
}

Floating.prototype.Run = function () {
	if ((document.documentElement.scrollLeft + document.documentElement.scrollTop) > (document.body.scrollLeft + document.body.scrollTop)) {
		this.Body = document.documentElement;
	} else {
		this.Body = document.body;
	}

	var This = this;
	var FloatingObjLeft = (this.FloatingObj.style.left) ? parseInt(this.FloatingObj.style.left,10) : this.FloatingObj.offsetLeft;
	var FloatingObjTop = (this.FloatingObj.style.top) ? parseInt(this.FloatingObj.style.top,10) : this.FloatingObj.offsetTop;
	var DocLeft = this.Body.scrollLeft + this.MarginX;
	var DocTop = this.Body.scrollTop + this.MarginY;

	var MoveX = Math.abs(FloatingObjLeft - DocLeft);
	MoveX = Math.ceil(MoveX / this.Percentage);
	var MoveY = Math.abs(FloatingObjTop - DocTop);
	MoveY = Math.ceil(MoveY / this.Percentage);

	if (FloatingObjLeft < DocLeft) {
		this.FloatingObj.style.left = FloatingObjLeft + MoveX + "px";
	} else {
		this.FloatingObj.style.left = FloatingObjLeft - MoveX + "px";
	}

	if (FloatingObjTop < DocTop) {
		this.FloatingObj.style.top = FloatingObjTop + MoveY + "px";
	} else {
		this.FloatingObj.style.top = FloatingObjTop - MoveY + "px";
	}

	window.clearTimeout(this.setTimeOut);
	this.setTimeOut = window.setTimeout(function () { This.Run(); },this.setTime);
}






function movePageByFlash( e, _depth1, _depth2 )
{
	if( typeof e != 'string' )
	{
		var obj = xtfm.event.getEventTarget( e );
		var objId = xtfm.getAttribute( obj, 'id' );
	}
	else var objId = e;

	switch( objId )
	{
		//Quick Menu
		case 'btnAddShortcut' : xtfmAddStartPage(); break;
		case 'btnAddFavorites' : xtfmAddBookMark(); break;

		//Banner - Top
		case 'btnDownloadFaxOrder' : location.href = '/design/download.php?fileName=FaxOrder_INK114.xls'; break;
		case 'btnCSBoard' : location.href = '/board/bd_list.html?boardid=bd_notice&bdtype=free'; break;
		case 'btnFeedBack' : location.href = '/board/bd_list.html?boardid=bd_notice&bdtype=after'; break;

		//Notice
		case 'btnNoticeMore' : location.href = '/board/bd_list.html?boardid=bd_notice&bdtype=notice'; break;

		//Banner - Left
		case 'btnCardInfo' :
		{
			xtfm.pop.open( 'url:https://pgweb.dacom.net/pg/wmp/etc/jsp/SettlementSearch.jsp, name:CardInfo, width:800, height:600, isResizable:yes, isScrollBar:yes' );break;
		}

		//Footer
		case 'btnFooterAbout' : location.href = '/eshop/contents.html?layout=aboutus'; break;
		case 'btnFooterGuide' : location.href = '/eshop/contents.html?layout=info'; break;
		case 'btnFooterContact' : location.href = '/eshop/contents.html?layout=xtfm_contact'; break;
		case 'btnFooterPolicy' : location.href = '/eshop/contents.html?layout=policy'; break;
		case 'btnFooterAgreement' : location.href = '/eshop/contents.html?layout=provision'; break;
		case 'btnEscrow' :
		{
			goValidEscrow( '8doink' );break;
		}
		case 'btnFooterLogo' : location.href = '/eshop/index.html'; break;


		case 'flash' :
		{
			switch( _depth1 )
			{
				//for Etc Button
				case 'topLogo' : location.href = '/shop/main/index.php'; break;

				//for 1 Depth Menu
				case 'btn1' :  location.href = '/shop/goods/goods_list.php?category=001001'; break;//Ink
				case 'btn2' :  location.href = '/shop/goods/goods_list.php?category=001002'; break;//Toner
				case 'btn3' :  location.href = '/shop/goods/goods_list.php?category=001003'; break;//Robbon cartridge
				case 'btn4' :  location.href = '/shop/goods/goods_list.php?category=001004'; break;//Infinity Supply Device
				case 'btn5' :  location.href = '/shop/goods/goods_list.php?category=002'; break;//Bulk Ink
				case 'btn6' :  location.href = '/shop/goods/goods_list.php?category=003'; break;//Printer Mall

				//for Bottom
				case 'btnUnknown' : location.href = '/shop/board/list.php?id=unknownBoard'; break;
				case 'btnASCenter' : location.href = '/shop/service/ascenter.php'; break;

				default: trace( e, _depth1, _depth2 ); break;
			}
			break;
		}
		default : trace( e, obj, objId, _depth1, _depth2 ); break;
	}
}

xtfmBookMarkUrl = 'http://www.8doink.com/';
xtfmBookMarkTitle = '팔도잉크 - 잉크토너 부문 소비자만족도 1위';

function xtfmAddBookMark( _url, _title )
{
	window.external.AddFavorite( xtfmBookMarkUrl, xtfmBookMarkTitle );
}










var tsTypingTextArray = new Array( '잉크/토너/프린터의 모델명을 입력해주세요.',  '예) CLX-3180 -> 3180', '예) MP-258 -> 258', '모델명의 숫자만 입력하세요 ^^' );
var tsTypingTextArrayCount = 0;
var strTs = tsTypingTextArray[ tsTypingTextArrayCount % 2 ];
var tsTypingPosition = 0;
var itvId_TsTyping = 0;
var tsTypingTarget = null;
var tsPrevInputText = '';

function topSearchFocus( e )
{
	e = e || window.event;
	if( e.type == 'blur' )
	{
		if( empty( tsTypingTarget ) == true )
		{
			topSearchBlurEffect( 'on' );
			tsPrevInputText = '';
		}
		else tsPrevInputText = tsTypingTarget.value;
	}
	else if( e.type == 'focus' )
	{
		if( tsPrevInputText == '' )
		{
			topSearchBlurEffect( 'off' );
			tsPrevInputText = '';
		}
	}
}

function topSearchBlurEffect( _toggle )
{
	if( _toggle == 'off' )
	{
		if( itvId_TsTyping ) clearTimeout( itvId_TsTyping );
		tsTypingTarget.value = '';
		tsTypingTarget.style.borderColor = '#e34456';
		tsTypingPosition = 0;
		tsTypingTextArrayCount = 0;
		itvId_TsTyping = 0;
	}
	else
	{
		tsTypingTarget.value = strTs.substring( 0, tsTypingPosition );
		tsTypingTarget.style.borderColor = '#b8b8b8';

		if( strTs.length == tsTypingPosition )
		{
			tsTypingPosition = 0;
			tsTypingTextArrayCount++;
			strTs = tsTypingTextArray[ tsTypingTextArrayCount % 2 ];
			itvId_TsTyping = setTimeout( function(){ topSearchBlurEffect();}, 3000 );
		}
		else
		{
			tsTypingPosition++;
			itvId_TsTyping = setTimeout( function(){ topSearchBlurEffect();}, 40 );
		}
	}
}




function moveSearchPart( _urls )
{
	location.href = _urls;
}




function doListSearch( _searchWordPart )
{
	var form = document.getElementById( 'listSearchForm' );
	var sword = document.getElementById( _searchWordPart );

	form.sword.value = sword.value;
	form.action = './goods_search.php';
	form.method = 'get';
	form.submit();
}



function validEnterKey4Search( e )
{
	e = e || window.event;

	var obj = xtfm.event.getEventTarget( e );
	var objId = xtfm.getAttribute( obj, 'id' );

	if( e.keyCode == 13 )
	{
		if( objId == 'searchWord1' || objId == 'searchWord2' )
		{
			doListSearch( objId )
		}
		Event.returnValue = false;
		Event.cancelBubble = true;
	}
}







var savedCheck4LayerMenu4PrinterList = '';
var savedCheckNotSame = false;
var itsOnMe = 0;

function showLayerMenu4PrinterList( _goodsCode, _str, _no, _isSales )
{
	if( savedCheck4LayerMenu4PrinterList != _goodsCode ) savedCheckNotSame = true;
	else savedCheckNotSame = false;

	savedCheck4LayerMenu4PrinterList = _goodsCode;

	var f = eval( "document.all." + layerName[_no] );
	var text = '';


	var docBody = 0;

	if( ( document.documentElement.scrollLeft + document.documentElement.scrollTop ) > ( document.body.scrollLeft + document.body.scrollTop ) )
	{
		docBody = document.documentElement;
	}
	else
	{
		docBody = document.body;
	}

	if( f.style.visibility == 'hidden' )
	{
		f.style.left = event.clientX + document.body.scrollLeft + 10;
		f.style.top = event.clientY + docBody.scrollTop;

		f.style.visibility = 'visible';

		text += '<table>';
		text += '	<tr>';
		text += '		<td width="15"> </td>';
		text += '		<td></td>';
		text += '	</tr>';

		var menuVar = eval( _str );

		for( var i = 0, len = menuVar.length; i < len; i++ )
		{
			if( i == 0 )
			{
				if( _isSales )
				{
					var checkMenu = menuVar[i].replace( eval( "/CODE/g" ), _goodsCode );
					checkMenu = checkMenu.replace( eval( "/STR/g" ), _str );
					checkMenu = checkMenu.replace( eval( "/NO/g" ), _no );
					checkMenu = checkMenu.replace( eval( "/SALE/g" ), _isSales );
					text += '	<tr>';
					text += '		<td height="22">- </td>';
					text += '		<td>'+checkMenu+'</td>';
					text += '	</tr>';
				}
				else
				{
					text += '	<tr>';
					text += '		<td height="22">- </td>';
					text += '		<td>현재 판매중인 프린터가 아닙니다.</td>';
					text += '	</tr>';
				}
			}
			else
			{
				var checkMenu = menuVar[i].replace( eval( "/CODE/g" ), _goodsCode );
				checkMenu = checkMenu.replace( eval( "/STR/g" ), _str );
				checkMenu = checkMenu.replace( eval( "/NO/g" ), _no );
				checkMenu = checkMenu.replace( eval( "/SALE/g" ), _isSales );
				text += '	<tr>';
				text += '		<td height="22">- </td>';
				text += '		<td>'+checkMenu+'</td>';
				text += '	</tr>';
			}
		}

		text += '	<tr>';
		text += '		<td> </td>';
		text += '		<td></td>';
		text += '	</tr>';
		text += '</table>';
		f.innerHTML = text;
	}
	else
	{
		hideLayerMenu4PrinterList();
		if( savedCheckNotSame == true )
		{
			showLayerMenu4PrinterList( _goodsCode, _str, _no, _isSales );
			savedCheckNotSame = false;
		}
	}
}

function hideLayerMenu4PrinterList()
{
	for( var i = 0, len = layerName.length; i < len; i++ )
	{
		if( layerName[i] != itsOnMe )
		{
			var f = eval( "document.all."+layerName[i] );
			f.style.visibility = 'hidden';
			f.innerHTML = '';
		}
		else itsOnMe = 0;
	}
}



function viewGoodsInfo( gdcode )
{
	if( gdcode )
	{
		window.open("../eshop_goods/goods_view.html?gdCode="+gdcode , "gdView" , "width=650,height=500,top=0,left=0,scrollbars=yes,resizable=yes");
	}
}

/*-------------------------------------------------------------------------------------
* setGoodsCount / 상품 수량 증감을 위한 스크립트
*
* -
* -
*
* @param ( Type  ) :  -
*
* @todo : -
-------------------------------------------------------------------------------------*/
function setGoodsCount( _objName, _objIdx, _toggle )
{

	if( !_objName || !_toggle ) return;

	var obj = document.getElementById( _objName + _objIdx );

	if( isNaN( obj.value ) )
	{
		alert( '수량은 숫자만 입력이 가능합니다.' );
		obj.value = 1;
		obj.focus();
	}
	else
	{
		( _toggle == 'up' ) ? obj.value++ : obj.value--;
		if( obj.value == 0 ) obj.value = 1;
	}
}




function openCompanyInfo( _bizNumber )
{
	var url = 'http://www.ftc.go.kr/info/bizinfo/communicationViewPopup.jsp?wrkr_no=' + _bizNumber;
	window.open( url, 'communicationViewPopup', 'width=750, height=700;' );
}