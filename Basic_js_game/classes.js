//Classes

function FoodItem (name, price, amount, healAmount, pathToPicture) {
	this.name = name;
	this.price = parseInt(price);
	this.amount = parseInt(amount);
	this.healAmount = parseInt(healAmount);
	this.pathToPicture = pathToPicture;
	
	this.printItem = function() {
		console.log("Item: ", this.name, ", price: ", this.price, ", amount: ", this.amount)
	}
	
	this.use = function(amount) {
		if (amount > this.amount) {
			console.log("Error: You have only ", this.amount, " of item ", this.name, ". Not ", amount);
			return false;
		} else {
			this.amount -= amount;
			heal(amount * this.healAmount);
			return true;
		}
	}
	
	this.add = function(amount) {
		if (amount == NaN) {
			console.log("Error: You cannot add ", amount);
		}
		this.amount += amount;
	}
	
	this.getAmount = function() {
		return parseInt(this.amount);
	}
	
	this.updateImage = function(el) {
		el.append('<img class="inv-logo" src=' + this.pathToPicture + '>');
	}
}

function WaterItem (options) {
	this.id = options.id;
	this.name = options.name;
	this.price = parseInt(options.price);
	this.amount = parseInt(options.amount);
	this.thirstynessAmount = parseInt(options.thirstynessAmount);
	this.pathToPicture = options.pathToPicture;
	
	this.printItem = function() {
		console.log("Item: ", this.name, ", price: ", this.price, ", amount: ", this.amount)
	}
	
	this.use = function(amount) {
		if (amount > this.amount) {
			console.log("Error: You have only ", this.amount, " of item ", this.name, ". Not ", amount);
			return false;
		} else if (this.getId() == "item_dw") {
			this.amount -= amount;
			for (var i = 0; i < amount; i++) {
				console.log("Using dirty water");
				var result = throwCoin(2);
				if (result == "Heads") {
					reduceThirstiness(this.thirstynessAmount);
				} else {
					takeDamage(20);
				}
			}
		} else {
			console.log(this.name, this.getId());
			this.amount -= amount;
			reduceThirstiness(amount * this.thirstynessAmount);
			if (this.name == "a holy water") {
				for (var i = 0; i < amount; i++) {
					var result = throwCoin(2);
					if (result == "Heads") {
						console.log("Applied buff: Holy spirit")
						// TODO Holy spirit buff
					}
				}
			}
			return true;
		}
	}
	
	this.add = function(amount) {
		if (amount == NaN) {
			console.log("Error: You cannot add ", amount);
		}
		this.amount += amount;
	}
	
	this.getId = function() {
		return this.id;
	}
	
	this.getAmount = function() {
		return parseInt(this.amount);
	}
	
	this.updateImage = function(el) {
		el.append('<img class="inv-logo" src="' + this.pathToPicture + '">');
	}
}

function Player (options, stats) {
	var options = options || {};
	var stats = stats || {};
	this.name = options.name || "Player";
	this.inventory = options.inventory || [];
	this.days = options.days || 0;
	this.points = options.points || 0;
	this.gold = options.gold || 1000;
	//Add buffs maybe later
	
	this.attack = stats.attack || 10;
	this.defense = stats.defense || 10;
	this.hitpoints = stats.hitpoints || 80;
	this.maxHitpoints = stats.maxHitpoints || 100;
	this.thirstyness = stats.thirstyness || 1;
	this.wanted = stats.wanted || 0;
	this.mood = stats.mood || 8;
	this.inventorySize = stats.inventorySize || 10;
	this.speed = stats.speed || 100;
	
	// Counts how many items are in the inventory.
	this.itemsInInventory = 0;
	for (var i = 0; i < this.inventory.length; i++) {
		/*var item = window[this.inventory[i]];
		console.log(item);
		console.log(this.inventory);
		this.itemsInInventory += item.getAmount();*/
	}
	
	// This is a safer way to access players attributes.
	this.getPlayerName = function() {
		// Returns players name.
		return this.name;
	}
	
	this.getInventory = function() {
		// Returns players inventory as array.
		return this.inventory;
	}
	
	this.getDays = function() {
		// Returns players current day as int.
		return parseInt(this.days);
	}
	
	this.getPoints = function() {
		// Returns players points as int.
		return parseInt(this.points);
	}
	
	this.getGold = function() {
		// Returns players gold as int.
		return parseInt(this.gold);
	}
	
	this.getAttack = function() {
		// Returns players attack as int.
		return parseInt(this.attack);
	}
	
	this.getDefense = function() {
		// Returns players defense as int.
		return parseInt(this.defense);
	}
	
	this.getHitpoints = function() {
		// Returns players hitpoints as int.
		return parseInt(this.hitpoints);
	}
	
	this.getMaxHitpoints = function() {
		// Returns players maxHitpoints as int.
		return parseInt(this.maxHitpoints);
	}
	
	this.getThirstyness = function() {
		// Returns players thirstyness level as int.
		return parseInt(this.thirstyness);
	}
	
	this.getWanted = function() {
		// Returns players wanted level as int.
		return parseInt(this.wanted);
	}
	
	this.getMood = function() {
		// Returns players mood level as int.
		return parseInt(this.mood);
	}
	
	this.getInventorySize = function() {
		// Returns players inventory size as int.
		return parseInt(this.inventorySize);
	}
	
	this.getSpeed = function() {
		// Returns players speed as int.
		return parseInt(this.speed);
	}
	
	this.getOptions = function() {
		// Returns players options.
		return {
			name: this.name, 
			inventory: this.inventory, 
			days: this.days, 
			points: this.points, 
			gold: this.gold
		}
	}
	
	this.getStats = function() {
		// Returns players stats.
		return {
			attack: this.attack,
			defense: this.defense,
			hitpoints: this.hitpoints,
			maxHitpoints: this.maxHitpoints,
			thirstyness: this.thirstyness,
			wanted: this.wanted,
			mood: this.mood,
			inventorySize: this.inventorySize,
			speed: this.speed
		}
	}
	
	// This is safer way to change players attributes.
	this.updateAttack = function (amount) {
		// Changes players attack attribute.
		this.attack += parseInt(amount);
		if (this.attack < 0) {
			this.attack = 0;
		}
	}
	
	this.updateDefense = function (amount) {
		// Changes players defense attribute.
		this.defense += parseInt(amount);
		if (this.defense < 0) {
			this.defense = 0;
		}
	}
	
	this.updateHitpoints = function (amount) {
		// Changes players hitpoints attribute.
		this.hitpoints += parseInt(amount);
		if (this.hitpoints < 0) {
			this.die();
		}
	}
	
	this.setMaxHitpoints = function (amount) {
		// Sets players maxHitpoints attribute.
		this.maxHitpoints = parseInt(amount);
		if (this.maxHitpoints <= 0) {
			console.log("maxHitpoints set to ", this.maxHitpoints);
			this.die();
		} else if (this.maxHitpoints < this.hitpoints) {
			// If hitpoints are geater than maximum hitpoints, set hitpoints as maximum.
			this.hitpoints = this.maxHitpoints;
		}
	}
	
	this.updateThirstyness = function(amount) {
		// Changes players thirstyness level.
		this.thirstyness += parseInt(amount);
		if (this.thirstyness < 0) {
			this.thirstyness = 0;
		} else if (this.thirstyness >= 5) {
			console.log("Player dies. Too thirsty.")
			this.die();
		}
	}
	
	this.updateWanted = function(amount) {
		// Changes players wanted level.
		this.wanted += parseInt(amount);
		if (this.wanted < 0) {
			this.wanted = 0;
		}
	}
	
	this.updateMood = function(amount) {
		// Changes players mood level.
		this.mood += parseInt(amount);
		if (this.mood > 10) {
			this.mood = 10;
		} else if (this.mood <= 0) {
			this.die();
		}
	}
	
	this.updateInventorySize = function(amount) {
		// Changes players inventory size.
		this.inventorySize += parseInt(amount);
		if (this.inventorySize < 10) {
			this.inventorySize = 10;
		}
	}
	
	this.updateSpeed = function (amount) {
		// Changes players speed attribute.
		this.speed += parseInt(amount);
		if (this.speed < 0) {
			this.speed = 0;
		}
	}
	
	this.checkSpaceLeftInTheInventory = function () {
		return this.inventorySize - this.itemsInInventory;
		// Returns amount of free space
	}
	
	this.addToInventory = function (item, amount) {
		// Checks if there is enough space in the inventory
		if (this.checkSpaceLeftInTheInventory < amount) {
			console.log("You are trying to add too much items.")
		} else {
			console.log("Space left in the inventory: ", this.checkSpaceLeftInTheInventory());
			console.log(item);
			if ($.inArray(this.getInventory(), toString(item)) != -1) {
				// Adds amount of certain item to inventory in main.js
			} else {
				// Adds item and amount to inventory in main.js.
				// Appends item to inventory.
				this.inventory.push(item);
			}
			this.itemsInInventory += amount;
		}
		// Returns updated list.
		return this.inventory;
		// Should update inventory view from main.js
	}

	this.removeFromInventory = function (item, amount) {
		// Checks if there is enough this item in the inventory.
		if (item.getAmount() < amount) {
			// Not enough items.
			console.log("Not enough items.");
		}
		// Removes item or amount of certain item from inventory.
		else if ($.inArray(this.getInventory(),toString(item)) != -1) {
			// Removes amount of certain item to inventory.
			// If removes all pieces of item -> remove from inventory.
			if (item.getAmount() == amount) {
				var index = this.inventory.indexOf(item);
				this.inventory.splice(index, 1);
			}
			this.itemsInInventory -= amount;
			
		} else {
			// Item is not in the inventory.
			console.log("Item is not in the inventory.")
		}
		this.itemsInInventory += amount;
		return this.inventory;
		// Returns updated list.
		// Should update inventory view from main.js
	}
	
	this.nextDay = function() {
		// Sets day to next.
		this.days += 1;
		$("#days").text(this.days);
	}
	
	this.addPoints = function(amount) {
		// Adds player amount of points
		// Amount might be negative, no use yet.
		this.points += parseInt(amount);
		$("#points").text(this.points);
	}
	
	this.updateGold = function(amount) {
		// Adds amount of gold to player.
		// Amount can be negative.
		this.gold += parseInt(amount);
		console.log(this.gold);
		if (this.gold >= 0) {
			$("#gold").text(this.gold);
			return true;
		} else {
			this.gold -= parseInt(amount);
			console.log("Cannot afford. Gold remaining: ", this.gold);
			return false;
		}
	}
	
	this.die = function() {
		// Player dies
		// This counts points and sets endScreen.
	}
}

function Enemy (options, stats) {
	var options = options || {};
	var stats = stats || {};
	this.name = options.name || "Enemy";
	this.dropItems = options.dropItems || ["dirty water"];
	this.dropMin = options.dropMin || 0;
	this.dropMax = options.dropMax || 1;
	
	this.attack = stats.attack || 10;
	this.defense = stats.defense || 10;
	this.hitpoints = stats.hitpoints || 80;
}