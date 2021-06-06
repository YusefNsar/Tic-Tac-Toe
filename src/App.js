import React, {Component} from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import './App.scss';
import Home from './components/Home'
import Pvsp from './components/Pvsp'
import PaletteIcon from '@material-ui/icons/Palette';

const allTheme = [
  {
    appBackground: 'linear-gradient(90deg,#b92b27, #1565C0)',
    titleColor: 'black',
    titleStroke: '1px white',
    themeButtonBGColor: 'black',
    themeButtonColor: 'white',
    buttonBGColor: 'linear-gradient(45deg,#000, #434343)',
    buttonColor: 'white',
    buttonHover: '#FFDF00',
    playerNameColor: 'black',
    playerUnactive: '#134566',
    playerActive: 'hsl(203, 83%, 56%)',
    cellActive: 'rgba(255, 255, 255, 0.1)',
    cellUnactive: 'rgba(255, 255, 255, 0.03)',
    cellHover: 'rgba(255, 255, 255, 0.06)'
  },
  {
    appBackground: '#FF9505',
    titleColor: '#016FB9',
    titleStroke: '1px white',
    themeButtonBGColor: '#69FFF1',
    themeButtonColor: '#353531',
    buttonBGColor: 'linear-gradient(45deg,#016FB9, #69FFF1)',
    buttonColor: '#353531',
    buttonHover: '#EC4E20',
    playerNameColor: '#170a1c',
    playerUnactive: '#016FB9',
    playerActive: '#69FFF1',
    cellActive: 'rgba(0, 0, 0, 0.13)',
    cellUnactive: 'rgba(0, 0, 0, 0.06)',
    cellHover: 'rgba(0, 0, 0, 0.09)'
  },
  {
    appBackground: 'linear-gradient(90deg,#280000, #550c18)',
    titleColor: '#0B0014',
    titleStroke: '1px #439a86',
    themeButtonBGColor: '#0B0014',
    themeButtonColor: '#439a86',
    buttonBGColor: 'linear-gradient(45deg,#0B0014, #00171f)',
    buttonColor: '#439a86',
    buttonHover: '#EC4E20',
    playerNameColor: '#170a1c',
    playerUnactive: '#00171f',
    playerActive: '#439a86',
    cellActive: 'rgba(255, 255, 255, 0.1)',
    cellUnactive: 'rgba(255, 255, 255, 0.03)',
    cellHover: 'rgba(255, 255, 255, 0.06)'
  },
  {
    appBackground: '#f283b6',
    titleColor: '#240b36',
    titleStroke: '1px #170a1c',
    themeButtonBGColor: '#240b36',
    themeButtonColor: '#99d5c9',
    buttonBGColor: 'linear-gradient(45deg, #2d0320, #240b36)',
    buttonColor: '#99d5c9',
    buttonHover: '#EC4E20',
    playerNameColor: '#99d5c9',
    playerUnactive: '#2d0320',
    playerActive: '#6C074D',
    cellActive: 'rgba(0, 0, 0, 0.13)',
    cellUnactive: 'rgba(0, 0, 0, 0.06)',
    cellHover: 'rgba(0, 0, 0, 0.09)'
  }
]

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: allTheme[0]
    }

    this.themeCounter = 0
  }


  changeTheme = async () => {
    this.themeCounter++
    if (this.themeCounter === allTheme.length) {
      this.themeCounter = 0
    }
    await this.setState({
      theme: allTheme[this.themeCounter]
    })
    const rootStyle = document.documentElement.style
    for (var eleName in this.state.theme) {
      rootStyle.setProperty(`--${eleName}`, this.state.theme[eleName])
    }
  }

  render() {
    return (
      <div className="App">
        <HashRouter basename='/'>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/aivsx">
              <Pvsp player="X" />
            </Route>
            <Route path="/aivso">
              <Pvsp player="O" />
            </Route>
            <Route path="/pvp">
              <Pvsp player="2" />
            </Route>
            <Route component={() => (
                <Typography variant="h1">
                  "Error: path not found"
                </Typography>
              )} />
          </Switch>
        </HashRouter>
        <div className="stylesButton" onClick={this.changeTheme}>
          <PaletteIcon color="inherit" fontSize="small" />
        </div>
      </div>
    );
  };
}

export default App;
