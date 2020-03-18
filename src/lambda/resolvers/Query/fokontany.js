
export const Fokontany = {
  fokontany: (parent, { id }, context) => {
    return context.fokontany[0];
  },
  allFokontany: (parent, args, context) => {
    return context.fokontany;
  }
}
