const nodemailer = require('nodemailer');

async function testAuth(user, pass) {
  console.log(`Testing auth with user: ${user}`);
  const transporter = nodemailer.createTransport({
    host: 'send.smtp.dev',
    port: 587,
    secure: false,
    auth: {
      user: user,
      pass: pass,
    },
    connectionTimeout: 5000,
  });

  try {
    await transporter.verify();
    console.log(`Success with user: ${user}`);
  } catch (err) {
    console.error(`Failed with user: ${user} ->`, err.message);
  }
}

async function run() {
  const apiKey = 'smtplabs_FtHibX4UcTXdhown7VGR1LCUKGuxaKc5mcMgQNS1VUahMNLs';
  await testAuth('mail@rakibutsho.dev', apiKey);
  await testAuth('api', apiKey);
  await testAuth('apikey', apiKey);
  await testAuth(apiKey, apiKey);
}

run();
