<?php declare(strict_types=1);

namespace Navplan\System\DomainService;


interface ITimeService {
    public function strtotime(string $time): ?int;
}
