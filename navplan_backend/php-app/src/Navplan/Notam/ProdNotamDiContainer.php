<?php declare(strict_types=1);

namespace Navplan\Notam;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Config\ProdConfigDiContainer;
use Navplan\Notam\Domain\Query\INotamSearchByPositionQuery;
use Navplan\Notam\Domain\Service\INotamConfig;
use Navplan\Notam\Domain\Service\INotamService;
use Navplan\Notam\Persistence\Query\DbNotamSearchByPositionQuery;
use Navplan\Notam\Persistence\Service\DbNotamRepo;
use Navplan\Notam\Rest\Service\NotamController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;


class ProdNotamDiContainer implements INotamDiContainer
{
    private INotamConfig $notamConfig;
    private IRestController $notamController;
    private INotamService $notamService;
    private INotamSearchByPositionQuery $searchByPositionQuery;


    public function __construct(
        private readonly IDbService $dbService,
        private readonly IHttpService $httpService,
    )
    {
    }


    function getNotamConfig(): INotamConfig
    {
        if (!isset($this->notamConfig)) {
            $this->notamConfig = new ProdConfigDiContainer();
        }

        return $this->notamConfig;
    }


    function getNotamController(): IRestController
    {
        if (!isset($this->notamController)) {
            $this->notamController = new NotamController(
                $this->getNotamService(),
                $this->getNotamSearchByPositionQuery(),
                $this->httpService
            );
        }

        return $this->notamController;
    }


    public function getNotamService(): INotamService
    {
        if (!isset($this->notamService)) {
            $this->notamService = new DbNotamRepo($this->dbService);
        }

        return $this->notamService;
    }


    public function getNotamSearchByPositionQuery(): INotamSearchByPositionQuery
    {
        if (!isset($this->searchByPositionQuery)) {
            $this->searchByPositionQuery = new DbNotamSearchByPositionQuery($this->dbService);
        }

        return $this->searchByPositionQuery;
    }
}
