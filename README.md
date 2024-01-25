<h1 align="center">
  Concrete Design System
</h1>

> Concrete is a Vue UI toolkit designed and built by the team at [www.crh.io](https://www.crh.io).
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
import { ConcreteButton } from '@crhio/concrete';


export default {
  name: 'My Single File Component',
  components: {
    ConcreteButton
  },
  // ...
}
```

## Development

**This version of Concrete does not work with Node >= 16.**

Use nvm to switch to v14 in order to successfully install the dependencies. Then run the following commands:

```
npm i
npm run dev
```

## Documentation

Documentation for all components can be found at [concrete.crh.io](https://concrete.crh.io).

Styling:
The components require no styles. Out of the box, they will show the same default styling that is present in the sandbox implementation. Any of these styles can be overriden on a per-project basis. Because the components themselves used scoped styles, an additional class selector should be used when overriding styles (to achieve a greater specificity than the default styles). For convencience, most of the key element classes have an additional class, `concrete`, which can be used for this purpose. For example:

```
.concrete-button.concrete {
  border: 1px solid black;
}
```

Inspecting any element will reveal its key class names.

## Contributing

Contributors should follow the [Guide for Contributors](/CONTRIBUTORS.md) for instructions on setting up the development environment.
