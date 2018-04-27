class CreateTodos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      t.string :key
      t.boolean :archived
      t.integer :priority_area
      t.integer :priority_order

      t.timestamps
    end
  end
end
