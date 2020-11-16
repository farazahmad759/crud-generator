exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
      table.increments();
table.string('name').notNullable();
table.string('email').nullable();
table.number('uid').nullable();

    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };
  