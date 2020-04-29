# Getting Started

## Installation

Add the dependency to your project:

NPM:
``` bash
npm install --save obe-de/concrete#master
```

yarn:
``` bash
yarn add obe-de/concrete#master
```

Add it to your project, either at the project level:
``` js
import Vue from 'vue';
import Concrete from '@crh/concrete';

Vue.use(Concrete);
```

or at the component level:
``` js
import { ConcreteButton } from '@crh/concrete';


export default {
  name: 'My Single File Component',
  components: {
    ConcreteButton
  },
  // ...
}
```

## Styling

The components require no styles. Out of the box, they will show the same default styling that is present in the [sandbox implementation](https://concrete.crh.io/storybook/). Any of these styles can be overriden on a per-project basis. Because the components themselves used scoped styles, an additional class selector should be used when overriding styles (to achieve a greater specificity than the default styles). For convencience, most of the key element classes have an additional class, `concrete`, which can be used for this purpose. For example:

``` css
.concrete-button.concrete {
  border: 1px solid black;
}
```

Inspecting any element will reveal its key class names.