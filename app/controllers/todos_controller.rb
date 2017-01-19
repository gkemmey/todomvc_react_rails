class TodosController < ApplicationController
  def index
    @props = respond_to_react
  end

  def create
    @todo = Todo.belonging_to(session_user).create(todo_params)

    respond_to do |format|
      format.json { render json: @todo.attributes_for_react }
    end
  end

  def update
    @todo = Todo.belonging_to(session_user).find(params[:id])

    respond_to do |format|
      format.json do
        if @todo.update_attributes(todo_params)
          head :ok
        else
          render status: 422
        end
      end
    end
  end

  def update_multiple
    @todos = Todo.belonging_to(session_user).where(id: params[:ids])
    @todos.update_all(completed: params[:completed])

    respond_to do |format|
      format.json { head :ok }
    end
  end

  def destroy
    @todo = Todo.belonging_to(session_user).find(params[:id])

    respond_to do |format|
      format.json do
        if @todo.destroy
          head :ok
        else
          render status: 422
        end
      end
    end
  end

  def destroy_multiple
    @todos = Todo.belonging_to(session_user).where(id: params[:ids])
    @todos.destroy_all

    respond_to do |format|
      format.json { head :ok }
    end
  end

  private

    def todo_params
      params.require(:todo).permit(:title, :completed)
    end

    def respond_to_react
      {
        todos: Todo.belonging_to(session_user).order(created_at: :asc).collect(&:attributes_for_react),
        meta: {
          addTodoPath:              todos_path(format: :json),
          updateTodoPath:           todo_path(id: ':id', format: :json),
          updateMultipleTodosPath:  update_multiple_todos_path(format: :json),
          destroyTodoPath:          todo_path(id: ':id', format: :json),
          destroyMultipleTodosPath: destroy_multiple_todos_path(format: :json)
        }
      }
    end
end
