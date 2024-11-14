import { useCallback, useEffect, useMemo, useState } from "react"
import { api } from "../../api"
import { catchError } from "../lib"
import { useLocalStorage } from "./use_local_storage"

const JOB_INIT_KEY = "investor-job-init-already"

export function useInit() {
	const [jobInitAlready, setJobInitAlready] = useLocalStorage(JOB_INIT_KEY, false)
	const [loading, setLoading] = useState(false)

	const initJob = useCallback(async () => {
		const [err] = await catchError(api.jobs.getState().init())
		return err
	}, [])

	useEffect(() => {
		if (jobInitAlready) {
			return
		}
		setLoading(true)
		initJob()
			.then(err => {
				if (!err) {
					setJobInitAlready(true)
				}
			})
		setLoading(false)
	}, [jobInitAlready])

	return useMemo(() => loading, [loading])
}