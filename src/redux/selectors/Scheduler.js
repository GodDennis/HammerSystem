import { createSelector } from "reselect";
import table from "../../assets/images/table.jpg";
import circleTable from "../../assets/images/image.png";

const elementImageSorce = {
    table,
    circleTable,
};

export const dragElementsSelector = state => state.scheduler.dragElements;
export const draggedElementSelector = state => state.scheduler.draggedElement;
export const downloadDataSelector = state => state.scheduler.downloadData;
export const draggedBoardSelector = createSelector(
    [state => state.scheduler.draggedBoard],
    draggedBoard => draggedBoard.map(el => ({ ...el, src: elementImageSorce[el.type] }))
);
