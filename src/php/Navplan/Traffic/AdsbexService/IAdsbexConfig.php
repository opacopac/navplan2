<?php declare(strict_types=1);

namespace Navplan\Traffic\AdsbexService;


interface IAdsbexConfig {
    function getAdsbExchangeApiKey(): string;
}
