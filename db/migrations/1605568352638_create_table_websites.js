exports.up = function (knex) {
    return knex.schema.createTable('websites', function (table) {
      table.increments();
table.string('_url').notNullable();
table.string('_status').nullable();

    });
  };exports.down = function (knex) {
    return knex.schema.dropTable('websites');
  };
  