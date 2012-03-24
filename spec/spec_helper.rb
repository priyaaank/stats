require 'right_aws'

Dir["models/**/*.rb"].sort.each {|file| require_relative "../#{file}" if file.include?(".rb") }