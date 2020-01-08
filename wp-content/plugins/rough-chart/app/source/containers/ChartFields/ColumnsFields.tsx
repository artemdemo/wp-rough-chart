import React from 'react';

interface IProps {
    chartProps: any
    chartId?: number|string;
    disabled?: boolean;
}
interface IState {}

class ColumnsFields extends React.PureComponent<IProps, IState> {
    render() {
        return (
            <React.Fragment>
                ColumnsFields
            </React.Fragment>
        );
    }
}

export default ColumnsFields;
