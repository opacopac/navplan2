<?php declare(strict_types=1);

namespace Navplan\Terrain\FileRepo;

use Navplan\Geometry\Domain\Position2d;
use Navplan\Shared\StringNumberService;
use Navplan\System\IFile;


class SrtmTileReader {
    const TERRAIN_TILE_BASE_DIR = __DIR__ . '/../terraintiles/';
    const TERRAIN_TILE_SUFFIX = '.hgt';
    const LINE_SIZE = 1201;
    const MAX_LINES = 1201;


    /* @var $file IFile */
    private $file;


    public function __construct(?IFile $file) {
        $this->file = $file;
    }


    public static function getTerrainFilePath(Position2d $position): string {
        $filename = $position->latitude >= 0 ? "N" : "S";
        $filename .= StringNumberService::zeroPad(intval(abs(floor($position->latitude))), 2);
        $filename .= $position->longitude >= 0 ? "E" : "W";
        $filename .= StringNumberService::zeroPad(intval(abs(floor($position->longitude))), 3);

        return self::TERRAIN_TILE_BASE_DIR . $filename . self::TERRAIN_TILE_SUFFIX;
    }


    public function readElevationFromFile(Position2d $position): float {
        if (!$this->file) {
            return 0.0;
        }

        $seekPos = $this->getSeekPos($position);
        $this->file->fseek($seekPos);
        $value = $this->file->fread(2);

        return $this->getElevationFromFileValue($value);
    }


    private function getSeekPos(Position2d $position): int {
        $lonProc = $position->longitude - floor($position->longitude);
        $latProc = $position->latitude - floor($position->latitude);
        $latProc = 1.00 - $latProc;

        $line = floor($latProc * (self::MAX_LINES - 1));
        $col = floor($lonProc * (self::LINE_SIZE - 1));
        $seekPos = intval(2 * ($line * self::LINE_SIZE + $col));

        return $seekPos;
    }


    private function getElevationFromFileValue($value): float {
        $tmpVal = unpack("n", $value);
        $height = $tmpVal[1];
        if ($height >= pow(2, 15))
            $height -= pow(2, 16);

        return $height;
    }
}
