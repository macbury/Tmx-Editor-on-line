require "rubygems"
require "sinatra"
require 'stringio'
set :public, File.dirname(__FILE__) + '/assets'
set :views, ['views']

get "/" do
  @javascripts = [['/javascripts/jquery.js', "/javascripts/jquery-ui.js", '/javascripts/EvE.js', '/javascripts/jquery.rc.js']]
  @javascripts << Dir.glob(File.join([File.dirname(__FILE__), "assets/javascripts/EvE/Core/**/*.js"])).map { |file| file.gsub(File.join([File.dirname(__FILE__), "assets"]), "") }
  @javascripts << Dir.glob(File.join([File.dirname(__FILE__), "assets/javascripts/EvE/Game/**/*.js"])).map { |file| file.gsub(File.join([File.dirname(__FILE__), "assets"]), "") }
  
  @javascripts = @javascripts.flatten
  erb :editor
end

post "/base64" do
  data = params[:data].unpack('m')
  raw_map_data = StringIO.new(data.join)
  tiles = Array.new
  
  string_map_data = ""
  raw_map_data.to_a.each{|rd| string_map_data << rd}
  t = string_map_data.bytes.to_a
  
  tiles = Array.new(t.size/4)
  0.upto(t.size/4-1){|i| p=0; tiles[i] = t[i*4..i*4+3].inject{|s,n| p+=1; s+n+(p*255*n)} }
  
  tiles.inspect
end

post "/save" do
  params[:waypoints].each do |index, waypoint|
    
  end
end
