import { search } from '../../repository';

export const Search = {
  search: (parent, { keyword }, context) => {
    return search(context, keyword);
  }
}
