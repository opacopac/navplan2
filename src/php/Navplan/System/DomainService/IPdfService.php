<?php declare(strict_types=1);

namespace Navplan\System\DomainService;

use Navplan\Common\DomainModel\Angle;
use Navplan\System\DomainModel\IPdf;


interface IPdfService {
    function loadPdf(string $abs_filename, float $resolutionDpi, int $page, Angle $rotation): IPdf;
}
