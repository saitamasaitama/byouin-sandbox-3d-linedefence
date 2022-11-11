function getPosition(){
	const result=navigation.geolocation;
	
	return result;
}

function getTokyo(){

	const tokyo={
		lat:-35.4122,
		lon:139.4130
	}
	
	return Vector3.FromLatLong(tokyo.lat,tokyo.lon);
	

}