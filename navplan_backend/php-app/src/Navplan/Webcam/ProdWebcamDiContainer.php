<?php declare(strict_types=1);

namespace Navplan\Webcam;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Webcam\Domain\Query\IWebcamByExtentQuery;
use Navplan\Webcam\Domain\Query\IWebcamByIcaoQuery;
use Navplan\Webcam\Persistence\Query\DbWebcamByExtentQuery;
use Navplan\Webcam\Persistence\Query\DbWebcamByIcaoQuery;
use Navplan\Webcam\Rest\Service\WebcamController;


class ProdWebcamDiContainer implements IWebcamDiContainer
{
    private IRestController $webcamController;
    private IWebcamByExtentQuery $webcamByExtentQuery;
    private IWebcamByIcaoQuery $webcamByIcaoQuery;


    public function __construct(
        private readonly IDbService $dbService,
        private readonly IHttpService $httpService,
    )
    {
    }


    public function getWebcamController(): IRestController
    {
        if (!isset($this->webcamController)) {
            $this->webcamController = new WebcamController(
                $this->getWebcamByExtentQuery(),
                $this->httpService
            );
        }

        return $this->webcamController;
    }


    public function getWebcamByExtentQuery(): IWebcamByExtentQuery
    {
        if (!isset($this->webcamByExtentQuery)) {
            $this->webcamByExtentQuery = new DbWebcamByExtentQuery($this->dbService);
        }

        return $this->webcamByExtentQuery;
    }


    public function getWebcamByIcaoQuery(): IWebcamByIcaoQuery
    {
        if (!isset($this->webcamByIcaoQuery)) {
            $this->webcamByIcaoQuery = new DbWebcamByIcaoQuery($this->dbService);
        }

        return $this->webcamByIcaoQuery;
    }
}
