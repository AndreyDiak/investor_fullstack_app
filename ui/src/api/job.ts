import { create } from "zustand"
import { Job } from "../entities/job/types"
import { http } from "../shared/api/http"

export const useJobsStore = create<JobsStore>((set) => ({
  data: undefined,
  fetch: async () => {
    const { data: jobs } = await http.get("/jobs");
    set({ data: jobs });
  },
  init: async () => {
    await http.post("/jobs/init")
  }
}));

export interface JobsStore {
  data?: Job[];
  fetch: () => Promise<void>;
  init: () => Promise<void>
}
