import { Box, DialogBody, DialogHeader, DialogHeading } from "@kit/ui";
import { Fragment, useCallback, useEffect } from "react";
import { useGameStore } from "../../../api/game";
import { useJobsStore } from "../../../api/job";

export const CreateGameDialog = () => {
	const { fetch: fetchJobs, data: jobs } = useJobsStore();
	const create = useGameStore((state) => state.create);

	const handleCreate = useCallback(() => {
	}, []);

	useEffect(() => {
		fetchJobs();
	}, []);
	return (
		<Fragment>
			<DialogHeader>
				<DialogHeading>Creating new Game</DialogHeading>
			</DialogHeader>
			<DialogBody>
				{jobs?.map((job) => (
					<Box>
						<img src={`/assets/jobs/${job.type}`} />
						{job.name}
						{job.startSalary}
					</Box>
				))}
			</DialogBody>
		</Fragment>
	);
};
