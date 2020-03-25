export const formatFokontanyItem = (item) => {
  if (!item) {
    return null
  }
  return {
    id: item[0].value.id,
    name: item[1],
    code: item[5],
    province: item[1],
    region: item[4],
    district: item[3],
    commune: item[2],
  }
}

export const formatCommune = (item) => {
  if (!item) {
    return null
  }
  return {
    id: item[0].value.id,
    name: item[1],
    code: item[5],
    province: item[4],
    region: item[3],
    district: item[2],
  }
}

export const formatDistrict = (item) => {
  if (!item) {
    return null
  }
  return {
    id: item[0].value.id,
    name: item[1],
    code: item[4],
    province: item[3],
    region: item[2]
  }
}

export const formatRegion = (item) => {
  if (!item) {
    return null
  }
  return {
    id: item[0].value.id,
    name: item[1],
    code: item[3],
    province: item[2],
  }
}

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
