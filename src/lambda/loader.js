import axios from 'axios';

const countryUrl = process.env.COUNTRY_URL || 'https://media.githubusercontent.com/media/tsirysndr/mg-geojson/master/assets/country.json';
const regionsUrl = process.env.REGIONS_URL || 'https://media.githubusercontent.com/media/tsirysndr/mg-geojson/master/assets/regions.json';
const districtsUrl = process.env.DISTRICTS_URL || 'https://media.githubusercontent.com/media/tsirysndr/mg-geojson/master/assets/districts.json';
const communesUrl = process.env.COMMUNES_URL || 'https://media.githubusercontent.com/media/tsirysndr/mg-geojson/master/assets/communes.json';
const fokontanyUrl = process.env.FOKONTANY_URL || 'https://media.githubusercontent.com/media/tsirysndr/mg-geojson/master/assets/fokontany.json';

export const downloadJSON = async () => {
  const country = await axios.get(countryUrl);
  const regions = await axios.get(regionsUrl);
  const districts = await axios.get(districtsUrl);
  const communes = await axios.get(communesUrl);
  const fokontany = await axios.get(fokontanyUrl);
  return { 
    country: country.data, 
    regions: regions.data, 
    districts: districts.data, 
    communes: communes.data, 
    fokontany: fokontany.data 
  };
}
