import { Commune } from './commune';
import { Country } from './country';
import { District } from './district';
import { Fokontany } from './fokontany';
import { Region } from './region';

export const Query = {
  ...Commune,
  ...Country,
  ...District,
  ...Fokontany,
  ...Region,
}
