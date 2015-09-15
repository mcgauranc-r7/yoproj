/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */
'use strict';




// Get a Company
exports.getCompany = function(req, res) {


};
function handleError(res, err) {
    return res.status(500).send(err);
}