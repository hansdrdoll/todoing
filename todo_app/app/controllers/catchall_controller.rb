class CatchallController < ApplicationController
  def index
    render file: 'public/index.html' 
  end
end
