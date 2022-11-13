class Primitive{

	static Plane(color=0x888888,w=1,h=1,wd=1,hd=1){
	 	const g = new THREE.PlaneGeometry(w,h,wd,hd);
  		const m = new THREE.MeshStandardMaterial({color:color});
  		const plane=new THREE.Mesh(g,m)
  		
  		//plane.rotation.x=DegToRad(-90)
  		return plane;
	}
	static Box(color=0x444400,w=1,h=1,d=1){
	  	const g = new THREE.BoxGeometry(w,h,d);
  		const m = new THREE.MeshStandardMaterial({color:color});
  		const box=new THREE.Mesh(g,m)
  		return box;
	}
  static Sphere(color=0x888888,radius=0.5,w=32,h=16){
  	const g = new THREE.SphereGeometry(radius,w,h);
  	const m = new THREE.MeshStandardMaterial({color:color});
  	const sphere=new THREE.Mesh(g,m)
  	return sphere;
  }
  static Cylinder(color=0x88FF88,t=0.5,b=0.5,h=2,s=16){
 	const g = new THREE.CylinderGeometry(t,b,h,s);
  	const m = new THREE.MeshBasicMaterial({color:color});
  	const result= new THREE.Mesh(g,m)
  	result.position.y=h/2.0;
  	
  	return result;
  }
  
  static Circle(color=0x888888,r=1,s=16){
 	const g = new THREE.CircleGeometry(r,s);
  	const m = new THREE.MeshBasicMaterial({color:color});
  	return new THREE.Mesh(g,m)
  }
  
  static Line(color=0x00FF00,width=3,points=[]){
  
    const m=new THREE.LineBasicMaterial({color:color,width:width})
    const g =new THREE.BufferGeometry().setFromPoints(points);
    const line=new THREE.Line(g,m);
    return line;
  
  }
  
static LineLoop(color=0x00FF00,width=3,points=[]){
  
    const m=new THREE.LineBasicMaterial({color:color,width:width})
    const g =new THREE.BufferGeometry().setFromPoints(points);
    const line=new THREE.LineLoop(g,m);
    return line;
  
  } 
  //赤道を表現
  static LineRing(color=0xFF0000,width=3,radius=30){
  
    const points =[];
    for(let i=0;i<60;i++){
    		points.push(Vector3.FromLatLong(0,360/60*i,radius))
    }
    const m=new THREE.LineBasicMaterial({color:color,width:width})
    const g =new THREE.BufferGeometry().setFromPoints(points);  
   const line=new THREE.LineLoop(g,m);
   return line;
  }
  
  static LineRingY(color=0x00FF00,width=8,radius=30){
    
    const points =[];
    for(let i=0;i<60;i++){
        const v=Vector3.FromLatLong(360/60*i,0,radius)
    		points.push(v)		
    	}
    	
    const m=new THREE.LineBasicMaterial({color:color,width:width})
    const g =new THREE.BufferGeometry().setFromPoints(points);  
   const line=new THREE.LineLoop(g,m);
   return line;
   
  } 
  
  static SphereCircle(lat,lon,length=10,radius=10,edges=10){		const points=[];
  		const bow=Vector3.Forward(length)
  			.applyEuler(Euler.From(lat,lon,0))
  		points.push(Vector3.Zero())
	//Y回転してからクォータニオン
		for(let i=0;i<edges;i++){
			const e=Euler.From(0,36*i,0);
			const a=Euler.From(lat,lon,0);
			let bow=Vector3.Forward(16); 
			bow=bow.applyEuler(a)
			let pin=Vector3.Forward(1)
			pin=pin.applyEuler(a);
			
			
			const vp=bow.add(pin.applyEuler(e))
			//alert(vp.x+":"+vp.y+":"+vp.z)
			points.push(vp);
		}
		return Primitive.LineLoop(0xFFFFFF,4,points);
	}
	
 	static BillBoard(src,done=function(){}){
 	     let width;
 	     let height;
 		const texture = new THREE.TextureLoader()
 		  .load(src,function(tex){
 		  	height=tex.image.height
 		  	width=tex.image.width
 		  });
 		
        //マテリアルにテクスチャ貼り付け
        const m = new THREE.MeshBasicMaterial({
            map: texture,
            transparent:true
        });
    		const g =new THREE.PlaneGeometry(1,1);
        
    		const mesh = new THREE.Mesh(g,m)
    		mesh.rotation.y=DegToRad(0)
    		mesh.position.y=1
    		return mesh;   
	 }
  
  static Octahedron(color=0xFF00FF,radius=1){
 	const m=new THREE.MeshStandardMaterial({color:color})
    const g =new THREE.OctahedronGeometry(radius);    
  	return new THREE.Mesh(g,m)
  }
  
  static Cone(color=0xFFFF00,radius=0.5,height=1){
  	const m=new THREE.MeshStandardMaterial({color:color})
    const g =new THREE.ConeGeometry(radius,height);    
  	return new THREE.Mesh(g,m)
  }
  
  static Group(items=[]){
 	 const group=new THREE.Group();
 	 for(const item of items){
 	 	group.add(item);
 	 }
 	 return group;
  }
}//end primitive

class Model{
	static EZHuman(color=0xBB0000){
	  	const sphere=Primitive.Sphere(color,0.25)
	 	const cone=Primitive.Cone(color,0.3,1.2)

		sphere.position.y=1.2 
		cone.position.y=0.6
	  //てるてる坊主
	  const group=Primitive.Group([
	  	sphere,
	  	cone
	  ])
	  return group
	}

}
