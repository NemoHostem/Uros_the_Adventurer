/* global $, alert */

$(document).ready( function() {
	"use strict";
	//Classes

function FoodItem (options) {
	this.id = options.id;
	this.name = options.name;
	this.price = parseInt(options.price);
	this.amount = parseInt(options.amount);
	this.healAmount = parseInt(options.healAmount);
	this.pathToPicture = options.pathToPicture;
	
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
	
	this.getId = function() {
		return this.id;
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
			if (this.getId() == "item_hw") {
				for (var i = 0; i < amount; i++) {
					var result = throwCoin(2);
					if (result == "Heads") {
						console.log("Applied buff: Holy spirit")
						p.setMaxHitpoints(200);
						heal(100);
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

function WeaponItem (options) {
	this.id = options.id;
	this.name = options.name;
	this.price = parseInt(options.price);
	this.amount = parseInt(options.amount);
	this.attackAmount = parseInt(options.attackAmount);
	this.handsNeeded = parseInt(options.handsNeeded);
	this.ammunition = options.ammunition;
	this.pathToPicture = options.pathToPicture;
	
	this.printItem = function() {
		console.log("Item: ", this.name, ", price: ", this.price, ", amount: ", this.amount)
	}
	
	this.use = function(amount){
		// Equipping items may be implemented later
		this.equip(amount);
	}
	
	this.equip = function(amount) {
		if (amount > this.amount) {
			console.log("Error: You have only ", this.amount, " of item ", this.name, ". Not ", amount);
			return false;
		} else {
			this.amount -= amount;
			equipWeapon(this.attackAmount);
			return true;
		}
	}
	
	this.unequip = function(amount) {
		this.amount += amount;
		console.log("Unequip weapon");
		// TODO equip/unequip weapons and armor
	}
	
	this.add = function(amount) {
		if (amount == NaN) {
			console.log("Error: You cannot add ", amount);
		}
		this.amount += amount;
	}
	
	this.shoot = function() {
		if (this.ammunition != "") {
			useAmmunition(this.ammunition);
		}
	}
	
	this.getId = function() {
		return this.id;
	}
	
	this.getAmount = function() {
		return parseInt(this.amount);
	}
	
	this.updateImage = function(el) {
		el.append('<img class="inv-logo" src=' + this.pathToPicture + '>');
	}
}

function ArmorItem (options) {
	this.id = options.id;
	this.name = options.name;
	this.price = parseInt(options.price);
	this.amount = parseInt(options.amount);
	this.armorAmount = parseInt(options.armorAmount);
	this.armorSlot = options.armorSlot;
	this.handsNeeded = parseInt(options.handsNeeded);
	this.pathToPicture = options.pathToPicture;
	
	this.printItem = function() {
		console.log("Item: ", this.name, ", price: ", this.price, ", amount: ", this.amount)
	}
	
	this.use = function(amount){
		// Equipping items may be implemented later
		this.equip(amount);
	}
	
	this.equip = function(amount) {
		if (amount > this.amount) {
			console.log("Error: You have only ", this.amount, " of item ", this.name, ". Not ", amount);
			return false;
		} else {
			this.amount -= amount;
			equipArmor(amount * this.armorAmount);
			return true;
		}
	}
	
	this.unequip = function(amount) {
		this.amount += amount;
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
		el.append('<img class="inv-logo" src=' + this.pathToPicture + '>');
	}
}

function PotionItem (options) {
	this.id = options.id;
	this.name = options.name;
	this.price = parseInt(options.price);
	this.amount = parseInt(options.amount);
	this.buffAmountMin = parseInt(options.buffAmountMin);
	this.buffAmountMax = parseInt(options.buffAmountMax);
	this.buffAttribute = options.buffAttribute;
	this.pathToPicture = options.pathToPicture;
	
	this.printItem = function() {
		console.log("Item: ", this.name, ", price: ", this.price, ", amount: ", this.amount)
	}
	
	this.use = function(amount) {
		if (amount > this.amount) {
			console.log("Error: You have only ", this.amount, " of item ", this.name, ". Not ", amount);
			return false;
		} else {
			this.amount -= amount;
			for (var i = 0; i < amount; i++) {
				applyBuff(getRandomIntBetween(this.buffAmountMin,this.buffAmountMax),this.buffAttribute);
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
		el.append('<img class="inv-logo" src=' + this.pathToPicture + '>');
	}
}

function AmmunitionItem (options) {
	this.id = options.id;
	this.name = options.name;
	this.price = parseInt(options.price);
	this.amount = parseInt(options.amount);
	this.pathToPicture = options.pathToPicture;
	
	this.add = function(amount) {
		if (amount == NaN) {
			console.log("Error: You cannot add ", amount);
		}
		this.amount += amount;
	}
	
	this.use = function(amount) {
		if (this.amount < amount) {
			console.log("Not enough ammo");
		} else {
			this.add(-amount);
		}
	}
	
	this.getId = function() {
		return this.id;
	}
	
	this.getAmount = function() {
		return parseInt(this.amount);
	}
}

function OtherItem (options) {
	this.id = options.id;
	this.name = options.name;
	this.price = parseInt(options.price);
	this.amount = parseInt(options.amount);
	this.movementSpeedChange = parseInt(options.movementSpeedChange);
	this.inventorySizeChange = parseInt(options.inventorySizeChange);
	this.pathToPicture = options.pathToPicture;
	
	this.add = function(amount) {
		if (amount == NaN) {
			console.log("Error: You cannot add ", amount);
		}
		this.amount += amount;
		// Update movement speed and inventory size.
		if (this.movementSpeedChange) {
			//updateMovSpeed(amount*this.movementSpeedChange);
		}
		if (this.inventorySizeChange) {
			//updateInvSize(amount*this.inventorySizeChange);
		}
	}
	
	this.getId = function() {
		return this.id;
	}
	
	this.getAmount = function() {
		return parseInt(this.amount);
	}
	
	this.use = function(amount) {
		if (this.amount < amount) {
			console.log("Not enough");
		} else {
			this.add(-amount);
			updateMovSpeed(amount*this.movementSpeedChange);
			updateInvSize(amount*this.inventorySizeChange);
		}
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
		$("#attack").text(this.attack);
	}
	
	this.updateDefense = function (amount) {
		// Changes players defense attribute.
		this.defense += parseInt(amount);
		if (this.defense < 0) {
			this.defense = 0;
		}
		$("#defense").text(this.defense);
	}
	
	this.updateHitpoints = function (amount) {
		// Changes players hitpoints attribute.
		this.hitpoints += parseInt(amount);
		if (this.hitpoints < 0) {
			this.die();
		}
		if (this.hitpoints > this.maxHitpoints) {
			this.hitpoints = this.maxHitpoints;
		}
		$("#hitpoints").text(this.hitpoints);
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
		$("#maxHitpoints").text(this.maxHitpoints);
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
		$("#thirstyness").text(this.thirstyness);
	}
	
	this.updateWanted = function(amount) {
		// Changes players wanted level.
		this.wanted += parseInt(amount);
		if (this.wanted < 0) {
			this.wanted = 0;
		}
		$("#wanted").text(this.wanted);
	}
	
	this.updateMood = function(amount) {
		// Changes players mood level.
		this.mood += parseInt(amount);
		if (this.mood > 10) {
			this.mood = 10;
		} else if (this.mood <= 0) {
			this.die();
		}
		$("#mood").text(this.mood);
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
		$("#speed").text(this.speed);
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
			// Inventorysize might be updated later.
			// console.log("Space left in the inventory: ", this.checkSpaceLeftInTheInventory());
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
		this.updateMood(-1);
		this.updateThirstyness(1);
		this.addPoints(15);
		this.actionsPerTurn = 1 + Math.floor(p.getSpeed() / 50);
		this.randomEventChange = 80/(100 + p.getSpeed());
		this.randomQuestChange = Math.floor(p.getSpeed() / 100);
		$("#actionsLeft").text(this.actionsPerTurn);
		$("#days").text(this.days);
		checkDay();
	}
	
	this.addPoints = function(amount) {
		// Adds player amount of points
		// Amount might be negative, no use yet.
		this.points += parseInt(amount);
		$("#score").text(this.points);
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
		console.log("Player died");
		this.updateHitpoints(-this.getHitpoints());
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
	this.dropGoldMin = options.dropGoldMin || 0;
	this.dropGoldMax = options.dropGoldMax || 100;
	
	this.attack = stats.attack || 10;
	this.defense = stats.defense || 10;
	this.hitpoints = stats.hitpoints || 80;
}

	//Define items
	var item_dw = new WaterItem({	
		id: "item_dw",
		name: "A dirty water",
		price: $("#item_dw").text(),
		amount: 1, 
		thirstynessAmount: 1, 
		pathToPicture: "images/dirtyWater.png"
	});
				
	var item_nw = new WaterItem({	
		id: "item_nw",
		name: "A water",
		price: $("#item_nw").text(),
		amount: 0, 
		thirstynessAmount: 1, 
		pathToPicture: "images/normalWater.png"
	});
				
	var item_hw = new WaterItem({	
		id: "item_hw",
		name: "A holy water",
		price: $("#item_hw").text(),
		amount: 0, 
		thirstynessAmount: 3, 
		pathToPicture: "images/holyWater.png"
	});
				
	var item_fb = new FoodItem ({
		id: "item_fb",
		name: "Berries", 
		price: $("#item_fb").text(), 
		amount: 0, 
		healAmount: 10, 
		pathToPicture: "images/fBerries.png"
	});
	
	var item_fv = new FoodItem ({
		id: "item_fv",
		name: "Vegetables", 
		price: $("#item_fv").text(), 
		amount: 0, 
		healAmount: 20, 
		pathToPicture: "images/fVegetables.jpeg"
	});
	
	var item_fr = new FoodItem ({
		id: "item_fr",
		name: "Rat meat", 
		price: $("#item_fr").text(), 
		amount: 0, 
		healAmount: 20, 
		pathToPicture: "images/fRatmeat.png"
	});
	
	var item_fc = new FoodItem ({
		id: "item_fc",
		name: "Chicken", 
		price: $("#item_fc").text(), 
		amount: 0, 
		healAmount: 40, 
		pathToPicture: "images/fChicken.jpeg"
	});
	
	var item_fh = new FoodItem ({
		id: "item_fh",
		name: "Human meat", 
		price: 20, 
		amount: 0, 
		healAmount: 50, 
		pathToPicture: "images/fHumanMeat.png"
	});
	
	var item_fw = new FoodItem ({
		id: "item_fw",
		name: "Wolf meat", 
		price: $("#item_fw").text(), 
		amount: 0, 
		healAmount: 70, 
		pathToPicture: "images/fWolfmeat.jpeg"
	});
	
	var item_fbe = new FoodItem ({
		id: "item_fbe",
		name: "Bear meat", 
		price: $("#item_fbe").text(), 
		amount: 0, 
		healAmount: 120, 
		pathToPicture: "images/fBearmeat.png"
	});
	
	var item_wk = new WeaponItem ({
		id: "item_wk",
		name: "Knife",
		price: $("#item_wk").text(),
		amount: 0,
		attackAmount: 5,
		handsNeeded: 1,
		ammunition: "",
		pathToPicture: "images/wKnife.png"
	});
	
	var item_wd = new WeaponItem ({
		id: "item_wd",
		name: "Dagger",
		price: $("#item_wd").text(),
		amount: 0,
		attackAmount: 10,
		handsNeeded: 1,
		ammunition: "",
		pathToPicture: "images/wDagger.png"
	});
	
	var item_ws = new WeaponItem ({
		id: "item_ws",
		name: "Scimitar",
		price: $("#item_ws").text(),
		amount: 0,
		attackAmount: 20,
		handsNeeded: 1,
		ammunition: "",
		pathToPicture: "images/wScimitar.png"
	});
	
	var item_wr = new WeaponItem ({
		id: "item_wr",
		name: "Rifle",
		price: $("#item_wr").text(),
		amount: 0,
		attackAmount: 50,
		handsNeeded: 2,
		ammunition: "Ammo",
		pathToPicture: "images/wRifle.jpeg"
	});
	
	var item_wc = new WeaponItem ({
		id: "item_wc",
		name: "Crossbow",
		price: $("#item_wc").text(),
		amount: 0,
		attackAmount: 30,
		handsNeeded: 2,
		ammunition: "Arrow",
		pathToPicture: "images/wCrossbow.png"
	});
	
	var item_wam = new AmmunitionItem ({
		id: "item_wam",
		name: "Ammo",
		price: $("#item_wam").text(),
		amount: 0,
		pathToPicture: "images/ammo.jpeg"
	});
	
	var item_war = new AmmunitionItem ({
		id: "item_war",
		name: "Arrow",
		price: $("#item_war").text(),
		amount: 0,
		pathToPicture: "images/arrow.jpeg"
	});
	
	var item_ah = new ArmorItem ({
		id: "item_ah",
		name: "Helmet",
		price: 40,
		amount: 0,
		armorAmount: 10,
		armorSlot: "head",
		handsNeeded: 0,
		pathToPicture: "images/aHelmet.jpeg"
	});
	
	var item_ac = new ArmorItem ({
		id: "item_ac",
		name: "Chainbody",
		price: 80,
		amount: 0,
		armorAmount: 15,
		armorSlot: "torso",
		handsNeeded: 0,
		pathToPicture: "images/aChainbody.jpeg"
	});
	
	var item_ap = new ArmorItem ({
		id: "item_ap",
		name: "Platebody",
		price: 350,
		amount: 0,
		armorAmount: 50,
		armorSlot: "torso",
		handsNeeded: 0,
		pathToPicture: "images/aPlatebody.jpeg"
	});
	
	var item_al = new ArmorItem ({
		id: "item_al",
		name: "Platelegs",
		price: 120,
		amount: 0,
		armorAmount: 20,
		armorSlot: "legs",
		handsNeeded: 0,
		pathToPicture: "images/aPlatelegs.jpeg"
	});
	
	var item_ag = new ArmorItem ({
		id: "item_ag",
		name: "Gloves",
		price: 20,
		amount: 0,
		armorAmount: 5,
		armorSlot: "hand",
		handsNeeded: 0,
		pathToPicture: "images/aGloves.jpeg"
	});
	
	var item_as = new ArmorItem ({
		id: "item_as",
		name: "Shield",
		price: 120,
		amount: 0,
		armorAmount: 25,
		armorSlot: "weapon",
		handsNeeded: 1,
		pathToPicture: "images/aShield.jpeg"
	});
	
	var item_ab = new ArmorItem ({
		id: "item_ab",
		name: "Boots",
		price: 50,
		amount: 0,
		armorAmount: 5,
		armorSlot: "boots", // TODO if armorSlot boots used -> +50 movement speed.
		handsNeeded: 0,
		pathToPicture: "images/aBoots.png"
	});
	
	var item_pa = new PotionItem ({
		id: "item_pa",
		name: "Attack potion",
		price: 100,
		amount: 0,
		buffAmountMin: -10,
		buffAmountMax: 100,
		buffAttribute: "Attack",
		pathToPicture: "images/pAttack.png"		
	});
	
	var item_pd = new PotionItem ({
		id: "item_pd",
		name: "Defense potion",
		price: 100,
		amount: 0,
		buffAmountMin: -10,
		buffAmountMax: 100,
		buffAttribute: "Defense",
		pathToPicture: "images/pDefense.png"		
	});
	
	var item_ph = new PotionItem ({
		id: "item_ph",
		name: "Hitpoint potion",
		price: 100,
		amount: 0,
		buffAmountMin: -10,
		buffAmountMax: 100,
		buffAttribute: "Hitpoints",
		pathToPicture: "images/pHitpoints.png"		
	});
	
	var item_od = new OtherItem ({
		id: "item_od",
		name: "Donkey",
		price: 250,
		amount: 0,
		movementSpeedChange: 100,
		inventorySizeChange: 0,
		pathToPicture: "images/donkey.jpeg"
	});
	
	var item_oh = new OtherItem ({
		id: "item_oh",
		name: "Horse",
		price: 400,
		amount: 0,
		movementSpeedChange: 200,
		inventorySizeChange: 0,
		pathToPicture: "images/horse.png"
	});
	
	var item_ob = new OtherItem ({
		id: "item_ob",
		name: "Bag",
		price: 50,
		amount: 0,
		movementSpeedChange: 100,
		inventorySizeChange: 0,
		pathToPicture: "images/bag.png"
	});
	
	var item_oc = new OtherItem ({
		id: "item_oc",
		name: "Cart",
		price: 250,
		amount: 0,
		movementSpeedChange: -50,
		inventorySizeChange: 1000,
		pathToPicture: "images/cart.jpeg"
	});
	
	var item_ocw = new OtherItem ({
		id: "item_ocw",
		name: "Cart wheel",
		price: 50,
		amount: 0,
		movementSpeedChange: 0,
		inventorySizeChange: 0,
		pathToPicture: "images/cartWheel.png"
	});
				
	// These variable track the state of this "game"
	var p = new Player({
			name: "get this from username",
			inventory: ["item_dw"],
			days: 0,
			points: 0,
			gold: 1000
		},{
			attack: 10,
			defense: 10,
			hitpoints: 80,
			maxHitpoints: 100,
			thirstyness: 1,
			wanted: 0,
			mood: 8,
			inventorySize: 100,
			speed: 100
		});
	
	// "Redraws" the inventory of the player. Used
	// when items are added or the game is loaded


	/*function updateInventorySize(amount) {
		if (amount < 0) {
			// Check if there is not enough of empty ones.
			for (var i = 0; i < -amount; i++) {
				if ($(".inv-divs-empty").last()) {
					$(".inv-divs-empty").last().remove();
				}
			}
			//$(".inv-divs-empty").last().delete();
		} else {
			for (var i = 0; i < amount; i++) {
				$("#item-list").append("<div class='inv-divs-empty'></div>");
			}
		}
	}*/
	var allItems = [];
	// This makes inventory valid.
	$(".inv-divs-filled").each(function(index, el) {
		updateItems($(this).children('div').attr('class'));
		allItems.push($(this).children('div').attr('class'));
	});
	
	/* Ostettaessa item ekan kerran, luodaan sille luokka. Luokkaa käytetään siihen asti,
		kunnes itemiä ei ole enää inventoryssa. Muulloin tehdään updateItems funktion avulla
	
	*/
	
	function updateItems(item) {
		
		var visibleInventory = [];
		$(".inv-divs-filled").each(function(index, el) {
			// Updates visible inventory
			visibleInventory.push($(this).children('div').attr('class'));
		});
		var item = eval(item);
		if (visibleInventory.indexOf(item.getId()) != -1) {
			// If Id is in the inventory array, change only number
			var el = $(".inv-divs-filled")[visibleInventory.indexOf(item.getId())];
			$(el).children().first().show();
			var elAmount = $(el).find(".invDivsAmount").first();
			elAmount.text(item.getAmount());
			// If number goes to 0. Remove this from inventory array.
			if (item.getAmount()==0) {
				/*$(el).toggleClass('inv-divs-filled inv-divs-empty');
				el.innerHTML = "";*/
				$(el).children().first().hide();
			}
		} else {
			// if not in the inventory
			var el = $(".inv-divs-empty").first();
			el.toggleClass('inv-divs-empty inv-divs-filled');
			el.append('<div class="'+ item.getId() +'"><div class="invDivsImg"></div><button class="invDivsUse">Use</button>' +
				'<div class="invDivsAmount">' + item.getAmount() + '</div>' +
				'<button class="invDivsSell">Sell</button>' +
				'<button class="invDivsDiscard">Discard</button></div>');
			if (!el.find(".inv-logo").length) {
				item.updateImage(el.find(".invDivsImg"));
				// If not image, update image
			}
		}
		console.log(item.getAmount());
	}
	
	function randomizePrices() {
		// Randomizes every item price of the shop.
		$( ".price").each(function(index, item) {
			console.log(this.innerText);
			var multiplier = getRandomFloatBetween(0.8,1.2);
			this.innerText = parseInt(this.innerText*multiplier);
		});
	}
	
	function checkActionsLeft() {
		$("#actionsLeft").text(p.actionsPerTurn);
		if (p.actionsPerTurn == 0) {
			$("#outside-view").hide();
			$("#go-to-town-view").show();
		}
	}
	
	function checkDay() {
		if (p.getDays() > 10) {
			// Checks items and their value -> sells all of them.
			// Money / 10 = 1 point
			// Game ends.		
		}
	}
	
	function endDay() {
		p.updateThirstyness(1);
		p.updateMood(-1);
	}
	
	function heal(amount) {
		p.updateHitpoints(amount);
		$("#hitpoints").text(p.getHitpoints());
		$("#maxHitpoints").text(p.getMaxHitpoints());
	}
	
	function takeDamage(amount) {
		p.updateHitpoints(-amount);
		$("#hitpoints").text(p.getHitpoints());
		$("#maxHitpoints").text(p.getMaxHitpoints());
	}
	
	function reduceThirstiness(amount) {
		p.updateThirstyness(-amount);
		$("#thirstyness").text(p.getThirstyness());
	}
	
	function equipWeapon(attack) {
		p.updateAttack(attack);
	}
	
	function useAmmunition(ammo) {
		eval(ammo).use(1);
	}
	
	function equipArmor(armor) {
		p.updateDefense(armor);
	}
	
	function applyBuff(amount, attribute) {
		if (attribute == "Attack") {
			p.updateAttack(amount);
		} else if (attribute == "Defense") {
			p.updateDefense(amount);
		} else if (attribute == "Hitpoints") {
			p.updateHitpoints(amount);
		} else if (attribute == "MaxHitpoints") {
			p.setMaxHitpoints(p.getMaxHitpoints+amount);
		}
	}
	
	function updateInvSize(amount) {
		p.updateInventorySize(amount);
	}
	
	function updateMovSpeed(amount) {
		p.updateSpeed(amount);
	}
	
	function fight(enemy) {
		var fightTurn = 0;
		while (true) {
			var chanceOfBlock = getRandomIntBetween(-100,p.getDefense());
			if (chanceOfBlock > 10 || enemy.attack - p.getDefense()/10 <= 0) {
				takeDamage(0);
			} else {
				takeDamage(enemy.attack - p.getDefense()/10);
			}
			
			if (p.getHitpoints() <= 0) {
				// Player dies
				p.die();
				break;
			}
			
			var chanceOfEnemyBlock = getRandomIntBetween(-50, enemy.defense);
			if (chanceOfEnemyBlock > 10 || p.getAttack() - enemy.defense/10 <= 0) {
				enemy.hitpoints -= 0;
			} else {
				enemy.hitpoints -= (p.getAttack() - enemy.defense/10);
			}
			
			if (enemy.hitpoints <= 0) {
				// Enemy dies
				var itemAmount = getRandomIntBetween(enemy.dropMin, enemy.dropMax);
				for (var i = 0; i < itemAmount; i++) {
					var item = chooseRandomItem(enemy.dropItems);
					var item = eval(item);
					item.add(1);
					p.addToInventory(item.name, 1);
					updateItems(item);
				}
				p.updateGold(getRandomIntBetween(enemy.dropGoldMin, enemy.dropGoldMax));
				break;
			}
			
			fightTurn++;
			console.log("Player hp: ", p.getHitpoints(), " ,Enemy hp: ", enemy.hitpoints, " ,Turn: ", fightTurn);
			
			if (fightTurn > 20) {
				// Stop fight, nobody dies
				break;
			}
		}
	}

	// Add items to inventory
	// Adds an item to the players inventory
	$("#add-water-dirty").click( function () {
		if (p.updateGold(- parseInt($("#item_dw").text()))) {

			p.addToInventory("item_dw", 1);
			item_dw.add(1);
		}
		console.log(item_dw);
		updateItems(item_dw);
	});
	
	$("#add-water-normal").click( function () {
		if (p.updateGold(- parseInt($("#item_nw").text()))) {
			
			p.addToInventory("A water", 1);
			item_nw.add(1);
		}
		updateItems(item_nw);
	});
	
	$("#add-water-holy").click( function () {
		if (p.updateGold(- parseInt($("#item_hw").text()))) {

			p.addToInventory("A holy water", 1);
			item_hw.add(1);
		}
		updateItems(item_hw);
	});
	
	$("#add-food-berries").click( function () {
		if (p.updateGold(- parseInt($("#item_fb").text()))) {

			p.addToInventory("Berries", 1);
			item_fb.add(1);
		}
		updateItems(item_fb);
	});
	
	$("#add-food-vegetables").click( function () {
		if (p.updateGold(- parseInt($("#item_fv").text()))) {

			p.addToInventory("Vegetables", 1);
			item_fv.add(1);
		}
		updateItems(item_fv);
	});
	
	$("#add-food-ratmeat").click( function () {
		if (p.updateGold(- parseInt($("#item_fr").text()))) {

			p.addToInventory("Rat meat", 1);
			item_fr.add(1);
		}
		updateItems(item_fr);
	});
	
	$("#add-food-chicken").click( function () {
		if (p.updateGold(- parseInt($("#item_fc").text()))) {

			p.addToInventory("A chicken", 1);
			item_fc.add(1);
		}
		updateItems(item_fc);
	});
	
	$("#add-food-wolfmeat").click( function () {
		if (p.updateGold(- parseInt($("#item_fw").text()))) {

			p.addToInventory("Wolf meat", 1);
			item_fw.add(1);
		}
		updateItems(item_fw);
	});
	
	$("#add-food-bearmeat").click( function () {
		if (p.updateGold(- parseInt($("#item_fbe").text()))) {

			p.addToInventory("Bear meat", 1);
			item_fbe.add(1);
		}
		updateItems(item_fbe);
	});
	
	$("#add-weapon-knife").click( function () {
		if (p.updateGold(- parseInt($("#item_wk").text()))) {

			p.addToInventory("A knife", 1);
			item_wk.add(1);
		}
		updateItems(item_wk);
	});
	
	$("#add-weapon-dagger").click( function () {
		if (p.updateGold(- parseInt($("#item_wd").text()))) {

			p.addToInventory("A dagger", 1);
			item_wd.add(1);
		}
		updateItems(item_wd);
	});
	
	$("#add-weapon-scimitar").click( function () {
		if (p.updateGold(- parseInt($("#item_ws").text()))) {

			p.addToInventory("A scimitar", 1);
			item_ws.add(1);
		}
		updateItems(item_ws);
	});
	
	$("#add-weapon-crossbow").click( function () {
		if (p.updateGold(- parseInt($("#item_wc").text()))) {

			p.addToInventory("A crossbow", 1);
			item_wc.add(1);
		}
		updateItems(item_wc);
	});
	
	$("#add-weapon-rifle").click( function () {
		if (p.updateGold(- parseInt($("#item_wr").text()))) {

			p.addToInventory("A rifle", 1);
			item_wr.add(1);
		}
		updateItems(item_wr);
	});
	
	$("#add-ammunition-ammo").click( function () {
		if (p.updateGold(- parseInt($("#item_wam").text()))) {

			p.addToInventory("Ammo", 10);
			item_wam.add(10);
		}
		updateItems(item_wam);
	});
	
	$("#add-ammunition-arrow").click( function () {
		if (p.updateGold(- parseInt($("#item_war").text()))) {

			p.addToInventory("Arrow", 10);
			item_war.add(10);
		}
		updateItems(item_war);
	});
	
	$("#add-armor-helmet").click( function () {
		if (p.updateGold(- parseInt($("#item_ah").text()))) {

			p.addToInventory("A helmet", 1);
			item_ah.add(1);
		}
		updateItems(item_ah);
	});
	
	$("#add-armor-chainbody").click( function () {
		if (p.updateGold(- parseInt($("#item_ac").text()))) {

			p.addToInventory("Chainbody", 1);
			item_ac.add(1);
		}
		updateItems(item_ac);
	});
	
	$("#add-armor-platebody").click( function () {
		if (p.updateGold(- parseInt($("#item_ap").text()))) {

			p.addToInventory("Platebody", 1);
			item_ap.add(1);
		}
		updateItems(item_ap);
	});
	
	$("#add-armor-gloves").click( function () {
		if (p.updateGold(- parseInt($("#item_ag").text()))) {

			p.addToInventory("Gloves", 1);
			item_ag.add(1);
		}
		updateItems(item_ag);
	});
	
	$("#add-armor-shield").click( function () {
		if (p.updateGold(- parseInt($("#item_as").text()))) {

			p.addToInventory("Shield", 1);
			item_as.add(1);
		}
		updateItems(item_as);
	});
	
	$("#add-armor-platelegs").click( function () {
		if (p.updateGold(- parseInt($("#item_al").text()))) {

			p.addToInventory("Platelegs", 1);
			item_al.add(1);
		}
		updateItems(item_al);
	});
	
	$("#add-armor-boots").click( function () {
		if (p.updateGold(- parseInt($("#item_ab").text()))) {

			p.addToInventory("Boots", 1);
			item_ab.add(1);
		}
		updateItems(item_ab);
	});
	
	$("#add-potion-attack").click( function () {
		if (p.updateGold(- parseInt($("#item_pa").text()))) {

			p.addToInventory("Attack potion", 1);
			item_pa.add(1);
		}
		updateItems(item_pa);
	});
	
	$("#add-potion-defense").click( function () {
		if (p.updateGold(- parseInt($("#item_pd").text()))) {

			p.addToInventory("Defense potion", 1);
			item_pd.add(1);
		}
		updateItems(item_pd);
	});
	
	$("#add-potion-hitpoints").click( function () {
		if (p.updateGold(- parseInt($("#item_ph").text()))) {

			p.addToInventory("Hitpoint potion", 1);
			item_ph.add(1);
		}
		updateItems(item_ph);
	});
	
	$("#add-other-donkey").click( function () {
		if (p.updateGold(- parseInt($("#item_od").text()))) {

			p.addToInventory("Donkey", 1);
			item_od.add(1);
		}
		updateItems(item_od);
	});
	
	$("#add-other-horse").click( function () {
		if (p.updateGold(- parseInt($("#item_oh").text()))) {

			p.addToInventory("Horse", 1);
			item_oh.add(1);
		}
		updateItems(item_oh);
	});
	
	$("#add-other-bag").click( function () {
		if (p.updateGold(- parseInt($("#item_ob").text()))) {

			p.addToInventory("Bag", 1);
			item_ob.add(1);
		}
		updateItems(item_ob);
	});
	
	$("#add-other-cart").click( function () {
		if (p.updateGold(- parseInt($("#item_oc").text()))) {

			p.addToInventory("Cart", 1);
			item_oc.add(1);
		}
		updateItems(item_oc);
	});
	
	$("#add-other-cartwheel").click( function () {
		if (p.updateGold(- parseInt($("#item_ocw").text()))) {

			p.addToInventory("Cart wheel", 1);
			item_ocw.add(1);
		}
		updateItems(item_ocw);
	});
	
	// Inventory buttons
	$(".invDivsUse").on("click", function(event) {
		console.log("Use");
		var item = eval(this.parentNode.className);
		console.log(item);
		item.use(1);
		updateItems(item);
		// TODO Should remove item from inventory.
		console.log("Used item: ", item);
	});
	
	$(".invDivsSell").on("click", function(event) {
		console.log("Sell");
		var item = eval(this.parentNode.className);
		console.log(item);
		item.add(-1);
		console.log($('#'+item.getId()).text());
		p.updateGold(parseInt($('#'+item.getId()).text()));
		updateItems(item);
		console.log("Sold item: ", item);
	});
	
	$(".invDivsDiscard").on("click", function(event) {
		console.log("Discard");
		console.log(this);
		updateItems(item_dw);
		console.log("Updated items");
	});
	
	// Shop button Bribe
	$("#bribe").on("click", function(event) {
		console.log("Bribe");
		console.log(this);
		var wanted = p.getWanted();
		for (var i = 0; i < wanted; i++) {
			if (p.getGold() - 10*(i+1) > 0) {
				p.updateGold(-10*(i+1));
				p.updateWanted(-1);
			}
		}
		$("#gold").text(p.getGold());
		$("#wanted").text(p.getWanted());
	});
	
	// Outside town buttons
	$("#action-rest").on("click", function(event) {
		heal(2);
		p.actionsPerTurn -= 1;
		checkActionsLeft();
	});
	
	$("#action-hunt").on("click", function(event) {
		var chance = getRandomIntBetween(0,100);
		if (chance < 80) {
			var animal = chooseRandomItem(["Rat", "Chicken", "Wolf", "Bear"]);
			if (animal == "Rat") {
				var enemy = new Enemy ({
					name: animal,
					dropItems: ["item_dw", "item_fr", "item_fb", "item_fv"],
					dropMin: 1,
					dropMax: 3,
					dropGoldMin: 0,
					dropGoldMax: 5
				},{
					attack: 5,
					defense: 5,
					hitpoints: 15
				});
			} else if (animal == "Chicken") {
				var enemy = new Enemy ({
					name: animal,
					dropItems: ["item_nw", "item_fc", "item_fb", "item_fv"],
					dropMin: 1,
					dropMax: 3,
					dropGoldMin: 0,
					dropGoldMax: 10
				},{
					attack: 3,
					defense: 10,
					hitpoints: 35
				});
			} else if (animal == "Wolf") {
				var enemy = new Enemy ({
					name: animal,
					dropItems: ["item_nw", "item_hw", "item_fw", "item_ws"],
					dropMin: 1,
					dropMax: 8,
					dropGoldMin: 20,
					dropGoldMax: 150
				},{
					attack: 20,
					defense: 25,
					hitpoints: 45
				});
			} else if (animal == "Bear") {
				var enemy = new Enemy ({
					name: animal,
					dropItems: ["item_hw", "item_fb", "item_wr", "item_wc", "item_ap", "item_al"],
					dropMin: 3,
					dropMax: 10,
					dropGoldMin: 30,
					dropGoldMax: 300
				},{
					attack: 50,
					defense: 50,
					hitpoints: 150
				});
			}
			fight(enemy);
		}
		p.actionsPerTurn -= 1;
		checkActionsLeft();
	});
	
	$("#action-steal").on("click", function(event) {
		var successRate = getRandomIntBetween(0,100);
		if (successRate > 50) {
			p.updateGold(getRandomIntBetween(0,20));
			p.updateWanted(getRandomIntBetween(0,2));
			var itemAmount = getRandomIntBetween(1,3);
			for (var i = 0; i < itemAmount; i++) {
				var item = chooseRandomItem(allItems);
				var item = eval(item);
				item.add(1);
				p.addToInventory(item.name, 1);
				updateItems(item);
			}
		}
		p.actionsPerTurn -= 1;
		checkActionsLeft();
	});
	
	$("#action-search").on("click", function(event) {
		var chance = getRandomIntBetween(0,100);
		if (chance > 50) {
			console.log("Found nothing");
		} else if (chance > 45) {
			console.log("Found dead body");
			var itemAmount = getRandomIntBetween(1,5);
			for (var i = 0; i < itemAmount; i++) {
				var item = chooseRandomItem(allItems);
				var item = eval(item);
				item.add(1);
				p.addToInventory(item.name, 1);
				updateItems(item);
			}
		} else if (chance > 20) {
			console.log("Found something to eat");
			var itemAmount = getRandomIntBetween(1,5);
			for (var i = 0; i < itemAmount; i++) {
				var item = chooseRandomItem([item_fb, item_fv]);
				var item = eval(item);
				item.add(1);
				p.addToInventory(item.name, 1);
				updateItems(item);
			}
		} else {
			console.log("Found enemy");
			var enemy = new Enemy ({
				name: "Enemy",
				dropItems: allItems,
				dropMin: 1,
				dropMax: getRandomIntBetween(2,6),
				dropGoldMin: 0,
				dropGoldMax: getRandomIntBetween(10,300),
			},{
				attack: getRandomIntBetween(3,30),
				defense: getRandomIntBetween(5,30),
				hitpoints: getRandomIntBetween(10,300),
			});
			fight(enemy);
		}
		p.actionsPerTurn -= 1;
		checkActionsLeft();
		
	});
	
	$("#action-play").on("click", function(event) {
		takeDamage(2);
		p.updateMood(1);
		$("#mood").text(p.getMood());
		p.actionsPerTurn -= 1;
		checkActionsLeft();
	});
	
	$("#action-speak").on("click", function(event) {
		var chance = getRandomIntBetween(0,100);
		if (chance %2 == 0) {
			console.log("Stranger hands you some items.")
			var itemAmount = getRandomIntBetween(1,3);
			for (var i = 0; i < itemAmount; i++) {
				var item = chooseRandomItem(allItems);
				var item = eval(item);
				item.add(1);
				p.addToInventory(item.name, 1);
				updateItems(item);
			}
			p.updateMood(1);
		}
		if (chance > 80) {
			console.log("Some attack buff");
			p.updateAttack(getRandomIntBetween(-p.getAttack()+1,30));
		} else if (chance > 60) {
			console.log("Some defense buff");
			p.updateDefense(getRandomIntBetween(-p.getDefense()+1,30));
		} else if (chance > 10) {
			console.log("Just speaking");
			p.updateMood(getRandomIntBetween(-1,2));
		} else {
			console.log("Holy spirit");
			p.setMaxHitpoints(200);
			p.updateHitpoints(100);
		}
		p.actionsPerTurn -= 1;
		checkActionsLeft();
	});
	
	$("#action-skip").on("click", function(event) {
		p.actionsPerTurn -= 1;
		checkActionsLeft();
	});
	
	// Navigation functions
	
	$("#leave-shop").click( function () {
		$("#shop-view").hide();
		$("#outside-view").show();
		$(".invDivsSell").hide();
		$(".invDivsDiscard").show();
		p.nextDay();		
	});
	
	$("#yesToTown").click( function () {
		$("#go-to-town-view").hide();
		$("#shop-view").show();
		$(".invDivsDiscard").hide();
		$(".invDivsSell").show();
		randomizePrices();
	});
	
	$("#noToTown").click( function () {
		$("#go-to-town-view").hide();
		$("#outside-view").show();
		p.nextDay();
	});
	
	$("#action-skip-all").click( function () {
		$("#outside-view").hide();
		$("#go-to-town-view").show();
	});
	
	// Originally from test game TUT course TIE-23500, little changes made
	// Simulates "game over" when a score would be sent
	$("#submit-score").click( function () {
		var msg = {
			"messageType": "SCORE",
			"score": parseFloat($("#score").text())
		};
		console.log("Submitted points: ", msg.score);
		window.parent.postMessage(msg, "*");
	});

	// Sends this game's state to the service.
	// The format of the game state is decided by the game
	$("#save").click( function () {
		var msg = {
			"messageType": "SAVE",
			"gameState": {
				"playerItems": p.getInventory(),
				"score": parseFloat($("#score").text()),
				"days": parseInt($("#days").text()),
				"gold": parseInt($("#gold").text())
			}
		};
		console.log("Saved data: ", msg);
		window.parent.postMessage(msg, "*");
	});

	// Sends a request to the service for a
	// state to be sent, if there is one.
	$("#load").click( function () {
		var msg = {
			"messageType": "LOAD_REQUEST",
		};
		console.log("Trying to load...");
		window.parent.postMessage(msg, "*");
	});

	// Listen incoming messages, if the messageType
	// is LOAD then the game state will be loaded.
	// Note that no checking is done, whether the
	// gameState in the incoming message contains
	// correct information.
	//
	// Also handles any errors that the service
	// wants to send (displays them as an alert).
	window.addEventListener("message", function(evt) {
		if(evt.data.messageType === "LOAD") {
			playerItems = evt.data.gameState.playerItems;
			points = evt.data.gameState.score;
			days = evt.data.gameState.days;
			gold = evt.data.gameState.gold;
			
			/*$("#score").text(points);
			$("#days").text(days);
			$("#gold").text(gold);*/
			/*p.inventory = [];
			p.inventory = evt.data.playerItems;
			$("#score").text(p.getPoints());
			$("#days").text(p.getDays());
			$("#gold").text(p.getGold());*/
			console.log("Loaded");
			console.log(p);
			updateItems("all");
		} else if (evt.data.messageType === "ERROR") {
			alert(evt.data.info);
		}
	});
	
	// Request the service to set the resolution of the iframe correspondingly
	var message =  {
		messageType: "SETTING",
		options: {
			"width": 700, //Integer
			"height": 300 //Integer
		}
	};
	window.parent.postMessage(message, "*");

});