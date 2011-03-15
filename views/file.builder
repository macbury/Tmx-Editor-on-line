xml.instruct!
xml.waypoints do
  params[:waypoints].each do |index, waypoint|
    xml.waypoint :id => waypoint.id
  end
end