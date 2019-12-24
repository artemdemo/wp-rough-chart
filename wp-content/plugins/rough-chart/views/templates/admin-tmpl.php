<?php
use roughChart\views\NewChartView;
use roughChart\views\AdminView;

?>
<div class="wrap">
    <h1 class="wp-heading-inline">Rough Charts</h1>
    <a href="<?= NewChartView::get_url_to_add_new() ?>"
       class="page-title-action">
        Add New
    </a>
    <hr class="wp-header-end">
    <h2 class="screen-reader-text">Rough Charts list</h2>
    <table class="wp-list-table widefat fixed striped">
        <thead>
        <tr>
            <th scope="col" class="manage-column column-name column-primary">
                <span>Title</span>
            </th>
            <th scope="col" class="manage-column column-name column-primary">
                <span>Created</span>
            </th>
            <th scope="col" class="manage-column column-name column-primary">
                <span>Last updated</span>
            </th>
        </tr>
        </thead>
        <tbody>
        <? if ( count( AdminView::get_charts() ) > 0 ): ?>
	        <? foreach( AdminView::get_charts() as $chart ): ?>
                <tr>
                    <th><?= $chart -> title ?></th>
                    <td><?= $chart -> created ?></td>
                    <td><?= $chart -> last_updated ?></td>
                </tr>
	        <? endforeach; ?>
        <? else: ?>
            <tr>
                <td colspan="3">
                    No charts
                </td>
            </tr>
        <? endif; ?>
        </tbody>
    </table>

</div>
