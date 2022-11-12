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
		return f
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
	
	Update(delta){
		this.update(delta)
		this.pos+=this.status.A*delta
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

const $Teams=Teams.From($TeamA,$TeamB)