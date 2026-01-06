<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;

use Navplan\Common\Domain\Model\Altitude;


interface INotamAltitudeParser
{
    /**
     * Parse altitudes from message F) and G) lines first (priority 1),
     * fall back to qLine limits if not found (priority 2)
     *
     * @param IcaoApiNotam $icaoApiNotam
     * @return Altitude[]|null Returns [bottom, top] array or null if neither found
     */
    function parseAltitudes(IcaoApiNotam $icaoApiNotam): ?array;
}
