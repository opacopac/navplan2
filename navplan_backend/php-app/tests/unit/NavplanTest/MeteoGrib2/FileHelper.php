<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2;


class FileHelper {
    public static function createInMem(string $data = NULL) {
        $fp = fopen('php://memory', 'r+');

        if ($data !== NULL) {
            fwrite($fp, $data);
            fseek($fp, 0);
        }

        return $fp;
    }
}
