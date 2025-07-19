<?php declare(strict_types=1);

namespace Navplan\Webcam\Domain\Query;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Webcam\Domain\Model\Webcam;


interface IWebcamByExtentQuery
{
    /**
     * @param Extent2d $extent
     * @return Webcam[]
     */
    function search(Extent2d $extent): array;
}
