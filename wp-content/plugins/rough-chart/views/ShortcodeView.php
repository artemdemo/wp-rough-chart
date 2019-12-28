<?php
namespace roughChart\views;

require_once( 'View.php' );

class ShortcodeView {
    private $id;
    private $title;

    public function __construct($id, $title) {
        $this -> id = $id;
        $this -> title = $title;
    }

    public function render() {
        return "
        <div class='rough-chart rough-chart-$this->id' data-roughchart='$this->id'>
            renderd id=$this->id
        </div>
";
    }
}
