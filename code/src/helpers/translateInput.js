/*******************************
 * [_translateInput.js]
 * Define the translation code here
 ******************************/

let numberToWords = (input, callback) => {

	console.log('translateInput: init payload:');
	//console.log(input);

	const arabic = input.arabic.value;

	/**
	 * Support functions
	 */
		const wordDefinitions = {
			singles : [
				'', 'one', 'two', 'three', 'four',
				'five', 'six', 'seven', 'eight', 'nine',
				'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
				'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
			],

			tens : [
				'', '', 'twenty', 'thirty', 'forty',
				'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
			],

			thousands : [
				'', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
				'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
			]
		};

		const helpers = {
			reverse(payload) {
				return payload.reverse();
			},

			divideInto(arr, chunkSize) {
				let groups = [], i;

				for (i = 0; i < arr.length; i += chunkSize) {
						groups.push(arr.slice(i, i + chunkSize));
				}
				return groups;
			},

			matchDefinitions([singles, tens, hundreds]) {
				// Array position defines what it is. 0 = singles, 1 = tens, 2 = hundreds
				console.log(singles, tens, hundreds);

				return [
				// Result for the hundreds
					// If result is 0, return blank
					// Else return the definition for the single digit based on index in array
					hundreds == 0 || hundreds == null ? '' : wordDefinitions.singles[hundreds] + ' hundred ',

				// Result for the singles and tens
					// If single digit is 0, return the definition for the base tens (2 digit) number (e.g: 20, 30)
					// Else return definition of the base tens + '-' + single digit
					// If no arguments, return blank
					singles == 0 ? wordDefinitions.tens[tens] :
					wordDefinitions.tens[tens] && wordDefinitions.tens[tens] + '-' || '',

				// Attach the tens and singles if available, otherwise just take the singles
					wordDefinitions.singles[tens + singles] || wordDefinitions.singles[singles]
				].join(''); //Join them
			}
		};

	/**
	* Process the input
	*/

		// 1. Throw the entire input into an array
		let inputArray = [...arabic];


		// 2. Reverse it so that it is spaced into neat blocks and only the first array has gaps
		inputArray = helpers.reverse(inputArray);

		// 3. Divide it into chunks
		inputArray = helpers.divideInto(inputArray, 3);
		console.log('divided: ', inputArray);

		inputArray.map(function (item) {
			while (item.length != 3){
				item.push(null);
			}
		});

		// 4. Map each item to a definition
		let translation = inputArray.map(helpers.matchDefinitions);

		// 5. Add thousands
		//let translation = inputArray.map(helpers.matchDefinitions);

		// 6. Reverse it again
		translation = helpers.reverse(translation);

		console.log(translation);

		const result = {
			english : {
				value : translation
			}
		};

		callback(result);
};

//numberToWords(120000)
//12 | twelve
//123  | onehundred and twenty three
//1234 | onethousand twohundred and thirty-four
//12345 | twelvethousand threehundred and fourty-five
//123456 | onehundred and twenty-three thousand fifty-six
//1 234 567 | one million twohundred thirty-four thousand five hundred sixty-seven

// 1 000 000 000
// The groups of 3 never change. Use this as a base. You need to make sure everything is paired in groups of three.

//10 000
//1 000

export default numberToWords;
