
function Team(props){
        let shotPercentageDiv

         if (props.stats.shots){
          const shotPercentage= Math.round((props.stats.score / props.stats.shots) * 100)
          
          shotPercentageDiv=
          (
            <div>
                <strong>Shot %:{shotPercentage}</strong>
            </div>
        )
        }
       
        return(
        <div className="Team">
            <h2>{props.name}</h2>

            <div className="identity">
                <img src={props.logo} alt={props.name} width={100} height={100}/>
            </div>

            <div>
                <strong>Shots:</strong>{props.stats.shots}
            </div>

            <div>
                <strong>Score:</strong>{
                    props.stats.score}
            </div>
            
            {shotPercentageDiv}

            <button onClick={props.handlerShot}>Shoot!</button>
        </div>
        )
    }
function ScoreBoard(props){
return(
    <div className="scoreBoard">
    <div className="teamStats">
    <h3>Visitors</h3>
<h3>{props.visitorTeamStats.score}</h3>
    </div>

    <h3>ScoreBoard</h3>

    <div className="teamStats">
    <h3>Home</h3>
<h3>{props.homeTeamStats.score}</h3>
    </div>
</div>
)
}

class Game extends React.Component{
    constructor(props){
        super(props)
        this.state={
            resetCount:0,
            homeTeamStats:{
                shots:0,
                score:0
            },
            visitorTeamStats:{
                shots:0,
                score:0
            }
        }
        this.shotSound=new Audio("./LaserBlasts.mp3")
        this.scoreSound=new Audio("./Jab.mp3")
    }

    shoot=(team)=>{
        const teamStatsKey=`${team}TeamStats`
        let score=this.state[teamStatsKey].score
        this.shotSound.play()

        if (Math.random()>0.5){
            score+=1
            this.scoreSound.play()    
        }
        
    this.setState((state,props)=>({
        [teamStatsKey]:{
        shots: state[teamStatsKey].shots +1,
        score
        }
    }))
    }

    resetGame=()=>{
        this.setState((state,props)=>({
            resetCount:state.resetCount+1,
            homeTeamStats:{
                shots:0,
                score:0
            },
            visitorTeamStats:{
                shots:0,
                score:0
            }
        }))
    }

render(){
    return(
        <div className="Game">
<ScoreBoard 
visitorTeamStats={this.state.visitorTeamStats}
homeTeamStats={this.state.homeTeamStats}
/>
            <h1>Welcome to {this.props.venue}</h1>
            <div className="stats">
        <Team 
                name={this.props.visitorTeam.name}
                logo={this.props.visitorTeam.logoSrc}
                stats={this.state.visitorTeamStats}
                handlerShot={()=>this.shoot("visitor")} 
        />

    <div className="versus"><h1>VS</h1></div>
     
     <div>
        <strong>Resets:</strong> {this.state.resetCount}<button onClick={this.resetGame}>Reset Game</button>
        </div>

        <Team 
                name={this.props.homeTeam.name}
                logo={this.props.homeTeam.logoSrc}
                stats={this.state.homeTeamStats}
                handlerShot={()=>this.shoot("home")}

        />
        </div>
        </div>
)
}
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
