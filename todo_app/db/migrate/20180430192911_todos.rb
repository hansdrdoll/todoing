class Todos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      t.json :editor_data, default: {}
    end
    add_reference :todos, :user, foreign_key: true
  end
end
