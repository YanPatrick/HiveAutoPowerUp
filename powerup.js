require('dotenv').config();

const fs = require('fs');
const hive = require('@hiveio/hive-js');
const path = require('path');

const username = process.env.HIVE_USERNAME;
const activeKey = process.env.HIVE_ACTIVE_KEY;
const amount = process.env.HIVE_AMOUNT || '1.000';

const now = new Date();
const utcDateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
const logFile = path.join(__dirname, 'powerup_log.txt'); //file path

//grouping operations by date
function log(msg) {
    const now = new Date();
    const timestamp = now.toISOString();
    const dia = String(now.getUTCDate()).padStart(2, '0');
    const mes = String(now.getUTCMonth() + 1).padStart(2, '0');
    const ano = String(now.getUTCFullYear());
    
    // Creates the "log" folder if it does not exist
    const logDir = path.join(__dirname, 'log');
    
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
    
    const logFile = path.join(logDir, `powerup_log_${dia}${mes}${ano}.txt`);
    const fullMsg = `[${timestamp}] ${msg}\n`;

    fs.appendFileSync(logFile, fullMsg);
    
    console.log(fullMsg.trim());
  }

log(`Validating configuration parameters...`);

if (username.trim() === "" || username.trim() === "your_hive_user") {
    log('HIVE_USERNAME field is empty or not set in .env file! Cannot continue!');
    process.exit(1);
}

if (activeKey.trim() === "" || activeKey.trim() === "your_private_key") {
  log('HIVE_ACTIVE_KEY field is empty or not set in .env file! Cannot continue!');
  process.exit(1);
}

if (amount.trim() === "") {
  log('Empty HIVE_AMOUNT field in .env file! Cannot continue!');
  process.exit(1);
}

if (!amount || isNaN(parseFloat(amount))) {
  log('Invalid HIVE_AMOUNT field in .env file! Cannot continue!');
  process.exit(1);
}

log(`Checking Account Power Up Operations ${username}...`);

hive.api.getAccountHistory(username, -1, 1000, (err, result) => {
  if (err) {
    log('Error fetching account history: ' + err);
    process.exit(1);
  }

  const powerUpsHoje = result
    .map((entry) => entry[1])
    .filter((op) => op.op[0] === 'transfer_to_vesting')
    .filter((op) => {
      const timestamp = new Date(op.timestamp);
      const dateUTC = timestamp.toISOString().split('T')[0];
      return dateUTC === utcDateStr && op.op[1].from === username;
    });

  if (powerUpsHoje.length > 0) {
    log(`There is already Power Up today (${utcDateStr} UTC). No action will be taken.`);
    process.exit(0);
  }

  log(`No Power Up found today. Performing ${amount} HIVE Power Up.`);

  const powerUpOp = [
    'transfer_to_vesting',
    {
      from: username,
      to: username,
      amount: `${amount} HIVE`,
    },
  ];

  hive.broadcast.send(
    {
      operations: [powerUpOp],
      extensions: [],
    },
    { active: activeKey },
    function (err, result) {
      if (err) {
        log('Error when doing Power Up: ' + err);
      } else {
        log('Power Up successfully completed!');
      }
    }
  );
});
