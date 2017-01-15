class TodosController < ApplicationController
  def index
    @props = respond_to_react
  end

  def create
    Todo.belonging_to(session_user).create(todo_params)

    respond_to do |format|
      format.json { render json: respond_to_react }
    end
  end

  def toggle
    @todo = Todo.belonging_to(session_user).find(params[:id])
    @todo.update_attributes(is_completed: !@todo.is_completed)

    respond_to do |format|
      format.json { render json: respond_to_react }
    end
  end

  private

    def todo_params
      params.require(:todo).permit(:title, :is_completed)
    end

    def respond_to_react
      {
        todos: Todo.belonging_to(session_user).order(created_at: :asc).collect(&:attributes_for_react),
        meta: {
          addTodoPath: todos_path(format: :json),
          toggleTodoPath: toggle_todo_path(id: ':id', format: :json)
        }
      }
    end
end
