import { memo } from "react";
import s from "./Board.module.scss";

export const Board = memo(({ data, onDrag }) => {
    const onDragHandler = element => {
        onDrag(element);
    };

    const el = data.map(el => {
        return (
            <div
                draggable
                id={el.id}
                key={el.id}
                className={s.boardItem}
                onDrag={() => onDragHandler(el)}
                style={{ top: el.cords?.y + "px", left: el.cords?.x + "px", cursor: "move" }}>
                <img
                    style={{ width: "100px" }}
                    src={el.src}
                    alt=''
                />
            </div>
        );
    });
    return <>{el}</>;
});
