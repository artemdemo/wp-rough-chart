<?php
    $link_args = array();
    $link_args[RoughChartAdmin::$chart_id_arg] = 'new';
    $add_new_link = add_query_arg(
	    $link_args,
        menu_page_url( 'rough_chart', false )
    )
?>
<div class="wrap">
    <h1 class="wp-heading-inline">Rough Charts</h1>
    <a href="<?= $add_new_link ?>" class="page-title-action">Add New</a>
    <hr class="wp-header-end">
    <h2 class="screen-reader-text">Rough Charts list</h2>
</div>
