import { Utils, App } from "./imports.js";
import DirectoryMonitorService from "./services/directoryMonitorService.js";

// Windows
import { Bar } from "./modules/bar/bar.js";
import { launcher } from "./modules/launcher/launcher.js";
import { Desktop } from "./modules/desktop/desktop.js";
import { TopLeft, TopRight } from "./modules/desktop/corners.js";
import { Popups /*NotificationPopups*/ } from "./modules/popups/popups.js";
import { Music } from "./modules/music/music.js";

import { Terminal } from "./modules/terminal/terminal.js";

// Apply css
const applyScss = () => {
	// Compile scss
	Utils.exec(
		`sassc ${App.configDir}/scss/main.scss ${App.configDir}/style.css`,
	);
	console.log("Scss compiled");

	// Apply compiled css
	App.resetCss();
	App.applyCss(`${App.configDir}/style.css`);
	console.log("Compiled css applied");
};

// Apply css then check for changes
applyScss();

// Check for any changes
DirectoryMonitorService.recursiveDirectoryMonitor(`${App.configDir}/scss`);
DirectoryMonitorService.connect("changed", applyScss);

// Main config
export default {
	style: `${App.configDir}/style.css`,
	closeWindowDelay: {
		launcher: 250,
		music: 250,
		terminal: 250,
	},
	windows: [
		Bar(),
		launcher,
		Desktop(),
		TopLeft(),
		TopRight(),
		//NotificationPopups(),
		Popups(),
		Music(),
		Terminal(),
	],
};
