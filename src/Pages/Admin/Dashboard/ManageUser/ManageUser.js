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
import { ref, get } from "firebase/database";
import { database } from "../../../../firebase-config";

export default function ManageUser() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersRef = ref(database, 'users'); 
      try {
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedData = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setRows(formattedData);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <NavBar />
      <Box height={50} />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Paper sx={{ width: '1000px', overflow: 'hidden' }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ padding: "20px", bgcolor: '#E3FEF7' }}
            >
              <b>Users Management</b>
            </Typography>
            {/* <Divider /> */}
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ minWidth: "100px" }}>
                      <b>UID</b>
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: "100px" }}>
                      <b>User Name</b>
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: "100px" }}>
                      <b>Role</b>
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: "100px" }}>
                      <b>Email</b>
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: "100px" }}>
                      <b>Contact Number</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                          <TableCell align="center">{row.id}</TableCell>
                          <TableCell align="center">{row.username}</TableCell>
                          <TableCell align="center">{row.role}</TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">{row.contactNumber}</TableCell> 

                        </TableRow>
                      );
                    })}
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


