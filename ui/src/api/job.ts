import { create } from "zustand"
import { Job } from "../entities/job/types"
import { http } from "../shared/api/http"

export const useJobsStore = create<JobsStore>((set) => ({
  data: undefined,
  fetch: async () => {
    const { data: jobs } = await http.get("/jobs");
    set({ data: jobs });
  },
}));

export interface JobsStore {
  data?: Job[];
  fetch: () => Promise<void>;
}
