//randomizer

function getRandomInt(numbers) {
	// Returns randomised int, which has as many numbers as input.
	// If input numbers is 0 or lower, returns 0.
	if (numbers < 1) {
		return 0;
	}
	return Math.floor((Math.random() * (9 * 10 ^ (numbers -1))) + 10 ^(numbers - 1));
}

function getRandomFloat(decimals) {
	// Returns randomised float, which has as many decimals as input.
	// If input decimals is 0 or lower, returns float with 1 decimal.
	if (decimals < 0) {
		decimals = 1;
	}
	return parseFloat(Math.random()).toFixed(decimals);
}

function getRandomIntBetween(min, max) {
	// Returns randomised int between min and max
	// If input min or max is not defined or empty, sets minumium to -1 Mil or maximum to 1 Mil
	if (parseInt(min) == null || parseInt(min) == undefined) {
		min = -1000000;
	}
	if (parseInt(max) == null || parseInt(max) == undefined) {
		max = 1000000;
	}
	return Math.floor(Math.random() * (max-min+1) + min);
}

function getRandomFloatBetween(min, max, decimals) {
	// Returns randomised float between min and max.
	// If input min or max is not defined or empty, sets minumium to -1 Mil or maximum to 1 Mil
	// If input decimals is lower than 0, returns number with 4 decimals.
	if (min == undefined ||min == null) {
		min = -1000000;
	}
	if (max == undefined ||max == null) {
		max = 1000000;
	}
	if (decimals == "" || decimals == null || decimals < 0) {
		decimals = 4;
	}
	return parseFloat(Math.random() * (max-min) + min).toFixed(decimals);
}

function getRandomString(length) {
	// Returns randomised string. Its lenght is given in input
	if (length == "" || length == null || length < 1) {
		length = 1;
	}
	var output = "";
    var options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for ( var i=0; i < length; i++ ) {
        output += options.charAt(Math.floor(Math.random() * options.length));
	}
    return output;
}

function getRandomEmail(length, end) {
	// Returns random email address. It's length is given in input.
	// It is possible to give end of email address.
	if (length == undefined || length == null || length < 1) {
		length = 4;
	}
	if (end == "" || end == null || typeof end != "string") {
		end = "gmail.com";
	}
	if (end.indexOf('@') > -1) {
		end.replace('@','');
	}
	var start = getRandomString(length);
	return start + '@' + end;
}

function getRandomAddress(length, numbers) {
	// Returns random street address. Roads length is given in input.
	// Also amount of numbers is given in input. 
	// If nothing given, gives 10 letter street with 2 numbers.
	if (length == undefined || length == null || length < 1) {
		length = 10;
	}
	if (numbers == undefined || numbers == null || numbers < 0) {
		numbers = 2;
	}
	var start = getRandomString(length);
	if (numbers == 0) {
		var end = "";
	} else {
		var end = getRandomIntBetween(10^numbers, 10^(numbers+1) -1);
	}
	return start + " " + end.toString();
}

function throwDice(sides) {
	// Returns int which is chosen from the dice.
	// Takes amount of sides as input.
	if (sides == null || sides == undefined || sides < 2) {
		sides = 6;
	}
	return Math.floor(Math.random()* sides + 1);
}

function throwCoin(sides) {
	// Returns if coin lands on heads or tails, or neither.
	// Takes input sides (rarely used), which could be 2 or 3.
	if (sides == null || sides == undefined || sides < 2) {
		sides = 2;
	} else if (sides > 3) {
		sides = 3;
	}
	thr = Math.floor((Math.random() * sides) + 1);
	if (thr == 1) {
		return "Heads";
	} else if (thr == 2) {
		return "Tails";
	} else {
		return "Lands on neither side."
	}
}

function showHighscore(list, amount, title) {
	// Prints a highscore list on console.
	// Takes input a list, amount of items shown and title of highscore.
	// Highscore is a list of objects cointaining {nickname: ,points:}
	if (list == [] || list == "" || list == undefined || list == null) {
		console.log("No highscores found.");
	}
	if (amount < 1 || amount == "" || amount == null) {
		amount = 1;
	}
	if (amount > list.length) {
		amount = list.length;
	} 
	if (title == "" || title == null) {
		title = "Highscores: ";
	}
	console.log(title + "\n");
	for (var a = 0; a < amount; a++) {
		console.log((a+1).toString() + ". Nickname: " + list[a].nickname + ", Points: " + list[a].points);
	}
	
}

function updateHighscore(list, points, name) {
	// Prints updated highscore list on console. Returns new list.
	// Takes input a list, points and a name.
}

function resetHighscore(list) {
	// Resets highscore. Returns empty list.
	list = [];
	return list;
}

function sortHighscoreViaPoints(list) {
	// Sorts highscore highest points first and prints all of it to console.
	// Returns sorted list
	var updatedList = [];
	showHighscore(updatedList, 9999, "");
	return updatedList;
}

function sortHighscoreViaNickname(list) {
	// Sorts highscore nickname first and prints all of it to console.
	// Returns sorted list
	var updatedList = [];
	showHighscore(updatedList, 9999, "");
	return updatedList;
}

function showInventory(list) {
	// Prints a list on console.
	// Takes input a list of items (containing amounts).
	console.log("\n Inventory: ");
	for (var a = 0; a < list.length; a++) {
		console.log(list[a].item + ": " + list[a].amount);
	}
}

var wrongCount = 0;
var rightCount = 0;

function testTitle(str) {
	// Prints title of a text to a console.
	console.log("\n Now testing: " + str.toString());
}

function testValue(str, value) {
	// Prints test value name and value to console.
	console.log("Value of the " + str.toString() + " is " + value);
}

function isNotValid(input, wrongText) {
	// Prints wrongText to console, if input is not valid
	if (!input) {
		wrongCount += 1;
		console.log(wrongText);
	}
}

function isEqual(input, value, rightText) {
	// Prints rightText to console, if input is equal to value
	if (input == value) {
		rightCount += 1;
		console.log(rightText);
	}
}

function checkIfValid(input, value, rightText, wrongText) {
	// Prints rightText to console, if input is equal to value
	// Prints wrongText to console, if input is not equal to value
	if (input == value) {
		rightCount += 1;
		console.log(rightText);
	} else {
		wrongCount += 1;
		console.log(wrongText);
	}
}

function countWrongs() {
	// Prints wrong count to console.
	console.log("Error count: " + wrongCount);
}

function countRights() {
	// Prints right count to console.
	console.log("Success count: " + rightCount);
}

function chooseOption(percent) {
	var thisValue = getRandomIntBetween(0,99);
	if (thisValue <= percent) {
		return true;
	} else {
		return false;
	}
}

function chooseRandomItem(dropItems) {
	// Chooses an item.
	var itemIndex = getRandomIntBetween(0, dropItems.length-1);
	console.log("Items: ", dropItems, ", chosen: ", dropItems[itemIndex]);
	return dropItems[itemIndex];
}