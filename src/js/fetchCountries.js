import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name) {
  // const sanitiseName = name.trim();
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(r => {
      //   console.log(r);
      if (r.status === 404) {
        // console.log(r.status);
        throw new Error();
      } else return r.json();
    })
    .catch(() => Notify.failure('Oops, there is no country with that name'));
}
