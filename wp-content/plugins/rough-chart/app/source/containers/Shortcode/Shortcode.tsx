import React from 'react';

interface IProps {
    chartId: number;
}

export const getShortcode = (chartId: number) => `[roughchart id="${chartId}"]`;

const Shortcode = (props: IProps) => (
    <>
        {getShortcode(props.chartId)}
    </>
);

export default Shortcode;
