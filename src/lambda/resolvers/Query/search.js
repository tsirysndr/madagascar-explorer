import { search } from '../../repo';

export const Search = {
  search: (parent, { keyword }, context) => {
    return search(context, keyword);
  }
}
