# jQuery.treelist
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
