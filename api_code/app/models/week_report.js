const baseModel      = require('./base'),
      bookshelf      = require('bookshelf')(baseModel.knex);

let WeekReport = bookshelf.Model.extend({
  tableName: 'reporte_semanal',
});

module.exports = {
  WeekReport : WeekReport
};
