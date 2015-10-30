/*!
 * jQuery treelist  v1.0
 * Mon Oct 29 17:30:000 git version: -
 *
 * Includes jQuery tree view structure to from a complex JavaScript object
 * https://github.com/--
 * 
 * @Author :Laxmikant Gurnalkar
 * Date: Mon Oct 23 05:15:00 2015 +0530
 * ************************************************* 
 * To use this script :
 *  * Include following files:
 * 		 $ latest stable jQuery.js (Tested with 1.9.1)
 * 		 $ treelist.js
 * 		 $ treelist.css
 *  * Provide:  
 *       $ div class to populate listbox 
 *       $ JavaScript Object as a source in the format :      
 * 				[{
 * 					"object":   {	
 * 									"value":"Object"
 * 								},
 * 					"nestedObj":{
 * 									"value":"NestedObject",
 * 									"children":{
 *													"value":"NestedObject",
 *	 												"children":{
 * 																...
 *																} 													
 * 								
 * 												}
 * 								},
 * 					...
 * 				}]
 * DONE - Use any class to populate treelist
 * TODO - Array of Objects can be passed.
 * TODO - Instead of class it should support the id
 * TODO - UL - LI, Can be replaced with any nestable tags
 * TODO - Passing handler/callback On list change
 * TODO - Allow form to send selected value from the form
 * TODO - Allow to select Multiple options at a time.
 * TODO - BUG FIXINGS     
 * **************************************************
 */
(function ( $ ) {
    $.fn.treelist = function( options ) {
    	var self = this;
        var settings = $.extend({
            // These are the defaults.
             source: {} ||this.data('source'),
			 selectBox : this.selector,
			 display : '.styledSelect',
			 parentTag : 'UL',
			 childTag : 'LI', 
			 icon : "img",
			 optionGroup : '.optiongroup',
			 expandORCollapseEvent : 'click',
			 optionGroupTitle : "LI"+ ".title",
			 True : true,
			 False : false,
			 childrenKey : "children",
			 valueText : "value",
			 MINUSICON : "minus_icon.gif", 
			 PLUSICON : "plus_icon.gif", 
			 expand : "expand",
			 collapse : "collapse",
			 selectText : "Select",
			 active:"active"
        }, options );
        
		var _treelist = _treelist|| {
				init:function(root){
					_treelist.setTreeAttributes(self);
					_treelist.setDisplayOption(settings.display);
					_treelist.iterateObject(root, settings.True);
					_treelist.showDropDownText();
					_treelist.setFocusOut(settings.selectBox);
					_treelist.expandORCollapseRoot(settings.selectBox);
				},
				setTreeAttributes:function(targetselector){
					$(targetselector).addClass('treeselector');
				},
				iterateObject:function (node, rootflag, ret) {
					$.each(node, function(key, value){
						if(!_treelist.isplain(value)){
							if(settings.childrenKey in value){
								var parentObj = (!rootflag)?ret:settings.selectBox;
								var retx = _treelist.createGroup(value[settings.valueText], settings.True, parentObj);
								_treelist.iterateObject(value, settings.False, retx);
							}else{
								(!rootflag)?( settings.valueText in value)?_treelist.createOption(value[settings.valueText], ret):""
										:_treelist.createGroup(value[settings.valueText], settings.False, settings.selectBox);
								_treelist.iterateObject(value, settings.False, ret);
							}
						}
					});
				},
				expandORCollapseRoot:function(target){
					$(target).off(settings.expandORCollapseEvent, settings.display);
					$(target).on(settings.expandORCollapseEvent, settings.display, function(){
						_treelist.expandORCollapseChildern(target);
					});
				},
				expandORCollapseChildern:function(target){
					$(target).children(settings.parentTag).each(function(){
							_treelist.toggleElm(this);
							_treelist.expandORCollapseNode($(this));
					});
				},
				expandORCollapseNode:function(node){
					$(node).find("span:first").off(settings.expandORCollapseEvent, settings.icon);
					$(node).find("span:first").on(settings.expandORCollapseEvent, settings.icon, function(){
						var parentUL = $(this).parents(settings.optionGroup+':first');
						var children = parentUL.children(":not("+ settings.optionGroupTitle +")")
						if(children.size()){
							_treelist.toggleElm(children);
							_treelist.expandORCollapseNode(children);
						}
					});
				},
				toggleElm:function(elm){
					_treelist.isExpanded(elm)?_treelist.collapseIt(elm):_treelist.expandIt(elm);
				},
				changeIcon: function(elm , nodeIcon, alt){
					var iconelm =  $(elm).parents(settings.optionGroup+':first').find(settings.icon+":first");
					iconelm.attr("src", nodeIcon);
					iconelm.attr("alt", alt);
				},
				expandIt:function (elm){
					_treelist.changeIcon(elm, settings.MINUSICON, "-");	
					$(elm).addClass(settings.expand).removeClass(settings.collapse);
				},
				collapseIt : function  (elm){
					_treelist.changeIcon(elm, settings.PLUSICON, "+");
					$(elm).addClass(settings.collapse).removeClass(settings.expand);
				},	
				isExpanded : function(elm){
					return $(elm).hasClass(settings.expand);
				},
				isCollapsed : function(elm){
					return $(elm).hasClass(settings.collapse);
				},
				setDisplayOption : function(){
					$('<div></div>')
					.addClass(_treelist.undot(settings.display))
					.text(settings.selectText)
					.appendTo($(settings.selectBox));
				},
				createGroup : function (grpname, plusFlag, parentObj){
					var expandicon = plusFlag? '<span><img src="plus_icon.gif" alt="+">&nbsp;</span>'+grpname:'<span>&nbsp</span>'+grpname;
					var parentGroup = $("<ul><li></li></ul>")  
					  .addClass(_treelist.undot(settings.optionGroup))
					  .attr("rel", grpname)  
					  .find("li")
					  .addClass("title")
					  .html(expandicon)
					  .end()
					  .appendTo( parentObj );
				    return parentGroup;
				},
				createOption:function (val, parentObj){
					var val = '&nbsp;&nbsp;&nbsp;&nbsp;'+val;
					var innerTag = $("<li></li>")
						.attr("rel", val)
						.html(val)
						.appendTo( parentObj );
				    return innerTag
				},
				isplain: function(data){
				    return (typeof data === 'number' || typeof data === 'string')? settings.True: settings.False;
				},
				showDropDownText: function(){
					$(settings.selectBox).on(settings.expandORCollapseEvent, settings.optionGroup, function(e){
						if($(e.target).is(settings.icon)){
				            e.preventDefault();
				            return;
				        }
				        if($(e.target).is(settings.childTag)){
				        	$(settings.optionGroup+" "+settings.childTag).removeClass(settings.active);
				        	$(e.target).addClass(settings.active);
							$(settings.display).text($(e.target).text());
							$(settings.display).nextAll(settings.parentTag).each(function(){
								_treelist.resetExpandCollapse(this);			
							});
						}
					});
				},
				resetExpandCollapse: function(elm){
					$(elm).removeClass(settings.collapse).removeClass(settings.expand);
				},
				setFocusOut: function(selectBox){
					$(document).on("mouseup", function(e){
					    var container = $(selectBox);
					    if (!container.is(e.target)&& container.has(e.target).length === 0) 
					    {
							$(settings.display).nextAll(settings.parentTag).each(function(){
								_treelist.resetExpandCollapse(this);			
							});
					    }
					});
				},
				undot:function(className){
					return className.replace(".", "");
				}
			}
			
			_treelist.init(settings.source);		
        return this;
    };
 
}( jQuery ));


$(function(){
	$("#target").treelist({
		"source":jsn[0]
	});
});
