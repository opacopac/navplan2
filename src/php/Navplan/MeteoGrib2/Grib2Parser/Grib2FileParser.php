<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser;

use Closure;


class Grib2FileParser {
    public static function parse(string $inputFileName, Closure $messageCallback): void {
        $fileSize = filesize($inputFileName);
        $fileHandle = fopen($inputFileName, "rb");

        do {
            $gribMessage = Grib2MessageParser::parse($fileHandle);
            $messageCallback($gribMessage);
        } while (!feof($fileHandle) && ftell($fileHandle) < $fileSize - 1);

        fclose($fileHandle);
    }
}
