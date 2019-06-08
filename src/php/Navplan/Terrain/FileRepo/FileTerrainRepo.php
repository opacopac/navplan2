<?php declare(strict_types=1);

namespace Navplan\Terrain\FileRepo;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\Position3d;
use Navplan\System\UseCase\IFile;
use Navplan\System\UseCase\IFileService;
use Navplan\Terrain\UseCase\ITerrainRepo;


class FileTerrainRepo implements ITerrainRepo {
    /* @var $fileService IFileService */
    private $fileService;


    public function __construct(IFileService $fileService) {
        $this->fileService = $fileService;
    }


    public function readElevation(array $position2dList): array {
        $filePosMap = $this->groupPosByFile($position2dList);
        $this->readElevationInfos($filePosMap);

        return $this->getPosition3dList($filePosMap);
    }


    private function groupPosByFile(array $position2dList): array {
        $filePosMap = array();
        for ($i = 0; $i < count($position2dList); $i++) {
            $pos = $position2dList[$i];
            $filePath = SrtmTileReader::getTerrainFilePath($pos);
            $terrainPos = new TerrainPos($i, $pos, $filePath);
            if (array_key_exists($filePath, $filePosMap)) {
                $filePosMap[$filePath][] = $terrainPos;
            } else {
                $filePosMap[$filePath] = [$terrainPos];
            }
        }

        return $filePosMap;
    }


    private function readElevationInfos(array &$filePosMap) {
        foreach ($filePosMap as $filepath => &$terrainPosList) {
            $file = $this->openFile($filepath);
            $reader = new SrtmTileReader($file);
            foreach ($terrainPosList as &$terrainPos) {
                $terrainPos->elevationM = $reader->readElevationFromFile($terrainPos->position2d);
            }
            $file->fclose();
        }
    }


    private function openFile(string $filepath): ?IFile {
        if (!$this->fileService->file_exists($filepath))
            return null;

        $file = $this->fileService->fopen($filepath, "r");

        return $file;
    }


    private function getPosition3dList(array $filePosMap): array {
        $terrainPosFullList = [];
        foreach ($filePosMap as $terrainPosList) {
            foreach ($terrainPosList as $terrainPos) {
                $terrainPosFullList[] = $terrainPos;
            }
        }

        usort(
            $terrainPosFullList,
            function (TerrainPos $terrainPosA, TerrainPos $terrainPosB) { return $terrainPosA->index - $terrainPosB->index; }
        );

        return array_map(
            function (TerrainPos $terrainPos) {
                return new Position3d(
                    $terrainPos->position2d->longitude,
                    $terrainPos->position2d->latitude,
                    new Altitude($terrainPos->elevationM, AltitudeUnit::M, AltitudeReference::MSL)
                );
            },
            $terrainPosFullList
        );
    }
}
