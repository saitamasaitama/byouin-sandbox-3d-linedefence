const h= 36;
const w= 36;
const radius=25.1
const $Scene=Scene.CreateScene()

const sphere=Primitive.Sphere(0x000088,25)
$Scene.add(sphere)
const polerN=Primitive.Cylinder(0xFF0000)
polerN.position.y=25
$Scene.add(polerN)
const polerS=Primitive.Cylinder(0x00FF00)
polerS.position.y=-25
$Scene.add(polerS)
let circle=Primitive.Circle(0xFFFF00,3)
let e=Euler.From(-90,0,0)
circle.rotation.set(e.x,e.y,e.z)
circle.position.y=25
$Scene.add(circle)
circle=Primitive.Circle(0xFFFF00,3)
e=Euler.From(90,0,0)
circle.rotation.set(e.x,e.y,e.z)
circle.position.y=-25
$Scene.add(circle)
$Scene.add(Primitive.LineRing(0xFF0000,8,26))
$Scene.add(Primitive.LineRingY(0x00FF00,8,26))

const PrefCoordinates=[];	

for(let i=0;i<47;i++){
	PrefCoordinates.push(PrefGeoMaster.features[i].geometry.coordinates)
for(let j=0;j<PrefCoordinates[i].length;j++) {
for(let k=0;k<PrefCoordinates[i][j].length;k++) { 
			const points=[];
			for(const item of PrefCoordinates[i][j][k]){
			    const lon=item[0]
				const lat=item[1]
				
				const v =Vector3.FromLatLong(lat,lon,radius);
				
				points.push(v);
			}
			$Scene.add(Primitive.Line(0xFF0000,3,points))
		}
	}
}

const master=StationMaster[0]
for(item of StationMaster){
	const point=Primitive.Circle(0x00FF00,0.005)
	const pos=Vector3.FromLatLong(item.lat,item.lon,25.1)
	point.rotation.y=DegToRad(-180)
	point.position.x=pos.x
	point.position.y=pos.y
	point.position.z=pos.z
	//alert(point.x+":"+point.y+":"+point.z)
	
	$Scene.add(point)
	
}

const tokyo=Vector3.FromLatLong(35,135);


$Scene.camera.position.x=tokyo.x
$Scene.camera.position.y=tokyo.y
//Debug.Log("ugoiteru?")

InputSet()
setInterval(function(){$Scene.Update(
 function(delta){
 	
 }
)},33)