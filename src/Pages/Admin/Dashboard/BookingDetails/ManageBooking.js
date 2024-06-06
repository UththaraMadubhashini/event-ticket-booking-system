import React, { useState, useEffect } from 'react';
import SideBar from '../../AdminComponents/SideBar/SideBar';
import NavBar from '../../AdminComponents/NavBar/NavBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { database, ref, get } from "../../../../firebase-config";

export default function ManageBooking() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

useEffect(() => {
  const fetchBookings = async () => {
    const bookingsRef = ref(database, 'bookings');
    try {
      const snapshot = await get(bookingsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.keys(data).map(key => data[key]);
        setRows(formattedData);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchBookings();
}, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (booking) => {
    setSelectedBooking(booking);
  };

  return (
    <>
      <NavBar />
      <Box height={15} />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ padding: "20px", bgcolor: '#E3FEF7' }}
            >
              <b>Bookings Management</b>
            </Typography>
            <Divider />
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ minWidth: "100px" }}>
                      <b>Customer Name</b>
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: "100px" }}>
                      <b>Email</b>
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: "100px" }}>
                      <b>Contact Number</b>
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: "100px" }}>
                      <b>Book Event Name</b>
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: "100px" }}>
                      <b>Counts of Tickets</b>
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: "100px" }}>
                      <b>Total Amount</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow hover role="checkbox" 
                      tabIndex={-1} 
                      key={index} 
                      onClick={() => handleRowClick(row)}>
                        <TableCell align="center">{row["Customer Name"]}</TableCell>
                        <TableCell align="center">{row["Email"]}</TableCell>
                        <TableCell align="center">{row["Contact Number"]}</TableCell>
                        <TableCell align="center">{row["Book Event Name"]}</TableCell>
                        <TableCell align="center">{row["Counts of Tickets"]}</TableCell> 
                        <TableCell align="center">{row["Total Amount"]}</TableCell> 
                      </TableRow>
                    ))}
                </TableBody>

              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
      </Box>
    </Box>
  </>
);
}

