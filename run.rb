require "rubygems"
require "sinatra"
set :public, File.dirname(__FILE__) + '/assets'
set :views, ['views']

get "/" do
  @javascripts = [['/javascripts/jquery.js', "/javascripts/jquery-ui.js", '/javascripts/EvE.js', '/javascripts/base64.js']]
  @javascripts << Dir.glob(File.join([File.dirname(__FILE__), "assets/javascripts/EvE/Core/**/*.js"])).map { |file| file.gsub(File.join([File.dirname(__FILE__), "assets"]), "") }
  @javascripts << Dir.glob(File.join([File.dirname(__FILE__), "assets/javascripts/EvE/Game/**/*.js"])).map { |file| file.gsub(File.join([File.dirname(__FILE__), "assets"]), "") }
  
  @javascripts = @javascripts.flatten
  erb :editor
end
