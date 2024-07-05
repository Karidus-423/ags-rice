const date = Variable("", {
	poll: [1000, 'date "+%H:%M\n%b %e."'],
})

const Clock = Widget.Label({
	class_name: "clock",
	label: date.bind(),
})

export { Clock }
