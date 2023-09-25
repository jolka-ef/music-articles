import * as drawer from './drawer';
import * as switchTabs from './switch-tabs';
import * as actionButtons from './action-buttons';

/**
 * The main script entry point for the site.
 */
const main = () => {
  drawer.init();
  switchTabs.init();
  actionButtons.init();
};

main();
