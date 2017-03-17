// defining these up top so we can easily change these later if we need to.
var CHANCE_TO_DIE = 0.3333; // % chance to lose a life during battle, this could also be set in TitleData
var GEM_MAX = 20; // maximum limit on the gold that can be found, this could also be set in TitleData
var GEM_MIN = 10; // maximum limit on the gold that can be found, this could also be set in TitleData
var LIVES_CURRENCY_CODE = "LV"; // currecny code for our Lives VC
var GEMS_CURRENCY_CODE = "GM"; // currency code for our Gems VC

handlers.Battle = function(args) {
	// get the calling player's inventory and VC balances
	var GetUserInventoryRequest = {
		"PlayFabId": currentPlayerId
	};

	var GetUserInventoryResult = server.GetUserInventory(GetUserInventoryRequest);
	var userInventory = GetUserInventoryResult.Inventory;
	var userVcBalances = GetUserInventoryResult.VirtualCurrency;
	var userVcRecharge = GetUserInventoryResult.VirtualCurrencyRechargeTimes;

	// make sure the player has > 0 lives before proceeding. 
	try {
		if (!CheckLives(userVcBalances)) {
			throw "No lives remaining. Purchase additional lives or wait: " + userVcRecharge[LIVES_CURRENCY_CODE].SecondsToRecharge + " seconds.";
		}
	} catch (ex) {
		return JSON.stringify(ex);
	}


	// calculate the battle using our 'global' params...
	var gemsFound = Math.floor(Math.random() * (GEM_MAX - GEM_MIN + 1) + GEM_MIN);
	AddVc(userVcBalances, GEMS_CURRENCY_CODE, gemsFound);
	log.info("You found " + gemsFound + " gems.");

	var rollOfFate = Math.floor(Math.random() * (10 - 1 + 1) + 1);
	var lostALife = rollOfFate <= Math.floor(10 * CHANCE_TO_DIE) ? true : false;

	if (lostALife) {
		SubtractVc(userVcBalances, LIVES_CURRENCY_CODE, 1);
		log.info("You lost a life.");
	}

	var battleResults = {};
	battleResults.gemsFound = gemsFound;
	battleResults.lostALife = lostALife;

	return JSON.stringify(battleResults);
};


function CheckLives(vcBalnces) {
	if (vcBalnces != null && vcBalnces.hasOwnProperty(LIVES_CURRENCY_CODE) && vcBalnces[LIVES_CURRENCY_CODE] > 0) {
		return true;
	} else {
		return false;
	}
}

function AddVc(vcBalnces, code, qty) {
	if (vcBalnces != null && vcBalnces.hasOwnProperty(code) && vcBalnces[code] > 0) {
		vcBalnces[code] += qty;
	}

	var AddUserVirtualCurrencyRequest = {
		"PlayFabId": currentPlayerId,
		"VirtualCurrency": code,
		"Amount": qty
	};
	var AddUserVirtualCurrencyResult = server.AddUserVirtualCurrency(AddUserVirtualCurrencyRequest);
}

function SubtractVc(vcBalnces, code, qty) {
	if (vcBalnces != null && vcBalnces.hasOwnProperty(code) && vcBalnces[code] > 0) {
		vcBalnces[code] -= qty;
	}

	var SubtractUserVirtualCurrencyRequest = {
		"PlayFabId": currentPlayerId,
		"VirtualCurrency": code,
		"Amount": qty
	};

	var SubtractUserVirtualCurrencyResult = server.SubtractUserVirtualCurrency(SubtractUserVirtualCurrencyRequest);
}