import axios from 'axios';
import alasql from 'alasql/dist/alasql';

export const find = async (id, index, baseURL) => {
  if (!index.length) {
    return {};
  }
  const collections = index.filter(
    collection => collection.Items.filter(item => item.includes(id)).length
  );
  if (!collections.length) {
    return {};
  }
  const { data } = await axios.get(`${baseURL}/${collections[0].Collection}`);
  return data.filter(item => item.id === id)[0];
}

export const search = async (context, keyword) => {
  let regions = [];
  let districts = [];
  let communes = [];
  let fokontany = [];

  regions = alasql(`SELECT * FROM ? WHERE LOWER(name) LIKE '%${keyword}%' ORDER BY name ASC`, [context.regions]);
  districts = alasql(`SELECT * FROM ? WHERE LOWER(name) LIKE '%${keyword}%' ORDER BY name ASC`, [context.districts]);
  communes = alasql(`SELECT * FROM ? WHERE LOWER(name) LIKE '%${keyword}%' ORDER BY name ASC`, [context.communes]);
  fokontany = alasql(`SELECT * FROM ? WHERE LOWER(name) LIKE '%${keyword}%' ORDER BY name ASC`, [context.fokontany]);

  return { regions, districts, communes, fokontany };
}

export const sort = (list) => {
  return alasql(`SELECT * FROM ? ORDER BY name ASC`, [list]);
}
