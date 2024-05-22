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
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ padding: "20px" }}
            >
              Users Management
            </Typography>
            <Divider />
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      UID
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      User Name
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Role
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Email
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      {/* - It hash display in table */}
                      Password  
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }}>
                      Contact Number
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                          <TableCell align="left">{row.id}</TableCell>
                          <TableCell align="left">{row.username}</TableCell>
                          <TableCell align="left">{row.role}</TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left">{row.Password}</TableCell>
                          <TableCell align="left">{row.contactNumber}</TableCell> 

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


