class TodosController < ApplicationController
  def index
    @todos = Todo.belonging_to(session_user).order(created_at: :asc)
  end

  def create

  end
end
