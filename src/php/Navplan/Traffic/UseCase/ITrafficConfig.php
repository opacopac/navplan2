<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase;


interface ITrafficConfig {
    public function getAdsbexGateway(): IAdsbexGateway;

    public function getOgnGateway(): IOgnGateway;
}
