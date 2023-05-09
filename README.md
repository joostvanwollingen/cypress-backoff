# cypress-backoff

[![npm version](https://badge.fury.io/js/cypress-backoff.svg)](https://badge.fury.io/js/cypress-backoff)
 
Convience library to apply different timeout strategies to retried tests. [Inspired by Filip Hric](https://www.linkedin.com/posts/filip-hric_you-can-gradually-increase-timeout-when-your-activity-7061687901197094912-pOZT?utm_source=share&utm_medium=member_desktop).

This repository is not maintained by the Cypress developers. 

## Installation & usage

1. Install the module.

    ```shell
    npm install cypress-backoff
    ```

2. Add the retries to `cypress.config.js`.

    ```javascript
    ...
    module.exports = defineConfig({
        retries: 5,
    ...
    ```

3. Import the module

    ```javascript
    const backoff = require('cypress-backoff')
    ```

4. Add your preferred timeout and strategy in the beforeEach block of your test

    ```javascript
    beforeEach(() => {
        backoff.linear(1000)
    }
    ```

# Available strategies

## linear
Provide the desired timeout increase in milliseconds.

The timeout will increase with this number for every next attempt, i.e. 1000, 2000, 3000...

```javascript
backoff.linear(1000)
```

## exponential
Provide the desired timeout in milliseconds and exponential rate as an integer.

The timeout will be calculated as $T = timeout * exponentialrate^r$

```javascript
backoff.exponential(1000, 2)
```

## fixed
Provide an array with the desired timeout for each subsequent retry. If you allow more retries than elements specified the last element will be used.

```javascript
backoff.fixed([1000, 2000, 3000])
```

## fibonacci
Provide the desired timeout which will be multiplied by the fibonacci number of the retry.

```javascript
backoff.fibonacci(1000)
```

## polynomial
The timeout will be calculated as $T = timeout * retries^e$

```javascript
backoff.polynomial(1000, 2)
```

## custom
Provide a custom function that accepts the retry count as a parameter and returns the desired timeout.

```javascript
backoff.custom((retryCount) => {return retryCount*2000})
```
