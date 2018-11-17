<?php namespace Navplan\Shared;
require_once __DIR__ . "/../NavplanHelper.php";


class LoggingService
{
    static private $lastMicrotime = 0;

    static public function printLine(string $text) {
        if ($text)
            print $text;

        print "<br>\n";
        ob_flush();
    }


    static public function printMicrotime() {
        self::printLine(microtime(true));
    }


    static public function echoLineToBrowser(string $text) {
        echo str_pad($text . "<br>", 4096) . "\n";
        ob_flush();
        flush();
        usleep(50000);
    }
}
