const { isNil, isEmpty, or, pipe, not } = require('ramda');

const isNilOrEmpty = or(isNil, isEmpty);

const isNotNilOrEmpty = pipe(
    isNilOrEmpty,
    not,
);

module.exports = {
    isNilOrEmpty,
    isNotNilOrEmpty,
};
