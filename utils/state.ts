import produce from "immer"
import create from "zustand"

type FacilityValues = "tehelne_pole" | "matadorka" | "delfin"
type Facility = { title: string; value: FacilityValues }

const rootUrl = "192.168.100.3:3000"

export const facilities: Facility[] = [
  {
    title: "Tehelne pole",
    value: "tehelne_pole",
  },
  {
    title: "Matadorka",
    value: "matadorka",
  },
  {
    title: "Delfin",
    value: "delfin",
  },
]

type State = {
  status: "OK" | "Error!" | "Ready" | "Loading..."
  facility: FacilityValues
  result: any
  setStatus: (scannedTicketId: "OK" | "Error!" | "Ready") => void
  setFacility: (facility: FacilityValues) => void
  setResult: (result: any) => void
  resetStatus: () => void
  check: (scannedTicketId: string | null, apiRoute: string) => Promise<void>
}

// Log every time state is changed
const log = (config) => (set, get, api) =>
  config(
    (args) => {
      console.log("  applying", args)
      set(args)
      console.log("  new state", get())
    },
    get,
    api
  )

// Turn the set method into an immer proxy
const immer = (config) => (set, get, api) => config((fn) => set(produce(fn)), get, api)

export const useStore = create<State>(
  log(
    immer((set, get) => ({
      status: "Ready",
      facility: "tehelne_pole",
      result: null,
      setStatus: (status) => set((state) => ({ status })),
      setFacility: (facility) => set((state) => ({ facility })),
      setResult: (result) => set((state) => ({ result })),
      resetStatus: () => set((state) => ({ status: "Ready", result: null })),
      check: async (scannedTicketId, apiRoute) => {
        try {
          set(() => ({
            status: "Loading...",
            result: null,
          }))
          const fetchResult = await fetch(`http://${rootUrl}${apiRoute}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: await JSON.stringify({ id: scannedTicketId, facility: get().facility }),
          })
          const json = await fetchResult.json()
          if (fetchResult.ok) {
            set(() => ({
              status: "OK",
              result: json,
            }))
          } else {
            set(() => ({
              status: "Error!",
              result: json,
            }))
          }
        } catch (e) {
          set(() => ({
            status: "Error!",
            result: e.toString(),
          }))
        }
      },
    }))
  )
)
