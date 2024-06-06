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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
 


//manage booking table show ---> Customer Name	Email	Contact Number	Book Event Name	Counts of Tickets	Total Amount--> from database
useEffect(() => {
  const fetchBookings = async () => {
    const bookingsRef = ref(database, 'bookings'); 
    try {
      const snapshot = await get(bookingsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.values(data);
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
      <Box height={50} />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ padding: "20px" }}
            >
              Bookings Management
            </Typography>
            <Divider />
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Customer Name
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Email
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Contact Number
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Book Event Name
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Counts of Tickets
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Total Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align="left">{row["Customer Name"]}</TableCell>
                        <TableCell align="left">{row["Email"]}</TableCell>
                        <TableCell align="left">{row["Contact Number"]}</TableCell>
                        <TableCell align="left">{row["Book Event Name"]}</TableCell>
                        <TableCell align="left">{row["Counts of Tickets"]}</TableCell> 
                        <TableCell align="left">{row["Total Amount"]}</TableCell> 
                      </TableRow>
                    ))}
                </TableBody>

              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
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

