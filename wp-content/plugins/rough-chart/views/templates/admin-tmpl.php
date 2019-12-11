<?php
    function rough_chart_get_url_to_add_new() {
	    $link_args = array();
	    $link_args[RoughChartAdmin::$chart_id_arg] = 'new';
        return add_query_arg(
	        $link_args,
	        menu_page_url( 'rough_chart', false )
        );
    }

?>
<div class="wrap">
    <h1 class="wp-heading-inline">Rough Charts</h1>
    <a href="<?= rough_chart_get_url_to_add_new() ?>"
       class="page-title-action">
        Add New
    </a>
    <hr class="wp-header-end">
    <h2 class="screen-reader-text">Rough Charts list</h2>
</div>
