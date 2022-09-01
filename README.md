# Concrete Design System

> Concrete is a Vue UI toolkit designed and built by the Software Engineering team at [Leviat](https://www.leviat.com).
> It is intended for technical interfaces, with components specifically tailored
> for engineering and design software.

## Installation

To install, add the dependency to your project:

NPM:
```
npm install --save @crhio/concrete
```

Add it to your project, either at the project level:
```
import { createApp } from 'vue';
import Concrete from '@crhio/concrete';

const app = createApp();
app.use(Concrete, options);
```

Or import individual components directly:
```
import { CButton } from '@crhio/concrete';


export default {
  name: 'My Single File Component',
  components: {
    CButton
  },
  // ...
}
```

Styling:

To enable styling based on tailwind classes, run `@crhio/leviat-tailwind-configuration` and add the following to your projects tailwind.config.js:

```
preset: require('@crhio/leviat-tailwind-configuration'),
content: ['./node_modules/@crhio/concrete/src/**/*.{js,ts,vue}'],
```

## Documentation

Full documentation can be found at [leviat-concrete.netlify.app](https://leviat-concrete.netlify.app/).