import React from 'react';
import _isNumber from 'lodash/isNumber';
import FormField from '../../components/FormTable/FormField';
import { t } from '../../services/i18n';
import Shortcode from '../Shortcode/Shortcode';

export interface IBasicFieldsProps {
    chartId?: number|string;
}

class BasicFields<P extends IBasicFieldsProps, S> extends React.Component<P, S> {
    renderShortcode() {
        const { chartId } = this.props;
        if (_isNumber(chartId)) {
            return (
                <FormField
                    title={t('shortcode')}
                >
                    <Shortcode chartId={Number(chartId)} />
                </FormField>
            );
        }
        return null;
    }
}

export default BasicFields;
