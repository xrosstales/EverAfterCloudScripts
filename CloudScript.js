handlers.HelloWorld = function(args) {
	var result = {};
	result.message = "hello world";
	return result;
}

handlers.TestJsObject = function(args) {

	var result = {};
	var tracker = JSON.parse("{\"LoginStreak\":1,\"NextEligibleGrant\":1490090129539}");

	log.info("tracker");
	log.info(tracker);

	log.info("get field by .");
	log.info(tracker.LoginStreak);
	log.info(tracker.NextEligibleGrant);

	log.info("get field by []");
	log.info(tracker["LoginStreak"]);
	log.info(tracker["NextEligibleGrant"]);

	log.info("end tracker");

	return result;
}

handlers.TestJsObjectTwo = function(args) {

	var result = {};

	var GetUserReadOnlyDataRequest = {
		"PlayFabId": currentPlayerId,
		"Keys": ["CheckInTracker"]
	};
	var GetUserReadOnlyDataResponse = server.GetUserReadOnlyData(GetUserReadOnlyDataRequest);

	var tracker = {};
	if (GetUserReadOnlyDataResponse.Data.hasOwnProperty("CheckInTracker")) {

		tracker = JSON.parse(JSON.stringify(GetUserReadOnlyDataResponse.Data["CheckInTracker"].Value));

		log.info("tracker");
		log.info(tracker);

		log.info("get field by .");
		log.info(tracker.LoginStreak);
		log.info(tracker.NextEligibleGrant);

		log.info("get field by []");
		log.info(tracker["LoginStreak"]);
		log.info(tracker["NextEligibleGrant"]);

		log.info("end tracker");

	}

	return result;
}