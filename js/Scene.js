class Scene{
  constructor(){
		this.scene=new THREE.Scene();
		this.animations=[];
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
    		
    		this.trackball=new THREE.TrackballControls(this.camera,document.body)
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
    
    remove(o){
    		this.scene.remove(o)
    } 
    
    Begin(update,fps=30){
    		
        	const interval = 1000 / fps;
   		setInterval(
   		function(){
   			$Scene.BeginUpdate(update)
   		}
   		,interval)
    }
	BeginUpdate(update,fps=30){
		const delta = 1/fps;
		update(delta)
		for(const animation of this.animations){
			animation.Update(delta)
			if(animation.IsEnd()){
				this.remove(animation.obj)
				
				//this.animations.remove(animation)
			}
		}
		
		
			
		
		
	//	this.trackball.update()
	  	this.renderer.render( this.scene, this.camera );
	}
	AddAnimation(a){
		Debug.Log(a.obj)
		this.add(a.obj)
		this.animations.push(a)
	}
	RemoveAnimation(o){
	  	o.remove()
	}
		
}//Scene end

class Animation{

	constructor(left,obj,animation){
		this.frame=0
		this.left=left;
		this.obj=obj;
		this.animation=animation;
	}
	
	Update(delta){ 
	    Debug.Log(this.left+":"+this.frame)
		this.animation(delta,this.obj) 
		this.left-=delta
		this.frame++
		Debug.Log(this.left+":"+this.frame)
	}
	
	
	IsEnd(){
		return this.left < 0
	}
}