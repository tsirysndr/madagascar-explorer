import axios from 'axios';

const regionsIndexUrl = process.env.REGIONS_INDEX_URL || 'https://gitlab.com/tsiry.sndr/mg-geojson/-/raw/master/assets/regions-index.json';
const districtsIndexUrl = process.env.DISTRICTS_INDEX_URL || 'https://gitlab.com/tsiry.sndr/mg-geojson/-/raw/master/assets/districts-index.json';
const communesIndexUrl = process.env.COMMUNES_INDEX_URL || 'https://gitlab.com/tsiry.sndr/mg-geojson/-/raw/master/assets/communes-index.json';
const fokontanyIndexUrl = process.env.FOKONTANY_INDEX_URL || 'https://gitlab.com/tsiry.sndr/mg-geojson/-/raw/master/assets/fokontany-index.json';
const regionsUrl = process.env.REGIONS_URL || 'https://gitlab.com/tsiry.sndr/mg-geojson/-/raw/master/assets/regions.json';
const districtsUrl = process.env.DISTRICTS_URL || 'https://gitlab.com/tsiry.sndr/mg-geojson/-/raw/master/assets/districts.json';
const communesUrl = process.env.COMMUNES_URL || 'https://gitlab.com/tsiry.sndr/mg-geojson/-/raw/master/assets/communes.json';
const fokontanyUrl = process.env.FOKONTANY_URL || 'https://gitlab.com/tsiry.sndr/mg-geojson/-/raw/master/assets/fokontany.json';

export const downloadJSON = async () => {
  const regionsIndex = await axios.get(regionsIndexUrl);
  const districtsIndex = await axios.get(districtsIndexUrl);
  const communesIndex = await axios.get(communesIndexUrl);
  const fokontanyIndex = await axios.get(fokontanyIndexUrl);
  const regions = await axios.get(regionsUrl);
  const districts = await axios.get(districtsUrl);
  const communes = await axios.get(communesUrl);
  const fokontany = await axios.get(fokontanyUrl);
  return {
    regionsIndex: regionsIndex.data, 
    districtsIndex: districtsIndex.data, 
    communesIndex: communesIndex.data, 
    fokontanyIndex: fokontanyIndex.data, 
    regions: regions.data, 
    districts: districts.data, 
    communes: communes.data, 
    fokontany: fokontany.data 
  };
}
