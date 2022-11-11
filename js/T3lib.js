class Debug{
	static Log(src){
		$("#Debug").html(src)
	}
}
function DegToRad(deg){
	return THREE.MathUtils.degToRad(deg);
}
function RadToDeg(rad){
	return THREE.MathUtils.radToDeg(rad);
}

class TextQuad{
	static Create(){
	
	    const canvas=$("<canvas></canvas>");
	    $("body").append(canvas)
	    
		const context=canvas[0].getContext("2d")
		context.canvas.width=200;
		context.canvas.height=200;
		context.fillStyle = 'black';
  		context.font = "20px serif";
  		context.fillText("hhh",0,0);
  		
  		const canvasTexture=new THREE.CanvasTexture(canvas[0]);
  		alert(65)
	}
}

class Scene{
  constructor(){
		this.scene=new THREE.Scene();
		this.item = [];
		this.renderer = new THREE.WebGLRenderer();
    		const canvas=$(this.renderer.domElement);
    		this.renderer.setSize( window.innerWidth, window.innerHeight );
    		$("body").append(canvas);
    		this.camera = new THREE.PerspectiveCamera(45, 
    window.innerWidth / window.innerHeight,0.1, 1000 );
    		this.renderer.setPixelRatio(window.devicePixelRatio);
    		this.camera.up = new THREE.Vector3( 0, 1, 0 )
    		
    		this.camera.position.y=2.0
    		this.camera.position.z=5
    		
    		this.scene.background=new THREE.Color(0x444444)
    		const light = new THREE.AmbientLight(0x444444, 1.0);
    		const dlight = new THREE.DirectionalLight(0xFFFFFF, 1);
     	dlight.rotation.x=0.25*Math.PI
    		this.scene.add(light);
    		this.scene.add(dlight);
    	    this.trackball = new THREE.TrackballControls(this.camera,document.body)
    		
	} 
 	static CreateScene(){
    		const result=new Scene();
    		return result;
    }
    
    LookAt(x,y,z){
    		this.camera.lookAt(x,y,z)
    }
    
    CameraReset(){
    		this.camera.position.y=10
    		const center=this.Center2D()
    		
    		this.camera.position.z=5
    		this.camera.position.x=0
    		
    		this.camera.rotation.x=DegToRad(80)
    		this.camera.rotation.y=0
    		this.camera.rotation.z=0
    		
    		//this.camera.lookAt(0,2,0)
    		
    		
    		
    		
    }
    Center2D(){
    		return new THREE.Vector2(
    		window.innerWidth/2,
    		window.innerHeight/2
    		);
    }
    Rotate(x,y,z){
  		
    		this.scene.rotation.x+=DegToRad(x);
    		this.scene.rotation.y+=DegToRad(y);
    		this.scene.rotation.z+=DegToRad(z);
    }
    
    add(o){
    		this.scene.add(o);
    		return this;
    }  
    
    Begin(update,fps=30){
        	const interval = 1000 / fps;
   		setInterval(function(){$Scene.BeginUpdate(update)}
   		,interval)
    }
	BeginUpdate(update,fps=30){
		const delta = 1/fps;
		update(delta)
		this.trackball.update()
	  	this.renderer.render( this.scene, this.camera );
	}
		
}//Scene end

function Color(x){
  return new THREE.Color(x);
}

function V3(x,y,z){
	return new THREE.Vector3(x,y,z);
}
class Euler{
	static From(x,y,z){
		x=THREE.MathUtils.degToRad(x)
		y=THREE.MathUtils.degToRad(y)
		z=THREE.MathUtils.degToRad(z)
		return new THREE.Euler(x,y,z);
	}
	
	static ToText(e){
	  	const x = THREE.MathUtils.radToDeg(e.x).toFixed(1);
	 	const y = THREE.MathUtils.radToDeg(e.y).toFixed(1);
		const z = THREE.MathUtils.radToDeg(e.z).toFixed(1);
	  return [x,y,z];
	}

}
class Quaternion{
	
	static Euler(x,y,z){
		const q=new THREE.Quaternion()
		q.setFromEuler(Euler.From(x,y,z))
		return q;	
	}	
}

class Vector2{
	static Length(a,b){
		return a.distanceTo(b)
	}
	
	static From(x,y){
		return new THREE.Vector2(x,y);
	}

}

class Vector3{
	static From(x,y,z){
		return new THREE.Vector3(x,y,z)
	}
	static Up(length){
		return new THREE.Vector3(0,length,0)
	}
	static Back(length){
		return new THREE.Vector3(0,-length,0)
	}
	static Zero(){
		return new THREE.Vector3(0,0,0)
	}
	static PrimeMeridian(length=1){
		const v=Vector3.Forward(length)
		return v
	}
	static Forward(length=1){
		return new THREE.Vector3(0,0,length)
	}
	
	static FromLatLong(lat,lon,length=10){
		lat=THREE.MathUtils.degToRad(lat)
		lon=THREE.MathUtils.degToRad(lon)
		
		const e=new THREE.Euler(lat,lon,0)
		
		const v=Vector3.Forward(length);
		return v.applyEuler(e)
	}
	
	static FromLatLongFlat(lat,lon,length=10){
		lat=THREE.MathUtils.degToRad(lat)
		lon=THREE.MathUtils.degToRad(lon)
		
		const e=new THREE.Euler(lat,lon,0)
		const v=Vector3.Forward(length);
		let v2= v.applyEuler(e)
		v2.z=0;
		return v2;
	}
	static FromEuler(x,y,z,length=1){
		
		let v=Vector3.Forward(length)
		v=v.applyEuler(Euler.From(x,y,z))
		return v
	}
}


function Group(){
  return new THREE.Group();
}



class GameObject{
	constructor(update){
		this.OnUpdate=update
	}
	
	Update(delta){
		this.OnUpdate(delta);
	}
}

function GameObjectx(
  position={x:0,y:0,z:0},
  rotation={x:0,y:0,z:0},
  scale={x:1,y:1,z:1}
){
  const geometry = new THREE.BoxGeometry( scale.x, scale.y, scale.z );
  const material = new THREE.MeshStandardMaterial( { color:0x44EE44 } );
  const mesh= new THREE.Mesh( geometry, material );
  mesh.position.x=position.x;
  mesh.position.y=position.y;
  mesh.position.z=position.z;
  return mesh;
}

