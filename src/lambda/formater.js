export const formatFokontanyItem = (item) => ({
  id: item[2].value.id,
  name: item[0],
  code: item[3],
  province: item[1],
  region: item[6],
  district: item[5],
  commune: item[4],
})
export const formatCommune = (item) => ({
  id: item[2].value.id,
  name: item[0],
  code: item[3],
  province: item[1],
  region: item[5],
  district: item[4],
})

export const formatDistrict = (item) => ({
  id: item[2].value.id,
  name: item[0],
  code: item[3],
  province: item[1],
  region: item[4]
})

export const formatRegion = (item) => ({
  id: item[2].value.id,
  name: item[0],
  code: item[3],
  province: item[1],
})

export const formatRegions = (result) => (
  result.map(item => formatRegion(item))
);

export const formatDistricts = (result) => (
  result.map(item => formatDistrict(item))
);

export const formatCommunes = (result) => (
  result.map(item => formatCommune(item))
);

export const formatFokontany = (result) => (
  result.map(item => formatFokontanyItem(item))
);
