const hyprland = await Service.import('hyprland')

const focusedTitle = Widget.Label({
	label: hyprland.active.client.bind('title'),
	visible: hyprland.active.client.bind('address')
		.as(addr => !!addr),
})

const dispatch = ws => hyprland.messageAsync(`dispatch workspace ${ws}`);

const Workspaces = () => Widget.EventBox({
	onScrollUp: () => dispatch('+1'),
	onScrollDown: () => dispatch('-1'),
	child: Widget.Box({
		children: Array.from({ length: 7 }, (_, i) => i + 1).map(i => Widget.Button({
			attribute: i,
			label: `${i}`,
			onClicked: () => dispatch(i),
		})),
	}),
})

export default Workspaces()