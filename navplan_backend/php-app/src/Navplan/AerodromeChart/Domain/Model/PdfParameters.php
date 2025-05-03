<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Model;

use Navplan\Common\Domain\Model\Angle;


class PdfParameters
{
    public function __construct(
        public int $page,
        public Angle $rotation,
        public int $dpi,
    )
    {
    }
}
