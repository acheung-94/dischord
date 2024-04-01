# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!
Jbuilder.key_format camelize: :lower #backend to frontend
Jbuilder.deep_format_keys true #all levels of keys