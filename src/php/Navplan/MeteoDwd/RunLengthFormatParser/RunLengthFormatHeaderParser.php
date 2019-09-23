<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RunLengthFormatParser;

use DateTime;
use InvalidArgumentException;
use Navplan\MeteoDwd\Domain\RunLengthFormat\RunLengthFormatHeader;
use Navplan\MeteoGrib2\Grib2Parser\DateTimeParser;


class RunLengthFormatHeaderParser {
    public const END_HEADER = 0x3;
    private const CENTURY = 2000;
    private const BY = 'BY';
    private const VS = 'VS';
    private const SW = 'SW';
    private const PR = 'PR';
    private const INT = 'INT';
    private const U = 'U';
    private const GP = 'GP';
    private const VV = 'VV';
    private const MF = 'MF';
    private const QN = 'QN';
    private const MS = 'MS';
    private const ST = 'ST';
    private const VARIABLE_VALUE = [self::MS, self::ST];
    private const KEY_LEN = [
        [self::BY, 7], [self::VS, 2], [self::SW, 9], [self::PR, 5], [self::INT, 4], [self::U],
        [self::GP, 9], [self::VV, 4], [self::MF, 9], [self::QN, 4], [self::MS, 3], [self::ST, 3]
    ];


    public static function parse(string $data): RunLengthFormatHeader {
        $byteArray = unpack("a2a/a6b/a5c/a4d/a*e", $data);

        $keyValues = self::parseKeyValues($byteArray["e"]);

        return new RunLengthFormatHeader(
            $byteArray["a"],
            self::parseTimestamp($byteArray["b"], $byteArray["d"]),
            self::parseWmoNumber($byteArray["c"]),
            self::parseByteLength($keyValues),
            self::parseVersion($keyValues),
            self::parseSoftware($keyValues),
            self::parsePrecision($keyValues),
            self::parseIntervall($keyValues),
            self::parsePixel($keyValues),
            self::parseForecastTime($keyValues),
            self::parseModuleFlags($keyValues),
            self::parseQuantificationType($keyValues),
            $keyValues[self::MS],
            isset($keyValues[self::ST]) ? $keyValues[self::ST] : NULL
        );
    }


    private static function parseTimestamp(string $ddhhmm, string $mmyy): DateTime {
        $year = self::CENTURY + intval(substr($mmyy, 2, 2));
        $month = intval(substr($mmyy, 0, 2));
        $day = intval(substr($ddhhmm, 0, 2));
        $hour = intval(substr($ddhhmm, 2, 2));
        $minute = intval(substr($ddhhmm, 4, 2));

        return DateTimeParser::parse($year, $month, $day, $hour, $minute, 0);
    }


    private static function parseWmoNumber(string $value): int {
        return intval(trim($value));
    }


    private static function parseByteLength(array $keyValues): int {
        if (!isset($keyValues[self::BY])) {
            throw new InvalidArgumentException('byte length missing');
        }

        return intval(trim($keyValues[self::BY]));
    }


    private static function parseVersion(array $keyValues): int {
        if (!isset($keyValues[self::VS])) {
            throw new InvalidArgumentException('format version missing');
        }

        return intval(trim($keyValues[self::VS]));
    }


    private static function parseSoftware(array $keyValues): string {
        if (!isset($keyValues[self::SW])) {
            throw new InvalidArgumentException('software version missing');
        }

        return trim($keyValues[self::SW]);
    }


    private static function parsePrecision(array $keyValues): float {
        if (!isset($keyValues[self::PR])) {
            throw new InvalidArgumentException('precision missing');
        }

        switch (trim($keyValues[self::PR])) {
            case 'E+00': return 1;
            case 'E-00': return 1;
            case 'E-01': return 0.1;
            case 'E-02': return 0.01;
            default: throw new InvalidArgumentException('invalid precision: ' . $keyValues[self::PR]);
        }
    }


    private static function parseIntervall(array $keyValues): int {
        if (!isset($keyValues[self::INT])) {
            throw new InvalidArgumentException('intervall duration missing');
        }

        $intervalMinutes = intval(trim($keyValues[self::INT]));
        if (isset($keyValues[self::U]) && $keyValues[self::U] === "1") {
            $intervalMinutes *= 24 * 60;
        }

        return $intervalMinutes;
    }


    private static function parsePixel(array $keyValues): array {
        if (!isset($keyValues[self::GP])) {
            throw new InvalidArgumentException('pixel missing');
        }

        $parts = explode("x", $keyValues[self::GP]);
        if (count($parts) !== 2) {
            throw new InvalidArgumentException('invalid pixel format');
        }

        return [intval(trim($parts[0])), intval(trim($parts[1]))];
    }


    private static function parseForecastTime(array $keyValues): ?int {
        if (!isset($keyValues[self::VV])) {
            return NULL;
        }

        return intval(trim($keyValues[self::VV]));
    }


    private static function parseModuleFlags(array $keyValues): ?int {
        if (!isset($keyValues[self::MF])) {
            return NULL;
        }

        return intval(trim($keyValues[self::MF]));
    }


    private static function parseQuantificationType(array $keyValues): ?int {
        if (!isset($keyValues[self::QN])) {
            return NULL;
        }

        return intval(trim($keyValues[self::QN]));
    }


    private static function parseKeyValues(string $data): array {
        $keyValues = [];
        $unprocessed = $data;
        while (strlen($unprocessed) > 0) {
            $keyLen = self::peekKeyLen($unprocessed);
            if ($keyLen === NULL) {
                throw new InvalidArgumentException('unknown key found');
            }

            $key = $keyLen[0];
            $valueLength = $keyLen[1];
            $value = substr($unprocessed, strlen($key), $valueLength);
            if (in_array($key, self::VARIABLE_VALUE)) {
                $msgLen = intval(trim($value));
                $keyValues[$key] = substr($unprocessed, strlen($key) + $valueLength, $msgLen);
                $unprocessed = substr($unprocessed, strlen($key) + $valueLength + $msgLen);
            } else {
                $keyValues[$key] = $value;
                $unprocessed = substr($unprocessed, strlen($key) + $valueLength);
            }
        }

        return $keyValues;
    }


    private static function peekKeyLen(string $data): ?array {
        foreach (self::KEY_LEN as $keyLen) {
            if (strpos($data, $keyLen[0]) === 0) {
                return $keyLen;
            }
        }

        return NULL;
    }
}
