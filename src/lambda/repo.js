import axios from 'axios';

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
