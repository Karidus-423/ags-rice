const hyprland = await Service.import('hyprland')

const dispatch = ws => hyprland.messageAsync(`dispatch workspace ${ws}`);

const Workspaces = () => Widget.EventBox({
	onScrollUp: () => dispatch('+1'),
	onScrollDown: () => dispatch('-1'),
	child: Widget.Box({
		spacing: 10,
		vertical: true,
		children: Array.from({ length: 7 }, (_, i) => i + 1).map(i => Widget.Button({
			class_name: "empty_ws",
			attribute: i,
			label: `${i}`,
			onClicked: () => dispatch(i),
			setup: (self) => {
				self.hook(hyprland, () => {
					self.toggleClassName(
						"active_ws",
						hyprland.active.workspace.id == i);
					self.toggleClassName(
						"filled_ws",
						hyprland.getWorkspace(i)?.windows > 0,);
				});
			},
		})),
	}),
})
export default Workspaces
