<?php declare(strict_types=1);

namespace Navplan\VerticalMap;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Enroute\Domain\Service\IAirspaceService;
use Navplan\MeteoDwd\DomainService\IMeteoDwdVerticalCloudService;
use Navplan\System\DomainService\IHttpService;
use Navplan\Terrain\DomainService\ITerrainService;
use Navplan\VerticalMap\DomainService\IVerticalMapService;
use Navplan\VerticalMap\DomainService\VerticalMapService;
use Navplan\VerticalMap\RestService\VerticalMapController;


class ProdVerticalMapDiContainer implements IVerticalMapDiContainer {
    private IVerticalMapService $verticalMapService;
    private IRestController $restController;


    public function __construct(
        private ITerrainService $terrainService,
        private IAirspaceService $airspaceService,
        private IMeteoDwdVerticalCloudService $verticalCloudService,
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
                $this->verticalCloudService
            );
        }

        return $this->verticalMapService;
    }
}
