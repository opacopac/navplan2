<?php declare(strict_types=1);

namespace Navplan\Webcam\Domain\Query;

use Navplan\Webcam\Domain\Model\Webcam;


interface IWebcamByIcaoQuery
{
    /**
     * @param string $airportIcao
     * @return Webcam[]
     */
    function read(string $airportIcao): array;
}
