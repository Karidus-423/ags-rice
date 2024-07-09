const audio = await Service.import("audio")
const battery = await Service.import("battery")
const network = await Service.import("network")
const bluetooth = await Service.import("bluetooth")

const batteryProgress = Widget.ProgressBar({
	value: battery.bind('percent').transform(p => p > 0 ? p / 100 : 0),
	vertical: true,
	hexpand: true,
	inverted: true,
	hpack: "center",
	class_name: "bar-battery-prog",
})

const charge = () => Widget.Box({
	class_name: "bar-battery",
	homogeneous: false,
	vertical: true,
	children: [
		Widget.Box({
			class_name: "bar-battery-bulb",
			hpack: "center",
			vpack: "center",
			hexpand: false,
		})
		,
		batteryProgress
	]
})
const volume = () => Widget.Box({
	name: "Audio Box",
	vertical: true,
	heightRequest: 80,
	children: [
		Widget.Button({
			name: "Audio Toggle",
			on_clicked: () => audio.speaker.is_muted = !audio.speaker.is_muted,
			child: Widget.Icon().hook(audio.speaker, self => {
				const vol = audio.speaker.volume * 100;
				const icon = [
					[101, 'overamplified'],
					[75, 'high'],
					[50, 'medium'],
					[20, 'low'],
					[0, 'muted'],
				].find(([threshold]) => threshold <= vol)?.[1];

				self.icon = `audio-volume-${icon}-symbolic`;
				self.tooltip_text = `Volume ${Math.floor(vol)}%`;
			}),
		}),
		Widget.Slider({
			name: "Audio Slider",
			hexpand: true,
			draw_value: false,
			inverted: true,
			orientation: 1,
			heightRequest: 60,
			on_change: ({ value }) => audio.speaker.volume = value,
			setup: self => self.hook(audio.speaker, () => {
				self.value = audio.speaker.volume || 0
			}),
		}),
	]
})

const WifiIndicator = () => Widget.EventBox({
	name: "Wifi Box",
	child: Widget.Icon({
		name: "Wifi Icon",
		icon: network.wifi.bind('icon_name'),
	}),
	on_hover: () => Widget.Label({
		name: "Wifi Name",
		label: network.wifi.bind('ssid')
			.as(ssid => ssid || 'Unknown'),
	}),
})

const WiredIndicator = () => Widget.Icon({
	name: "Ethernet Icon",
	icon: network.wired.bind('icon_name'),
})

const wifi = () => Widget.Stack({
	name: "Network box",
	children: {
		wifi: WifiIndicator(),
		wired: WiredIndicator(),
	},
	shown: network.bind('primary').as(p => p || 'wifi'),
})


const bluetoothIndicator = () => Widget.Icon({
	name: "Bluetooth Box",
	icon: bluetooth.bind('enabled').as(on =>
		`bluetooth-${on ? 'active' : 'disabled'}-symbolic`),
})

const sysbutton = Widget.EventBox({
	name: "Sys EventBox",
	class_name: "SysButton",
	child: Widget.Box({
		name: "Sys InnerBox",
		spacing: 5,
		vertical: true,
		children: [wifi(), bluetoothIndicator(), volume(), charge()],
	})
})

export { sysbutton }
