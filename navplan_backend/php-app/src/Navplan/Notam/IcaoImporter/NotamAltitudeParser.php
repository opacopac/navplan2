<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\System\Domain\Service\ILoggingService;


class NotamAltitudeParser implements INotamAltitudeParser
{
    public function __construct(
        private readonly ILoggingService $logger
    )
    {
    }


    /**
     * Parse altitudes from message F) and G) lines first (priority 1),
     * fall back to qLine limits if not found (priority 2)
     *
     * @param IcaoApiNotam $icaoApiNotam
     * @return Altitude[]|null Returns [bottom, top] array or null if neither found
     */
    public function parseAltitudes(IcaoApiNotam $icaoApiNotam): ?array
    {
        // Try to parse from F) and G) lines first (priority 1)
        $bottomTop = $this->tryParseAltitudesFromGAndFLines($icaoApiNotam->all);
        if ($bottomTop) {
            $this->logger->debug("message top/bottom found: " . $bottomTop[0]->toString() . ", " . $bottomTop[1]->toString());
            return $bottomTop;
        }

        // Fall back to qLine limits (priority 2)
        if ($icaoApiNotam->qLine?->lowerLimit && $icaoApiNotam->qLine?->upperLimit) {
            $this->logger->debug("qline top/bottom found: " . $icaoApiNotam->qLine->lowerLimit->toString()
                . ", " . $icaoApiNotam->qLine->upperLimit->toString());
            return [$icaoApiNotam->qLine->lowerLimit, $icaoApiNotam->qLine->upperLimit];
        }

        return null;
    }


    /**
     * detect bottom / top height in F) and G) line of message: ...F) SFC G) 500FT AGL...
     *
     * @param string $notamText
     * @return Altitude[]|null
     */
    private function tryParseAltitudesFromGAndFLines(string $notamText): ?array
    {
        $regExp = '/\s+F\)\s*(\S+.*)\s+G\)\s*(\S+.*)\s+/im';
        $result = preg_match($regExp, $notamText, $matches);

        if (!$result || count($matches) != 3)
            return null;

        $bottom = $this->parseAltitude($matches[1]);
        $top = $this->parseAltitude($matches[2]);

        return [$bottom, $top];
    }


    private function parseAltitude(string $altText): Altitude
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
