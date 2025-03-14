<?php declare(strict_types=1);

namespace Navplan\Webcam;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Webcam\Domain\Service\IWebcamService;
use Navplan\Webcam\Persistence\Service\DbWebcamRepo;
use Navplan\Webcam\Rest\Service\WebcamController;


class ProdWebcamDiContainer implements IWebcamDiContainer {
    private IRestController $webcamController;
    private IWebcamService $webcamService;


    public function __construct(
        private IDbService $dbService,
        private IHttpService $httpService,
    ) {
    }


    public function getWebcamController(): IRestController {
        if (!isset($this->webcamController)) {
            $this->webcamController = new WebcamController(
                $this->getWebcamService(),
                $this->httpService
            );
        }

        return $this->webcamController;
    }


    public function getWebcamService(): IWebcamService {
        if (!isset($this->webcamService)) {
            $this->webcamService = new DbWebcamRepo($this->dbService);
        }

        return $this->webcamService;
    }
}
