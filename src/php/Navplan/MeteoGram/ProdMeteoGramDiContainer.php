<?php declare(strict_types=1);

namespace Navplan\MeteoGram;

use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalCloudRepo;
use Navplan\MeteoGram\Domain\Service\CloudMeteoGramService;
use Navplan\MeteoGram\Domain\Service\ICloudMeteoGramService;
use Navplan\Terrain\Domain\Service\ITerrainService;


class ProdMeteoGramDiContainer implements IMeteoGramDiContainer {
    private ICloudMeteoGramService $cloudMeteoGramService;


    public function __construct(
        private readonly IMeteoDwdVerticalCloudRepo $verticalCloudRepo,
        private readonly ITerrainService $terrainService
    ) {
    }



    function getCloudMeteoGramService(): ICloudMeteoGramService {
        if (!isset($this->cloudMeteoGramService)) {
            $this->cloudMeteoGramService = new CloudMeteoGramService(
                $this->verticalCloudRepo,
                $this->terrainService
            );
        }

        return $this->cloudMeteoGramService;
    }
}
