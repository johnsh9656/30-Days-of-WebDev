import reactLogo from './assets/react.svg'
import hardImg from './assets/hard.jpg'
import './MiniPortfolio.css'
import Socials from './Socials'
import TechStack from './TechStack'

function MiniPortfolio() {

  return (<>
    <div className="container">
      <div className="column">
        <img className="main-img" src={hardImg} />
        <h2>Software Engineering Student</h2>
        <hr></hr>
        <Socials />
        <ul className="left-info">
          <li>💻 McMaster Software Engineering '28</li>
          <li>📈 Data Analyst at TELUS INTERNATIONAL</li>
          <li>✅ Open to work!</li>
        </ul>
      </div>
      <div className="column">
        <h1>HARRISON JOHNS</h1>
        <hr></hr>
        <div className="about-section">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea assumenda incidunt quos labore voluptatibus, sit esse modi, odio facere non fugit quasi molestiae a vero?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea assumenda incidunt quos labore voluptatibus, sit esse modi, odio facere non fugit quasi molestiae a vero?</p>
          <a className="resume-link" href="https://drive.google.com/file/d/12DGZSQz5588MI2Om2uxhRwyyMMxvIo-O/view?usp=sharing">📄 Resume</a>
        </div>
        <TechStack />
      </div>
    </div>
  </>)
}

export default MiniPortfolio