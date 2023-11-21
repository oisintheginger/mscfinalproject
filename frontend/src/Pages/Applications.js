import PageTemplate from "./PageTemplate";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ApplicationCard from "../components/CommonComp/Cards/ApplicationCard/ApplicationCard";
import {
	Grid,
	Modal,
	Typography,
	Box,
	Stack,
	Pagination,
	Divider,
} from "@mui/material";
import { useQuery } from "react-query";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import SkeletonCard from "../components/CommonComp/Cards/SkeletonCard/SkeletonCard";
import ButtonOutlined from "../components/CommonComp/Button/ButtonOutlined";
import DeleteButton from "../components/CommonComp/Button/DeleteButton";
import { useSearchParams } from "react-router-dom";
import usePagination from "../Utils/usePagination/usePagination";

function Applications() {
	const location = useLocation();
	const [searchParameters, setSearchParameters] = useSearchParams();

	const [initialBreadcrumbLocation, setInitialBreadcrumbLocation] =
		useState(null);

	const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
	const [applicationToDelete, setApplicationToDelete] = useState(null);
	const OpenConfirmDeleteModal = (applicationId) => {
		setConfirmDeleteModalOpen(true);
		setApplicationToDelete(applicationId);
	};
	const CloseConfirmDeleteModal = () => {
		setConfirmDeleteModalOpen(false);
		setApplicationToDelete(null);
	};

	const [applicationDetailsModalOpen, setApplicationDetailsModalOpen] =
		useState(false);
	const [applicationToView, setApplicationToView] = useState(null);
	const OpenApplicationDetailsModal = (applicationId) => {
		setApplicationDetailsModalOpen(true);
		setApplicationToView(applicationId);
	};
	const CloseApplicationDetailsModal = () => {
		setApplicationDetailsModalOpen(false);
		setApplicationToView(null);
	};

	const { route, user } = useAuthenticator((context) => [
		context.route,
		context.user,
	]);

	const { isError, isLoading, error, data, refetch } = useQuery(
		["userApplications"],
		() => {
			return API.get("HMEBackend", `/api/user/a`, {
				headers: {
					Authorization:
						user?.getSignInUserSession().getAccessToken().getJwtToken() || null,
				},
				enabled: false,
				response: true,
				queryStringParameters: {
					userId: user?.username,
				},
				refetchOnWindowFocus: false,
				selector: (data) => {
					return data.data;
				},
			});
		}
	);

	const testData = {
		price: 4319,
		address: "1234, Arroyo Avenue, Albequrque, New Mexico",
		status: "Pending",
		image:
			"https://photos.zillowstatic.com/fp/e3819b051b082ceecf67c8c86e47360f-p_e.jpg",
		date: "01/01/1970",
		applicationId: 1,
	};

	useEffect(() => {
		setInitialBreadcrumbLocation(
			location.state?.previousUrl ? location.state.previousUrl : null
		);
	}, []);

	const { pageNum, handlePageChange } = usePagination(
		refetch,
		setSearchParameters
	);

	return (
		<>
			<PageTemplate
				pageTitle="My Applications"
				currPageBreadcrumb={"My Applications"}
				prevPage={initialBreadcrumbLocation}
			>
				<Divider />
				{isLoading ? (
					<Grid container spacing={2} width={"100%"}>
						{[1, 1, 1, 1, 1, 1, 1, 1, 1].map((data, key) => {
							return (
								<Grid item xs={12} sm={6} md={4} lg={4} key={key}>
									<SkeletonCard data={testData} />
								</Grid>
							);
						})}
					</Grid>
				) : (
					<Grid container spacing={2} width={"100%"}>
						{[1, 1, 1, 1, 1, 1, 1, 1, 1].map((data, key) => {
							return (
								<Grid item xs={12} sm={6} md={4} lg={4} key={key}>
									<ApplicationCard
										data={testData}
										openConfirmDelete={OpenConfirmDeleteModal}
										openApplicationDetails={OpenApplicationDetailsModal}
									/>
								</Grid>
							);
						})}
					</Grid>
				)}
				<Pagination
					count={10}
					boundaryCount={1}
					siblingCount={1}
					variant="outlined"
					sx={{ alignSelf: "center" }}
					page={pageNum}
					onChange={handlePageChange}
				/>
			</PageTemplate>
			<Modal open={confirmDeleteModalOpen} onClose={CloseConfirmDeleteModal}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: {
							xs: "90vw",
							md: "45vw",
						},
						bgcolor: "background.paper",
						borderRadius: 1,
						boxShadow: 24,
						p: 4,
					}}
				>
					<Stack spacing={2}>
						<Typography textAlign={"center"} variant="h2">
							CONFIRM DELETE
						</Typography>
						<Typography textAlign={"center"} variant="body1">
							Are you sure you want to delete your application? You won't be
							able to recover this.
						</Typography>
						<Grid container spacing={1}>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<ButtonOutlined
									variant="outlined"
									fullWidth
									onClick={() => {
										setApplicationToDelete(null);
										CloseConfirmDeleteModal();
									}}
								>
									No, take me back.
								</ButtonOutlined>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<DeleteButton
									variant="outlined"
									fullWidth
									onClick={() => {
										console.log("Deleted: " + applicationToDelete);
										CloseConfirmDeleteModal();
										refetch();
									}}
								>
									CONFIRM DELETE
								</DeleteButton>
							</Grid>
						</Grid>
					</Stack>
				</Box>
			</Modal>
			<Modal
				open={applicationDetailsModalOpen}
				onClose={CloseApplicationDetailsModal}
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: {
							xs: "90vw",
							md: "45vw",
						},
						bgcolor: "background.paper",
						borderRadius: 1,
						boxShadow: 24,
						p: 4,
					}}
				>
					<Stack spacing={2}>
						<Typography textAlign={"center"} variant="h2">
							APPLICATION NAME
						</Typography>
						<Typography textAlign={"center"} variant="body1">
							APPLICATION MESSAGE
						</Typography>
						<Grid container spacing={1}>
							<Grid item xs={6} sm={6} md={6} lg={6}></Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}></Grid>
						</Grid>
					</Stack>
				</Box>
			</Modal>
		</>
	);
}

export default Applications;
