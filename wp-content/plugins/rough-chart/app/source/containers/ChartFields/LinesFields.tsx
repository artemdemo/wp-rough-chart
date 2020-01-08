import React from 'react';

interface IProps {
    chartProps: any
    chartId?: number|string;
    disabled?: boolean;
}
interface IState {}

class LinesFields extends React.PureComponent<IProps, IState> {
    render() {
        return (
            <React.Fragment>
                LinesFields
            </React.Fragment>
        );
    }
}

export default LinesFields;
