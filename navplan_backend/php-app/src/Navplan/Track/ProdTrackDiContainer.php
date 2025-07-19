<?php declare(strict_types=1);

namespace Navplan\Track;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Exporter\Domain\Service\IExportService;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Track\Domain\Command\ITrackCreateCommand;
use Navplan\Track\Domain\Command\ITrackDeleteCommand;
use Navplan\Track\Domain\Command\ITrackUpdateCommand;
use Navplan\Track\Domain\Query\ITrackByIdQuery;
use Navplan\Track\Domain\Query\ITrackListQuery;
use Navplan\Track\Domain\Service\ITrackService;
use Navplan\Track\Domain\Service\TrackService;
use Navplan\Track\Persistence\Command\DbTrackCreateCommand;
use Navplan\Track\Persistence\Command\DbTrackDeleteCommand;
use Navplan\Track\Persistence\Command\DbTrackUpdateCommand;
use Navplan\Track\Persistence\Query\DbTrackByIdQuery;
use Navplan\Track\Persistence\Query\DbTrackListQuery;
use Navplan\Track\Rest\Service\TrackController;
use Navplan\User\Domain\Service\IUserService;


class ProdTrackDiContainer implements ITrackDiContainer
{
    private IRestController $trackController;
    private ITrackService $trackService;
    private ITrackListQuery $trackListQuery;
    private ITrackByIdQuery $trackByIdQuery;
    private ITrackCreateCommand $trackCreateCommand;
    private ITrackUpdateCommand $trackUpdateCommand;
    private ITrackDeleteCommand $trackDeleteCommand;


    public function __construct(
        private IDbService     $dbService,
        private IHttpService   $httpService,
        private IUserService   $userService,
        private IExportService $exportService,
    )
    {
    }


    function getTrackController(): IRestController
    {
        if (!isset($this->trackController)) {
            $this->trackController = new TrackController(
                $this->httpService,
                $this->getTrackService(),
                $this->exportService
            );
        }

        return $this->trackController;
    }


    function getTrackService(): ITrackService
    {
        if (!isset($this->trackService)) {
            $this->trackService = new TrackService(
                $this->userService,
                $this->getTrackListQuery(),
                $this->getTrackByIdQuery(),
                $this->getTrackCreateCommand(),
                $this->getTrackUpdateCommand(),
                $this->getTrackDeleteCommand()
            );
        }

        return $this->trackService;
    }


    function getTrackListQuery(): ITrackListQuery
    {
        if (!isset($this->trackListQuery)) {
            $this->trackListQuery = new DbTrackListQuery($this->dbService);
        }

        return $this->trackListQuery;
    }


    function getTrackByIdQuery(): ITrackByIdQuery
    {
        if (!isset($this->trackByIdQuery)) {
            $this->trackByIdQuery = new DbTrackByIdQuery($this->dbService);
        }

        return $this->trackByIdQuery;
    }


    function getTrackCreateCommand(): ITrackCreateCommand
    {
        if (!isset($this->trackCreateCommand)) {
            $this->trackCreateCommand = new DbTrackCreateCommand($this->dbService);
        }

        return $this->trackCreateCommand;
    }


    function getTrackUpdateCommand(): ITrackUpdateCommand
    {
        if (!isset($this->trackUpdateCommand)) {
            $this->trackUpdateCommand = new DbTrackUpdateCommand($this->dbService);
        }

        return $this->trackUpdateCommand;
    }


    function getTrackDeleteCommand(): ITrackDeleteCommand
    {
        if (!isset($this->trackDeleteCommand)) {
            $this->trackDeleteCommand = new DbTrackDeleteCommand($this->dbService);
        }

        return $this->trackDeleteCommand;
    }
}
