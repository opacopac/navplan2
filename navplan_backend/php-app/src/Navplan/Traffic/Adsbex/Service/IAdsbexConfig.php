<?php declare(strict_types=1);

namespace Navplan\Traffic\Adsbex\Service;


interface IAdsbexConfig {
    function getAdsbExchangeApiKey(): string;
}
