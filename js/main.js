
const $Scene=Scene.CreateScene()

InputSet()


const length=10
const Box=Primitive.Box(0xCCCC66,length,0.1,2)
Box.position.x=length/2
$Scene.add(Box) 

const octa=Primitive.Octahedron(0xFF6644,0.25,0.25);
const cone=Primitive.Cone(0xFFFF00,0.25);
octa.position.y=0.5
cone.position.y=1
const character=Primitive.Group([
	cone,
	octa
]);
$Scene.add(character)


//pin
for(let i=0;i<6;i++){
	const pin=Primitive.Cylinder(0x00FF00,0.1,0.1)
	pin.position.z=-1
	pin.position.x=-length/2 +  i*2
	Box.add(pin)
}





$Scene.camera.position.z=6
$Scene.camera.position.x=0


//$Scene.LookAt(-5,0,0)
//$Scene.camera.rotation.y-=50
$Scene.Begin(function(delta){
	const movedelta=$Pad.Delta()
	
	const f=Vector3.Forward(movedelta.length*delta)
	const fa=f.applyEuler(Euler.From(0,movedelta.deg,0))
	
	character.position.x+=0.3*delta
	
	$Scene.camera.position.x=character.position.x
//	character.position.x+=fa.x*0.5
//	character.position.z+=fa.z*0.5
})