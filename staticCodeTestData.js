function exampleFunction() {
  // 2. TODO comment without expiration
  // TODO: Fix this issue
  // Solution: Add an expiration or deadline to the TODO comment.
  // TODO: Fix this issue by 2024-10-01.
  // Pros: Sets a clear deadline for resolving the issue.
  // Cons: Deadlines may be arbitrary if not tracked.

  // 3. Unnecessary escape characters
  const regex = /hello\\world/; // unicorn/escape-case
  // Solution: Remove unnecessary escape characters.
  const regexCorrect = /hello\world/;
  // Pros: Makes the code cleaner and more readable.
  // Cons: Mistakes in removing escape characters can break the regex.

  // 4. Implicit length check
  const arr = [1, 2, 3];
  if (arr.length) {
    // unicorn/explicit-length-check
    console.log('Array is not empty');
  }
  // Solution: Use an explicit length check.
  if (arr.length > 0) {
    console.log('Array is not empty');
  }
  // Pros: Makes the check clear and explicit.
  // Cons: Slightly more verbose.

  // 5. Using instanceof Array
  if (arr instanceof Array) {
    // unicorn/no-array-instanceof
    console.log('This is an array');
  }
  // Solution: Use Array.isArray().
  if (Array.isArray(arr)) {
    console.log('This is an array');
  }
  // Pros: More reliable across different JavaScript environments.
  // Cons: None.

  // 6. Deprecated Buffer usage
  const buffer = new Buffer('hello'); // unicorn/new-for-builtins
  // Solution: Use Buffer.from() or Buffer.alloc().
  const bufferCorrect = Buffer.from('hello');
  // Pros: Uses modern and safe methods.
  // Cons: None.

  // 7. Disabling ESLint rule
  // eslint-disable-next-line no-console
  console.log('This should not be here'); // unicorn/no-abusive-eslint-disable
  // Solution: Avoid unnecessary ESLint disables or fix the warning.
  console.log('This should not be here');
  // Pros: Maintains ESLint checks.
  // Cons: May require additional code changes.

  // 8. Extra spaces in console log
  console.log('Hello   World'); // unicorn/no-console-spaces
  // Solution: Remove unnecessary spaces.
  console.log('Hello World');
  // Pros: Cleaner and more readable console output.
  // Cons: None.

  // 9. Traditional for loop
  for (let i = 0; i < arr.length; i++) {
    // unicorn/no-for-loop
    console.log(arr[i]);
  }
  // Solution: Use array methods like .forEach().
  arr.forEach((item) => console.log(item));
  // Pros: Cleaner and more modern syntax.
  // Cons: For loops may be faster in some cases.

  // 10. Hexadecimal escape sequence
  const str = '\x41'; // unicorn/no-hex-escape
  // Solution: Use Unicode escape sequences.
  const strCorrect = '\u0041';
  // Pros: More readable and standard.
  // Cons: Slightly longer to write.

  // 11. Nested ternary operator
  const result = condition1 ? (condition2 ? 'foo' : 'bar') : 'baz'; // unicorn/no-nested-ternary
  // Solution: Use if-else statements instead of nested ternaries.
  let resultCorrect;
  if (condition1) {
    resultCorrect = condition2 ? 'foo' : 'bar';
  } else {
    resultCorrect = 'baz';
  }
  // Pros: Improves readability.
  // Cons: Increases code verbosity.

  // 12. Using process.exit() directly
  // process.exit(1); // unicorn/no-process-exit
  // Solution: Handle errors gracefully instead of using process.exit().
  console.error('Error occurred');
  // Pros: Prevents abrupt program termination.
  // Cons: Requires more handling of errors.

  // 13. Unclear array destructuring
  const [first, second] = [1, 2]; // unicorn/no-unreadable-array-destructuring
  // Solution: Ensure destructuring is clearer or use explicit variables.
  const numbers = [1, 2];
  const firstCorrect = numbers[0];
  const secondCorrect = numbers[1];
  // Pros: More readable and explicit.
  // Cons: Less concise.

  // 14. Fraction with zero before decimal point
  const num = 0.1; // unicorn/no-zero-fractions
  // Solution: Remove unnecessary zero.
  const numCorrect = 0.1;
  // Pros: More compact code.
  // Cons: Reduces readability for some.

  // 15. Number literal not consistently formatted
  const number = 1e2; // unicorn/number-literal-case
  // Solution: Ensure number literals are consistently formatted.
  const numberCorrect = 100;
  // Pros: Easier to understand.
  // Cons: May lose precision in some contexts.

  // 16. Direct event handler assignment
  document.querySelector('button').onclick = function () {}; // unicorn/prefer-add-event-listener
  // Solution: Use addEventListener.
  document.querySelector('button').addEventListener('click', function () {});
  // Pros: More flexible and avoids overwriting other handlers.
  // Cons: Slightly more complex.

  // 17. Setting data attribute using setAttribute
  document.querySelector('div').setAttribute('data-attribute', 'value'); // unicorn/prefer-dataset
  // Solution: Use dataset property.
  document.querySelector('div').dataset.attribute = 'value';
  // Pros: Cleaner and more consistent with modern APIs.
  // Cons: May be less obvious for new developers.

  // 18. Using keyCode instead of event.key
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      // unicorn/prefer-event-key
      console.log('Enter key pressed');
    }
  });
  // Solution: Use event.key.
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      console.log('Enter key pressed');
    }
  });
  // Pros: More descriptive and modern.
  // Cons: Browser compatibility issues.

  // 19. Using Math.pow() instead of exponentiation operator
  const power = Math.pow(2, 3); // unicorn/prefer-exponentiation-operator
  // Solution: Use the ** operator.
  const powerCorrect = 2 ** 3;
  // Pros: More concise.
  // Cons: May be unfamiliar to some developers.

  // 20. Using map().flat() instead of flatMap
  const flattened = [1, [2, 3]].map((x) => x).flat(); // unicorn/prefer-flat-map
  // Solution: Use flatMap().
  const flattenedCorrect = [1, [2, 3]].flatMap((x) => x);
  // Pros: More efficient and concise.
  // Cons: May be less intuitive for complex transformations.

  // 21. Checking existence with indexOf
  const exists = arr.indexOf(1) !== -1; // unicorn/prefer-includes
  // Solution: Use includes().
  const existsCorrect = arr.includes(1);
  // Pros: More readable and modern.
  // Cons: None.

  // 22. Using appendChild() instead of append
  const div = document.createElement('div');
  div.appendChild(document.createElement('span')); // unicorn/prefer-node-append
  // Solution: Use append().
  div.append(document.createElement('span'));
  // Pros: Cleaner syntax.
  // Cons: None.

  // 23. Using removeChild() instead of remove
  div.removeChild(document.querySelector('span')); // unicorn/prefer-node-remove
  // Solution: Use remove().
  document.querySelector('span').remove();
  // Pros: Cleaner and shorter syntax.
  // Cons: None.

  // 24. Using getElementById() instead of querySelector
  const element = document.getElementById('id'); // unicorn/prefer-query-selector
  // Solution: Use querySelector().
  const elementCorrect = document.querySelector('#id');
  // Pros: Consistent API usage.
  // Cons: None.

  // 25. Using Function.prototype.apply() instead of Reflect.apply
  Function.prototype.apply.call(console.log, console, ['hello']); // unicorn/prefer-reflect-apply
  // Solution: Use Reflect.apply().
  Reflect.apply(console.log, console, ['hello']);
  // Pros: Cleaner and modern syntax.
  // Cons: None.

  // 26. Using concat() instead of spread syntax
  const newArr = arr.concat(); // unicorn/prefer-spread
  // Solution: Use spread syntax.
  const newArrCorrect = [...arr];
  // Pros: Shorter and more modern syntax.
  // Cons: None.

  // 27. Using indexOf() instead of startsWith/endsWith
  const starts = 'hello'.indexOf('he') === 0; // unicorn/prefer-start
  const ends = 'hello'.indexOf('lo') === 'hello'.length - 2; // unicorn/prefer-starts-ends-with
  // Solution: Use startsWith() and endsWith().
  const startsCorrect = 'hello'.startsWith('he');
  const endsCorrect = 'hello'.endsWith('lo');
  // Pros: More readable and modern.
  // Cons: None.

  // 28. Using innerText instead of textContent
  const text = document.querySelector('p').innerText; // unicorn/prefer-text-content
  // Solution: Use textContent.
  const textCorrect = document.querySelector('p').textContent;
  // Pros: Better performance and consistency.
  // Cons: None.

  try {
    // 30. Incorrect error name
    try {
      throw new Error('Test error'); // unicorn/catch-error-name
    } catch (err) {
      console.error(err.message); // unicorn/catch-error-name
    }
  } catch (error) {
    console.error('Caught an error:', error.message);
  }
  // Solution: Use error as the name for the caught error.
  try {
    try {
      throw new Error('Test error');
    } catch (error) {
      console.error(error.message);
    }
  } catch (error) {
    console.error('Caught an error:', error.message);
  }

  // 30. Inconsistent function scoping
  if (true) {
    function scopedFunction() {
      // unicorn/consistent-function-scoping
      console.log('This function is scoped within the if block.');
    }
  }
  scopedFunction(); // This will throw an error since scopedFunction is not available here.
  // Solution: Move the function declaration outside of the block or use function expressions.
  const scopedFunctionCorrect = function () {
    console.log('This function is scoped properly.');
  };
  scopedFunctionCorrect();
  // Pros: Ensures consistent scoping rules.
  // Cons: May require refactoring.

  // 33. Expiring TODO comments
  // TODO: Refactor this code // unicorn/expiring-todo-comments
  // Solution: Add an expiration or deadline to the TODO comment.
  // TODO: Refactor this code by 2024-12-31.
  // Pros: Helps in tracking and prioritizing TODOs.
  // Cons: Requires ongoing maintenance.

  // 34. No function reference in iterator
  const numbersf = [1, 2, 3];
  numbers.forEach(function (num) {
    // unicorn/no-fn-reference-in-iterator (off, so no issue here)
    console.log(num);
  });
  // Solution: Use an arrow function if needed.
  numbers.forEach((num) => {
    console.log(num);
  });

  // 35. No keyword prefix
  const defaultConfig = {}; // unicorn/no-keyword-prefix (off, so no issue here)
  // Solution: No action required as the rule is off.

  // 36. Nested ternary operators
  const resultf = condition1 ? 'a' : condition2 ? 'b' : 'c'; // unicorn/no-nested-ternary
  // Solution: Use if-else statements instead.
  let resultCorrecdt;
  if (condition1) {
    resultCorrect = 'a';
  } else if (condition2) {
    resultCorrect = 'b';
  } else {
    resultCorrect = 'c';
  }
  // Pros: Improves readability.
  // Cons: May require more lines of code.

  // 38. Prevent abbreviations
  const maxItems = 100; // unicorn/prevent-abbreviations
  // Solution: Use full and descriptive variable names.
  const maximumItems = 100;
  // Pros: Improves code clarity.
  // Cons: May lead to longer variable names.

  // 39. Regex shorthand
  const regex_ = /\d+/; // unicorn/regex-shorthand
  // Solution: Use regex shorthand for clarity.
  const regexCorrect_ = /\d+/u;
  // Pros: Modern and clear regex usage.
  // Cons: Requires understanding of regex shorthand.

  // 40. Throwing new errors
  throw 'Error occurred'; // unicorn/throw-new-error
  // Solution: Use the Error constructor.
  throw new Error('Detailed error message');
  // Pros: Provides better error handling.
  // Cons: Requires using standard error creation methods.

  // 29. Using a non-standard error type
  throw new Error('This is a general error'); // unicorn/prefer-type-error
  // Solution: Use TypeError for type-related errors.
  throw new TypeError('This is a type-related error');
  // Pros: More specific error type.
  // Cons: Requires understanding of specific error types.

  // 31. Custom error definition
  class CustomError extends Error {
    // unicorn/custom-error-definition (off, so no issue here)
    constructor(message) {
      super(message);
      this.name = 'CustomError';
    }
  }
  throw new CustomError('Custom error message'); // No solution needed as the rule is off.

  // 32. Descriptive and clear error messages
  throw new Error('Error occurred'); // unicorn/error-message
  // Solution: Provide a more descriptive error message.
  throw new Error('Detailed error message explaining the issue.');
  // Pros: Makes debugging easier.
  // Cons: Requires more thoughtful error messages.
}

const { exec } = require('child_process');
exec(userInput); // Unsafe child_process exec call

const unsafeRegex = /^(a+)+$/;
const unsafeInput = 'aaaaaaaaaaaaaaaaaaaaaaaaa!';
console.log(unsafeRegex.test(unsafeInput));

const userInput = 'key';
const obj = {};

obj[userInput] = 'value'; // Insecure object injection
console.log(obj[userInput]);

const moduleName = userInput;
const myModule = require(moduleName);
myModule.run(); //detect-non-literal-require

const A_SECRET =
  'ZWVTjPQSdhwRgl204Hc51YCsritMIzn8B=/p9UyeX7xu6KkAGqfm3FJ+oObLDNEva';

const AWS_TOKEN = 'AKIAIUWUUQQN3GNUA88V';
