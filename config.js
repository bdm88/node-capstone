'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/recipes';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-recipes';
exports.PORT = process.env.PORT || 8080;