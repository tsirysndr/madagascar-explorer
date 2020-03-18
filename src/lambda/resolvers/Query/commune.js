
export const Commune = {
  commune: (parent, { id }, context) => {
    return context.communes[0];
  },
  communes: (parent, args, context) => {
    return context.communes;
  }
}
