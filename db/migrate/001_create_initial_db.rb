class CreateInitialDb < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string  :title
      t.boolean :is_completed, default: false
      t.string  :session_user_id
      
      t.timestamps null: false
    end
  end
end
