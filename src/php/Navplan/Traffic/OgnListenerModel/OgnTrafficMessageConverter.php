<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnListenerModel;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\Position3d;


class OgnTrafficMessageConverter {
    // Prisdorf>APRS,TCPIP*,qAC,GLIDERN1:/220102h5340.77NI00945.97E&000/000/A=000075 v0.2.4.ARM CPU:0.5 RAM:771.5/972.2MB NTP:0.8ms/-7.0ppm +37.4C RF:+0.35dB
    // FLRDD95E5>APRS,qAS,BOBERG:/220043h5330.69N/01009.30E'000/000/A=000016 !W47! id06DD95E5 -019fpm +0.0rot 36.2dB 0e +0.4kHz gps3x4
    // $stealthflag_mask = 0b10000000;
    // $notrackingflag_mask = 0b01000000;

    public const PATTERN_APRS = "^(?P<callsign>.+?)>APRS,.+,"
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

    public const PATTERN_AIRCRAFT = "id(?P<details>\w{2})(?P<id>\w+?)\s"
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


    public static function fromAprsMessage(array $matches, array $matches2): OgnTrafficMessage {
        $lat = self::convertToDec("0" . $matches["latitude"] . $matches["latitude_enhancement"], $matches["latitude_sign"]);
        $lon = self::convertToDec($matches["longitude"] . $matches["longitude_enhancement"], $matches["longitude_sign"]);
        $alt_ft = intval($matches["altitude"]);
        $time_utc = strtotime($matches["time"] . " UTC");

        return new OgnTrafficMessage(
            $matches2["id"],
            self::getAddressType($matches2["details"]),
            self::getAcType($matches2["details"]),
            $time_utc,
            new Position3d(
                $lon,
                $lat,
                Altitude::fromFtAmsl($alt_ft)
            ),
            $matches["receiver"]
        );
    }


    public static function convertToDec(string $dddmm, string $sign): float {
        $dd = substr($dddmm, 0, 3);
        $mm = substr($dddmm, 3);
        $dec = intval($dd) + (floatval($mm) / 60);

        if (strtoupper($sign) == "W" || strtoupper($sign) == "S") {
            $dec = -$dec;
        }

        return $dec;
    }


    public static function getAcType(string $details): string {
        //UNKNOWN(0), GLIDER(1), TOW_PLANE(2), HELICOPTER_ROTORCRAFT(3), PARACHUTE(4), DROP_PLANE(5), HANG_GLIDER(6), PARA_GLIDER(7),
        //POWERED_AIRCRAFT(8), JET_AIRCRAFT(9), UFO(10), BALLOON(11), AIRSHIP(12), UAV(13), STATIC_OBJECT(15);
        $ac_mask = 0b00111100;
        $ac_type = array(
            "UNKNOWN" => 0b000000,
            "GLIDER" => 0b000100,
            "TOW_PLANE" => 0b001000,
            "HELICOPTER_ROTORCRAFT" => 0b001100,
            "PARACHUTE" => 0b010000,
            "DROP_PLANE" => 0b010100,
            "HANG_GLIDER" => 0b011000,
            "PARA_GLIDER" => 0b011100,
            "POWERED_AIRCRAFT" => 0b100000,
            "JET_AIRCRAFT" => 0b100100,
            "UFO" => 0b101000,
            "BALLOON" => 0b101100,
            "AIRSHIP" => 0b110000,
            "UAV" => 0b110100,
            "STATIC_OBJECT" => 0b111100
        );


        foreach($ac_type as $type => $bitmask) {
            if ((hexdec($details) & $ac_mask) == $bitmask) {
                return $type;
            }
        }

        return "UNKNOWN";
    }


    public static function getAddressType(string $details): string {
        $address_mask = 0b00000011;
        $address_type = array(
            "RANDOM" => 0b00000000,
            "ICAO" => 0b00000001,
            "FLARM" => 0b00000010,
            "OGN" => 0b00000011
        );

        foreach($address_type as $type => $bitmask) {
            if ((hexdec($details) & $address_mask) == $bitmask) {
                return $type;
            }
        }

        return "RANDOM";
    }
}
