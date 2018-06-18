import base from './base';
import development from './development';
import production from './production';

export default (process.env.NODE_ENV === 'production')
  ? { ...base, ...production }
  : { ...base, ...development };
