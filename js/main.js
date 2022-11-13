
const $Scene=Scene.CreateScene()

InputSet()

const length=10
const Box=Primitive.Box(0xCCCC66,length,0.1,2)
Box.position.x=length/2
$Scene.add(Box)  

for(let i=0;i<$TeamA.characters.length;i++){
    
    const c=$TeamA.characters[i];
	const human=Model.EZHuman()	
	
	const v=Vector3.Forward(0.5)
	const e=v.applyEuler(Euler.From(0,72*i,0))
	human.position.x=e.x
	human.position.z=e.z
	$Scene.add(human)
	c.model=human
	
}

for(let i=0;i<$TeamB.characters.length;i++){
    const c=$TeamB.characters[i];
	const human=Model.EZHuman(0x008800)	
	const v=Vector3.Forward(0.5)
	const e=v.applyEuler(Euler.From(0,72*i,0))
	human.position.x=e.x+5 
	human.position.z=e.z
	$Scene.add(human)
	c.model=human
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


$Scene.Begin(function(delta){
	const movedelta=$Pad.Delta()
	$Teams.Update(delta)
	for(const human of $TeamA.characters){
	    	human.model.position.x =human.Forward()
	}
	for(const human of $TeamB.characters){
	    	human.model.position.x =20-human.Forward()
	}
	Debug.Log($TeamA.Forward())
	$Scene.camera.position.x=$TeamA.Forward()
})