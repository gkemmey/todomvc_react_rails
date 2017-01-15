class Todo < ApplicationRecord
  before_validation { |t| t.title.try(:strip!) }
  validates :title, presence: true

  scope :belonging_to, -> (session_user_id) { where(session_user_id: session_user_id) }

  def attributes_for_react
    attributes.deep_transform_keys { |key| key.to_s.camelize(:lower) }
  end
end
