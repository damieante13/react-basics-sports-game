//2nd step
class Team extends React.Component{
    //3rd step
    constructor(props){
        super(props)
        this.state={
            shots:0,
            score:0
        }
        this.shotSound=new Audio("./LaserBlasts.mp3")
        this.scoreSound=new Audio("./Jab.mp3")
    }

            handlerShot=()=>{
                let score=this.state.score
                this.shotSound.play()
                if (Math.random()>0.5){
                    score+=1
                    this.scoreSound.play()    
                }
                
            this.setState((state,props)=>({
                shots: state.shots +1,
                score
            }))
            }

    render(){
        let shotPercentageDiv

         if (this.state.shots){
          const shotPercentage= Math.round((this.state.score / this.state.shots) * 100)
          
          shotPercentageDiv=
          (
            <div>
                <strong>Shot %:{shotPercentage}</strong>
            </div>
        )
        }
       
        return(
        <div className="Team">
            <h2>{this.props.name}</h2>

            <div className="identity">
                <img src={this.props.logo} alt={this.props.name} width={100} height={100}/>
            </div>

            <div>
                <strong>Shots:</strong>{this.state.shots}
            </div>

            <div>
                <strong>Score:</strong>{
                    this.state.score}
            </div>
            
            {shotPercentageDiv}

            <button onClick={this.handlerShot}>Shoot!</button>
        </div>
        )
    }
}

//5th step
function Game(props){

return(
    <div className="Game">
        <h1>Welcome to {props.venue}</h1>
        <div className="stats">
      <Team 
            name={props.visitorTeam.name}
            logo={props.visitorTeam.logoSrc} 
      />
<div className="versus"><h1>VS</h1></div>
      <Team 
            name={props.homeTeam.name}
            logo={props.homeTeam.logoSrc}
      />
      </div>
    </div>
)
}

//1st step
function App(props) {
    const coqui={
        name:"Puerto Rico Coqui",
        logoSrc:"./coqui-png-880_862.png"
    }
     const honeyBadgers={
         name:"Clementon Honeybadgers",
         logoSrc:"./badger_PNG43.png" 
     }    
     const bats={
         name:"Gotham Bats",
         logoSrc:"./atomicBatmen.jpeg" 
     }    
     const monsters={
         name:"Fresno Monsters",
         logoSrc:"./monsterTeam.png" 
     }    
    

  return(
    <div className="App">
      <Game 
      venue="Gym 1"
      homeTeam={coqui} 
      visitorTeam={honeyBadgers}/>

      <Game 
      venue="Gym 2"
      homeTeam={bats} 
      visitorTeam={monsters} 
      />
 </div> 
 )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
