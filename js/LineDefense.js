class Attack{
	constructor(A,B,power){
		this.From=A
		this.To=B
		this.power=power
	}
	static From(A,B,power){
		return new Attack(A,B,power)
	}
	
	Resolve(){
	
		const circle=Primitive.Circle(0xFF0000,1.5)
		//alert(this.From.model.position.x)
		circle.position.x=this.From.model.position.x
		circle.position.y=1
		$Scene.add(circle)
		
		//alert("resolve")
	}
}

class Animation{

	constructor(left,animation){
		this.left=left
	}

	Update(delta){
		animation(delta)
		this.left-=delta
		if(this.left<0){
		   $Scene.RemoveAnimation(this)
		}
	}

}

class Battle{
	constructor(B){
		this.Teams=B
		this.Attacks=[]
	}
	static FromTeams(Teams){
		return new Battle(Teams)
	} 
	
	Update(delta){
		//alert(delta)
		this.Teams.Update(delta,this)
		if(0 < this.Attacks.length){
			const p=this.Attacks.pop()
			p.Resolve()
		}
		
	}
	Attack(a){
		this.Attacks.push(a)
	}
}

class Teams{
	constructor(A,B){
		this.A=A
		this.B=B
	}
	static FromAB(A,B){
		return new Teams(A,B)
	}
	
	Update(delta,battle){
	  
		this.A.Update(delta,this.B,battle)
		this.B.Update(delta,this.A,battle)
	}

}
class Team{
	constructor(c=[]){
		this.characters=c
	}
	
	static From(c=[]){
		return new Team(c)
	}
	
	Update(delta,rival,battle){	 
		for(const c of this.characters){
			c.Update(delta,rival, battle);
		}
	
	}
	
	Top(){
		
		const result=this.characters.sort(function(A,B){
			return (A.Forward() < B.Forward())?1:-1
		});
		return result[0]
	}
	
	Forward(){
		const f=[];
		for(const c of this.characters){
		  f.push(c.Forward())
		}
		f.sort()
		f.reverse()
		return f[0]
	}
}

class Character{

	constructor(update=(delta)=>{}){

		this.status={
			A:Character.rand(),			
			B:Character.rand(),		
			C:Character.rand(),		
			D:Character.rand(),
			E:Character.rand(),
			HP:Character.rand(),
		}
		this.update=update
		this.pos=0
		this.model=null
		this.casttime=this.CastTime()
		
	}
	
	static rand(){
		return (Math.random()*100+  Math.random()*100).toFixed(0)
	}
	
	static Random(){
		return new Character()
	}
	Forward(){
		return this.pos
	}
	Speed(){
		return this.status.A /100;
	}
	
	Update(delta,rival,battle){
		
		this.update(delta)
		if(!this.inRange(rival)){
		 	this.pos+=this.Speed()*delta
		}else{
			if(this.casttime<0){
				this.casttime=this.CastTime()
				battle.Attack(Attack.From(this,rival.Top(),this.Attack()))
				//alert("cast!")
			}
			this.casttime-=delta
		
		}
	}
	
	Range(){
		return this.status.B / 100
	}
	
	CastTime(){
		return this.status.C / 80
	}
	CastTimeUpdate(delta){
		this.casttime-=delta
	}
	ReCastTime(){
			return this.status.D / 40
	}
	
	Attack(){
			return this.status.E / 5
	}
	
	HP(){
			return this.status.HP 
	}
	
	Distance(rival){
		const self=this.pos
		const r=rival.Forward()
		const range=10-self-r
		
		return range
	}
	inRange(rival){
		return this.Distance(rival)<this.Range()
	}
}

class Guage{
	constructor(){
		this.max=100
		this.current=0
	}
}

class CharacterAI{
	static basicAI(){
	  return function(delta){} 
	}
}

const $TeamA=Team.From([
	Character.Random(),
	Character.Random(),
	Character.Random(),
	Character.Random(),
	Character.Random()
]);

const $TeamB=Team.From([
	Character.Random(),
	Character.Random(),
	Character.Random(),
	Character.Random(),
	Character.Random()
]);


const $Teams=Teams.FromAB($TeamA,$TeamB)
const $Battle=Battle.FromTeams($Teams)

//alert($Battle.Teams.Update)

class Mono{


}

class View{


}