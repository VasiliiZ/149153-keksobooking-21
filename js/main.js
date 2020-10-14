'use strict';

// const FORM_CAPACITY_OPTIONS = AD_FORM.querySelectorAll(`#capacity option`);
// const FORM_CAPACITY = AD_FORM.querySelector(`#capacity`);

const MAP = document.querySelector(`.map`);
const AD_FORM = document.querySelector(`.ad-form`);
const MAP_FILTERS = MAP.querySelector(`.map__filters`);

window.utils.setDisabled(MAP_FILTERS.children);
window.utils.setDisabled(AD_FORM.children);
