import { API } from "aws-amplify";
import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext/UserContext";
import { useQuery } from "react-query";
import { Auth } from "aws-amplify";
import { json } from "react-router-dom";

export function FetchPropertyDetailsHook({ propertyId }) {
	const { getAccessToken, route } = useContext(UserContext);

	const {
		isError: personalizedIsError,
		isSuccess: personalizedIsSuccess,
		data: personalizedData,
	} = useQuery(
		["personalizedScores", propertyId],
		async () => {
			const userInfo = await Auth.currentUserInfo();
			const accessToken = (await Auth.currentSession())
				.getIdToken()
				.getJwtToken();
			return API.post("PersonalScoresAPI", "/personalscore", {
				...(route == "authenticated" && {
					headers: {
						Authorization: "Bearer " + accessToken || null,
					},
				}),
				body: {
					propertyId: propertyId,
					userId: userInfo.username.toString(),
				},
			});
		},
		{
			enabled: route === "authenticated",
			select: (data) => {
				let formatted = data;
				formatted = formatted.replace("[", "");
				formatted = formatted.replace("]", "");
				formatted = JSON.parse(formatted);
				return formatted;
			},
			onSuccess: (data) => {},
			staleTime: 0,
		}
	);

	const { isError, isLoading, error, data, refetch } = useQuery(
		["propertydetails", propertyId],
		async () => {
			const accessToken = await getAccessToken();
			return API.get(
				"HMEBackend",
				`/api/properties/details/${propertyId}`,
				{
					response: true,
					...(route == "authenticated" && {
						headers: {
							Authorization: "Bearer " + accessToken || null,
						},
					}),
				},
				{
					refreshOnWindowFocus: false,
				}
			);
		},
		{
			staleTime: 0,
			refetchOnMount: true,
			select: (data) => {
				let addedScores = {
					...data.data,
					serviceScores: [
						{
							id: "transportation_score",
							displayTitle: "Transportation Score",
							description: ``,
							color: "#626d78",
							score: personalizedIsSuccess
								? parseFloat(personalizedData.transportation_score.toFixed(2))
								: parseFloat(data.data.transportation_score.toFixed(2)),
							counts: {
								bus_stationCount: data.data.bus_stationCount,
								transit_stationCount: data.data.transit_stationCount,
								train_stationCount: data.data.train_stationCount,
							},
						},
						{
							id: "emergency_score",
							displayTitle: "Emergency Score",
							description:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
							color: "#3b5880",
							score: personalizedIsSuccess
								? parseFloat(personalizedData.emergency_score.toFixed(2))
								: parseFloat(data.data.emergency_score.toFixed(2)),
							counts: {
								police_stationCount: data.data.police_stationCount,
								fire_stationCount: data.data.fire_stationCount,
								hospitalCount: data.data.hospitalCount,
							},
						},
						{
							id: "personal_care_score",
							displayTitle: "Personal Care Score",
							description:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
							color: "#713e73",
							score: personalizedIsSuccess
								? parseFloat(personalizedData.personal_care_score.toFixed(2))
								: parseFloat(data.data.personal_care_score.toFixed(2)),
							counts: {
								pharmacyCount: data.data.pharmacyCount,
								beauty_salonCount: data.data.beauty_salonCount,
							},
						},
						{
							id: "finance_score",
							displayTitle: "Finance Score",
							description:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
							color: "#5e3b7d",
							score: personalizedIsSuccess
								? parseFloat(personalizedData.finance_score.toFixed(2))
								: parseFloat(data.data.finance_score.toFixed(2)),
							counts: {
								bankCount: data.data.bankCount,
							},
						},
						{
							id: "retail_score",
							displayTitle: "Retail Scores",
							description:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
							color: "#417a41",
							score: personalizedIsSuccess
								? parseFloat(personalizedData.retail_score.toFixed(2))
								: parseFloat(data.data.retail_score.toFixed(2)),
							counts: {
								supermarketCount: data.data.supermarketCount,
							},
						},
						{
							id: "fitness_score",
							displayTitle: "Fitness Score",
							description:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
							color: "#8a593a",
							score: personalizedIsSuccess
								? parseFloat(personalizedData.fitness_score.toFixed(2))
								: parseFloat(data.data.fitness_score.toFixed(2)),
							counts: {
								gymCount: data.data.gymCount,
							},
						},
						{
							id: "leisure_score",
							displayTitle: "Leisure Score",
							description:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
							color: "#663031",
							score: personalizedIsSuccess
								? parseFloat(personalizedData.leisure_score.toFixed(2))
								: parseFloat(data.data.leisure_score.toFixed(2)),
							counts: {
								restaurantCount: data.data.restaurantCount,
								night_clubCount: data.data.night_clubCount,
								cafeCount: data.data.cafeCount,
								parkCount: data.data.parkCount,
								barCount: data.data.barCount,
							},
						},
					],

					overallScore: personalizedData?.overall_score,
				};
				return addedScores;
			},
			onSuccess: (data) => {
				console.log(data);
			},
		}
	);

	useEffect(() => {
		if (personalizedIsSuccess) {
			refetch();
		}
	}, [personalizedIsSuccess]);

	return {
		isError,
		isLoading,
		error,
		data,
		overallScore: personalizedIsSuccess ? personalizedData.overall_score : null,
		personalizedData,
	};
}
