function setDefaultCommandTimeout(timeout) {
    Cypress.log({ name: "defaultCommandTimeout", message: timeout })
    Cypress.config('defaultCommandTimeout', timeout)
}

//https://betterprogramming.pub/fibonacci-algorithm-in-javascript-45743f3a0ff6
function binet(n) {
    return Math.round((Math.pow(1.618033988749895, n) - Math.pow(-0.6180339887498949, n)) / 2.23606797749979);
}

module.exports = {
    linear(timeoutInMilliseconds) {
        setDefaultCommandTimeout(timeoutInMilliseconds * (1 + Cypress.currentRetry))
    },
    exponential(timeoutInMilliseconds, exponentialRate) {
        setDefaultCommandTimeout(timeoutInMilliseconds * Math.pow(exponentialRate, Cypress.currentRetry))
    },
    fixed(timeouts) {
        setDefaultCommandTimeout(timeouts[Cypress.currentRetry] ? timeouts[Cypress.currentRetry] : timeouts[timeouts.length - 1])
    },
    fibonacci(timeoutInMilliseconds) {
        setDefaultCommandTimeout(binet(Cypress.currentRetry) * timeoutInMilliseconds)
    },
    custom(fun) {
        setDefaultCommandTimeout(fun(Cypress.currentRetry))
    },
}