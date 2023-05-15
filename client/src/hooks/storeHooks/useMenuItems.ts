import {useSelector, useDispatch} from "react-redux";
import {Dispatch} from "react";
import {AnyAction} from "redux";

import {RootState, updateCurrentMenuItem} from "store";

interface menuItemsHook {
    current_menu_item: number;
    setCurrentMenuItem: (item: number) => void;
}


export function useMenuItems(): menuItemsHook {

    const dispatch: Dispatch<AnyAction> = useDispatch();
    const current_menu_item: number = useSelector((state: RootState) => state.menu_items.current_menu_item);

    const setCurrentMenuItem = (item: number): void => {
        dispatch(updateCurrentMenuItem(item));
    }


    return {
        current_menu_item,
        setCurrentMenuItem
    };
}
