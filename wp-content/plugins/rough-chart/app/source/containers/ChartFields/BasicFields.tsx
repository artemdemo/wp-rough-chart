import React from 'react';
import _isNumber from 'lodash/isNumber';
import FormField from '../../components/FormTable/FormField';
import { t } from '../../services/i18n';
import Shortcode from '../Shortcode/Shortcode';
import PropInput from '../formProps/PropInput';
import FormTable from '../../components/FormTable/FormTable';

export interface IBasicFieldsProps {
    chartId?: number|string;
    disabled?: boolean;
}

export interface IBasicFieldsState {
    title: string;
}

class BasicFields<P extends IBasicFieldsProps, S extends IBasicFieldsState> extends React.Component<P, S> {
    updateTitle = (title) => {
        this.setState({ title })
    };

    renderShortcode() {
        const { chartId } = this.props;
        if (_isNumber(chartId)) {
            return (
                <FormField title={t('shortcode')}>
                    <Shortcode chartId={Number(chartId)} />
                </FormField>
            );
        }
        return null;
    }

    renderTitle() {
        const { disabled } = this.props;
        return (
            <FormTable>
                <PropInput
                    title={t('title')}
                    onChange={this.updateTitle}
                    value={this.state.title}
                    disabled={disabled}
                />
                {this.renderShortcode()}
            </FormTable>
        );
    }
}

export default BasicFields;
