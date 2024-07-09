import workspaces from "./components/workspaces.js"
import { Clock } from "./components/clock.js"
import { sysbutton } from "./components/sysbutton.js"

function Top() {
	return Widget.Box({
		name: "Top Bar Box",
		class_name: "bar_start",
		vertical: true,
		children: [
			Clock
		],
	})
}

function Middle() {
	return Widget.Box({
		name: "Middle Bar Box",
		class_name: "bar_middle",
		vertical: true,
		children: [
			workspaces()
		],
	})
}

function Bottom() {
	return Widget.Box({
		name: "Bottom Bar Box",
		class_name: "bar_end",
		vertical: true,
		children: [
			sysbutton
		],
	})
}

const Bar = Widget.Window({
	name: `bar`, // name has to be unique
	class_name: "bar",
	anchor: ["left"],
	exclusivity: "exclusive",
	child: Widget.CenterBox({
		name: "bar Box",
		vertical: true,
		spacing: 20,
		hpack: "center",
		start_widget: Top(),
		center_widget: Middle(),
		end_widget: Bottom(),
	}),
})

export { Bar }
