import {closest} from 'dom-utils';

const drawerToggle = document.getElementById('drawer-toggle');
const drawer = document.getElementById('drawer');
const siteContentContainer = document.getElementById('site-ContentContainer');

const TRANSITION_DURATION = 300;
let isOpen = false;

/**
 * A callback that handles clicks on the drawer menu icon.
 * @param {!Event} event The event associated with the click
 */
function handleDrawerToggleClick(event) {
  event.preventDefault();
  isOpen ? close() : open();
}

/**
 * A callback that closes the drawer if the click originated
 * from outside the drawer element.
 * @param {!Event} event The event associated with the click
 */
function handleClickOutsideDrawerContainer(event) {
  const target = /** @type {!Element} */ (event.target);
  const link = closest(target, 'a', true);
  const button = closest(target, 'button', true);
  if (isOpen && !link && !button && !closest(target, '#header', true) ) {
    close();
  }
}

/**
 * Adds event handlers to the drawer menu button.
 */
export function init() {
  drawerToggle.addEventListener('click', handleDrawerToggleClick);
  drawerToggle.addEventListener('touchend', handleDrawerToggleClick);

  document.addEventListener('click', handleClickOutsideDrawerContainer);
  document.addEventListener('touchend', handleClickOutsideDrawerContainer);
}

/**
 * Opens a closed drawer
 */
export function open() {
  isOpen = true;
  drawer.classList.add('Drawer--opening');
  siteContentContainer.classList.add('Site-contentContainer--opening');
  setTimeout(function fn() {
    drawer.classList.remove('Drawer--opening');
    drawer.classList.add('Drawer--open');
    siteContentContainer.classList.remove('Site-contentContainer--opening');
    siteContentContainer.classList.add('Site-contentContainer--opened');
  }, TRANSITION_DURATION);
}

/**
 * Closes an opened drawer
 */
export function close() {
  isOpen = false;
  drawer.classList.remove('Drawer--open');
  drawer.classList.add('Drawer--closing');
  siteContentContainer.classList.add('Site-contentContainer--closing');
  setTimeout(function fn() {
    drawer.classList.remove('Drawer--closing');
    siteContentContainer.classList.remove('Site-contentContainer--closing');
    siteContentContainer.classList.remove('Site-contentContainer--opened');
  }, TRANSITION_DURATION);
}

