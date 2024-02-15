const cron = require("cron");
const { exec } = require("child_process");

function executeCron(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Command STDERR: ${stderr}`);
      return;
    }
    console.log(`Command output: ${stdout}`);
  });
}

const cronJob = new cron.CronJob("28 3 * * 1-5", () => {
  console.log("Starting cronJob...");
  executeCron("pm2 start 0");
});

const cronJob1 = new cron.CronJob("10 12 * * 1-5", () => {
  console.log("Stopping cronJob1...");
  executeCron("pm2 stop 0");
});

const cronJob2 = new cron.CronJob("28 17 * * 1-5", () => {
  console.log("Starting cronJob2...");
  executeCron("pm2 start 0");
});

const cronJob3 = new cron.CronJob("40 17 * * 1-5", () => {
  console.log("Stopping cronJob3...");
  executeCron("pm2 stop 0");
});

// Start the cron job
cronJob.start();
cronJob1.start();
cronJob2.start();
cronJob3.start();
console.log("Cron job scheduled.");
