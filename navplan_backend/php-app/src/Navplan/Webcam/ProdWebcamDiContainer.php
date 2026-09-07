<?php declare(strict_types=1);

namespace Navplan\Webcam;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Webcam\Domain\Query\IWebcamByExtentQuery;
use Navplan\Webcam\Domain\Query\IWebcamByIcaoQuery;
use Navplan\Webcam\Persistence\Query\DbWebcamByExtentQuery;
use Navplan\Webcam\Persistence\Query\DbWebcamByIcaoQuery;
use Navplan\Webcam\Rest\Service\WebcamController;
use function DI\autowire;


class ProdWebcamDiContainer implements IWebcamDiContainer
{
    private Container $container;


    public function __construct(
        IDbService $dbService,
        IHttpService $httpService,
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons
            IDbService::class => $dbService,
            IHttpService::class => $httpService,

            // interface -> implementation bindings
            IWebcamByExtentQuery::class => autowire(DbWebcamByExtentQuery::class),
            IWebcamByIcaoQuery::class => autowire(DbWebcamByIcaoQuery::class),
            IRestController::class => autowire(WebcamController::class),
        ]);

        $this->container = $builder->build();
    }


    public function getWebcamController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    public function getWebcamByExtentQuery(): IWebcamByExtentQuery
    {
        return $this->container->get(IWebcamByExtentQuery::class);
    }


    public function getWebcamByIcaoQuery(): IWebcamByIcaoQuery
    {
        return $this->container->get(IWebcamByIcaoQuery::class);
    }
}
