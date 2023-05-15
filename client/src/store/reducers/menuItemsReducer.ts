import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface menuState {
    current_menu_item: number;
}

const initialState: menuState = {
    current_menu_item: 1
};

const menuItemsReducer = createSlice({
    name: "menu_items",
    initialState,
    reducers: {
        updateCurrentMenuItem: (state, action: PayloadAction<number>): void => {
            state.current_menu_item = action.payload;
        }
    }
});

export const {updateCurrentMenuItem} = menuItemsReducer.actions;

export default menuItemsReducer.reducer;
