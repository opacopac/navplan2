<?php declare(strict_types=1);

namespace Navplan\MetarTaf;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MetarTaf\Domain\Service\IMetarTafService;
use Navplan\MetarTaf\Domain\Service\MetarTafService;
use Navplan\MetarTaf\Rest\Service\ReadMetarTafController;
use Navplan\System\Domain\Service\IHttpService;


class ProdMetarTafDiContainer implements IMetarTafDiContainer {
    private IRestController $readMetarTafController;
    private IMetarTafService $metarTafService;


    public function __construct(
        private readonly IHttpService $httpService
    ) {
    }


    public function getReadMetarTafController(): IRestController {
        if (!isset($this->readMetarTafController)) {
            $this->readMetarTafController = new ReadMetarTafController(
                $this->httpService,
                $this->getMetarTafService()
            );
        }

        return $this->readMetarTafController;
    }


    public function getMetarTafService(): IMetarTafService {
        if (!isset($this->metarTafService)) {
            $this->metarTafService = new MetarTafService();
        }

        return $this->metarTafService;
    }
}
