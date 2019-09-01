<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser;


class Grib2FileParser {
    public static function parse(string $inputFileName): array {
        $fileSize = filesize($inputFileName);
        $fileHandle = fopen($inputFileName, "rb");

        $gribMessageList = [];
        do {
            $gribMessageList[] = Grib2MessageParser::parse($fileHandle);
        } while (!feof($fileHandle) && ftell($fileHandle) < $fileSize - 1);

        fclose($fileHandle);

        return $gribMessageList;
    }
}
