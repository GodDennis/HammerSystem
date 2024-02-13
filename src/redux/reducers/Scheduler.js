import {
    ADD_BOARD_ELEMENTS,
    CLEANUP,
    CLEANUP_BOARD_ELEMENTS,
    SET_DOWNLOAD_DATA,
    SET_DRAGGED_ELEMENT,
    SET_ELEMENTS,
    UPDATE_BOARD_ELEMENTS,
} from "redux/constants/Scheduler";

const initialState = {
    dragElements: [],
    draggedElement: {},
    downloadData: [],
    draggedBoard: [],
};

const Scheduler = (state = initialState, action) => {
    switch (action.type) {
        case SET_ELEMENTS: {
            return { ...state, dragElements: [...state.dragElements, ...action.elements] };
        }
        case SET_DRAGGED_ELEMENT: {
            return { ...state, draggedElement: action.element };
        }
        case SET_DOWNLOAD_DATA: {
            return { ...state, downloadData: action.data };
        }
        case ADD_BOARD_ELEMENTS: {
            return { ...state, draggedBoard: [...state.draggedBoard, ...action.element] };
        }
        case CLEANUP_BOARD_ELEMENTS: {
            return { ...state, draggedBoard: [] };
        }
        case UPDATE_BOARD_ELEMENTS: {
            console.log(action);
            return {
                ...state,
                draggedBoard: state.draggedBoard.map(el =>
                    el.id === action.payload.id
                        ? { ...el, cords: { x: action.payload.cords.x, y: action.payload.cords.y } }
                        : el
                ),
            };
        }
        case CLEANUP: {
            return initialState;
        }
        default:
            return state;
    }
};
export default Scheduler;
