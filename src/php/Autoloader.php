<?php
spl_autoload_register(function($className) {
    $file = str_replace('\\', '/', $className) . ".php";
    require_once __DIR__ . "/" . $file;
});
