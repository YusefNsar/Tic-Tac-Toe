import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import XIcon from "../images/XIcon.png";
import OIcon from "../images/OIcon.png";

class Home extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  state = {
    openSelector: false,
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  selectorToggle = () => {
    this.setState({
      openSelector: !this.state.openSelector,
    });
  };

  handleClickOutside(event) {
    if (
      this.state.openSelector &&
      this.wrapperRef &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.selectorToggle();
    }
  }

  render() {
    return (
      <Fragment>
        <Grid container justify="center" style={{ width: "100%" }}>
          <Grid className="centering" item xs={2}>
            <img className="menuIcons2" src={OIcon} alt="oIcon" />
          </Grid>
          <Grid item xs={8}>
            <h1 id="title">Tic-Tac-Toe</h1>
          </Grid>
          <Grid className="centering" item xs={2}>
            <img className="menuIcons" src={XIcon} alt="xIcon" />
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          spacing={8}
          style={{ marginTop: 200 }}
        >
          <Grid item>
            {!this.state.openSelector ? (
              <div
                className="buttonStyle centering buttonStyleAssests"
                onClick={this.selectorToggle}
              >
                <Typography variant="body1">
                  P <small>v.s.</small>AI
                </Typography>
              </div>
            ) : (
              <div ref={this.wrapperRef} className="buttonStyle centering">
                <Link to="/aivsx" style={{ textDecoration: "none" }}>
                  <div
                    className="buttonStyle2 centering"
                    style={{ borderRight: "1px solid black" }}
                  >
                    X
                  </div>
                </Link>
                <Link to="/aivso" style={{ textDecoration: "none" }}>
                  <div className="buttonStyle2 centering">O</div>
                </Link>
              </div>
            )}
          </Grid>
          <Grid item>
            <Link to="/pvp" style={{ textDecoration: "none" }}>
              <div className="buttonStyle centering buttonStyleAssests">
                <Typography variant="body1">
                  P <small>v.s.</small>P
                </Typography>
              </div>
            </Link>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default Home;
