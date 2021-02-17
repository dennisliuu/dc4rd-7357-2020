const calculateNextResetTime = windowMs => {
	const d = new Date()
	d.setMilliseconds(d.getMilliseconds() + windowMs)
	return d;
}

function MemoryStore(windowMs) {
	let hits = {};
	let resetTime = calculateNextResetTime(windowMs);

	this.incr = function (key, cb) {
		if (hits[key]) {
			hits[key]++;
		} else {
			hits[key] = 1;
		}

		cb(null, hits[key], resetTime);
	};

	this.resetAll = function () {
		hits = {};
		resetTime = calculateNextResetTime(windowMs);
	};

	this.resetKey = function (key) {
		delete hits[key];
	};

	const interval = setInterval(this.resetAll, windowMs);
	if (interval.unref) {
		interval.unref();
	}
}

module.exports = MemoryStore;
