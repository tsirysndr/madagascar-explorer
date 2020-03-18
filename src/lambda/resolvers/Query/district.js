
export const District = {
  district: (parent, { id }, context) => {
    return context.districts[0];
  },
  districts: (parent, args, context) => {
    return context.districts;
  }
}