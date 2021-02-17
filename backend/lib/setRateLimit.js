const MemoryStore = require("./storeMemory");

const RateLimit = (options) => {
	options = Object.assign(
		{
			windowMs: 60 * 60 * 60 * 1000, // 1 hr in ms
			max: 1000, // max number of recent connections
			statusCode: 429, // 429 status
			keyGenerator: function (req /*, res*/) {
				return req.ip;
			},
			skip: function (/*req, res*/) {
				return false;
			},
			handler: function (req, res /*, next*/) {
				res.status(options.statusCode).send(options.message);
			}
		},
		options
	);

	options.store = new MemoryStore(options.windowMs);

	function rateLimit(req, res, next) {
		Promise.resolve(options.skip(req, res))
			.then((skip) => {
				if (skip) {
					return next();
				}

				const key = req.ip

				options.store.incr(key, function (err, current, resetTime) {
					if (err) {
						return next(err);
					}

					const maxResult =
						typeof options.max === "function"
							? options.max(req, res)
							: options.max;

					Promise.resolve(maxResult)
						.then((max) => {
							req.rateLimit = {
								limit: max,
								current: current,
								remaining: Math.max(max - current, 0),
								resetTime: resetTime,
							};

							if (!res.headersSent) {
								res.setHeader("X-RateLimit-Limit", max);
								res.setHeader(
									"X-RateLimit-Remaining",
									req.rateLimit.remaining
								);
								if (resetTime instanceof Date) {
									// if we have a resetTime, also provide the current date to help avoid issues with incorrect clocks
									res.setHeader(
										"Date",
										new Date().toUTCString()
									);
									res.setHeader(
										"X-RateLimit-Reset",
										Math.ceil(resetTime.getTime() / 1000)
									);
								}
							}
							if (!res.headersSent) {
								res.setHeader("RateLimit-Limit", max);
								res.setHeader(
									"RateLimit-Remaining",
									req.rateLimit.remaining
								);
								if (resetTime) {
									const deltaSeconds = Math.ceil(
										(resetTime.getTime() - Date.now()) /
											1000
									);
									res.setHeader(
										"RateLimit-Reset",
										Math.max(0, deltaSeconds)
									);
								}
							}

							if (max && current > max) {
								if (!res.headersSent) {
									res.setHeader(
										"Retry-After",
										Math.ceil(options.windowMs / 1000)
									);
								}
								return options.handler(req, res, next);
							}

							next();

							return null;
						})
						.catch(next);
				});

				return null;
			})
			.catch(next);
	}

	rateLimit.resetKey = options.store.resetKey.bind(options.store);
	rateLimit.resetIp = rateLimit.resetKey;

	return rateLimit;
};

module.exports = RateLimit;
