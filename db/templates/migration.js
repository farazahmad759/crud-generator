exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('uuid').notNullable();
    table.string('_name');
    table.string('_username').notNullable();
    table.string('_email').notNullable();
    table.string('_password').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
