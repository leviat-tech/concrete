<h1 align="center">
  Concrete Design System
</h1>

> Concrete is a Vue UI toolkit designed and built by the team at [Leviat](https://www.leviat.com).
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
import Vue from 'vue';
import Concrete from '@crhio/concrete';

Vue.use(Concrete);
```

or at the component level:
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

To enable styling based on tailwind classes, add the following to your projects tailwind.config.js:

```
preset: require('@crhio/leviat-tailwind-configuration'),
content: ['./node_modules/@crhio/concrete/src/**/*.{js,ts,vue}'],
```

## Documentation

Documentation for all components can be found at [concrete.crh.io](https://concrete.crh.io).


## Contributing

Contributors should follow the [Guide for Contributors](/CONTRIBUTORS.md) for instructions on setting up the development environment.