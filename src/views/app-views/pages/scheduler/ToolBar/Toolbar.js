import { memo } from "react";

export const Toolbar = memo(({ elements, onDrag }) => {
    const onDragHandler = el => {
        onDrag({ id: el.id, src: el.src, type: el.type });
    };

    const el = elements?.map(el => {
        return (
            <div
                key={el.id}
                draggable
                onDrag={() => onDragHandler(el)}>
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
