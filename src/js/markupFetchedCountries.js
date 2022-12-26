import { oneCountryInfo, listCountryInfo } from '../index';

function markupOneCountryDetail(countryInfo) {
  const objCountryInfo = countryInfo[0];

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
  oneCountryInfo.insertAdjacentHTML('beforeend', markupCountry);
}

function markupListOfCountries(arrayOfCounries) {
  const markupCountries = arrayOfCounries
    .map(
      ({ flags, name }) =>
        `<li><img src="${flags.svg}" alt="flag ${name.official}" width="40" height=auto style="margin-right: 10px"><span>${name.official}</span></li>`
    )
    .join('');

  listCountryInfo.insertAdjacentHTML('beforeend', markupCountries);
}

export { markupListOfCountries, markupOneCountryDetail };
