

export const Region = {
  region: (parent, { id }, context) => {
    return context.regions[0];
  },
  regions: (parent, args, context) => {
    return context.regions;
  }
}
