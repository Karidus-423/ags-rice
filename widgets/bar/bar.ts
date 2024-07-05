function Top() {
	return Widget.Box({
		spacing: 8,
		children: [
		],
	})
}

function Middle() {
	return Widget.Box({
		spacing: 8,
		children: [
		],
	})
}

function Bottom() {
	return Widget.Box({
		hpack: "end",
		spacing: 8,
		children: [
		],
	})
}

function Bar(monitor = 0) {
	return Widget.Window({
		name: `bar-${monitor}`, // name has to be unique
		class_name: "bar",
		monitor,
		anchor: ["top", "left", "right"],
		exclusivity: "exclusive",
		child: Widget.CenterBox({
			start_widget: Top(),
			center_widget: Middle(),
			end_widget: Bottom(),
		}),
	})
}
