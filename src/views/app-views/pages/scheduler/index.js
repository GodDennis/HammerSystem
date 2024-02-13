import { Board } from "./Board/Board";
import { Toolbar } from "./ToolBar/Toolbar";

import s from "./Scheduler.module.scss";

import { useScheduler } from "./customHooks/useDownload";

const Scheduler = () => {
    const {
        dragElements,
        onDrag,
        divRef,
        onDrop,
        onDragOver,
        onBoardDrag,
        draggedBoard,
        saveToFile,
        downloadFromFile,
    } = useScheduler();

    return (
        <div>
            <div className={s.container}>
                <div style={{ width: "800px" }}>
                    <Toolbar
                        onDrag={onDrag}
                        elements={dragElements}
                    />
                </div>
                <div
                    ref={divRef}
                    className={s.board}
                    onDrop={onDrop}
                    onDragOver={onDragOver}>
                    <Board
                        onDrag={onBoardDrag}
                        data={draggedBoard}
                    />
                </div>
            </div>
            <button
                type='button'
                onClick={saveToFile}>
                Скачать
            </button>
            <input
                type='file'
                onChange={downloadFromFile}
            />
        </div>
    );
};
export default Scheduler;
