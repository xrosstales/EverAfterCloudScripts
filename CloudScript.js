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

	log.info(".");
	log.info(tracker.LoginStreak);
	log.info(tracker.NextEligibleGrant);

	log.info(".Value");
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

	// need to ensure that our data field exists
	var tracker = {}; // this would be the first login ever (across any title), so we have to make sure our record exists.
	if (GetUserReadOnlyDataResponse.Data.hasOwnProperty("CheckInTracker")) {
		tracker = JSON.parse(GetUserReadOnlyDataResponse.Data["CheckInTracker"].Value);

		log.info("tracker");
		log.info(tracker);

		log.info(".");
		log.info(tracker.LoginStreak);
		log.info(tracker.NextEligibleGrant);

		log.info(".Value");
		log.info(tracker["LoginStreak"]);
		log.info(tracker["NextEligibleGrant"]);

		log.info("end tracker");
	}

	return result;
}