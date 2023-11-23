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
import { useQuery, useQueryClient } from "react-query";
import { API } from "aws-amplify";
import { searchData as initialSearchData } from "../../MockData/SearchData";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function RenderSaveSearch() {
	const {user} = useAuthenticator((context)=>[context.user]);
	const navigator = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const queryClient = useQueryClient();
	
	const parseSearchString = (searchString) => {
		// Replace the plus encoded with %2B or space encoded as %20 back to the actual plus sign or space for URLSearchParams
		const correctedString = searchString.replace(/%2B/g, '+').replace(/%20/g, ' ');
		const params = new URLSearchParams(correctedString);
		const search = params.get('searchString') || '';
		const minPrice = params.get('Min Price') || ''; // Ensure the parameter name matches exactly as in the URL
		const maxPrice = params.get('Max Price') || ''; // Ensure the parameter name matches exactly as in the URL
		return { search, minPrice, maxPrice };
	};
	

	const fetchSearchData = async () =>{
		const token = user?.getSignInUserSession().getAccessToken().jwtToken || null;
		if (!token) throw new Error("Authentication token not available");

		const response = await API.get("HMEBackend","/api/user/s",{
			headers:{Authorization: `Bearer ${token}`}
		});
		return response;
	};

	const {data: searchData, isLoading, isError, error} = useQuery("userSearch", fetchSearchData);

	if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>An error has occurred: {error.message}</div>;

	

	//Deletion
	const handleDelete = async (searchString) => {
        const token = user?.getSignInUserSession().getAccessToken().jwtToken || null;
        if (!token) {
            console.error("Authentication token not available.");
            return;
        }

        try {
            await API.del("HMEBackend", "/api/user/remove/s", {
                headers: { Authorization: `Bearer ${token}` },
                response: true,
                queryStringParameters: {
                    searchString // This should be the actual search string you want to delete
                }
            });
            // After deletion, refetch the search data
            queryClient.invalidateQueries("userSearch");
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    };
	//Pagination
	
    const itemsPerPage = 5;
	const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

	const currentData = searchData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
	return (
        <div>
            {currentData?.map((item, index) => {
                const { search, minPrice, maxPrice } = parseSearchString(item.search);
                return (
                    <Paper elevation={2} sx={{ border: 1, borderColor: "divider", p: 2, my: 1 }} key={index}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={3}>
                                <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={() => navigator("/browse")}>
                                    {search}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>Min Price: {minPrice}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>Max Price: {maxPrice}</Typography>
                            </Grid>
                            <Grid item xs={3} justifyContent={"flex-end"}>
                                <IconButton onClick={() => handleDelete(item.search)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                );
            })}
			<Pagination
                sx={{ mt: 2 }} // Add some spacing at the bottom
                count={Math.ceil(searchData?.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
            />
        </div>
        
    );
}