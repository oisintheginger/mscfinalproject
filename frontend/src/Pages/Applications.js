import PageTemplate from "./PageTemplate";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../Utils/UserContext/UserContext";

function Applications() {
	const location = useLocation();
	const [searchParameters, setSearchParameters] = useSearchParams();

	const [initialBreadcrumbLocation, setInitialBreadcrumbLocation] =
		useState(null);

	const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
	const [applicationToDelete, setApplicationToDelete] = useState(null);

	const [applicationDetailsModalOpen, setApplicationDetailsModalOpen] =
		useState(false);
	const [applicationToView, setApplicationToView] = useState(null);

	const { route, user } = useAuthenticator((context) => [
		context.route,
		context.user,
	]);
	const { getAccessToken } = useContext(UserContext);

	const {
		isError,
		isLoading,
		isSuccess,
		error,
		data: applicationData,
		refetch,
	} = useQuery(
		["userApplications"],
		async () => {
			const accessToken = await getAccessToken();
			return API.get("HMEBackend", `/api/user/a`, {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
				queryStringParameters: {
					userId: user?.username || null,
				},
			});
		},
		{
			response: true,
			refetchOnMount: true,
			refetchOnWindowFocus: false,
			enabled: true,
			select: (data) => {
				return data;
			},
			onSuccess: (data) => {
				console.log(data);
			},
			onError: (err) => {
				console.log(err);
			},
		}
	);

	const applicationPropIds = applicationData?.map((el) => {
		return el.propertyId.toString();
	});

	const {
		isError: detailsIsError,
		isLoading: detailsIsLoading,
		error: detailsError,
		data: detailsData,
		refetch: detailsRefetch,
	} = useQuery(
		["propertyQuickViews"],
		async () => {
			const accessToken = await getAccessToken();

			return API.get("HMEBackend", `/api/properties/batch`, {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
				queryStringParameters: {
					ids: applicationPropIds,
				},
			});
		},
		{
			response: true,
			enabled: false,
			refetchOnWindowFocus: false,
			refetchOnMount: true,
			select: (rawData) => {
				let out = [
					...rawData.map((el) => {
						let appDet = applicationData.find((app) => {
							return app.propertyId == el.propertyId;
						});
						return {
							...el,
							message: appDet.message,
							price: el.price,
							address: el.streetAddress,
							thumbnail: el.images[0],
							status: "pending",
						};
					}),
				];

				return out;
			},
			onSuccess: (data) => {
				// console.log(data);
			},
			onError: (err) => {
				// console.log(err);
			},
		}
	);

	useEffect(() => {
		setInitialBreadcrumbLocation(
			location.state?.previousUrl ? location.state.previousUrl : null
		);
	}, []);

	useEffect(() => {
		if (isSuccess) {
			detailsRefetch();
		}
	}, [applicationData, isLoading, isSuccess]);

	const { pageNum, handlePageChange } = usePagination(() => {},
	setSearchParameters);

	const OpenConfirmDeleteModal = (applicationId) => {
		setConfirmDeleteModalOpen(true);
		setApplicationToDelete(applicationId);
	};
	const CloseConfirmDeleteModal = () => {
		setConfirmDeleteModalOpen(false);
		setApplicationToDelete(null);
	};

	const OpenApplicationDetailsModal = (message) => {
		setApplicationDetailsModalOpen(true);
		setApplicationToView(message);
	};
	const CloseApplicationDetailsModal = () => {
		setApplicationDetailsModalOpen(false);
		setApplicationToView(null);
	};

	const paginatedResults = detailsData?.slice(
		0 + 9 * (pageNum - 1),
		9 + 9 * (pageNum - 1)
	);
	return (
		<>
			<PageTemplate
				pageTitle="My Applications"
				currPageBreadcrumb={"My Applications"}
				prevPage={initialBreadcrumbLocation}
			>
				<Divider />
				{isLoading || detailsIsLoading ? (
					<Grid container spacing={2} width={"100%"}>
						{[1, 1, 1, 1, 1, 1, 1, 1, 1].map((data, key) => {
							return (
								<Grid item xs={12} sm={6} md={4} lg={4} key={key}>
									<SkeletonCard />
								</Grid>
							);
						})}
					</Grid>
				) : (
					<Grid container spacing={2} width={"100%"}>
						{paginatedResults &&
							paginatedResults.map((data, key) => {
								return (
									<Grid item xs={12} sm={6} md={4} lg={4} key={key}>
										<ApplicationCard
											data={data}
											openConfirmDelete={OpenConfirmDeleteModal}
											openApplicationDetails={OpenApplicationDetailsModal}
										/>
									</Grid>
								);
							})}
					</Grid>
				)}
				<Pagination
					count={Math.ceil(detailsData?.length / 9) || 10}
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
							Your Application
						</Typography>
						<Typography textAlign={"center"} variant="body1">
							{applicationToView}
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
