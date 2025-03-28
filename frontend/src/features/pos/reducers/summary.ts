import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

interface SummaryItem {
    id: string,
    item_name: string;
    price: number;
    quantity: number;
    image?: string,
    uom?: string
    amount: number
}

interface POSState {
    summaryItems: SummaryItem[];
    totalQty?: number,
    grandTotal?: number,
    taxAmount?: number,
    customer: {
        customr_name: string,
        customer_id: string,
    } | null
}

const initialState: POSState = {
    summaryItems: [],
    grandTotal: 0,
    totalQty: 0,
    customer: null
};

export function validateSummary(state: POSState) {
    let totalQty = 0;
    let grandTotal = 0;

    state.summaryItems.forEach(item => {
        totalQty += item.quantity;
        grandTotal += item.price * item.quantity;
    })

    state.grandTotal = grandTotal;
    state.totalQty = totalQty;
}


export const SummaryState = createSlice({
    name: 'pos',
    initialState: initialState,
    reducers: {

        addItemToSummary: (state, action: PayloadAction<Omit<SummaryItem, 'quantity'>>) => {
            const existingItem = state.summaryItems.find(item => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.summaryItems.push({ ...action.payload, quantity: 1 });
            }

            validateSummary(state);

        },

        updateItemQuantity: (state, action: PayloadAction<SummaryItem>) => {
            const { id, updatedQty, type } = action.payload;
            const item = state.summaryItems.find(item => item.id === id);
            if (!item) return;

            if (type === 'add') {
                if (updatedQty) {
                    item.quantity += updatedQty;
                }
                else {
                    item.quantity += 1;
                }

            }

            else if (item.quantity > 1) {
                item.quantity -= 1;
            }
            else {
                const items = state.summaryItems.filter(item => item.id != id);
                state.summaryItems = items;
            }


            validateSummary(state);
        },


        updateCustomer(state, action) {
            state.customer = action.payload;
        },

        addItem: (state, action: PayloadAction<Omit<SummaryItem, 'quantity'>>) => {
            const existingItem = state.summaryItems.find(item => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.summaryItems.push({ ...action.payload, quantity: 1 });
            }

            validateSummary(state);

        },
        updateItem: (state, action) => {
            const { id, updatedQty, type } = action.payload;
            const item = state.summaryItems.find(item => item.id === id);
            if (!item) return;

            if (type === 'add') {
                if (updatedQty) {
                    item.quantity += updatedQty;
                }
                else {
                    item.quantity += 1;
                }
            }

            else if (item.quantity > 1) {
                item.quantity -= 1;
            }
            else {
                const items = state.summaryItems.filter(item => item.id != id);
                state.summaryItems = items;
            }

            validateSummary(state);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            const filteredItems = state.summaryItems.filter(item => item.id != action.payload);
            state.summaryItems = filteredItems;
            validateSummary(state);
        }

    },
});

export const { addItemToSummary, updateItemQuantity, updateCustomer, addItem, updateItem, removeItem } = SummaryState.actions;
export const getSummaryItems = (state: RootState) => state?.pos.summaryItems;
export const getSummary = (state: RootState) => state?.pos;

export default SummaryState.reducer;