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