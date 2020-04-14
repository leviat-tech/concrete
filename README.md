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
npm install --save obe-de/concrete#master
```

yarn:
```
yarn add obe-de/concrete#master
```

Add it to your project, either at the project level:
```
import Vue from 'vue';
import Concrete from '@crh/concrete';

Vue.use(Concrete);
```

or at the component level:
```
import { ConcreteButton } from '@crh/concrete';


export default {
  name: 'My Single File Component',
  components: {
    ConcreteButton
  },
  // ...
}
```

## Documentation

A sandbox of all components including documentation can be found at [concrete.crh.io](https://concrete.crh.io).

## Contributing

Contributors should follow the [Guide for Contributors](/CONTRIBUTORS.md) for instructions on setting up the development environment.