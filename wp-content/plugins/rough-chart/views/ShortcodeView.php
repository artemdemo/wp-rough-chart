<?php
namespace roughChart\views;

use roughChart\models\DB;

class ShortcodeView {
    private $id;
    private $title;

    public function __construct($id, $title) {
        $this -> id = $id;
        $this -> title = $title;
    }

    public function render() {
        $chart_data = DB::get_chart_by_id($this->id);
        return "
        <div
            class='rough-chart rough-chart-$this->id'
            data-roughchart='$this->id'
            data-title='$chart_data->title'
            data-type='$chart_data->chart_type'
            data-chart='$chart_data->chart'
        >
            Chart: $chart_data->title
        </div>
        <script>
            (function() {
                if (window.__addRoughChart) {
                    var chartId = $this->id;
                    window.__addRoughChart(chartId);
                } else {
                    console.error('`window.__addRoughChart` is not found');
                }
            })();
        </script>
        ";
    }
}
