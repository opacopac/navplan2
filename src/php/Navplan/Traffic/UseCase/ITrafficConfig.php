<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase;

use Navplan\System\UseCase\ISystemConfig;
use Navplan\System\UseCase\ISystemServiceFactory;


interface ITrafficConfig extends ISystemConfig {
    public function getSystemServiceFactory(): ISystemServiceFactory;

    public function getAdsbexGateway(): IAdsbexRepo;

    public function getOgnGateway(): IOgnRepo;

    public function getTrafficRepo(): ITrafficDetailRepo;
}
