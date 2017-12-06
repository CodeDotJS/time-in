#!/usr/bin/env node

'use strict';

// Three letters - total illuminati

const dns = require('dns');
const got = require('got');
const ora = require('ora');
const lup = require('log-update');
const chk = require('chalk');
const upn = require('update-notifier');
const pkg = require('./package.json');

upn({pkg}).notify();

const arg = process.argv[2];
const end = process.exit;
const spn = ora();
const rad = chk.red('✖');

dns.lookup('time.is', err => {
	if (err) {
		lup(`\n ${rad} You're offline! \n`);
		end(1);
	} else {
		lup();
		spn.text = `Tracking...`;
		spn.start();
	}
});

if (!arg || arg === '-h') {
	lup(`
 Usage: time-in <place>

 Help :
  $ time-in Delhi
  $ time-in Barcelona, Caraga
  $ time-in Norte de Santander, Colombia

 ${chk.dim('Time Format : 24 hour clock')}
  `);
	end(1);
}

for (let i = 2; i < process.argv.length; i++) {
	const url = 'https://time.is/?q=+' + process.argv.splice(2, process.argv.length - 1).join('_');
	got(url).then(res => {
		const base = res.body;
		const time = base.split('<div id="twd">')[1].split('</div>')[0];
		lup(`\n\n ${chk.yellow('⚡⚡')} Time in ${arg.split(',')[0]} ${chk.keyword('orange')(time)} \n\n`);
		spn.stop();
	}).catch(err => {
		if (err) {
			lup(`\n ${rad} This place isn't on the Earth!\n\n ${chk.cyan('✔')} Contact Aliens! \n`);
			end(1);
		}
	});
}
