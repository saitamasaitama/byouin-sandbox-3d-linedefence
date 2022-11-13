
const $Scene=Scene.CreateScene()

InputSet()


const length=10
const Box=Primitive.Box(0xCCCC66,length,0.1,2)
Box.position.x=length/2
$Scene.add(Box) 

const humans=[];
const hu=[];
for(let i=0;i<$TeamA.characters.length;i++){
    const c=$TeamA.character[i];
	const human=Model.EZHuman()
	
	const v=Vector3.Forward(0.5)
	const e=v.applyEuler(Euler.From(0,72*i,0))
	human.position.x=e.x
	human.position.z=e.z
    $TeamA.characters[i].model=human
	$Scene.add(human)
	humans.push(human)
}

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
	$Teams.Update(delta)
	const f=Vector3.Forward(movedelta.length*delta)
	const fa=f.applyEuler(Euler.From(0,movedelta.deg,0))
	
	//character.position.x+=0.3*delta
	for(const human of humans){
		human.position.x+=0.3*delta
	}
	$Scene.camera.position.x+=0.3*delta

})