<?php declare(strict_types=1);

namespace Navplan\Notam\UseCase;


interface INotamConfig {
    function getNotamRepo(): INotamRepo;
}
