<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RunLengthFormatParser;

use Navplan\MeteoDwd\Domain\RunLengthFormat\RunLengthFormat;


class RunLengthFormatFileParser {
    public static function parse(string $inputFileName): RunLengthFormat {
        $fileSize = filesize($inputFileName);
        $fileHandle = fopen($inputFileName, "rb");
        $data = fread($fileHandle, $fileSize);

        $fxProduct = RunLengthFormatParser::parse($data);

        fclose($fileHandle);

        return $fxProduct;
    }
}
