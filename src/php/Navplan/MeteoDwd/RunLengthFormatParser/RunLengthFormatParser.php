<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RunLengthFormatParser;

use http\Exception\InvalidArgumentException;
use Navplan\MeteoDwd\Domain\RunLengthFormat\RunLengthFormat;


class RunLengthFormatParser {
    private const SINGLE_BYTE_FORMATS = ['WX', 'RX', 'EX'];


    public static function parse(string $data): RunLengthFormat {
        $separatorPos = strpos($data, RunLengthFormatHeaderParser::END_HEADER);

        if ($separatorPos <= 0) {
            throw new InvalidArgumentException('header-body-separator not found');
        }

        $header = RunLengthFormatHeaderParser::parse(substr($data, 0, $separatorPos));
        if (in_array($header->getFormat(), self::SINGLE_BYTE_FORMATS)) {
            $values = RunLengthFormat8BitValuesParser::parse(substr($data, $separatorPos + 1));
        } else {
            $values = RunLengthFormat16BitValuesParser::parse(substr($data, $separatorPos + 1));
        }

        return new RunLengthFormat($header, $values);
    }
}
