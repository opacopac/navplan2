<?php declare(strict_types=1);

namespace Navplan\Traffic\Ogn\Model;


class OgnAprsMessageParser
{
    public const PATTERN_APRS = "^(?P<callsign>.+?)>"
    . "(?P<protocol>(APRS|OGFLR|OGNSKY)),.+,"
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

    public const PATTERN_APRS_COMMENT = "id(?P<details>\w{2})(?P<id>\w+?)\s"
    . "(?P<climb_rate>[+-]\d+?)fpm\s"
    . "(?P<turn_rate>[+-][\d.]+?)rot\s"
    . "(?:FL(?P<flight_level>[\d.]+)\s)?"
    . "(?P<signal>[\d.]+?)dB\s"
    . "(?P<errors>\d+)e\s"
    . "(?P<frequency_offset>[+-][\d.]+?)kHz\s?"
    . "(?:gps(?P<gps_accuracy>\d+x\d+)\s?)?"
    . "(?:s(?P<flarm_software_version>[\d.]+)\s?)?"
    . "(?:h(?P<flarm_hardware_version>[\dA-F]{2})\s?)?"
    . "(?:r(?P<flarm_id>[\dA-F]+)\s?)?"
    . "(?:hear(?P<proximity>.+))?";

    public function parse(string $aprsMsg): ?OgnTrafficMessage
    {
        preg_match('/' . self::PATTERN_APRS . '/', $aprsMsg, $matches);
        if (!isset($matches["protocol"])) {
            return NULL;
        }


        switch ($matches["protocol"]) {
            case "APRS":
                preg_match('/' . self::PATTERN_APRS_COMMENT . '/', $matches["comment"], $matches2);
                return OgnTrafficMessageConverter::fromAprsMessage($matches, $matches2); // TODO: move code here
            default:
                return NULL;
        }
    }
}
