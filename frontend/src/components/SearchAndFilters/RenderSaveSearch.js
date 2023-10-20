import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination } from '@mui/material';
import {useState, useEffect} from 'react'

import { searchData as initialSearchData} from '../../MockData/SearchData';

export default function RenderSaveSearch() {
    const [searchData, setSearchData] = useState([]);

    useEffect(()=>{
        setSearchData(initialSearchData)
    },[]);

    const handleDelete = (indexToDelete) => {
        const newData = searchData.filter((_, index) => index !==indexToDelete);
        setSearchData(newData);
    }

  return (
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Search Name</TableCell>
            <TableCell align="right">Min Price</TableCell>
            <TableCell align="right">Max Price</TableCell>
            <TableCell align="right">Action</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {searchData.map((name, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{name.searchName}</TableCell>
              <TableCell align="right">{name.minPrice}</TableCell>
              <TableCell align="right">{name.maxPrice}</TableCell>
              <TableCell align="right"><button onClick={()=>handleDelete(index)}>Delete</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination style={{ display: 'flex', justifyContent: 'center' }} count={10} />
    </div>
  );
}
