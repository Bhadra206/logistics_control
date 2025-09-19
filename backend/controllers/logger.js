const { createLogger, transports, format } = require("winston");

const onlyLevel = (level) =>
  format((info) => (info.level === level ? info : false))();

const eventLogger = createLogger({
  transports: [
    new transports.File({
      filename: "event.log",
      format: format.combine(
        format.timestamp(),
        onlyLevel("info"),
        format.json()
      ),
    }),
    new transports.File({
      filename: "eventError.log",
      format: format.combine(
        format.timestamp(),
        onlyLevel("error"),
        format.json()
      ),
    }),
  ],
});

module.exports = { eventLogger };
