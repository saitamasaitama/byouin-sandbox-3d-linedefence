class Team{
	constructor(c=[]){
		this.characters=c
	}
	
	static From(c=[]){
		return new Team(c)
	}
	
	Forward(){
		const f=[];
		for(const c of this.characters){
		  f.push(c.Forward())
		}
		f.sort()
		alert(f)
	}

}

class Character{
	constructor(status={
	 A:100, 
	 B:100, 
	 C:100, 
	 D:100, 
	 E:100
	}){
		this.status=status
		this.pos=0
	}
	static rand(){
		return (Math.random()*100+  Math.random()*100).toFixed(0)
	}
	static Random(){
		return new Character({
			A:Character.rand()
			B:Character.rand()
			C:Character.rand()
			D:Character.rand()
			E:Character.rand()
		})
	}
	
	Update(delta){
		pos+=this.status.A*delta
	
	}
}