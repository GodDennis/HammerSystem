import { uniqueId } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import table from "../../../../../assets/images/table.jpg";
import circleTable from "../../../../../assets/images/image.png";
import {
    downloadDataSelector,
    dragElementsSelector,
    draggedBoardSelector,
    draggedElementSelector,
} from "redux/selectors/Scheduler";
import {
    addBoardElement,
    cleanupBoardElements,
    setDragElements,
    setDraggedElement,
    setdownloadData,
    updateBoardElement,
} from "redux/actions/Scheduler";

const elements = [
    { id: uniqueId(), type: "table" },
    { id: uniqueId(), type: "circleTable" },
];

export const elementImageSorce = {
    table,
    circleTable,
};

export const useScheduler = () => {
    const [isDragged, setIsDragged] = useState(false);

    const divRef = useRef(null);

    const dispatch = useDispatch();
    const dragElements = useSelector(dragElementsSelector);
    const draggedElement = useSelector(draggedElementSelector);
    const downloadData = useSelector(downloadDataSelector);
    const draggedBoard = useSelector(draggedBoardSelector);

    useEffect(() => {
        if (downloadData.length) dispatch(addBoardElement(downloadData));
        return () => {};
    }, [dispatch, downloadData]);

    useEffect(() => {
        const dragElementsWithSrc = elements.map(el => ({
            ...el,
            src: elementImageSorce[el.type],
        }));
        dispatch(setDragElements(dragElementsWithSrc));
    }, [dispatch]);

    const onDrag = element => {
        dispatch(setDraggedElement(element));
        setIsDragged(true);
    };

    const onDrop = useCallback(
        e => {
            const { left, top } = divRef.current.getBoundingClientRect();
            const offsetX = e.clientX - left;
            const offsetY = e.clientY - top;
            const cords = {
                x: offsetX,
                y: offsetY,
            };
            if (isDragged) {
                const id = uniqueId();
                dispatch(
                    addBoardElement([
                        {
                            type: draggedElement.type,
                            id,
                            cords,
                        },
                    ])
                );
                setIsDragged(false);
            } else {
                dispatch(updateBoardElement({ id: draggedElement.id, cords }));
            }
        },
        [dispatch, isDragged, draggedElement]
    );

    const onDragOver = e => {
        e.preventDefault();
    };

    const saveToFile = () => {
        const data = JSON.stringify(draggedBoard);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "placement.json";
        link.click();
    };

    const downloadFromFile = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
            const content = e.target.result;
            try {
                const parsedData = JSON.parse(content);
                dispatch(cleanupBoardElements());
                dispatch(setdownloadData(parsedData));
            } catch (error) {
                console.error("Ошибка при чтении файла:", error);
            }
        };

        reader.readAsText(file);
    };

    const onBoardDrag = useCallback(
        element => {
            dispatch(setDraggedElement(element));
        },
        [dispatch]
    );

    return {
        dragElements,
        onDrag,
        divRef,
        onDrop,
        onDragOver,
        onBoardDrag,
        draggedBoard,
        saveToFile,
        downloadFromFile,
    };
};
