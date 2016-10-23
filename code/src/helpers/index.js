/*******************************
 * [_index.js]
 * index file for the helpers
 ******************************/

/**
* Dependencies
*/
import translateNumberHelper from './translateNumber';
import MutationHelper from './mutation';

/**
* Function
*/
const index = (function () {

			/**
			* Support helpers for translation
			*/
			const translation = {
				number : function (input, callback) {
					translateNumberHelper(input, callback);
				}
			};

			/**
			* Support helpers for mutation
			*/
			const mutation = {
				typography : {
					capitaliseFirstLetter : function (input){
						return MutationHelper.typography.capitaliseFirstLetter(input);
					},
					removeWhitespaceDuplicate : function (input){
						return MutationHelper.typography.removeWhitespaceDuplicate(input);
					},
					removeWhitespaceTrailing : function (input){
						return MutationHelper.typography.removeWhitespaceTrailing(input);
					},
					removeWhitespaceTrailingLeading : function (input){
						return MutationHelper.typography.removeWhitespaceTrailingLeading(input);
					}
				}
			};

			return {
				translation : translation,
				mutation : mutation
			};
})();


/**
 * Export
 */
module.exports = index;
