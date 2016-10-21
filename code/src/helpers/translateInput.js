/*******************************
 * [_translateInput.js]
 * Define the translation code here
 ******************************/

let numberToWords = (input, callback) => {

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

			thousands(lengthAfter) {
				const x = lengthAfter;

				switch (true) {
					case (x < 3):
						return '';
					case (x >= 3 && x < 5):
						return ' thousand ';
					case (x < 9):
						return ' million ';
					case (x < 12):
						return ' billion ';
					case (x < 15):
						return ' trillion ';
					case (x < 18):
						return ' quadrillion ';
					case (x < 21):
						return ' quintillion ';
					case (x < 24):
						return ' sextillion ';
					case (x < 26):
						return ' octillion ';
					case (x < 29):
						return ' nonillion ';
					case (x > 29):
						return 'Dude, big number. Tone it down.';
					default:
						return '';
				}
			}
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
			},

			addInBetweens(itemCount) {
				/*
				 * Primer: Here we add the "in-between-labels".
				 * To do this, we take the amount of items *after* the current block (passed to us)
				 * This way you input out how big the number is that you're describing
				 */

				// 4. Match the value to a label and return it
				return wordDefinitions.thousands(itemCount);
			}
		};


	/**
	* Process the input
	*/
		/*
		 * Primer
		 * This function takes an input array, reverses it (to free up the first digit) and divides it into blocks of 3.
		 * It then tries to map definitions based on the number that has and adds extra words, see below.
		 * Blocks of three because that makes it easy to translate.
		 * English translations can be thought of as descriptions for blocks of 3 numbers
		 * Aditionally, there are "in-between-labels" such as "thousand and"
		 * E.g.: "400 240" -> "fourhundred *thousand and*  twohundred fourty"
		 * This labels are passed on at the end by calculating how many numbers are after the current block.
		 */

		// 1. Throw the entire input into an array
		let inputArray = [...arabic];

		// 2. Reverse it so that it is spaced into neat blocks and only the first section of the number has gaps in the array
		// (so that we can name it properly when we add thousands)
		inputArray = helpers.reverse(inputArray);

		// 3. Divide it into chunks and fill it to not mess up the mapping later on
		inputArray = helpers.divideInto(inputArray, 3);

		inputArray.map(function (item) {
			while (item.length != 3){
				item.push(null);
			}
		});

		// 4. Map each item to a definition
		let untranslatedArray = inputArray,
			translation = inputArray.map(helpers.matchDefinitions);

		// 5. Reverse it again
		translation = helpers.reverse(translation);

		// 6. Filter empty
		translation = translation.filter(Boolean);

		// 7. Add in-between-labels
		const translationItems = translation.length;

		translation.forEach(function (item, index) {

			let blockIndex = index,
				itemCount = 0;

			// Grab the array as it was before I translated it
			untranslatedArray.forEach(function (item, index) {
				if (index > blockIndex){
					itemCount = itemCount + untranslatedArray[index].length;
				}
			});

			// Plug in the labels
			let label = helpers.addInBetweens(itemCount);

			// If it's the last item in the array, don't add an 'and', otherwise do
			if (index + 1 == translationItems && translationItems != 1){
				//don't do it
			} else {
				label = label + 'and';
			}

			if (label != '') {
				translation[index] = item + label;
			}
		});


		// 8. Clean up
		if (translation.length == 1) {
			// If there is only 1 item in the array, you don't need the "and part".
			translation = translation.join(' ');
			translation = translation.split(' and');
			translation = translation[0];

			// Remove duplicate whitespaces
			translation = translation.replace(/\s+/g, ' ');
		} else {
			translation = translation.join(' ');
			translation = translation.replace(/\s+/g, ' ');
		}

		const result = {
			english : {
				value : translation
			}
		};

		callback(result);
};

export default numberToWords;
