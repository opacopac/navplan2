<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainService;

use Navplan\MeteoDwd\DomainModel\VerticalCloudColumn;


class ReadPosVerticalCloudsResponse {
    /**
     * @param VerticalCloudColumn[] $verticalCloudColumns
     */
    public function __construct(
        public array $verticalCloudColumns
    ) {
    }
}
