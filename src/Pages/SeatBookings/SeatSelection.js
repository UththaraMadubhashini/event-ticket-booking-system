import React from "react";
import Grid from "@mui/material/Grid";
import SquareIcon from "@mui/icons-material/Square";
import Paper from "@mui/material/Paper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import "./seats.css";

function createData(ticket, count, seats, amount) {
  return { ticket, count, seats, amount };
}

class SeatSelection extends React.Component {
  constructor() {
    super();
    this.state = {
      seat: [
        // Original seats
        "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10",
        "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10",
        "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10",
        // Additional seats with letters D, E, F, G, ...
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
      seatSelected: [],
      count: 1,
      Rows: [] // Initialize as an empty array
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
    const { seatReserved, count } = this.state;
    const newRows = seatReserved.map(seat => {
      let category = 'Normal';
      let price = 2500;
      if (seat.startsWith('C') || seat.startsWith('J')) {
        category = 'Premium';
        price = 8000;
      } else if (seat.startsWith('F') || seat.startsWith('M')) {
        category = 'Silver';
        price = 5000;
      }
      return createData(`${seat} / ${category}`, count, seat, price * count);
    });
    this.setState(prevState => ({
      seatSelected: [...prevState.seatSelected, ...prevState.seatReserved],
      seatReserved: [],
      Rows: [...prevState.Rows, ...newRows]
    }));
  }

  handleChange = (event) => {
    const newCount = parseInt(event.target.value);
    if (!isNaN(newCount)) {
      this.setState({ count: newCount });
    }
  };

  render() {
    // Calculate the total amount
    const totalAmount = this.state.Rows.reduce((total, row) => total + row.amount, 0);

    return (
      <div>
        <h1>Select your seats..</h1>
        <DrawGrid
          seat={this.state.seat}
          available={this.state.seatAvailable}
          reserved={this.state.seatReserved}
          selected={this.state.seatSelected}
          onClickData={this.onClickData.bind(this)}
          checktrue={this.checktrue.bind(this)}
          handleSubmited={this.handleSubmited.bind(this)}
        />
        {/* Table */}
        <TableContainer component={Paper} sx={{ width: '80%', margin: 'auto', marginTop: '30px', marginBottom: '80px'}}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#E3FEF7' }}>TICKET</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#E3FEF7' }}>PRICE</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#E3FEF7' }}>COUNT OF TICKETS</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#E3FEF7' }}>SEATS</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#E3FEF7' }}>AMOUNT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.Rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 2 } }}
                >
                  <TableCell align="center" component="th" scope="row">{row.ticket}</TableCell>
                  <TableCell align="center">{row.amount / row.count}</TableCell>
                  <TableCell align="center">
                    <input
                      type="number"
                      value={row.count}
                      onChange={this.handleChange}
                      style={{ width: 60, textAlign: 'center' }}
                    />
                  </TableCell>
                  <TableCell align="center">{row.seats}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell align="center" colSpan={4} sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#E3FEF7' }}>TOTAL AMOUNT</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#E3FEF7' }}>{totalAmount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

class DrawGrid extends React.Component {
  onClickSeat(seat) {
    this.props.onClickData(seat);
  }

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
                          : seatLabel.startsWith('C') || seatLabel.startsWith('J')
                          ? "premium"
                          : seatLabel.startsWith('F') || seatLabel.startsWith('M')
                          ? "silver"
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
        <Grid item xs={6}> {/* Adjusted width */}
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
                          : seatLabel.startsWith('C') || seatLabel.startsWith('J')
                          ? "premium"
                          : seatLabel.startsWith('F') || seatLabel.startsWith('M')
                          ? "silver"
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

        <div style={{ position: 'absolute', top: '270px', right: '18px' }}>
          <Paper elevation={4} sx={{ width: '150px', textAlign: 'center', p: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column' }}>
              <SquareIcon sx={{ color: 'red', fontSize: '20px' }} />
              <p>Reserved</p>
              <SquareIcon sx={{ color: 'blue', fontSize: '20px' }} />
              <p>Your Selection</p>
              <SquareIcon sx={{ color: 'transparent', border: '4px solid black', fontSize: '17px' }} />
              <p>Available</p>
              <SquareIcon sx={{ color: 'gold', fontSize: '20px' }} />
              <p>Premium</p>
              <SquareIcon sx={{ color: 'silver', fontSize: '20px' }} />
              <p>Silver</p>
            </div>
          </Paper>
        </div>

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
}

export default SeatSelection;
