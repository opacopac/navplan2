<?php declare(strict_types=1);

namespace Navplan\VerticalMap;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Enroute\Domain\Service\IAirspaceService;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalCloudService;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalWindService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Terrain\Domain\Service\ITerrainService;
use Navplan\VerticalMap\Domain\Service\IVerticalMapService;
use Navplan\VerticalMap\Domain\Service\VerticalMapService;
use Navplan\VerticalMap\Rest\Service\VerticalMapController;


class ProdVerticalMapDiContainer implements IVerticalMapDiContainer {
    private IVerticalMapService $verticalMapService;
    private IRestController $restController;


    public function __construct(
        private ITerrainService $terrainService,
        private IAirspaceService $airspaceService,
        private IMeteoDwdVerticalCloudService $verticalCloudService,
        private IMeteoDwdVerticalWindService $verticalWindService,
        private IHttpService $httpService
    ) {
    }


    function getVerticalMapController(): IRestController {
        if (!isset($this->restController)) {
            $this->restController = new VerticalMapController(
                $this->getVerticalMapService(),
                $this->httpService
            );
        }

        return $this->restController;
    }


    function getVerticalMapService(): IVerticalMapService {
        if (!isset($this->verticalMapService)) {
            $this->verticalMapService = new VerticalMapService(
                $this->terrainService,
                $this->airspaceService,
                $this->verticalCloudService,
                $this->verticalWindService
            );
        }

        return $this->verticalMapService;
    }
}
