<?php

interface ZoomLevelSortItemType {
    public function cleanZoomLevels();

    public function getNextBatch($lastGeoHash, $maxCount);

    public function updateZoomLevels($zoomMin, $idList);

    public function importanceComparer($b, $a);
}
