<?php

require_once __DIR__ . "/../../vendor/autoload.php";

spl_autoload_register(function ($className) {
    $file = str_replace('\\', '/', $className) . ".php";
    $filePathOwn = __DIR__ . "/" . $file;
    $filePathSrc = __DIR__ . "/../../src/" . $file;

    if (file_exists($filePathOwn))
        require_once $filePathOwn;
    else if (file_exists($filePathSrc))
        require_once $filePathSrc;
    else
        throw new Exception("File not found: " . $file);
});
