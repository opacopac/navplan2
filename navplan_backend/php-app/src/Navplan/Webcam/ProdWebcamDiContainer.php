<?php declare(strict_types=1);

namespace Navplan\Webcam;

use Navplan\System\Domain\Service\IDbService;
use Navplan\Webcam\Domain\Service\IWebcamService;
use Navplan\Webcam\Persistence\Service\DbWebcamRepo;


class ProdWebcamDiContainer implements IWebcamDiContainer {
    private IWebcamService $webcamService;


    public function __construct(
        private IDbService $dbService
    ) {
    }


    public function getWebcamService(): IWebcamService {
        if (!isset($this->webcamService)) {
            $this->webcamService = new DbWebcamRepo($this->dbService);
        }

        return $this->webcamService;
    }
}
