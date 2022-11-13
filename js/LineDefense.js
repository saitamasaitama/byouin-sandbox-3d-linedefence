class Teams{
	constructor(A,B){
		this.A=A
		this.B=B
	}
	static FromAB(A,B){
		return new Teams(A,B)
	}
	
	Update(delta){
		this.A.Update(delta),
		this.B.Update(delta)
	}

}
class Team{
	constructor(c=[]){
		this.characters=c
	}
	
	static From(c=[]){
		return new Team(c)
	}
	
	Update(delta){
		for(const c of this.characters){
			c.Update(delta);
		}
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
		}
		this.update=update
		this.pos=0
		this.model=null
	}
	
	static rand(){
		return (Math.random()*100+  Math.random()*100).toFixed(0)
	}
	
	static Random(){
		return new Character()
	}
	Forward(){
		return this.pos/100
	}
	Speed(){
		return this.status.A /100;
	}
	
	Update(delta){
		this.update(delta)
		//Debug.Log(this.model.position.x)
		this.pos+=this.status.A*delta
	}
}

class CharacterAI{
	static basicAI(){
	  return function(delta){
	  
	  } 
	}

}

const $TeamA=Team.From([
	Character.Random(),
	Character.Random(),
	Character.Random(),
	Character.Random(),
	Character.Random()
])

const $TeamB=Team.From([
	Character.Random(),
	Character.Random(),
	Character.Random(),
	Character.Random(),
	Character.Random()
])

const $Teams=Teams.FromAB($TeamA,$TeamB)