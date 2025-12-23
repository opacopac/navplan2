<?php declare(strict_types=1);

namespace Navplan\Fir;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Fir\Domain\Query\IFirReadByIcaoQuery;
use Navplan\Fir\Domain\Service\FirService;
use Navplan\Fir\Domain\Service\IFirService;
use Navplan\Fir\Persistence\Query\DbFirReadByIcaoQuery;
use Navplan\Fir\Rest\Controller\FirController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\ILoggingService;


class ProdFirDiContainer implements IFirDiContainer
{
    private IRestController $firController;
    private IFirService $firService;
    private IFirReadByIcaoQuery $firReadByIcaoQuery;


    public function __construct(
        private ILoggingService $loggingService,
        private IDbService $dbService,
        private IHttpService $httpService
    )
    {
    }


    public function getFirController(): IRestController
    {
        if (!isset($this->firController)) {
            $this->firController = new FirController(
                $this->getFirService(),
                $this->httpService
            );
        }

        return $this->firController;
    }


    public function getFirService(): IFirService
    {
        if (!isset($this->firService)) {
            $this->firService = new FirService(
                $this->getFirReadByIcaoQuery()
            );
        }

        return $this->firService;
    }


    public function getFirReadByIcaoQuery(): IFirReadByIcaoQuery
    {
        if (!isset($this->firReadByIcaoQuery)) {
            $this->firReadByIcaoQuery = new DbFirReadByIcaoQuery(
                $this->dbService
            );
        }

        return $this->firReadByIcaoQuery;
    }
}

