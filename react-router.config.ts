import type {Config} from '@react-router/dev/config';

// import type {Future} from 'react-router';

declare module 'react-router' {
  interface Future {
    unstable_middleware: true;
  }
}

export default {
  future: {
    unstable_middleware: true,
  },
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
} satisfies Config;
