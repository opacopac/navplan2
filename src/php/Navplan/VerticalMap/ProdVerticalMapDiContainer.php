<?php declare(strict_types=1);

namespace Navplan\VerticalMap;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Enroute\Domain\Service\IAirspaceService;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalCloudRepo;
use Navplan\MeteoDwd\Domain\Service\IMeteoDwdVerticalWindRepo;
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
        private IMeteoDwdVerticalCloudRepo $verticalCloudRepo,
        private IMeteoDwdVerticalWindRepo $verticalWindRepo,
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
                $this->verticalCloudRepo,
                $this->verticalWindRepo
            );
        }

        return $this->verticalMapService;
    }
}
