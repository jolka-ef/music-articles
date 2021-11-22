import {matches} from 'dom-utils';

const tabs = document.querySelector('.js-tabs');
const links = [...document.querySelectorAll('.js-tab')];
const tables = [...document.querySelectorAll('.js-tabContent')];

let currentId = 0;

/**
 * Adds event handlers to the tabs.
 */
export function init() {
  if (tabs) {
    tabs.addEventListener('click', handleTabsClick);
    tabs.addEventListener('touchend', handleTabsClick);
  }
}

export function handleTabsClick(event) {
  event.stopPropagation();
  event.preventDefault();
  const target = event.target;
  const targetId = links.indexOf(target);
if (matches(target, '.js-tab', true)) {
    links[currentId].classList.remove('TabsList-tab--selected');
    target.classList.add('TabsList-tab--selected');
    tables[currentId].classList.remove('TourTable--selected');
    tables[targetId].classList.add('TourTable--selected');
    currentId = targetId;
  }
}
