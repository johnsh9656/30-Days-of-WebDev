import './TopBar.css';

function TopBar({ lives, progress, retry }) {
    const progressPercent = `${progress * 100}%`

    return (
        <div className="top-bar">
            <button onClick={retry} className="retry-btn">Retry</button>
            <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{width:progressPercent}}></div>
            </div>
            <p className='lives-text'>💙 <span>{lives}</span></p>
      </div>
    )
}


export default TopBar;