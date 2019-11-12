# Tests

### Running

```bash
mocha                          # run all the tests
mocha --grep "some test name"  # searches through the "describe" and "it" text and runs tests that match
mocha test/foo.js              # run a specific test file
```

### When to write tests

Each API endpoint should have a minimum of 1 test written for it.  Preferably write a test before you write a feature.  This is called [Test Driven Development (TDD)](https://martinfowler.com/bliki/TestDrivenDevelopment.html).

As for writing additional tests for an API endpoint, that is up to the developer.  But if you are being asked to fix a bug or write a new feature, the new variances should be covered by the test, and this can be done either by modifying existing tests or creating new ones.

At the developer's discretion unit tests can also be written.  This is recommended to be done any time:

1. Utility functions or algorithms are written, which will be used throughout the code base.
2. A code set becomes complex or difficult to reason about... in this case it should be split into one or more pure functions and unit tests should be created.  If you are developing and finding it hard to wrap your mind around the high level objective, this is a good cue that you should be breaking it up into smaller chunks and testing those.  Then you can combine a set of well tested fundamentals to create your final result.

### Writing new tests

Write tests in the tests directory.  Mocha only looks in the top level directory, so you won't be able to nest your tests into other folders.

Name your tests like `foo-test.js` where `foo` is some file, module, or use case you are testing.

Write comments in [Given/When/Then style](https://martinfowler.com/bliki/GivenWhenThen.html).  We don't use a BDD style test suite, but this sort of flow is still helpful for thinking about how you want your test to run, and makes it easier for someone else to understand your test.

### Generating test data

We use [factory-girl](https://github.com/aexmachina/factory-girl) to make it easier to generate sample data in our tests.  As long as you use the boiler function (see below) `this.Factory` will be present in all your tests and you can call `.build()` or `.attr()` as needed.  New definitions can be created in `test/fixtures/factory-patterns.js`.

### Re-using Testing Code

Standard mocha startup configuration is stored in `test/mocha.opts`.  These options will be used any time the `mocha` command is run, but they can be overidden by command line flags.

The `test/helpers` directory contains some code intended to be reused between tests.  Particularly the `boiler.js` file contains a common set of environment preparation functions such as `start the app` and `clear data between tests`.  You will see `boiler.js` being used in almost every test.  You can add new features to `boiler.js` by adding to the `features` object.

### Using Boiler

Use boiler like so:

```js
// ARGS:
// 1: Describe text - same as mocha describe, it prints out in your test report
// 2: Features - array of features you wish to enable, check
//    `test/helpers/boiler.js` for more options
// 3: Test body - where you write your tests
boiler('Todo', ['clearDataBeforeAndAfter'], function() {
  // boiler() will create a "describe" wrapper and any optional features
  // you enable will only apply inside.
  // This is where you write your test code in 'describe' and 'it' functions.
})
```
