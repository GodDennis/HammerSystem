import {
    ADD_BOARD_ELEMENTS,
    CLEANUP,
    CLEANUP_BOARD_ELEMENTS,
    SET_DOWNLOAD_DATA,
    SET_DRAGGED_ELEMENT,
    SET_ELEMENTS,
    UPDATE_BOARD_ELEMENTS,
} from "redux/constants/Scheduler";

export function setDragElements(elements) {
    return {
        type: SET_ELEMENTS,
        elements,
    };
}
export function setDraggedElement(element) {
    return {
        type: SET_DRAGGED_ELEMENT,
        element,
    };
}
export function setdownloadData(data) {
    return {
        type: SET_DOWNLOAD_DATA,
        data,
    };
}
export function addBoardElement(element) {
    return {
        type: ADD_BOARD_ELEMENTS,
        element,
    };
}
export function updateBoardElement(payload) {
    return {
        type: UPDATE_BOARD_ELEMENTS,
        payload,
    };
}
export function cleanupBoardElements() {
    return {
        type: CLEANUP_BOARD_ELEMENTS,
    };
}
export function cleanup() {
    return {
        type: CLEANUP,
    };
}
