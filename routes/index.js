
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'PupChat' });
};
exports.test = function(req, res){
  res.render('test', { title: 'Layout Testing' });
};