import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: true,
    },
    reducers: {
        onOpenDateModal: (state, /* action */ ) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: (state, /* action */ ) => {
            state.isDateModalOpen = false;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;