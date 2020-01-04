<?php
namespace roughChart\views;

use roughChart\models\DB;

class ShortcodeView {
    private $id;
    private $title;

    public function __construct($id, $title) {
        $this->id = $id;
        $this->title = $title;
    }

    public function render() {
        $chart_data = DB::get_chart_by_id($this->id);
        if (!$chart_data) {
            return __("No rough chart with the given id: $this->id");
        }
        return "
        <div
            class='rough-chart rough-chart-$this->id'
            data-roughchart='$this->id'
            data-title='$chart_data->title'
            data-type='$chart_data->chart_type'
            data-chart='$chart_data->chart'
        >
        </div>
        <script>
            (function() {
                if (window.__addRoughChart) {
                    var chartId = $this->id;
                    window.__addRoughChart({
                        id: chartId,
                        className: 'rough-chart-$this->id',
                        title: '$this->title',
                        chart_type: '$chart_data->chart_type',
                        chart: '$chart_data->chart',
                    });
                } else {
                    console.error('`window.__addRoughChart` is not found');
                }
            })();
        </script>
        ";
    }
}
