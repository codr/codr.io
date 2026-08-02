import { describe, it } from 'vitest';
import Welcome from './Welcome.astro';

describe('debug', () => {
  it('checks function source', () => {
    console.log(Welcome.toString().slice(0, 200));
  });
});
