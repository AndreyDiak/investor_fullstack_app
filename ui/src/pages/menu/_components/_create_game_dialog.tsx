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
			<DialogBody className="py-4">
				<Box className="flex flex-row gap-16">
					{jobs?.map((job) => (
						<Box>
							<img
								src={`/jobs/${job.type}.jpeg`}
								className="w-[300px] h-[400px] overflow-hidden rounded-md"
							/>
							<Box>{job.name}</Box>
							<Box>{job.startSalary}</Box>
						</Box>
					))}
				</Box>
			</DialogBody>
		</Fragment>
	);
};
