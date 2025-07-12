import React, { ReactElement, useMemo } from 'react';
import { Group } from 'react-konva';

type Props = {
    children: ReactElement<any>[];
    direction?: 'row' | 'column';
    spacing?: number;
    align?: 'start' | 'center' | 'end'; // optional alignment logic (todo)
    x?: number;
    y?: number;
};

export const AutoLayoutCanvas: React.FC<Props> = ({
    children,
    direction = 'column',
    spacing = 8,
    align = 'start',
    x = 0,
    y = 0,
}) => {
    const positionedChildren = useMemo(() => {
        let offsetX = 0;
        let offsetY = 0;

        return children.map((child, index) => {
            const childProps = child.props || {};
            const estimatedWidth = childProps.width ?? 100;
            const estimatedHeight = childProps.height ?? childProps.fontSize ?? 20;

            const newX = direction === 'row' ? offsetX : x;
            const newY = direction === 'column' ? offsetY : y;

            const element = React.cloneElement(child, {
                key: index,
                x: newX,
                y: newY,
            });

            if (direction === 'row') {
                offsetX += estimatedWidth + spacing;
            } else {
                offsetY += estimatedHeight + spacing;
            }

            return element;
        });
    }, [children, direction, spacing, x, y]);

    return React.createElement(Group as any, { x, y }, positionedChildren);
};
