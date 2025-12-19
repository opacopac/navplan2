<?php declare(strict_types=1);

namespace Navplan\Notam;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Config\ProdConfigDiContainer;
use Navplan\Notam\Domain\Query\INotamSearchByExtentQuery;
use Navplan\Notam\Domain\Query\INotamSearchByIcaoQuery;
use Navplan\Notam\Domain\Query\INotamSearchByPositionQuery;
use Navplan\Notam\Domain\Query\INotamSearchByRouteQuery;
use Navplan\Notam\Domain\Service\INotamConfig;
use Navplan\Notam\Persistence\Query\DbNotamSearchByExtentQuery;
use Navplan\Notam\Persistence\Query\DbNotamSearchByIcaoQuery;
use Navplan\Notam\Persistence\Query\DbNotamSearchByPositionQuery;
use Navplan\Notam\Persistence\Query\DbNotamSearchByRouteQuery;
use Navplan\Notam\Rest\Service\NotamController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;


class ProdNotamDiContainer implements INotamDiContainer
{
    private INotamConfig $notamConfig;
    private IRestController $notamController;
    private INotamSearchByExtentQuery $searchByExtentQuery;
    private INotamSearchByPositionQuery $searchByPositionQuery;
    private INotamSearchByIcaoQuery $searchByIcaoQuery;
    private INotamSearchByRouteQuery $searchByRouteQuery;


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
                $this->getNotamSearchByExtentQuery(),
                $this->getNotamSearchByIcaoQuery(),
                $this->getNotamSearchByPositionQuery(),
                $this->getNotamSearchByRouteQuery(),
                $this->httpService
            );
        }

        return $this->notamController;
    }


    public function getNotamSearchByExtentQuery(): INotamSearchByExtentQuery
    {
        if (!isset($this->searchByExtentQuery)) {
            $this->searchByExtentQuery = new DbNotamSearchByExtentQuery($this->dbService);
        }

        return $this->searchByExtentQuery;
    }


    public function getNotamSearchByPositionQuery(): INotamSearchByPositionQuery
    {
        if (!isset($this->searchByPositionQuery)) {
            $this->searchByPositionQuery = new DbNotamSearchByPositionQuery($this->dbService);
        }

        return $this->searchByPositionQuery;
    }


    public function getNotamSearchByIcaoQuery(): INotamSearchByIcaoQuery
    {
        if (!isset($this->searchByIcaoQuery)) {
            $this->searchByIcaoQuery = new DbNotamSearchByIcaoQuery($this->dbService);
        }

        return $this->searchByIcaoQuery;
    }


    public function getNotamSearchByRouteQuery(): INotamSearchByRouteQuery
    {
        if (!isset($this->searchByRouteQuery)) {
            $this->searchByRouteQuery = new DbNotamSearchByRouteQuery($this->dbService);
        }

        return $this->searchByRouteQuery;
    }
}
