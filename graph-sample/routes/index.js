// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <IndexRouterSnippet>
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  let params = {
    active: { home: true, mail: true }
  };

  res.render('index', params);
});

module.exports = router;
// </IndexRouterSnippet>
