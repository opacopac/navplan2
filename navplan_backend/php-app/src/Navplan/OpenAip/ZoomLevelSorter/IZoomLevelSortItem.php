<?php declare(strict_types=1);

namespace Navplan\OpenAip\ZoomLevelSorter;

use Navplan\System\Db\Domain\Model\IDbResult;


interface IZoomLevelSortItem
{
    public function cleanZoomLevels(): bool;

    public function getNextBatch(?string $lastGeoHash, int $maxCount): IDbResult;

    public function updateZoomLevels(int $zoomMin, array $idList): bool;

    public function importanceComparer($b, $a): int;
}
