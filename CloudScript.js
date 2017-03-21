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

		tracker = JSON.parse(GetUserReadOnlyDataResponse.Data["CheckInTracker"].Value);

		log.info("tracker");
		log.info(tracker);

		log.info("get field by .");
		log.info(tracker.LoginStreak);
		log.info(tracker.NextEligibleGrant);

		log.info("get field by []");
		log.info(tracker["LoginStreak"]);
		log.info(tracker["NextEligibleGrant"]);

		log.info("end tracker");

	} else {

		tracker = ResetTracker();

		log.info("tracker");
		log.info(tracker);

		log.info("get field by .");
		log.info(tracker.LoginStreak);
		log.info(tracker.NextEligibleGrant);

		log.info("get field by []");
		log.info(tracker["LoginStreak"]);
		log.info(tracker["NextEligibleGrant"]);

		log.info("end tracker");
		
		UpdateTrackerData(tracker);
	}

	return result;

	function ResetTracker() {
		var reset = {};

		reset[TRACKER_LOGIN_STREAK] = 1;

		var dateObj = new Date(Date.now());
		dateObj.setDate(dateObj.getDate() + 1); // add one day 

		reset[TRACKER_NEXT_GRANT] = dateObj.getTime();
		return JSON.stringify(reset);
	}

	function UpdateTrackerData(data) {
		var UpdateUserReadOnlyDataRequest = {
			"PlayFabId": currentPlayerId,
			"Data": {}
		};
		UpdateUserReadOnlyDataRequest.Data[CHECK_IN_TRACKER] = JSON.stringify(data);

		server.UpdateUserReadOnlyData(UpdateUserReadOnlyDataRequest);
	}
}