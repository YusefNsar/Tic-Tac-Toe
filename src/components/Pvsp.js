import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";

import XIconWin from "../images/XIconWin.png";
import OIconWin from "../images/OIconWin.png";
import noCrown from "../images/noCrown.png";
import aiWin from "../images/ai.png";
import nenene from "../images/nenene.png";

import isWinning from "../utils/isWinning.js";
import findBestMove from "../utils/minmax.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Pvsp extends Component {
  constructor(props) {
    super(props);

    this.turnCounter = 0;

    this.state = {
      arr: [null, null, null, null, null, null, null, null, null],
      turn: 0,
      openWinState: false,
      winner: "D",
      glance: "1",
      aiWinsDraws: 0,
      openSticker: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        turn: 1,
      });
      if (this.props.player === "O") {
        this.aiMove();
      }
    }, 5);
  }

  aiMove = async () => {
    if (this.props.player === "X" && this.state.turn === 2) {
      this.turnCounter++;
      let best;
      if (this.state.arr[4] === null) {
        best = 4;
      } else {
        best = await findBestMove(this.state.arr, "O");
      }
      let newArr = [...this.state.arr];
      newArr[best] = "O";
      await this.setState({
        arr: [...newArr],
        turn: 1,
      });
    } else if (this.props.player === "O" && this.state.turn === 1) {
      this.turnCounter++;
      let best;
      if (this.state.arr[4] === null) {
        best = 4;
      } else {
        best = await findBestMove(this.state.arr, "X");
      }
      let newArr = [...this.state.arr];
      newArr[best] = "X";
      await this.setState({
        arr: [...newArr],
        turn: 2,
      });
    }
    if (this.turnCounter > 4 && isWinning(this.state.arr)) {
      await this.setState({
        openWinState: true,
        winner: "ai",
        aiWinsDraws: ++this.state.aiWinsDraws,
      });
    } else if (this.turnCounter === 9) {
      await this.setState({
        openWinState: true,
        winner: "D",
        aiWinsDraws: ++this.state.aiWinsDraws,
      });
    }
  };

  chooseThis = async (place) => {
    if (this.state.arr[place] === null) {
      this.turnCounter++;
      let newArr = [...this.state.arr];
      let c;
      if (this.state.turn === 1) c = "X";
      if (this.state.turn === 2) c = "O";
      newArr[place] = c;
      await this.setState({
        arr: [...newArr],
        turn: this.state.turn === 1 ? 2 : 1,
      });
      if (this.turnCounter > 4 && isWinning(this.state.arr)) {
        this.setState({
          openWinState: true,
          winner: c,
        });
      } else if (this.turnCounter === 9) {
        this.setState({
          openWinState: true,
          winner: "D",
        });
      }
      if (this.props.player === "X" || this.props.player === "O") {
        this.aiMove();
      }
    }
  };

  handleClose = async () => {
    this.turnCounter = 0;
    await this.setState({
      arr: [null, null, null, null, null, null, null, null, null],
      turn: 1,
      openWinState: false,
      winner: "D",
    });
    if (this.props.player === "O") {
      this.aiMove();
    }
  };

  takeGlance = (e) => {
    if (this.state.glance === "1") {
      this.setState({
        glance: "0.1",
      });
    } else {
      this.setState({
        glance: "1",
      });
    }
  };

  render() {
    if (this.state.aiWinsDraws === 3) {
      this.setState({
        openSticker: true,
        aiWinsDraws: 4,
      });
      setTimeout(() => {
        this.setState({
          openSticker: false,
        });
      }, 2000);
    }

    return (
      <div className="play-space">
        <Dialog
          style={{ opacity: this.state.glance }}
          open={this.state.openWinState}
          TransitionComponent={Transition}
          onClose={this.handleClose}
          fullWidth
          disableBackdropClick
        >
          <VisibilityIcon
            onClick={this.takeGlance}
            className="glance-item"
            color="action"
            fontSize="small"
          />
          <DialogTitle style={{ textAlign: "center" }}>
            <Typography variant="h4">Game Over</Typography>
          </DialogTitle>
          <DialogContent>
            {this.state.winner === "X" ? (
              <Fragment>
                <img
                  className="winnerImg"
                  src={XIconWin}
                  alt="Player X has won!"
                />
                <Typography variant="h6" align="center">
                  Player X wins!
                </Typography>
              </Fragment>
            ) : this.state.winner === "O" ? (
              <Fragment>
                <img
                  className="winnerImg"
                  src={OIconWin}
                  alt="Player O has won!"
                />
                <Typography variant="h6" align="center">
                  Player O wins!
                </Typography>
              </Fragment>
            ) : this.state.winner === "ai" ? (
              <Fragment>
                <img className="winnerImg" src={aiWin} alt="A.I. has won!" />
                <Typography variant="h6" align="center">
                  A.I. wins!
                </Typography>
              </Fragment>
            ) : (
              <Fragment>
                <img
                  className="winnerImg"
                  src={noCrown}
                  alt="No player has won!!"
                />
                <Typography variant="h6" align="center">
                  No player has won!!
                </Typography>
              </Fragment>
            )}
          </DialogContent>
          <DialogActions style={{ justifyContent: "space-around" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClose}
            >
              play again
            </Button>
            <Link to="/">
              <Button variant="contained" color="secondary">
                home page
              </Button>
            </Link>
          </DialogActions>
        </Dialog>

        <Grid container style={{ height: "20%" }}>
          <Grid item container alignItems="center" xs={6}>
            <div className={this.state.turn === 1 ? "player1 turn" : "player1"}>
              <p>{this.props.player === "O" ? "A.I. X" : "Player X"}</p>
            </div>
          </Grid>
          <Grid item container justify="flex-end" alignItems="center" xs={6}>
            <div className={this.state.turn === 2 ? "player2 turn" : "player2"}>
              <p>{this.props.player === "X" ? "A.I. O" : "Player O"}</p>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} container justify="center" style={{ height: "80%" }}>
          <Grid
            item
            xs={10}
            sm={6}
            lg={3}
            container
            spacing={1}
            direction="column"
            alignItems="center"
            justify="center"
            className="ground"
          >
            <Grid
              item
              container
              alignItems="center"
              justify="space-evenly"
              id="playGround"
              className="ground-rows"
            >
              <Grid
                item
                className={
                  this.state.arr[0] ? "used-ground-cells" : "ground-cells"
                }
                onClick={() => {
                  this.chooseThis(0);
                }}
              >
                <p
                  className="cell-char"
                  style={
                    this.state.arr[0] === "X"
                      ? { color: "red" }
                      : { color: "blue" }
                  }
                >
                  {this.state.arr[0]}
                </p>
              </Grid>
              <Grid
                item
                className={
                  this.state.arr[1] ? "used-ground-cells" : "ground-cells"
                }
                onClick={() => {
                  this.chooseThis(1);
                }}
              >
                <p
                  className="cell-char"
                  style={
                    this.state.arr[1] === "X"
                      ? { color: "red" }
                      : { color: "blue" }
                  }
                >
                  {this.state.arr[1]}
                </p>
              </Grid>
              <Grid
                item
                className={
                  this.state.arr[2] ? "used-ground-cells" : "ground-cells"
                }
                onClick={() => {
                  this.chooseThis(2);
                }}
              >
                <p
                  className="cell-char"
                  style={
                    this.state.arr[2] === "X"
                      ? { color: "red" }
                      : { color: "blue" }
                  }
                >
                  {this.state.arr[2]}
                </p>
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              justify="space-evenly"
              className="ground-rows"
            >
              <Grid
                item
                className={
                  this.state.arr[3] ? "used-ground-cells" : "ground-cells"
                }
                onClick={() => {
                  this.chooseThis(3);
                }}
              >
                <p
                  className="cell-char"
                  style={
                    this.state.arr[3] === "X"
                      ? { color: "red" }
                      : { color: "blue" }
                  }
                >
                  {this.state.arr[3]}
                </p>
              </Grid>
              <Grid
                item
                className={
                  this.state.arr[4] ? "used-ground-cells" : "ground-cells"
                }
                onClick={() => {
                  this.chooseThis(4);
                }}
              >
                <p
                  className="cell-char"
                  style={
                    this.state.arr[4] === "X"
                      ? { color: "red" }
                      : { color: "blue" }
                  }
                >
                  {this.state.arr[4]}
                </p>
              </Grid>
              <Grid
                item
                className={
                  this.state.arr[5] ? "used-ground-cells" : "ground-cells"
                }
                onClick={() => {
                  this.chooseThis(5);
                }}
              >
                <p
                  className="cell-char"
                  style={
                    this.state.arr[5] === "X"
                      ? { color: "red" }
                      : { color: "blue" }
                  }
                >
                  {this.state.arr[5]}
                </p>
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              justify="space-evenly"
              className="ground-rows"
            >
              <Grid
                item
                className={
                  this.state.arr[6] ? "used-ground-cells" : "ground-cells"
                }
                onClick={() => {
                  this.chooseThis(6);
                }}
              >
                <p
                  className="cell-char"
                  style={
                    this.state.arr[6] === "X"
                      ? { color: "red" }
                      : { color: "blue" }
                  }
                >
                  {this.state.arr[6]}
                </p>
              </Grid>
              <Grid
                item
                className={
                  this.state.arr[7] ? "used-ground-cells" : "ground-cells"
                }
                onClick={() => {
                  this.chooseThis(7);
                }}
              >
                <p
                  className="cell-char"
                  style={
                    this.state.arr[7] === "X"
                      ? { color: "red" }
                      : { color: "blue" }
                  }
                >
                  {this.state.arr[7]}
                </p>
              </Grid>
              <Grid
                item
                className={
                  this.state.arr[8] ? "used-ground-cells" : "ground-cells"
                }
                onClick={() => {
                  this.chooseThis(8);
                }}
              >
                <p
                  className="cell-char"
                  style={
                    this.state.arr[8] === "X"
                      ? { color: "red" }
                      : { color: "blue" }
                  }
                >
                  {this.state.arr[8]}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Slide
          direction="left"
          timeout={2000}
          in={this.state.openSticker}
          mountOnEnter
          unmountOnExit
        >
          <img src={nenene} alt="sticker" className="sticker" />
        </Slide>
      </div>
    );
  }
}

export default Pvsp;
