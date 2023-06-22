<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Service;

use Navplan\MeteoDwd\Domain\Model\VerticalCloudColumn;


class ReadPosVerticalCloudsResponse {
    /**
     * @param VerticalCloudColumn[] $verticalCloudColumns
     */
    public function __construct(
        public array $verticalCloudColumns
    ) {
    }
}
