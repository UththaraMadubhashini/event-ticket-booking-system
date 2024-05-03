import React from "react";
import Grid from "@mui/material/Grid"; 
import "./seats.css";

class SeatSelection extends React.Component {
    constructor() {
      super();
      this.state = {
        seat: [
          // Original seats
          "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10",
          "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10",
          "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10",
          // Additional 100 seats with letters D, E, F, G, ...
          ...Array.from({ length: 15 }, (_, index) => `D${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `E${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `F${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `G${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `H${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `I${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `J${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `K${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `L${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `M${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `N${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `P${index + 1}`),
          ...Array.from({ length: 10 }, (_, index) => `S${index + 1}`),
          // and so on...
        ],
        seatAvailable: [
          // Original available seats
          "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10",
          "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10",
          "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10",
          // Additional available seats
          // Additional 100 seats with letters D, E, F, G, ...
          ...Array.from({ length: 15 }, (_, index) => `D${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `E${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `F${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `G${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `H${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `I${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `J${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `K${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `L${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `M${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `N${index + 1}`),
          ...Array.from({ length: 15 }, (_, index) => `P${index + 1}`),
          ...Array.from({ length: 10 }, (_, index) => `S${index + 1}`),
          // and so on...
        ],
        seatReserved: [],
        seatSelected: []
      };
    }

  onClickData(seat) {
    if (this.state.seatReserved.indexOf(seat) > -1) {
      this.setState({
        seatAvailable: [...this.state.seatAvailable, seat],
        seatReserved: this.state.seatReserved.filter(res => res !== seat)
      });
    } else {
      this.setState({
        seatReserved: [...this.state.seatReserved, seat],
        seatAvailable: this.state.seatAvailable.filter(res => res !== seat)
      });
    }
  }

  checktrue(row) {
    return this.state.seatSelected.indexOf(row) === -1;
  }

  handleSubmited() {
    this.setState(prevState => ({
      seatSelected: [...prevState.seatSelected, ...prevState.seatReserved],
      seatReserved: []
    }));
  }

  render() {
    return (
      <div>
        <h1>Seat Reservation System</h1>
        <DrawGrid
          seat={this.state.seat}
          available={this.state.seatAvailable}
          reserved={this.state.seatReserved}
          selected={this.state.seatSelected}
          onClickData={this.onClickData.bind(this)}
          checktrue={this.checktrue.bind(this)}
          handleSubmited={this.handleSubmited.bind(this)}
        />
      </div>
    );
  }
}

class DrawGrid extends React.Component {
    render() {
      const { seat, selected, reserved, checktrue } = this.props;
      const seatsPerRow = 10;
  
      // Split seats into rows based on seatsPerRow
      const rows = [];
      for (let i = 0; i < seat.length; i += seatsPerRow) {
        rows.push(seat.slice(i, i + seatsPerRow));
      }
  
      // Split rows into two sides
      const middleIndex = Math.ceil(rows.length / 2);
      const leftSideRows = rows.slice(0, middleIndex);
      const rightSideRows = rows.slice(middleIndex);
  
      return (
        <Grid container justifyContent="center"> {/* Center the grid */}
          {/* Left Side */}
          <Grid item xs={5}> {/* Adjusted width */}
            <table className="grid">
              <tbody>
                {leftSideRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((seatLabel, columnIndex) => (
                      <td
                        className={
                          selected.indexOf(seatLabel) > -1
                            ? "reserved"
                            : reserved.indexOf(seatLabel) > -1
                            ? "selected"
                            : "available"
                        }
                        key={columnIndex}
                        onClick={checktrue(seatLabel) ? () => this.onClickSeat(seatLabel) : null}
                        style={{ paddingRight: "20px" }} // Increase space between columns
                      >
                        {seatLabel}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
          {/* Right Side */}
          <Grid item xs={5}> {/* Adjusted width */}
            <table className="grid">
              <tbody>
                {rightSideRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((seatLabel, columnIndex) => (
                      <td
                        className={
                          selected.indexOf(seatLabel) > -1
                            ? "reserved"
                            : reserved.indexOf(seatLabel) > -1
                            ? "selected"
                            : "available"
                        }
                        key={columnIndex}
                        onClick={checktrue(seatLabel) ? () => this.onClickSeat(seatLabel) : null}
                        style={{ paddingRight: "20px" }} // Increase space between columns
                      >
                        {seatLabel}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
          {/* Confirm Booking Button */}
          <Grid item xs={12}>
            <button
              type="button"
              className="btn-success btnmargin"
              onClick={() => this.props.handleSubmited()}
            >
              Confirm Booking
            </button>
          </Grid>
        </Grid>
      );
    }
  
    onClickSeat(seat) {
      this.props.onClickData(seat);
    }
  }

  
  

export default SeatSelection;
