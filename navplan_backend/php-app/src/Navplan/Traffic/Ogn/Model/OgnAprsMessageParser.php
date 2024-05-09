<?php declare(strict_types=1);

namespace Navplan\Traffic\Ogn\Model;


class OgnAprsMessageParser
{
    public const PATTERN_APRS = "^(?P<callsign>.+?)>"
    . "(?P<protocol>\w+),.+,"
    . "(?P<receiver>.+?):\/"
    . "(?P<time>\d{6})+h"
    . "(?P<latitude>\d{4}\.\d{2})"
    . "(?P<latitude_sign>N|S)"
    . "(?P<symbol_table>.)"
    . "(?P<longitude>\d{5}\.\d{2})"
    . "(?P<longitude_sign>E|W)"
    . "(?P<symbol>.)"
    . "(?P<course_extension>"
    . "(?P<course>\d{3})\/"
    . "(?P<ground_speed>\d{3}))?\/"
    . "A=(?P<altitude>\d{6})"
    . "(?P<pos_extension>\s"
    . "!W((?P<latitude_enhancement>\d)"
    . "(?P<longitude_enhancement>\d))!)?\s"
    . "(?P<comment>.*)$";

    public const PATTERN_GENERIC_COMMENT = "id(?P<details>\w{2})(?P<id>\w+?)(\s.*|$)";


    public function parse(string $aprsMsg): ?OgnTrafficMessage
    {
        preg_match('/' . self::PATTERN_APRS . '/', $aprsMsg, $matches);
        if (!isset($matches["protocol"])) {
            return NULL;
        }

        preg_match('/' . self::PATTERN_GENERIC_COMMENT . '/', $matches["comment"], $matches2);
        if (!isset($matches2["id"])) {
            return NULL;
        }
        return OgnTrafficMessageConverter::fromAprsMessage($matches, $matches2); // TODO: move code here
    }
}
