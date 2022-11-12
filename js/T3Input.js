class Pad{
	constructor(){
		this.x=0;
		this.y=0;
		this.dx=0;
		this.dy=0;
		this.on=false
	}
	static Zero(){
		return new Pad()
	}
	
	Start(e){
		this.x=e.pageX;
		this.y=e.pageY;
		this.on=true
	}
	End(){
		this.on=false
	}
	Move(e){
		this.dx=e.pageX
		this.dy=e.pageY
		
		const delta=this.Delta()
		Debug.Log([delta.deg.toFixed(1),delta.length.toFixed(1)])
	}
	Delta(){
		const atan2=Math.atan2(this.dx- this.x,this.dy- this.y)
		const deg=RadToDeg(atan2)
		const A=Vector2.From(this.dx,this.dy)
		const B=Vector2.From(this.x,this.y)
		const l=Vector2.Length(A,B) 
		const sqrt=Math.sqrt(l)
		const clamp=THREE.MathUtils.clamp(sqrt,0.1,10)
		return {
			deg:deg,
			length:this.on?clamp:0
		}
	}

}
const $Pad=Pad.Zero();




function InputSet(){
   
  $("canvas").on("click",function(e){
  })
   
   
   
   //左パッドを使う場合
  	$("#Pad").on("touchstart",function(e){
  		$Pad.Start(e)
 	 });
  
   	$("#Pad").on("touchmove",function(e){
   		$Pad.Move(e)
   	});
    $("#Pad").on("touchend",function(e){
   		$Pad.End()
   	});
}
