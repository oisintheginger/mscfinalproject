import { useFormContext } from "react-hook-form";
import { Stack } from "@mui/material";
import ActiveTag from "./ActiveTag";

import {
	BATHROOM_COUNT,
	BEDROOM_COUNT,
	MAX_PRICE,
	MIN_PRICE,
	SHOW_FLAT,
	SHOW_HOUSES,
	SHOW_TOWNHOUSE,
} from "../../Utils/filter_constants";

function ActiveTagsStack({ filtersOpen = true }) {
	const methods = useFormContext();

	return (
		<>
			{methods.formState.isSubmitted && !filtersOpen && (
				<Stack
					direction={"row"}
					flexWrap={"wrap"}
					justifyContent={"flex-start"}
					useFlexGap
					spacing={1}
					mt={1}
				>
					{methods.getValues(MIN_PRICE) !=
						methods.formState.defaultValues[MIN_PRICE] &&
						!Object.keys(methods.formState.dirtyFields).includes(MIN_PRICE) && (
							<ActiveTag
								tagName={MIN_PRICE}
								tagVal={methods.getValues(MIN_PRICE)}
							/>
						)}
					{methods.getValues(MAX_PRICE) !=
						methods.formState.defaultValues[MAX_PRICE] &&
						!Object.keys(methods.formState.dirtyFields).includes(MAX_PRICE) && (
							<ActiveTag
								tagName={MAX_PRICE}
								tagVal={methods.getValues(MAX_PRICE)}
							/>
						)}
					{methods.getValues(BEDROOM_COUNT) !=
						methods.formState.defaultValues[BEDROOM_COUNT] &&
						!Object.keys(methods.formState.dirtyFields).includes(
							BEDROOM_COUNT
						) && (
							<ActiveTag
								tagName={BEDROOM_COUNT}
								tagVal={"+" + methods.getValues(BEDROOM_COUNT)}
							/>
						)}
					{methods.getValues(BATHROOM_COUNT) !=
						methods.formState.defaultValues[BATHROOM_COUNT] &&
						!Object.keys(methods.formState.dirtyFields).includes(
							BATHROOM_COUNT
						) && (
							<ActiveTag
								tagName={BATHROOM_COUNT}
								tagVal={"+" + methods.getValues(BATHROOM_COUNT)}
							/>
						)}
					{methods.getValues(SHOW_HOUSES) &&
						!Object.keys(methods.formState.dirtyFields).includes(
							SHOW_HOUSES
						) && <ActiveTag tagName={"Houses"} />}
					{methods.getValues(SHOW_FLAT) &&
						!Object.keys(methods.formState.dirtyFields).includes(SHOW_FLAT) && (
							<ActiveTag tagName={"Flats/Condos/Apartments"} />
						)}
					{methods.getValues(SHOW_TOWNHOUSE) &&
						!Object.keys(methods.formState.dirtyFields).includes(
							SHOW_TOWNHOUSE
						) && <ActiveTag tagName={"Townhouse"} />}
				</Stack>
			)}
		</>
	);
}

export default ActiveTagsStack;
