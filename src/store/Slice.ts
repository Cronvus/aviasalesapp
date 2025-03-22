import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'
import flyDuration from '../utile/flyDuration'
import CookieUtils from '../utile/CookieUtils'

interface Ticket {
  price: number;
  segments: any;

}

export interface TicketsState {
  tickets: Ticket[];
  valueFilterTransfer: string[];
  showAllTickets: boolean;
  numShowTicket: number;
  isLoading: boolean;
  error: boolean;
  searchId: boolean;
  stopFetch: boolean;
  fetchStatus500: number;
}

const initialState: TicketsState = {
  tickets: [],
  valueFilterTransfer: [],
  showAllTickets: true,
  numShowTicket: 5,
  isLoading: false,
  error: false,
  searchId: false,
  stopFetch: false,
  fetchStatus500: 0,
}

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('https://aviasales-test-api.kata.academy/search')
    return res.data
  } catch (err: any) {
    return rejectWithValue(err.response?.status || 'Error')
  }
})

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { rejectWithValue }) => {
  try {
    const searchId = CookieUtils.getCookie('searchId')
    const res = await axios.get(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
    return res.data
  } catch (err: any) {
    return rejectWithValue(err.response?.status || 'Error')
  }
})

const Slice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    showMoreTicket(state) {
      state.numShowTicket += 5
    },
    sortTicketByPrice(state) {
      const filteredTickets = current(state.tickets).slice()
      state.tickets = filteredTickets.sort((a, b) => (a.price > b.price ? 1 : -1))
    },
    sortTicketByDuration(state) {
      const filteredTickets = current(state.tickets).slice()
      state.tickets = filteredTickets.sort((a, b) =>
        flyDuration(a) > flyDuration(b) ? 1 : -1,
      )
    },
    sortTicketOptimal(state) {
      const filteredTickets = current(state.tickets).slice()
      state.tickets = filteredTickets.sort((a, b) =>
        flyDuration(a) + a.price > flyDuration(b) + b.price ? 1 : -1,
      )
    },
    switchFilterAll(state, action) {
      state.showAllTickets = action.payload
    },
    setValueFilterTicket(state, action) {
      if (action.payload.isChecked) {
        state.valueFilterTransfer.push(action.payload.filterValue)
      } else {
        state.valueFilterTransfer = state.valueFilterTransfer.filter(item => item !== action.payload.filterValue)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.isLoading = true
        state.error = false
      })
      .addCase(fetchTickets.pending, (state) => {
        state.isLoading = true
        state.error = false
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        document.cookie = `searchId=${action.payload.searchId}`
        state.searchId = true
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.tickets = [...state.tickets, ...action.payload.tickets]
        state.stopFetch = action.payload.stop
        state.isLoading = !action.payload.stop
      })
      .addCase(fetchSearchId.rejected, (state) => {
        state.error = true
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        if (action.payload === '500') {
          state.fetchStatus500 += 1
        } else {
          state.isLoading = false
          state.error = false
        }
      })
  },
})

export const {
  showMoreTicket,
  sortTicketByPrice,
  sortTicketByDuration,
  sortTicketOptimal,
  setValueFilterTicket,
  switchFilterAll,
} = Slice.actions

export default Slice.reducer