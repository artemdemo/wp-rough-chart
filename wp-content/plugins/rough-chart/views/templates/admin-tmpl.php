<?php
use roughChart\views\NewChartView;
use roughChart\views\AdminView;
use roughChart\views\View;

?>
<div class="wrap">
    <h1 class="wp-heading-inline">
	    <?= __( 'Rough Charts', View::$text_domain ) ?>
    </h1>
    <a href="<?= NewChartView::get_url_to_add_new() ?>"
       class="page-title-action"
    >
        <?= __( 'Add New', View::$text_domain ) ?>
    </a>
    <hr class="wp-header-end" />
    <h2 class="screen-reader-text">
	    <?= __( 'Rough Charts list', View::$text_domain ) ?>
    </h2>
    <table class="wp-list-table widefat fixed striped">
        <thead>
        <tr>
            <th scope="col" class="manage-column column-name column-primary">
                <span>
                    <?= __( 'Title', View::$text_domain ) ?>
                </span>
            </th>
            <th scope="col" class="manage-column column-name column-primary">
                <span>
                    <?= __( 'Created', View::$text_domain ) ?>
                </span>
            </th>
            <th scope="col" class="manage-column column-name column-primary">
                <span>
                    <?= __( 'Last updated', View::$text_domain ) ?>
                </span>
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
	                <?= __( 'No charts', View::$text_domain ) ?>
                </td>
            </tr>
        <? endif; ?>
        </tbody>
    </table>

</div>
