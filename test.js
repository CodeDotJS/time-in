import childProcess from 'child_process';
import test from 'ava';

test.cb(t => {
	const cp = childProcess.spawn('./cli.js', {stdio: 'inherit'});

	cp.on('error', t.ifError);

	cp.on('close', code => {
		t.is(code, 1);
		t.end();
	});
});

test.cb('time', t => {
	const cp = childProcess.spawn('./cli.js', ['Gorakhpur, Uttar Pradesh, India'], {stdio: 'inherit'});

	cp.on('error', t.ifError);

	cp.on('close', code => {
		t.is(code, 0);
		t.end();
	});
});
