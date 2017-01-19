Rails.application.routes.draw do
  root "todos#index"

  resources :todos, only: [:index, :create, :update, :destroy], path: '' do
    put :toggle, on: :member
    put :update_multiple, on: :collection
    delete :destroy_multiple, on: :collection
  end
end
