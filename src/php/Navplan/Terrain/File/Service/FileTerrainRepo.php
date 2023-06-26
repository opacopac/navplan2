<?php declare(strict_types=1);

namespace Navplan\Terrain\File\Service;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Position3d;
use Navplan\System\Domain\Model\IFile;
use Navplan\System\Domain\Service\IFileService;
use Navplan\Terrain\Domain\Service\ITerrainConfig;
use Navplan\Terrain\Domain\Service\ITerrainRepo;
use Navplan\Terrain\File\Model\TerrainPos;


class FileTerrainRepo implements ITerrainRepo {
    public function __construct(
        private readonly IFileService $fileService,
        private readonly ITerrainConfig $terrainConfig
    ) {
    }


    public function readElevations(array $position2dList): array {
        $filePosMap = $this->groupPosByFile($position2dList);
        $this->readElevationInfos($filePosMap);

        return $this->getPosition3dList($filePosMap);
    }


    private function groupPosByFile(array $position2dList): array {
        $filePosMap = array();
        for ($i = 0; $i < count($position2dList); $i++) {
            $pos = $position2dList[$i];
            $filePath = SrtmTileReader::getTerrainFilePath($pos, $this->terrainConfig->getTerrainTilesBaseDir());
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
            if ($file) {
                $file->fclose();
            }
        }
    }


    private function openFile(string $filepath): ?IFile {
        if (!$this->fileService->file_exists($filepath))
            return null;

        return $this->fileService->fopen($filepath, "r");
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
                    Altitude::fromMtAmsl($terrainPos->elevationM)
                );
            },
            $terrainPosFullList
        );
    }
}
