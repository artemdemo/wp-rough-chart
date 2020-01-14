import React from 'react';
import ChartData from '../ChartData/ChartData';
import { defaultStyle } from '../formProps/FillStyle';
import { defaultLegend } from '../formProps/Legend';
import FormTable from '../../components/FormTable/FormTable';
import { t } from '../../services/i18n';
import GridCell from '../../components/Grid/GridCell';
import Grid from '../../components/Grid/Grid';
import BasicFields, { IBasicFieldsProps, IBasicFieldsState } from './BasicFields';

interface IProps extends IBasicFieldsProps {
    chartProps: any
}
interface IState extends IBasicFieldsState {
    fillStyle: string;
    dataUpdated: boolean;
}

class ColumnsFields extends BasicFields<IProps, IState> {
    private chartDataRef = React.createRef<ChartData>();

    static defaultPros = {
        chartProps: null,
        chartId: undefined,
        disabled: false,
    };

    public state = {
        title: '',  // title can be empty
        fillStyle: defaultStyle.type,
        legend: defaultLegend.type,
        strokeWidth: '',
        strokeWidthErr: false,
        fillWeight: '',
        fillWeightErr: false,
        roughness: '',
        roughnessErr: false,
        dataUpdated: false,
    };

    updateProp(propKey: string, value: any) {
        // @ts-ignore
        this.setState({
            [propKey]: value,
            // Relatively simple solution for hiding error for the given field.
            // The alternative (and the better approach) will be to write logic for each field.
            [`${propKey}Err`]: false,
        })
    };

    renderChartData() {
        return null;
    }

    render() {
        return (
            <React.Fragment>
                {this.renderTitle()}
                <p>{t('defineChart')}</p>
                <Grid>
                    <GridCell columns='lg-4 md-12'>
                        <FormTable>
                            {this.renderBasicFields()}
                        </FormTable>
                    </GridCell>
                    <GridCell columns='lg-8 md-12'>
                        {this.renderChartData()}
                    </GridCell>
                </Grid>
            </React.Fragment>
        );
    }
}

export default ColumnsFields;
