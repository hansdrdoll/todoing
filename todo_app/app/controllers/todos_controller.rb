class TodosController < ApplicationController

  def show
    # TODO: make this find by user_id
    @todo = Todo.find(params[:id])
    render json: @todo.editor_data
  end

  def update
    @todo = Todo.find(params[:id])
    puts todo_params
    @todo.update(todo_params)
  end

  private
  def todo_params
    params.permit(:id, :data)
  end
end
