class TodosController < ApplicationController
  def index
  end
  def show
    # TODO: make this find by user_id
    @todo = Todo.find(params[:id])
    render json: @todo.editor_data
  end
end
