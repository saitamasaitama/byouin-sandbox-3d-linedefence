const $Scene=Scene.CreateScene()
InputSet()

for(let i=0;i<12;i++){
  const sphere=Primitive.Sphere(0x00FF00,0.1)
  const v=Vector3.FromEuler(0,30*i,0)
  sphere.position.x=v.x
  sphere.position.y=v.y
  sphere.position.z=v.z
//  alert([v.x,v.y,v.z])
  $Scene.add(sphere);
}

const character=Primitive.Cylinder()

$Scene.add(character)





$Scene.Begin(function(delta){
	const movedelta=$Pad.Delta()
	
	const f=Vector3.Forward(movedelta.length*delta)
	const fa=f.applyEuler(Euler.From(0,movedelta.deg,0))
	character.position.x+=fa.x*0.5
	character.position.z+=fa.z*0.5
  /*
  Debug.Log(
  		[
    			$Scene.camera.rotation.x.toFixed(1),
      		$Scene.camera.rotation.y.toFixed(1),
       		$Scene.camera.rotation.z.toFixed(1)
       ]
       +"<br>"+
       [
       		$Scene.camera.position.x.toFixed(1),
      		$Scene.camera.position.y.toFixed(1),
       		$Scene.camera.position.z.toFixed(1)
       ]
  )*/
})