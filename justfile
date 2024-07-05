test:
	ags -c ~/personal/ags/config.js -b test
kill:
	ags -b test -q

refresh:
	ags -c ~/personal/ags/config.js -b test -q
	ags -b test
inspect:
	ags -b test -i
