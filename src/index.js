import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import {
  markupListOfCountries,
  markupOneCountryDetail,
} from './js/markupFetchedCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputNameCountry = document.querySelector('#search-box');
const oneCountryInfo = document.querySelector('.country-info');
const listCountryInfo = document.querySelector('.country-list');

listCountryInfo.style.listStyle = 'none';
listCountryInfo.style.paddingLeft = '0';

inputNameCountry.addEventListener(
  'input',
  debounce(onInputCountryName, DEBOUNCE_DELAY)
);

function onInputCountryName(e) {
  const name = e.target.value.trim();
  if (!name) {
    clearMarkupCounries();
    return;
  }
  // console.log(name);
  fetchCountries(name)
    .then(data => {
      // console.log(data);
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length > 1 && data.length <= 10) {
        clearMarkupCounries();
        markupListOfCountries(data);
      } else if (data.length === 1) {
        clearMarkupCounries();
        markupOneCountryDetail(data);
      }
    })
    .catch(() => {}); //написав цю строку бо при помилці фетча країн викликало помилку при визначенні довжини data
}

function clearMarkupCounries() {
  oneCountryInfo.innerHTML = '';
  listCountryInfo.innerHTML = '';
}

export { oneCountryInfo, listCountryInfo };

// function markupListOfCountries(arrayOfCounries) {
//   const markupCountries = arrayOfCounries
//     .map(
//       ({ flags, name }) =>
//         `<li><img src="${flags.svg}" alt="flag ${name.official}" width="40" height=auto style="margin-right: 10px"><span>${name.official}</span></li>`
//     )
//     .join('');

//   listCountryInfo.insertAdjacentHTML('beforeend', markupCountries);
// }

// function markupOneCountryDetail(countryInfo) {
//   const objCountryInfo = countryInfo[0];
//   const languages = Object.values(objCountryInfo.languages).join(', ');
//   const flag = objCountryInfo.flags.svg;
//   const name = objCountryInfo.name.official;
//   const population = objCountryInfo.population.toLocaleString();
//   const capital = objCountryInfo.capital.join(', ');
//   //   console.log(languages);
//   const markupCountry = `<div><img src="${flag}" alt="${name} flag" width="40" height=auto style="margin-right: 10px"><b style="font-size: 24px">${name}</b></div>
//     <div><b>Capital: </b><span>${capital}</span></div>
//     <div><b>Population: </b><span>${population}</span></div>
//     <div><b>Languages: </b><span>${languages}</span></div>`;
//   oneCountryInfo.insertAdjacentHTML('beforeend', markupCountry);
// }
