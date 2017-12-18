<?php
include "./version.php";

$host = "www.navplan.ch";

if(empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == "off" || $_SERVER['HTTP_HOST'] != $host)
{
    $redirect = 'https://' . $host . $_SERVER['REQUEST_URI'];
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $redirect);
}
else
{
    header("Cache-Control: public, max-age=60"); // max 1 min (must be public for appcache to work)
}

// load main index
include "./index.html";
