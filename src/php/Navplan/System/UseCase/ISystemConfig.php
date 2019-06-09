<?php declare(strict_types=1);

namespace Navplan\System\UseCase;


interface ISystemConfig {
    function getSystemServiceFactory(): ISystemServiceFactory;
}
