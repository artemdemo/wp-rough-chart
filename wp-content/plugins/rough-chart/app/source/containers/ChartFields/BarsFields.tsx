import React from 'react';

interface IProps {
    chartProps: any
    chartId?: number|string;
    disabled?: boolean;
}
interface IState {}

class BarsFields extends React.PureComponent<IProps, IState> {
    render() {
        return (
            <React.Fragment>
                BarsFields
            </React.Fragment>
        );
    }
}

export default BarsFields;
