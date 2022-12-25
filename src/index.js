import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
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

function fetchCountries(name) {
  //   const sanitiseName = name.trim();
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(r => {
      console.log(r);
      if (r.status === 404) {
        console.log(r.status);
        throw new Error();
      } else return r.json();
    })
    .catch(Notify.failure('Qui timide rogat docet negare'));
}

function onInputCountryName(e) {
  const name = e.target.value.trim();
  if (!name) {
    oneCountryInfo.innerHTML = '';
    listCountryInfo.innerHTML = '';
    return;
  }
  //   console.log(name);
  const response = fetchCountries(name).then(data => {
    // console.log(data);
    if (data.length > 10) {
      console.log('to many contries');
    } else if (data.length > 1 && data.length <= 10) {
      oneCountryInfo.innerHTML = '';
      markupListOfCountries(data);
    } else if (data.length === 1) {
      listCountryInfo.innerHTML = '';
      markupOneCountryDetail(data);
    }
  });
  // .catch(err => console.log(err));
}

function eee(e) {
  // debounce(onInputCountryName(e), 1000);
  console.log('hello');
}

// ?fields=name,capital,population,flags,languages

function markupListOfCountries(arrayOfCounries) {
  const markupCountries = arrayOfCounries
    .map(
      ({ flags, name }) =>
        `<li><img src="${flags.svg}" alt="flag ${name.official}" width="40" height=auto style="margin-right: 10px"><span>${name.official}</span></li>`
    )
    .join('');

  listCountryInfo.innerHTML = markupCountries;
}

function markupOneCountryDetail(countryInfo) {
  const objCountryInfo = countryInfo[0];
  // const { flags, name, capital,population } = countryInfo[0];
  const languages = Object.values(objCountryInfo.languages).join(', ');
  const flag = objCountryInfo.flags.svg;
  const name = objCountryInfo.name.official;
  const population = objCountryInfo.population.toLocaleString();
  const capital = objCountryInfo.capital.join(', ');
  //   console.log(languages);
  const markupCountry = `<div><img src="${flag}" alt="${name} flag" width="40" height=auto style="margin-right: 10px"><b style="font-size: 24px">${name}</b></div>
    <div><b>Capital: </b><span>${capital}</span></div>
    <div><b>Population: </b><span>${population}</span></div>
    <div><b>Languages: </b><span>${languages}</span></div>`;
  oneCountryInfo.innerHTML = markupCountry;
}

// Notify.failure('Qui timide rogat docet negare');
// Notify.info('Cogito ergo sum');
