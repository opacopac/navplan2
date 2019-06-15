<?php declare(strict_types=1);

namespace Navplan\OpenAip\UseCase;

use Navplan\System\UseCase\ISystemConfig;
use Navplan\System\UseCase\ISystemServiceFactory;


interface IOpenAipConfig extends ISystemConfig {
    function getOpenAipRepoFactory(): IOpenAipRepoFactory;

    public function getSystemServiceFactory(): ISystemServiceFactory;
}
