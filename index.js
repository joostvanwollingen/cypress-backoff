/**
 * @module cypress-backoff
 */

function setDefaultCommandTimeout(timeout) {
    Cypress.log({ name: "defaultCommandTimeout", message: timeout })
    Cypress.config('defaultCommandTimeout', timeout)
}

//https://betterprogramming.pub/fibonacci-algorithm-in-javascript-45743f3a0ff6
function binet(n) {
    return Math.round((Math.pow(1.618033988749895, n) - Math.pow(-0.6180339887498949, n)) / 2.23606797749979);
}

/**
 * Provide the desired timeout increase in milliseconds.
 * The timeout will increase with this number for every next attempt, i.e. 1000, 2000, 3000...
 * @param {number} timeoutInMilliseconds the amount of milliseconds added to the timeout for each retry attempt
 * @example backoff.linear(1000)
 */
function linear(timeoutInMilliseconds) {
    setDefaultCommandTimeout(timeoutInMilliseconds * (1 + Cypress.currentRetry))
}

/**
 * Provide the desired timeout in milliseconds and exponential rate.
 * The timeout will be calculated as T = timeout * exponentialrate ^ r
 * @param {number} timeoutInMilliseconds the base timeout in milliseconds
 * @param {number} exponentialRate the exponent at which the timeout grows 
 * @example backoff.exponential(1000, 2)
 */
function exponential(timeoutInMilliseconds, exponentialRate) {
    setDefaultCommandTimeout(timeoutInMilliseconds * Math.pow(exponentialRate, Cypress.currentRetry))
}

/**
* Provide the desired timeout which will be multiplied by the fibonacci number of the retry.
* @param {number} timeoutInMilliseconds the base amount for the timeout
* @example backoff.fibonacci(1000)
*/
function fibonacci(timeoutInMilliseconds) {
    setDefaultCommandTimeout(binet(Cypress.currentRetry) * timeoutInMilliseconds)
}

/**
 * Provide an array with the desired timeout for each subsequent retry.
 * If you allow more retries than elements specified the last element will be used.
 * @param {number[]} timeouts an array of numbers which will be used in order for the timeout of each retry
 * @example backoff.fixed([1000, 2000, 3000])
 */
function fixed(timeouts) {
    setDefaultCommandTimeout(timeouts[Cypress.currentRetry] ? timeouts[Cypress.currentRetry] : timeouts[timeouts.length - 1])
}

/**
 * Provide a custom function that accepts the retry count as a parameter and returns the desired timeout.
 * @param {function(retries)} fun a function that accepts 1 parameter - the count of retries
 * @example backoff.custom((retryCount) => {return retryCount*2000})
 */
function custom(fun) {
    setDefaultCommandTimeout(fun(Cypress.currentRetry))
}

module.exports = { linear, exponential, fibonacci, fixed, custom }