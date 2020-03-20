
export const formatRegions = (result) => (
  result.map(item => ({ 
    id: item.ref.value.id,
    name: item.data.Name,
    code: item.data.Code,
    province: item.data.Province,
    geometry: {
      type: item.data.Geometry.Type,
      cooridnates: item.data.Geometry.Coordinates
    }
  }))
);

export const formatDistricts = (result) => (
  result.map(item => ({ 
    id: item.ref.value.id,
    name: item.data.Name,
    code: item.data.Code,
    province: item.data.Province,
    region: item.data.Region,
    geometry: {
      type: item.data.Geometry.Type,
      cooridnates: item.data.Geometry.Coordinates
    }
  }))
);

export const formatCommunes = (result) => (
  result.map(item => ({ 
    id: item.ref.value.id,
    name: item.data.Name,
    code: item.data.Code,
    province: item.data.Province,
    region: item.data.Region,
    district: item.data.District,
    geometry: {
      type: item.data.Geometry.Type,
      cooridnates: item.data.Geometry.Coordinates
    }
  }))
);

export const formatFokontany = (result) => (
  result.map(item => ({ 
    id: item.ref.value.id,
    name: item.data.Name,
    code: item.data.Code,
    province: item.data.Province,
    region: item.data.Region,
    district: item.data.District,
    commune: item.data.Commune,
    geometry: {
      type: item.data.Geometry.Type,
      cooridnates: item.data.Geometry.Coordinates
    }
  }))
);
