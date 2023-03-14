# Concrete - Guide for Contributors

## Commits style
We use [Conventional Commits](http://conventionalcommits.org) to format our
commit messages. This helps keep the commit history clean and easy to read.
Please follow this style when making your commits.

## Updating documentation
If you make any changes that affect the documentation, please start your
commit message with "docs:". This will trigger our documentation update
workflow and ensure that the documentation is kept up to date.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Develop the VuePress documentation
```
npm run docs:dev
```

### Develop the Storybook sandbox
```
npm run storybook:dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Roadmap

Components to do:
  * Card list
    * Drag-to-reorder
  * Dropdown -- clicking reveals panel which can contain any content.
    - See: download dropdown, checkbox dropdown, documents dropdown, item selector dropdown.
  * Modal textarea
  * Layout frames
  * Expanding/minimizing viewports
  * Color picker
  * Pagination
  * Data tree?
  * Accordion/Collapse?
  * File uploader?

Drawing:
  * 2D SVG viewport
  * 2D canvas viewport?
  * 3D viewport

Refinement:
  * Icon sizes
  * Make custom select components scrollable
  * Light/dark themes
  * Add labels to toolbar, select default on 'esc'
  * Compact versions of tables/inputs/etc.
  * validations -- red highlight, error message
  * Add confirmation buttons to modal

Documentation:
  * (all components need documentation)
  * add icons to storybook
