import {closest} from 'dom-utils';
import {matches} from 'dom-utils';
const TRANSITION_DURATION = 500;

/**
 * Adds event handlers to the document.
 */
export function init() {
  document.addEventListener('click', showOverlay);
  document.addEventListener('touchend',  showOverlay);

  document.addEventListener('click', hideOverlay);
  document.addEventListener('touchend',  hideOverlay);

}

/**
 * Shows overlay.
 * @param {!Event} event The event associated with the click
 */
export function showOverlay(event) {
  event.stopPropagation();
  const target = event.target;
  if (matches(target, '.js-overlayShow')) {
    const role = target.getAttribute('data-role');
    const parent = closest(target, '.js-overlayHide');
    const elementToShow = parent.querySelector('[data-id="'+role+'"]');
    elementToShow.classList.add('Overlay--isSelected');
  }
}

/**
 * Hides overlay.
 * @param {!Event} event The event associated with the click
 */
export function hideOverlay(event) {
  event.stopPropagation();
  const target = event.target;
  const overlay = closest(target, '.Overlay', true);
  if (overlay) {
      overlay.classList.add('Overlay--isHiding');
      overlay.classList.remove('Overlay--isSelected');
      setTimeout(function fn() {
        overlay.classList.remove('Overlay--isHiding');
      }, TRANSITION_DURATION);
  }
}
