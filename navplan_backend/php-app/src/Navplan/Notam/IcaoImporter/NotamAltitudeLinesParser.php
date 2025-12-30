<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;

use Navplan\Common\Domain\Model\Altitude;


class NotamAltitudeLinesParser
{
    /**
     * detect bottom / top height in F) and G) line of message: ...F) SFC G) 500FT AGL...
     *
     * @param string $notamText
     * @return Altitude[]|null
     */
    public static function tryParseAltitudesFromGAndFLines(string $notamText): ?array
    {
        $regExp = '/\s+F\)\s*(\S+.*)\s+G\)\s*(\S+.*)\s+/im';
        $result = preg_match($regExp, $notamText, $matches);

        if (!$result || count($matches) != 3)
            return null;

        $bottom = self::parseAltitude($matches[1]);
        $top = self::parseAltitude($matches[2]);

        return [$bottom, $top];
    }


    private static function parseAltitude(string $altText): Altitude
    {
        $altText = preg_replace("/[^\w\d]/im", "", strtoupper(trim($altText)));
        $regExpAmsl = "/^(\d+)(FT|M)(AMSL|MSL)$/";
        $regExpAgl = "/^(\d+)(FT|M)(AGL|ASFC)$/";
        $regExpFl = "/^FL(\d+)$/";

        if ($altText == "SFC" || $altText == "GND")
            return Altitude::fromFtAgl(0);

        if ($altText == "UNL")
            return Altitude::fromFl(999); // unlimited

        if (preg_match($regExpFl, $altText, $matches))
            return Altitude::fromFl(intval($matches[1]));

        if (preg_match($regExpAmsl, $altText, $matches))
            return $matches[2] == "FT"
                ? Altitude::fromFtAmsl(intval($matches[1]))
                : Altitude::fromMtAmsl(intval($matches[1]));

        if (preg_match($regExpAgl, $altText, $matches))
            return $matches[2] == "FT"
                ? Altitude::fromFtAgl(intval($matches[1]))
                : Altitude::fromMtAgl(intval($matches[1]));

        return Altitude::fromFtAgl(0);
    }
}
