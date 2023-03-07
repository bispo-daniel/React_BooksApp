import '../Css/Header.css'
import { Component } from 'react'
import reactLogo from '../Images/logo.svg'
import linkedinLogo from '../Images/linkedin.svg'
import githubLogo from '../Images/github.svg'

class Header extends Component {
    render(){
        return (
            <header>
                <img src={reactLogo} alt="" srcSet="" className='reactLogo'/>
                <div>
                    <a href="https://linkedin.com/in/bispo-daniel" target={'_blank'} rel="noreferrer">
                        <img src={linkedinLogo} alt="" srcSet="" className="bootLogos"/>
                    </a>
                    <a href="https://github.com/bispo-daniel" target={'_blank'} rel="noreferrer">
                        <img src={githubLogo} alt="" srcSet="" className="bootLogos"/>
                    </a>
                </div>
            </header>
        )
    }
}

export default Header