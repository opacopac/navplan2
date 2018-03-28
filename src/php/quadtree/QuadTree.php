<?php
include_once __DIR__ . "/IndexItemBase.php";


const MAX_LEVELS = 10;


class QuadTree {
    public $level;
    public $minLon, $minLat, $maxLon, $maxLat;
    public $isLeaf;
    public $items;
    public $childNodeNW, $childNodeNE, $childNodeSW, $childNodeSE;


    public function __construct($level, $minLon, $minLat, $maxLon, $maxLat) {
        $this->isLeaf = true;
        $this->items = [];
        $this->level = $level;
        $this->minLon = $minLon;
        $this->minLat = $minLat;
        $this->maxLon = $maxLon;
        $this->maxLat = $maxLat;
    }


    // region statistics

    public function countItems() {
        if ($this->isLeaf) {
            return count($this->items);
        } else {
            $count = $this->childNodeSW->countItems();
            $count += $this->childNodeNW->countItems();
            $count += $this->childNodeSE->countItems();
            $count += $this->childNodeNE->countItems();
            return $count;
        }
    }


    public function countNodes() {
        if ($this->isLeaf) {
            return 1;
        } else {
            $count = 1;
            $count += $this->childNodeSW->countNodes();
            $count += $this->childNodeNW->countNodes();
            $count += $this->childNodeSE->countNodes();
            $count += $this->childNodeNE->countNodes();
            return $count;
        }
    }

    // endregion


    // region adding items

    public function insertItem(IndexItemBase $item) {
        if ($this->isLeaf) {
            $this->items[] = $item;

            // break down into child nodes if necessary
            if (count($this->items) > 1 && $this->level < MAX_LEVELS) {
                $this->createChildNodes();
            }
        } else {
            $this->insetItemIntoChildren($item);
        }
    }


    private function createChildNodes() {
        $midLat = ($this->maxLat + $this->minLat) / 2.0;
        $midLon = ($this->maxLon + $this->minLon) / 2.0;
        $this->childNodeSW = new QuadTree($this->level + 1, $this->minLon, $this->minLat, $midLon, $midLat);
        $this->childNodeNW = new QuadTree($this->level + 1, $this->minLon, $midLat, $midLon, $this->maxLat);
        $this->childNodeSE = new QuadTree($this->level + 1, $midLon, $this->minLat, $this->maxLon, $midLat);
        $this->childNodeNE = new QuadTree($this->level + 1, $midLon, $midLat, $this->maxLon, $this->maxLat);

        $this->isLeaf = false;
        foreach ($this->items as $item) {
            $this->insetItemIntoChildren($item);
        }
        $this->items = [];
    }


    private function insetItemIntoChildren(IndexItemBase $item) {
        if ($item->longitude >= $this->childNodeNE->minLon) {
            if ($item->latitude >= $this->childNodeNE->minLat) {
                $this->childNodeNE->insertItem($item);
            } else {
                $this->childNodeSE->insertItem($item);
            }
        } else {
            if ($item->latitude >= $this->childNodeNE->minLat) {
                $this->childNodeNW->insertItem($item);
            } else {
                $this->childNodeSW->insertItem($item);
            }
        }
    }

    // endregion


    // region sorting

    public function sortByImportance() {
        if ($this->isLeaf) {
            if (count($this->items) == 0) {
                return;
            }
            // sort items
            usort($this->items, array(get_class($this->items[0]), 'importanceComparer'));
        } else {
            // sort items of children recursively
            $this->childNodeSW->sortByImportance();
            $this->childNodeNW->sortByImportance();
            $this->childNodeSE->sortByImportance();
            $this->childNodeNE->sortByImportance();

            // get most important child item
            $mostImportantChildItems = [];
            $mostImportantChildItems = array_merge($mostImportantChildItems, $this->childNodeSW->items);
            $mostImportantChildItems = array_merge($mostImportantChildItems, $this->childNodeNW->items);
            $mostImportantChildItems = array_merge($mostImportantChildItems, $this->childNodeSE->items);
            $mostImportantChildItems = array_merge($mostImportantChildItems, $this->childNodeNE->items);

            if (count($mostImportantChildItems) > 0) {
                usort($mostImportantChildItems, array(get_class($mostImportantChildItems[0]), 'importanceComparer'));
                $this->items[] = $mostImportantChildItems[0];
            }
        }
    }

    // endregion


    // region write index

    public static function writeIndexToFile($file, QuadTree $node) {
        // write node type
        if ($node->isLeaf) {
            fwrite($file, pack("C", 0xFF)); // 1 = is leaf node
        } else {
            fwrite($file, pack("C", 0xFE)); // 0 = is tree node
        }

        // write node coordinates
        fwrite($file, pack("f", $node->minLon)); // min lon
        fwrite($file, pack("f", $node->minLat)); // min lat
        fwrite($file, pack("f", $node->maxLon)); // max lon
        fwrite($file, pack("f", $node->maxLat)); // max lat

        // write items
        fwrite($file, pack("S", count($node->items))); // number of items
        foreach ($node->items as $item) {
            fwrite($file, pack("L", $item->id)); // item id
        }

        // write children recursively
        if (!$node->isLeaf) {
            // write child node references
            $seekPosSW = ftell($file) + 4 * 4;
            $seekPosNW = $seekPosSW + self::getByteLength($node->childNodeSW);
            $seekPosSE = $seekPosNW + self::getByteLength($node->childNodeNW);
            $seekPosNE = $seekPosSE + self::getByteLength($node->childNodeSE);
            fwrite($file, pack("L", $seekPosSW)); // seek pos sw
            fwrite($file, pack("L", $seekPosNW)); // seek pos nw
            fwrite($file, pack("L", $seekPosSE)); // seek pos se
            fwrite($file, pack("L", $seekPosNE)); // seek pos ne

            // write child nodes
            self::writeIndexToFile($file, $node->childNodeSW);
            self::writeIndexToFile($file, $node->childNodeNW);
            self::writeIndexToFile($file, $node->childNodeSE);
            self::writeIndexToFile($file, $node->childNodeNE);
        }
    }


    public static function getByteLength(QuadTree $node) {
        $len = 1; // node type
        $len += 4 * 4; // coordinates
        $len += 2 + count($node->items) * 4; // items

        if (!$node->isLeaf) {
            $len += 4 * 4; // child node pointers
            $len += self::getByteLength($node->childNodeSW);
            $len += self::getByteLength($node->childNodeNW);
            $len += self::getByteLength($node->childNodeSE);
            $len += self::getByteLength($node->childNodeNE);
        }

        return $len;
    }

    // endregion


    // region read from index

    public static function readItemsFromIndex($file, $minLon, $minLat, $maxLon, $maxLat, $resolutionDeg) {
        // read header
        $content = fread($file, 1 + 4 * 4 + 2);
        $headerBytes = unpack("C1a/f1b/f1c/f1d/f1e/S1f", $content);
        $isLeafNode = ($headerBytes["a"] == 0xFF) ? true : false;
        $nodeMinLon = floatval($headerBytes["b"]);
        $nodeMinLat = floatval($headerBytes["c"]);
        $nodeMaxLon = floatval($headerBytes["d"]);
        $nodeMaxLat = floatval($headerBytes["e"]);
        $nodeItemCount = intval($headerBytes["f"]);

        //var_dump($headerBytes);

        // check if out of bounds
        if ($nodeMinLon > $maxLon || $nodeMinLat > $maxLat || $nodeMaxLon < $minLon || $nodeMaxLat < $minLat) {
            return [];
        }

        // read items
        if ($nodeItemCount > 0) {
            $content = fread($file, $nodeItemCount * 4);
            $itemBytes = unpack("L*a", $content);

            //var_dump($itemBytes);
        }

        // check if leaf node or desired resolution reached
        if ($isLeafNode || $nodeMaxLon - $nodeMinLon <= $resolutionDeg) {
            $itemIds = [];

            if ($nodeItemCount > 0) {
                foreach ($itemBytes as $itemId) {
                    $itemIds[] = $itemId;
                }
            }

            return $itemIds;
        }

        // recursively read child items
        $content = fread($file, 4 * 4);
        $seekPosBytes = unpack("L1a/L1b/L1c/L1d", $content);
        $seekPosSW = $seekPosBytes["a"];
        $seekPosNW = $seekPosBytes["b"];
        $seekPosSE = $seekPosBytes["c"];
        $seekPosNE = $seekPosBytes["d"];

        //var_dump($seekPosBytes);

        $itemIds = [];
        fseek($file, $seekPosSW);
        $itemIds = array_merge($itemIds, self::readItemsFromIndex($file, $minLon, $minLat, $maxLon, $maxLat, $resolutionDeg));
        fseek($file, $seekPosNW);
        $itemIds = array_merge($itemIds, self::readItemsFromIndex($file, $minLon, $minLat, $maxLon, $maxLat, $resolutionDeg));
        fseek($file, $seekPosSE);
        $itemIds = array_merge($itemIds, self::readItemsFromIndex($file, $minLon, $minLat, $maxLon, $maxLat, $resolutionDeg));
        fseek($file, $seekPosNE);
        $itemIds = array_merge($itemIds, self::readItemsFromIndex($file, $minLon, $minLat, $maxLon, $maxLat, $resolutionDeg));

        return $itemIds;
    }



    // endregion
}
