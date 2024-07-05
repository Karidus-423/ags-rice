test:
	ags -c ~/personal/ags/config.js -b test
kill:
	ags -c ~/personal/ags/config.js -b test -q

refresh:
	ags -c ~/personal/ags/config.js -b test -q
	ags -c ~/personal/ags/config.js -b test

inspect:
	ags -c ~/personal/ags/config.js -b test -i
