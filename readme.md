## React Viewport Rules

Simple module to help make your application responsive using parsable rules to set values conditionally.

### Installation

```bash
npm install react-viewport-rules
```

### Usage

First, import the library into your React app:

```javascript
import ViewportRules from 'react-viewport-rules'
```

Then, move your component's rendered content into `<ViewportRules/>` component's `renderCallback` method, which expects a callback, something like:

```javascript
render()
{
  return (
    <ViewportRules renderCallback={({ match }) =>
    {
      return (
        <div>My Fancy HTML</div>
      )
    }} />
  )
}
```

Once you pass a callback to `renderCallback`, you should be able to extract a `match` function from the first argument of your callback.

### API

#### `renderCallback(callback)`

This is a method of the `ViewportRules` component. You can use it to pass a callable function that will return your component's HTML.

Your callback can access the `match` function from the first argument, here's an example

```javascript
renderCallback(({match}) =>
{
  return <div>HTML</div>
})
```

#### `match(String rules, Mixed valueIfTrue, Mixed valueIfFalse)`

1. `rules` - Pass a string of comma-separated rules in this format: `{property} {operator >=|<=|>|<|=} {value}`

Examples:

```javascript
match('screenWidth >= 500')
match('screenWidth > 500, screenWidth <= 700, screenHeight < 690')
match('screenWidth = 500, screenHeight = 500')
```

2. `valueIfTrue` - Optional, defaults to `true`. What to return if all rules have matched.

3. `valueIfFalse` - Optional, defaults to `false`. What to return if one or more rules did not match.

Examples:

```javascript
// in if/else statements
if ( match('screenWidth >= 500') ) {  }

// DOM Element attributes
<div className={`text-grey-dark ${match('screenWidth >= 500', 'bg-red', 'bg-white')}`}></div>
```

### Rules as a string

You can pass one or more rules separated by commas. They will be parsed with `RegExp`, to extract the property, comparison operator and comparable value.

The format of each rule should be `<property> <operator> <value>`.

Invalid formats will throw an exception error.

Here's the regex that parses each rule:

```javascript
/(^[a-zA-Z]{4,})\s{0,}(>=|<=|>|<|=)\s{0,}([0-9]+(\.[0-9]+)?)/
```

### Example

```javascript
import React from 'react'
import ViewportRules from 'react-viewport-rules'

class App extends React.Component
{
  render()
  {
    return (
      <ViewportRules renderCallback={({ match }) =>
      {
        return <div>
          <div style={{ display: match('screenWidth <= 690', '', 'none') }}>Can only see me on mobile!</div>
          <div style={{ display: match('screenWidth > 690, screenWidth < 995', '', 'none') }}>Can only see me on tablet!</div>
          <div style={{ display: match('screenWidth > 690', '', 'none') }}>Can only see me on desktop!</div>

          <div style={{ backgroundColor: match('screenWidth >= 500, screenWidth < 900', 'red', 'green') }}>Such UI!</div>
        </div>
      }} />
    )
  }
}
```

### Available Properties

Currently, this library supports 2 properties to be used within the rules.

- `screenWidth`: viewport screen width.
- `screenHeight`: viewport screen height.

### Todo

- [ ] Add tests.