import type { PageLoad } from './$types';

export const load: PageLoad = async ({fetch}) => {
  const result = await fetch('/api/decks')
  const decks = await result.json();

  return { decks };
};
