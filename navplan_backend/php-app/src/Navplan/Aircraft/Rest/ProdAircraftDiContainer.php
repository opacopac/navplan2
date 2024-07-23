<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest;

use Navplan\Aircraft\Domain\Query\IAircraftByIdQuery;
use Navplan\Aircraft\Domain\Query\IAircraftListQuery;
use Navplan\Aircraft\Domain\Service\AircraftService;
use Navplan\Aircraft\Domain\Service\IAircraftService;
use Navplan\Aircraft\Persistence\Query\DbAircraftByIdQuery;
use Navplan\Aircraft\Persistence\Query\DbAircraftListQuery;
use Navplan\Aircraft\Rest\Controller\AircraftController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\User\Domain\Service\ITokenService;
use Navplan\User\Domain\Service\IUserRepo;


class ProdAircraftDiContainer implements IAircraftDiContainer
{
    private IRestController $aircraftController;
    private IAircraftService $aircraftService;
    private IAircraftListQuery $aircraftListQuery;
    private IAircraftByIdQuery $aircraftByIdQuery;


    public function __construct(
        private ITokenService $tokenService,
        private IUserRepo $userRepo,
        private IDbService $dbService,
        private IHttpService $httpService
    )
    {
    }


    public function getAircraftController(): IRestController
    {
        if (!isset($this->aircraftController)) {
            $this->aircraftController = new AircraftController(
                $this->getAircraftService(),
                $this->httpService
            );
        }

        return $this->aircraftController;
    }


    public function getAircraftService(): IAircraftService
    {
        if (!isset($this->aircraftService)) {
            $this->aircraftService = new AircraftService(
                $this->tokenService,
                $this->userRepo,
                $this->getAircraftListQuery(),
                $this->getAircraftByIdQuery()
            );
        }

        return $this->aircraftService;
    }


    public function getAircraftListQuery(): IAircraftListQuery
    {
        if (!isset($this->aircraftListQuery)) {
            $this->aircraftListQuery = new DbAircraftListQuery(
                $this->dbService
            );
        }

        return $this->aircraftListQuery;
    }


    public function getAircraftByIdQuery(): IAircraftByIdQuery
    {
        if (!isset($this->aircraftByIdQuery)) {
            $this->aircraftByIdQuery = new DbAircraftByIdQuery(
                $this->dbService
            );
        }

        return $this->aircraftByIdQuery;
    }
}
