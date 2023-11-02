import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import {Grid, Typography, Divider, IconButton, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { searchData as initialSearchData } from "../../MockData/SearchData";

export default function RenderSaveSearch() {
	const [searchData, setSearchData] = useState([]);
	const navigator = useNavigate();
	const location = useLocation();
	useEffect(() => {
		setSearchData(initialSearchData);
	}, []);

	const handleDelete = (indexToDelete) => {
		const newData = searchData.filter((_, index) => index !== indexToDelete);
		setSearchData(newData);
	};

	/// the handleDelete doesn't actually delete from the SearchData.js -> when you reload the page, it's still there.

	return (
		<div>
			{/* <TableContainer component={Paper}>
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
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell
									onClick={() => {
										navigator({
											pathname: "/browse",
											search: "?",
										});
									}}
									sx={{ cursor: "pointer" }}
								>
									{name.searchName}
								</TableCell>
								<TableCell align="right">{name.minPrice}</TableCell>
								<TableCell align="right">{name.maxPrice}</TableCell>
								<TableCell align="right">
								
									<button onClick={() => handleDelete(index)}>Delete</button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer> */}


{searchData.map((name, index) => (
                // <Paper elevation={3} key={index} sx={{ border: 1, borderColor: "divider", p: 2, my: 1 }}>
                //     <Stack direction="horizontal" spacing={2} alignItems="center" justifyContent="space-between">
    			// 		<Typography variant="h6" onClick={() => {
        		// 			navigator({
            	// 			pathname: "/browse",
            	// 			search: "?",
        		// 			});
    			// 			}} sx={{ cursor: "pointer" }}>
        		// 			{name.searchName}
    			// 		</Typography>
				// 		<Divider orientation="vertical" variant="middle"/>
    			// 		<Typography>
        		// 			Min Price: {name.minPrice}
    			// 		</Typography>
				// 		<Divider orientation="vertical"variant="middle"/>
    			// 		<Typography>
       			// 			Max Price: {name.maxPrice}
    			// 		</Typography>
    			// 		<IconButton onClick={() => handleDelete(index)}>
        		// 			<DeleteIcon />
    			// 		</IconButton>
				// 	</Stack>

                // </Paper>
<Paper elevation={2} sx={{ border: 1, borderColor: "divider", p: 2, my: 1 }}>
<Grid container spacing={2} alignItems="center">
    <Grid item xs={4}>
        <Typography variant="h6" onClick={() => {
            navigator({
                pathname: "/browse",
                search: "?",
            });
        }} sx={{ cursor: "pointer" }}>
            {name.searchName}
        </Typography>
    </Grid>
    <Grid item xs={3}>
        <Typography>
            Min Price: {name.minPrice}
        </Typography>
    </Grid>
    <Grid item xs={3}>
        <Typography>
            Max Price: {name.maxPrice}
        </Typography>
    </Grid>
    <Grid item xs={2} justifyContent={"flex-end"}>
        <IconButton onClick={() => handleDelete(index)}>
            <DeleteIcon />
        </IconButton>
    </Grid>
</Grid>
</Paper>
            ))}
			<Pagination
				style={{ display: "flex", justifyContent: "center" }}
				count={10}
			/>
		</div>
	);
}
