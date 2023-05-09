<?php declare(strict_types=1);

namespace Navplan\Terrain\FileService;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Position3d;
use Navplan\System\DomainModel\IFile;
use Navplan\System\DomainService\IFileService;
use Navplan\Terrain\DomainService\ITerrainConfigService;
use Navplan\Terrain\DomainService\ITerrainRepo;
use Navplan\Terrain\FileModel\TerrainPos;


class FileTerrainRepo implements ITerrainRepo {
    public function __construct(
        private readonly IFileService $fileService,
        private readonly ITerrainConfigService $configService
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
            $filePath = SrtmTileReader::getTerrainFilePath($pos, $this->configService->getTerrainTilesBaseDir());
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
