const path = require("path");

require("dotenv").config();

module.exports = (name) => path.join(process.env["ATTACHMENTS_PATH"], name);
