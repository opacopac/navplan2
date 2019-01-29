<?php

interface ZoomLevelSortItemType {
    public function cleanZoomLevels();

    public function getNextBatch(?string $lastGeoHash, int $maxCount);

    public function updateZoomLevels(int $zoomMin, array $idList);

    public function importanceComparer($b, $a);
}
