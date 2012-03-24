require 'right_aws'
require 'yaml'

Dir["models/**/*.rb"].sort.each {|file| require_relative "../#{file}" if file.include?(".rb") }