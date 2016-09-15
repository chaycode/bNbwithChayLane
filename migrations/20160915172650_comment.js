
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment_tbl', function(table){
    table.increments().primary()
    table.text('comment')
    table.integer('post_id')
    table.integer('user_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment_tbl')

};
