<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Service;


interface IMeteoForecastConfig {
    function getMeteoForecastBaseDir(): string;
}
